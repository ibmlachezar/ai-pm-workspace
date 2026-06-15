import { useState } from "react";

const SYSTEM = `You are an expert AI product strategist evaluating AI feature ideas using a rigorous 3-layer framework. Be honest and specific — do not be encouraging if the idea has real gaps.

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
}`;

const color = (s) => {
  if (s >= 81) return { accent: "#16a34a", bg: "#f0fdf4", text: "#15803d", chip: "#dcfce7" };
  if (s >= 66) return { accent: "#2563eb", bg: "#eff6ff", text: "#1d4ed8", chip: "#dbeafe" };
  if (s >= 41) return { accent: "#d97706", bg: "#fffbeb", text: "#b45309", chip: "#fef3c7" };
  return { accent: "#dc2626", bg: "#fef2f2", text: "#b91c1c", chip: "#fee2e2" };
};

const verdictBg = (v) => {
  if (v === "Ship it") return { background: "#16a34a", color: "#fff" };
  if (v === "Validate First") return { background: "#d97706", color: "#fff" };
  return { background: "#dc2626", color: "#fff" };
};

export default function App() {
  const [view, setView] = useState("form");
  const [form, setForm] = useState({ name: "", description: "", targetUser: "", problem: "", stage: "idea", hasData: "unsure" });
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const [anim, setAnim] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name.trim() || !form.description.trim() || !form.targetUser.trim() || !form.problem.trim()) {
      setErr("Please complete all fields before validating.");
      return;
    }
    setErr("");
    setView("loading");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM,
          messages: [{ role: "user", content: `Feature: ${form.name}\nWhat it does: ${form.description}\nTarget user: ${form.targetUser}\nProblem solved: ${form.problem}\nStage: ${form.stage}\nProduction data: ${form.hasData}` }],
        }),
      });
      const data = await res.json();
      const txt = data.content?.find((b) => b.type === "text")?.text || "";
      const parsed = JSON.parse(txt.replace(/```json|```/g, "").trim());
      setResult(parsed);
      setView("result");
      setTimeout(() => setAnim(true), 80);
    } catch {
      setView("form");
      setErr("Analysis failed — please try again.");
    }
  };

  const reset = () => { setResult(null); setAnim(false); setForm({ name: "", description: "", targetUser: "", problem: "", stage: "idea", hasData: "unsure" }); setView("form"); };

  const layers = result
    ? [
        { n: "01", title: "Technical truth", sub: "Can it actually be built reliably?", d: result.layer1 },
        { n: "02", title: "Behavioral truth", sub: "Will it change what users do?", d: result.layer2 },
        { n: "03", title: "Business truth", sub: "Does it move a metric that matters?", d: result.layer3 },
      ]
    : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        .v-wrap { font-family:'DM Sans',sans-serif; max-width:640px; margin:0 auto; }
        .v-head { background:#0c0c0c; border-radius:12px 12px 0 0; padding:28px 32px 22px; }
        .v-eyebrow { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.14em; text-transform:uppercase; color:#555; margin-bottom:10px; }
        .v-title { font-family:'Syne',sans-serif; font-size:26px; font-weight:700; color:#fff; line-height:1.15; margin-bottom:8px; }
        .v-desc { font-size:13px; color:#777; line-height:1.6; }
        .v-pills { display:flex; gap:6px; margin-top:16px; flex-wrap:wrap; }
        .v-pill { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.06em; padding:3px 10px; border-radius:20px; border:0.5px solid #2a2a2a; color:#555; }
        .v-body { background:var(--color-background-primary); border:0.5px solid var(--color-border-tertiary); border-top:none; border-radius:0 0 12px 12px; padding:28px 32px; }
        .v-lbl { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:var(--color-text-tertiary); display:block; margin-bottom:7px; }
        .v-input { width:100%; padding:10px 13px; border-radius:8px; border:0.5px solid var(--color-border-secondary); background:var(--color-background-primary); color:var(--color-text-primary); font-family:'DM Sans',sans-serif; font-size:13px; box-sizing:border-box; transition:border-color .15s; }
        .v-input:focus { outline:none; border-color:var(--color-border-primary); }
        .v-ta { width:100%; padding:10px 13px; border-radius:8px; border:0.5px solid var(--color-border-secondary); background:var(--color-background-primary); color:var(--color-text-primary); font-family:'DM Sans',sans-serif; font-size:13px; box-sizing:border-box; resize:vertical; line-height:1.6; transition:border-color .15s; }
        .v-ta:focus { outline:none; border-color:var(--color-border-primary); }
        .v-sel { width:100%; padding:10px 13px; border-radius:8px; border:0.5px solid var(--color-border-secondary); background:var(--color-background-primary); color:var(--color-text-primary); font-family:'DM Sans',sans-serif; font-size:13px; box-sizing:border-box; }
        .v-btn { width:100%; padding:13px; background:#0c0c0c; color:#fff; border:none; border-radius:8px; font-family:'Syne',sans-serif; font-size:13px; font-weight:700; letter-spacing:.05em; cursor:pointer; transition:opacity .15s; }
        .v-btn:hover { opacity:.85; }
        .v-btn:disabled { opacity:.35; cursor:default; }
        .v-ghost { width:100%; padding:11px; background:transparent; border:0.5px solid var(--color-border-secondary); border-radius:8px; font-family:'DM Sans',sans-serif; font-size:13px; color:var(--color-text-secondary); cursor:pointer; }
        .v-ghost:hover { background:var(--color-background-secondary); }
        .v-field { margin-bottom:18px; }
        .v-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:18px; }
        .v-err { font-size:12px; color:#dc2626; padding:10px 13px; background:#fef2f2; border-radius:7px; margin-bottom:14px; }
        .v-spin-wrap { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:64px 0; gap:14px; }
        .v-spin { width:28px; height:28px; border:2px solid var(--color-border-tertiary); border-top-color:#0c0c0c; border-radius:50%; animation:vspin .65s linear infinite; }
        @keyframes vspin { to { transform:rotate(360deg); } }
        .v-spin-lbl { font-size:13px; color:var(--color-text-tertiary); }
        .v-card { border:0.5px solid var(--color-border-tertiary); border-radius:10px; padding:20px 22px; margin-bottom:10px; }
        .v-overall-top { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:14px; }
        .v-verdict { font-family:'Syne',sans-serif; font-size:12px; font-weight:700; letter-spacing:.05em; padding:6px 14px; border-radius:20px; flex-shrink:0; }
        .v-score-big { font-family:'DM Mono',monospace; font-size:32px; font-weight:500; line-height:1; }
        .v-track { height:4px; background:var(--color-background-secondary); border-radius:2px; overflow:hidden; margin-bottom:0; }
        .v-fill { height:100%; border-radius:2px; transition:width 1s cubic-bezier(.22,1,.36,1); }
        .v-chip { font-size:10px; font-weight:500; padding:2px 8px; border-radius:20px; display:inline-block; margin-top:3px; }
        .v-layer-top { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:12px; }
        .v-layer-n { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.08em; color:var(--color-text-tertiary); margin-bottom:2px; }
        .v-layer-title { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; color:var(--color-text-primary); }
        .v-layer-sub { font-size:11px; color:var(--color-text-tertiary); }
        .v-risk { background:var(--color-background-secondary); border-radius:7px; padding:9px 12px; font-size:12px; color:var(--color-text-secondary); line-height:1.55; display:flex; gap:8px; margin-top:10px; }
        .v-divider { height:0.5px; background:var(--color-border-tertiary); margin:20px 0; }
        .v-next-title { font-family:'Syne',sans-serif; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--color-text-primary); margin-bottom:14px; }
        .v-step { display:flex; gap:12px; align-items:flex-start; margin-bottom:10px; }
        .v-step-n { width:22px; height:22px; min-width:22px; border-radius:50%; background:#0c0c0c; color:#fff; font-family:'DM Mono',monospace; font-size:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .v-fade { opacity:0; transform:translateY(6px); transition:opacity .45s, transform .45s; }
        .v-fade-in { opacity:1; transform:translateY(0); }
        .v-footer { margin-top:16px; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.05em; color:var(--color-text-tertiary); text-align:center; }
        .v-btns { display:flex; gap:8px; }
        .v-summary { font-size:13px; color:var(--color-text-secondary); line-height:1.65; }
        .v-feedback { font-size:13px; color:var(--color-text-secondary); line-height:1.65; margin-bottom:0; }
        .v-score-row { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:7px; }
        .v-score-lbl { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.06em; text-transform:uppercase; color:var(--color-text-tertiary); }
      `}</style>

      <div className="v-wrap">
        <div className="v-head">
          <div className="v-eyebrow">♟ AI Feature Validator</div>
          <div className="v-title">Is your AI feature<br />ready to build?</div>
          <div className="v-desc">Scored across 3 layers used by senior AI product leaders. No fluff — just an honest read on where your feature stands.</div>
          <div className="v-pills">
            <span className="v-pill">01 — Technical truth</span>
            <span className="v-pill">02 — Behavioral truth</span>
            <span className="v-pill">03 — Business truth</span>
          </div>
        </div>

        <div className="v-body">
          {view === "form" && (
            <div>
              <div className="v-field">
                <label className="v-lbl">Feature name</label>
                <input className="v-input" placeholder="e.g. AI-powered onboarding assistant" value={form.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div className="v-field">
                <label className="v-lbl">What does it do? <span style={{ textTransform: "none", fontFamily: "DM Sans, sans-serif", letterSpacing: 0 }}>Be specific about the AI behaviour.</span></label>
                <textarea className="v-ta" rows={3} placeholder="e.g. Analyses user behaviour during signup and dynamically adjusts the onboarding flow based on their role and stated goals" value={form.description} onChange={(e) => set("description", e.target.value)} />
              </div>
              <div className="v-field">
                <label className="v-lbl">What problem does it solve? <span style={{ textTransform: "none", fontFamily: "DM Sans, sans-serif", letterSpacing: 0 }}>From the user's perspective.</span></label>
                <textarea className="v-ta" rows={3} placeholder="e.g. New users take 3+ weeks to reach first value. 40% churn before they get there because onboarding is one-size-fits-all." value={form.problem} onChange={(e) => set("problem", e.target.value)} />
              </div>
              <div className="v-grid2">
                <div>
                  <label className="v-lbl">Target user</label>
                  <input className="v-input" placeholder="e.g. B2B SaaS sales managers" value={form.targetUser} onChange={(e) => set("targetUser", e.target.value)} />
                </div>
                <div>
                  <label className="v-lbl">Current stage</label>
                  <select className="v-sel" value={form.stage} onChange={(e) => set("stage", e.target.value)}>
                    <option value="idea">Idea only</option>
                    <option value="prototype">Prototype built</option>
                    <option value="beta">Beta / early users</option>
                    <option value="production">In production</option>
                  </select>
                </div>
              </div>
              <div className="v-field">
                <label className="v-lbl">Access to production-quality data?</label>
                <select className="v-sel" value={form.hasData} onChange={(e) => set("hasData", e.target.value)}>
                  <option value="yes">Yes — real user data available now</option>
                  <option value="partial">Partial — some real, some synthetic</option>
                  <option value="no">No — working from synthetic or assumed data</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              {err && <div className="v-err">{err}</div>}
              <button className="v-btn" onClick={submit}>Validate this feature →</button>
              <div className="v-footer" style={{ marginTop: 18 }}>Built by Lachezar Atanasov · lachezaratanasov.com</div>
            </div>
          )}

          {view === "loading" && (
            <div className="v-spin-wrap">
              <div className="v-spin" />
              <div className="v-spin-lbl">Analysing across 3 layers...</div>
            </div>
          )}

          {view === "result" && result && (
            <div>
              <div className="v-card">
                <div className="v-overall-top">
                  <div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 4 }}>Validating</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 700, color: "var(--color-text-primary)" }}>{form.name}</div>
                  </div>
                  <div className="v-verdict" style={{ ...verdictBg(result.overall.verdict) }}>{result.overall.verdict}</div>
                </div>
                <div className="v-score-row">
                  <span className="v-score-lbl">Overall score</span>
                  <span className="v-score-big" style={{ color: color(result.overall.score).accent }}>{result.overall.score}<span style={{ fontSize: 14, fontFamily: "'DM Sans',sans-serif", color: "var(--color-text-tertiary)", fontWeight: 400 }}>/100</span></span>
                </div>
                <div className="v-track" style={{ marginBottom: 14 }}>
                  <div className="v-fill" style={{ width: anim ? `${result.overall.score}%` : "0%", background: color(result.overall.score).accent }} />
                </div>
                <div className="v-summary">{result.overall.summary}</div>
              </div>

              {layers.map((l, i) => {
                const c = color(l.d.score);
                return (
                  <div key={l.n} className={`v-card v-fade ${anim ? "v-fade-in" : ""}`} style={{ transitionDelay: `${i * 0.1 + 0.1}s` }}>
                    <div className="v-layer-top">
                      <div>
                        <div className="v-layer-n">Layer {l.n}</div>
                        <div className="v-layer-title">{l.title}</div>
                        <div className="v-layer-sub">{l.sub}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div className="v-score-big" style={{ color: c.accent, fontSize: 28 }}>{l.d.score}</div>
                        <div className="v-chip" style={{ background: c.chip, color: c.text }}>{l.d.label}</div>
                      </div>
                    </div>
                    <div className="v-track" style={{ marginBottom: 12 }}>
                      <div className="v-fill" style={{ width: anim ? `${l.d.score}%` : "0%", background: c.accent, transitionDelay: `${i * 0.1 + 0.2}s` }} />
                    </div>
                    <div className="v-feedback">{l.d.feedback}</div>
                    <div className="v-risk">
                      <span style={{ color: "#d97706", flexShrink: 0, fontSize: 13, lineHeight: 1.4 }}>!</span>
                      <span><strong style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>Top risk: </strong>{l.d.topRisk}</span>
                    </div>
                  </div>
                );
              })}

              <div className="v-divider" />

              <div>
                <div className="v-next-title">Your next 3 moves</div>
                {result.nextSteps.map((s, i) => (
                  <div key={i} className="v-step">
                    <div className="v-step-n">{i + 1}</div>
                    <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, paddingTop: 1 }}>{s}</div>
                  </div>
                ))}
              </div>

              <div className="v-divider" />

              <div className="v-btns">
                <button className="v-ghost" onClick={reset}>Validate another feature</button>
                <button className="v-btn" style={{ flex: 1 }} onClick={() => sendPrompt("Write the LinkedIn post for Lachezar announcing the AI Feature Validator on GitHub — humble builder tone, explains what it does briefly, invites founders to use and star it, no self-promotion")}>Write the LinkedIn post ↗</button>
              </div>
              <div className="v-footer" style={{ marginTop: 16 }}>Built by Lachezar Atanasov · lachezaratanasov.com</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
