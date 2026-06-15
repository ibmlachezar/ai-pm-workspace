import streamlit as st
import anthropic
import json

st.set_page_config(
    page_title="AI Feature Validator",
    page_icon="♟",
    layout="centered"
)

st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
    html, body, [class*="css"] { font-family: 'DM Sans', sans-serif; }
    h1, h2, h3 { font-family: 'Syne', sans-serif !important; }
    .score-box { padding: 1.2rem 1.5rem; border-radius: 10px; margin-bottom: 1rem; }
    .risk-box { background: #f8f9fa; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.875rem; margin-top: 0.5rem; }
    .verdict-badge { display: inline-block; padding: 0.35rem 1rem; border-radius: 20px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.04em; }
    .step-row { display: flex; gap: 0.75rem; align-items: flex-start; margin-bottom: 0.75rem; }
    .step-num { background: #0c0c0c; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 600; flex-shrink: 0; }
    .footer { text-align: center; color: #aaa; font-size: 0.75rem; font-family: monospace; letter-spacing: 0.05em; margin-top: 2rem; }
</style>
""", unsafe_allow_html=True)

SYSTEM_PROMPT = """You are an expert AI product strategist evaluating AI feature ideas using a rigorous 3-layer framework. Be honest and specific — do not be encouraging if the idea has real gaps.

LAYER 1 — TECHNICAL TRUTH: Can this actually be built reliably?
- Does the team have production-quality data (not synthetic, not assumed)?
- Is there a clear fallback when the model fails or produces poor output?
- Is the error rate acceptable for this use case and user tolerance?
- Has anyone tested on real user scenarios vs demo/synthetic data?

LAYER 2 — BEHAVIORAL TRUTH: Will this actually change what real users do?
- Is there a specific, observable behavior the user will do differently on day 30?
- Does this solve friction the user actually feels, or friction the team imagines?
- Is the integration point where the user is stuck, not where they are impressed?
- Would removing this feature tomorrow change user behavior measurably?

LAYER 3 — BUSINESS TRUTH: Does this protect or generate revenue at sustainable economics?
- Does this move a metric the business actually tracks?
- What is the realistic cost per inference at scale — is the margin defensible?
- What happens to the business if this feature is turned off in 6 months?
- Does this create a moat or is it trivially replicable by a competitor?

Scoring: 0-40 Needs Redesign | 41-65 Validate First | 66-80 Good Foundation | 81-100 Strong

Return ONLY valid JSON, no markdown:
{
  "layer1": { "score": <0-100>, "label": "<Needs Redesign|Validate First|Good Foundation|Strong>", "feedback": "<2-3 specific honest sentences>", "topRisk": "<single most critical risk>" },
  "layer2": { "score": <0-100>, "label": "<Needs Redesign|Validate First|Good Foundation|Strong>", "feedback": "<2-3 specific honest sentences>", "topRisk": "<single most critical risk>" },
  "layer3": { "score": <0-100>, "label": "<Needs Redesign|Validate First|Good Foundation|Strong>", "feedback": "<2-3 specific honest sentences>", "topRisk": "<single most critical risk>" },
  "overall": { "score": <0-100>, "verdict": "<Ship it|Validate First|Redesign>", "summary": "<2-3 honest sentences>" },
  "nextSteps": ["<specific step this week>", "<specific thing to validate before building>", "<metric to define before launch>"]
}"""


def score_color(score):
    if score >= 81:
        return "#16a34a"
    elif score >= 66:
        return "#2563eb"
    elif score >= 41:
        return "#d97706"
    return "#dc2626"


def verdict_color(verdict):
    if verdict == "Ship it":
        return "#16a34a"
    elif verdict == "Validate First":
        return "#d97706"
    return "#dc2626"


def validate_feature(name, description, target_user, problem, stage, has_data):
    client = anthropic.Anthropic()
    user_msg = f"""Feature: {name}
What it does: {description}
Target user: {target_user}
Problem solved: {problem}
Stage: {stage}
Production data access: {has_data}"""

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_msg}]
    )

    text = message.content[0].text
    clean = text.replace("```json", "").replace("```", "").strip()
    return json.loads(clean)


def render_layer(num, title, subtitle, data):
    c = score_color(data["score"])
    st.markdown(f"""
    <div style="border: 0.5px solid #e5e7eb; border-radius: 10px; padding: 18px 20px; margin-bottom: 10px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 12px;">
            <div>
                <div style="font-size:10px; color:#aaa; font-family:monospace; letter-spacing:.08em; margin-bottom:2px;">LAYER {num}</div>
                <div style="font-family:'Syne',sans-serif; font-size:16px; font-weight:700;">{title}</div>
                <div style="font-size:12px; color:#888;">{subtitle}</div>
            </div>
            <div style="text-align:right;">
                <div style="font-family:monospace; font-size:28px; font-weight:500; color:{c};">{data['score']}</div>
                <div style="font-size:10px; font-weight:600; padding: 2px 8px; border-radius:20px; background:{c}20; color:{c}; display:inline-block;">{data['label']}</div>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    st.progress(data["score"] / 100)
    st.markdown(f"<div style='font-size:13px; color:#555; line-height:1.65; margin: 8px 0;'>{data['feedback']}</div>", unsafe_allow_html=True)
    st.markdown(f"<div class='risk-box'><strong>Top risk:</strong> {data['topRisk']}</div>", unsafe_allow_html=True)
    st.markdown("<br>", unsafe_allow_html=True)


# ── Header ──────────────────────────────────────────────────────────────────
st.markdown("""
<div style="background:#0c0c0c; border-radius:12px; padding:28px 32px 22px; margin-bottom:0;">
    <div style="font-family:monospace; font-size:10px; letter-spacing:.14em; text-transform:uppercase; color:#555; margin-bottom:8px;">♟ AI Feature Validator</div>
    <h1 style="color:#fff; font-size:26px; margin:0 0 8px; line-height:1.15;">Is your AI feature<br>ready to build?</h1>
    <p style="color:#777; font-size:13px; margin:0; line-height:1.6;">Scored across 3 layers used by senior AI product leaders. No fluff — just an honest read on where your feature stands.</p>
    <div style="display:flex; gap:6px; margin-top:14px; flex-wrap:wrap;">
        <span style="font-family:monospace; font-size:9px; letter-spacing:.06em; padding:3px 10px; border-radius:20px; border:0.5px solid #2a2a2a; color:#555;">01 — Technical truth</span>
        <span style="font-family:monospace; font-size:9px; letter-spacing:.06em; padding:3px 10px; border-radius:20px; border:0.5px solid #2a2a2a; color:#555;">02 — Behavioral truth</span>
        <span style="font-family:monospace; font-size:9px; letter-spacing:.06em; padding:3px 10px; border-radius:20px; border:0.5px solid #2a2a2a; color:#555;">03 — Business truth</span>
    </div>
</div>
<br>
""", unsafe_allow_html=True)

# ── Form ─────────────────────────────────────────────────────────────────────
with st.form("validator"):
    name = st.text_input("Feature name", placeholder="e.g. AI-powered onboarding assistant")
    description = st.text_area(
        "What does it do? Be specific about the AI behaviour.",
        placeholder="e.g. Analyses user behaviour during signup and dynamically adjusts the onboarding flow based on their role and stated goals",
        height=100
    )
    problem = st.text_area(
        "What problem does it solve? From the user's perspective.",
        placeholder="e.g. New users take 3+ weeks to reach first value. 40% churn before they get there because onboarding is one-size-fits-all.",
        height=100
    )

    col1, col2 = st.columns(2)
    with col1:
        target_user = st.text_input("Target user", placeholder="e.g. B2B SaaS sales managers")
    with col2:
        stage = st.selectbox("Current stage", ["Idea only", "Prototype built", "Beta / early users", "In production"])

    has_data = st.selectbox(
        "Access to production-quality data?",
        ["Yes — real user data available now", "Partial — some real, some synthetic",
         "No — working from synthetic or assumed data", "Not sure yet"]
    )

    submitted = st.form_submit_button("Validate this feature →", use_container_width=True)

# ── Results ───────────────────────────────────────────────────────────────────
if submitted:
    if not name or not description or not target_user or not problem:
        st.error("Please complete all fields before validating.")
    else:
        with st.spinner("Analysing across 3 layers..."):
            try:
                result = validate_feature(name, description, target_user, problem, stage, has_data)

                # Overall verdict
                vc = verdict_color(result["overall"]["verdict"])
                st.markdown(f"""
                <div style="border: 0.5px solid #e5e7eb; border-radius: 10px; padding: 20px 22px; margin-bottom: 14px;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; gap:12px;">
                        <div>
                            <div style="font-family:monospace; font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:#aaa; margin-bottom:3px;">VALIDATING</div>
                            <div style="font-family:'Syne',sans-serif; font-size:20px; font-weight:700;">{name}</div>
                        </div>
                        <div style="background:{vc}; color:#fff; padding:6px 14px; border-radius:20px; font-family:'Syne',sans-serif; font-weight:700; font-size:12px; letter-spacing:.05em; flex-shrink:0;">{result['overall']['verdict']}</div>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                        <span style="font-family:monospace; font-size:10px; letter-spacing:.06em; text-transform:uppercase; color:#aaa;">Overall score</span>
                        <span style="font-family:monospace; font-size:24px; font-weight:500; color:{score_color(result['overall']['score'])};">{result['overall']['score']}<span style="font-size:14px; color:#aaa; font-family:sans-serif;">/100</span></span>
                    </div>
                </div>
                """, unsafe_allow_html=True)

                st.progress(result["overall"]["score"] / 100)
                st.markdown(f"<div style='font-size:13px; color:#555; line-height:1.65; margin-bottom:1rem;'>{result['overall']['summary']}</div>", unsafe_allow_html=True)
                st.divider()

                # 3 layers
                layers = [
                    ("01", "Technical truth", "Can it actually be built reliably?", result["layer1"]),
                    ("02", "Behavioral truth", "Will it change what users do?", result["layer2"]),
                    ("03", "Business truth", "Does it move a metric that matters?", result["layer3"]),
                ]
                for num, title, sub, data in layers:
                    render_layer(num, title, sub, data)

                st.divider()

                # Next steps
                st.markdown("<div style='font-family:Syne,sans-serif; font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; margin-bottom:12px;'>Your next 3 moves</div>", unsafe_allow_html=True)
                for i, step in enumerate(result["nextSteps"], 1):
                    st.markdown(f"""
                    <div class='step-row'>
                        <div class='step-num'>{i}</div>
                        <div style='font-size:13px; color:#555; line-height:1.6; padding-top:1px;'>{step}</div>
                    </div>
                    """, unsafe_allow_html=True)

            except Exception as e:
                st.error(f"Analysis failed — please try again. ({str(e)})")

st.markdown("<div class='footer'>Built by Lachezar Atanasov · lachezaratanasov.com</div>", unsafe_allow_html=True)
