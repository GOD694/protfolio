import { useState, useEffect, useRef } from "react";

/* ─── Intersection Observer hook ────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Typewriter ─────────────────────────────────────── */
function Typewriter({ text, inView, delay = 0, speed = 30 }) {
  const [chars, setChars] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);
  useEffect(() => {
    if (!started) return;
    setChars("");
    let i = 0;
    const id = setInterval(() => {
      setChars(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [started, text, speed]);
  return (
    <span>
      {chars}
      {started && chars.length < text.length && (
        <span style={{
          display: "inline-block", width: "2px", height: "0.85em",
          background: "currentColor", verticalAlign: "middle",
          marginLeft: "3px", animation: "blink 1s step-end infinite"
        }} />
      )}
    </span>
  );
}

/* ─── Reveal on scroll ───────────────────────────────── */
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView(0.08);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0px)" : "translateY(36px)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── Theme tokens ───────────────────────────────────── */
const C = {
  bg: "#0e0b1a",
  section: "#130f24",
  footer: "#07050f",
  text: "#f5f0ff",
  muted: "rgba(245,240,255,0.42)",
  border: "rgba(245,240,255,0.08)",
  gold: "#c9a84c",
  goldLight: "#f0d080",
};

const CAT = {
  Frontend: { bg: "rgba(167,139,250,0.15)", text: "#c4b5fd", dot: "#8b5cf6" },
  Language: { bg: "rgba(201,168,76,0.15)", text: "#f0d080", dot: "#c9a84c" },
  Design: { bg: "rgba(244,114,182,0.12)", text: "#f9a8d4", dot: "#ec4899" },
  Backend: { bg: "rgba(52,211,153,0.12)", text: "#6ee7b7", dot: "#10b981" },
  "3D": { bg: "rgba(251,191,36,0.12)", text: "#fde68a", dot: "#f59e0b" },
  Creative: { bg: "rgba(251,113,133,0.12)", text: "#fda4af", dot: "#f43f5e" },
};

const SKILLS = [
  { name: "React / Next.js", pct: 87, cat: "Frontend" },
  { name: "TypeScript", pct: 73, cat: "Language" },
  { name: "UI / UX Design", pct: 79, cat: "Design" },
  { name: "Node.js / API", pct: 75, cat: "Backend" },
  { name: "Three.js / WebGL", pct: 56, cat: "3D" },
  { name: "Motion Design", pct: 71, cat: "Creative" },
];

const TAGS = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Figma", "PostgreSQL", "Three.js", "Framer Motion", "AWS", "GraphQL", "Docker"];
const STATS = [{ n: "1+", l: "Years exp." }, { n: "10+", l: "Projects shipped" }, { n: "100+", l: "Users reached" }, { n: "3×", l: "Startup advisor" }];
const TICKER = ["Design Systems", "React Expert", "TypeScript", "Motion Design", "Node.js", "UI Engineering", "Creative Dev", "Figma", "Product Thinking", "Open Source"];

/* ─── Shared container style ─────────────────────────── */
const container = {
  width: "100%",
  maxWidth: "1024px",
  margin: "0 auto",
  padding: "0 48px",   // 48px left & right padding — explicit, not Tailwind
  boxSizing: "border-box",
};

/* ════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [heroRef, heroInView] = useInView(0.05);
  const [skillsRef, skillsInView] = useInView(0.08);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const fn = (e) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.bg, overflowX: "hidden" }}>

      {/* ── Global styles ─────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0e0b1a; overflow-x: hidden; }

        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes drift1  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,-12px)} }
        @keyframes drift2  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-14px,10px)} }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes ping    {
          0%   { box-shadow: 0 0 0 0   rgba(201,168,76,.55); }
          70%  { box-shadow: 0 0 0 9px rgba(201,168,76,0);   }
          100% { box-shadow: 0 0 0 0   rgba(201,168,76,0);   }
        }

        .blob1 { animation: drift1 11s ease-in-out infinite; }
        .blob2 { animation: drift2 15s ease-in-out infinite; }
        .ring  { animation: spin   22s linear infinite;       }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 26s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        .pulse-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #c9a84c; flex-shrink: 0;
          animation: ping 2s ease infinite;
        }

        .nav-link {
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: .15em;
          text-transform: uppercase;
          color: rgba(245,240,255,.42);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          padding-bottom: 2px;
          transition: color .2s, border-color .2s;
        }
        .nav-link:hover { color: #f0d080; border-color: #c9a84c; }

        .hero-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 500;
          color: #f5f0ff; text-decoration: none;
          border-bottom: 1.5px solid rgba(245,240,255,.2);
          padding-bottom: 2px;
          transition: border-color .2s, color .2s, gap .2s;
          white-space: nowrap;
        }
        .hero-link:hover { border-color: #c9a84c; color: #f0d080; gap: 14px; }

        .skill-row {
          display: grid;
          grid-template-columns: 180px 90px 1fr 44px;
          align-items: center;
          gap: 20px;
          padding: 15px 14px;
          border-bottom: 1px solid rgba(245,240,255,.08);
          border-radius: 10px;
          transition: background .2s;
          cursor: default;
        }
        .skill-row:hover { background: rgba(201,168,76,.045); }

        .pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 9px; border-radius: 99px;
          font-size: 10px; font-weight: 500;
          letter-spacing: .04em;
          font-family: 'DM Mono', monospace;
          white-space: nowrap;
        }

        .bar-track {
          height: 4px;
          background: rgba(245,240,255,.08);
          border-radius: 99px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%; border-radius: 99px;
          background: linear-gradient(90deg, #c9a84c, #f0d080);
          transition: width 1.4s cubic-bezier(.16,1,.3,1);
        }

        .tag {
          display: inline-block;
          padding: 5px 13px; border-radius: 99px;
          font-size: 11px; font-family: 'DM Mono', monospace;
          border: 1.5px solid rgba(245,240,255,.12);
          color: rgba(245,240,255,.42);
          transition: all .2s; cursor: default;
        }
        .tag:hover { border-color: #c9a84c; color: #f0d080; background: rgba(201,168,76,.08); }

        .label {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: .25em;
          text-transform: uppercase;
          color: #c9a84c; opacity: .8;
        }

        .foot-link {
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(245,240,255,.42);
          text-decoration: none;
          transition: color .2s;
        }
        .foot-link:hover { color: #f0d080; }

        @media (max-width: 680px) {
          .skill-row { grid-template-columns: 1fr 80px 44px !important; }
          .pill-col  { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .container-pad { padding: 0 24px !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100vh", background: C.bg, overflow: "hidden" }}>

        {/* Ambient glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 55% 50% at 28% 40%, rgba(124,58,237,.17) 0%, transparent 65%), radial-gradient(ellipse 35% 35% at 78% 65%, rgba(201,168,76,.09) 0%, transparent 60%)"
        }} />

        {/* Dot grid with mouse parallax */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(201,168,76,.1) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          transform: `translate(${(mouse.x - .5) * 12}px, ${(mouse.y - .5) * 12}px)`,
          transition: "transform .3s ease",
        }} />

        {/* Drifting blobs */}
        <div className="blob1" style={{ position: "absolute", top: "18%", right: "14%", width: "110px", height: "110px", borderRadius: "50%", background: "radial-gradient(circle,#c9a84c,transparent 70%)", opacity: .25, filter: "blur(3px)", pointerEvents: "none" }} />
        <div className="blob2" style={{ position: "absolute", bottom: "26%", left: "8%", width: "85px", height: "85px", borderRadius: "50%", background: "radial-gradient(circle,#7c3aed,transparent 70%)", opacity: .28, filter: "blur(3px)", pointerEvents: "none" }} />

        {/* Spinning ring */}
        <div className="ring" style={{ position: "absolute", top: "4%", left: "50%", marginLeft: "-350px", width: "700px", height: "700px", borderRadius: "50%", border: "1px dashed rgba(201,168,76,.07)", pointerEvents: "none" }} />

        {/* ── NAV ── */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <div style={{ ...container, paddingTop: "28px", paddingBottom: "0" }} className="container-pad">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>



            </div>
          </div>
        </div>

        {/* ── HERO CONTENT ── */}
        <div ref={heroRef} style={{ ...container, position: "relative", zIndex: 10, paddingTop: "72px", paddingBottom: "40px" }} className="container-pad">

          {/* Label */}
          <div style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? "translateY(0)" : "translateY(18px)", transition: "all .65s ease" }}>
            <span className="label">Full-Stack Developer & Creative Technologist</span>
          </div>

          {/* Big name */}
          <div style={{ marginTop: "22px", marginBottom: "28px", opacity: heroInView ? 1 : 0, transform: heroInView ? "translateY(0)" : "translateY(50px)", transition: "all .95s cubic-bezier(.16,1,.3,1) .12s" }}>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(58px,9vw,118px)", lineHeight: .88, letterSpacing: "-0.04em", color: C.text, fontWeight: 900 }}>
              Arslan
            </h1>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(58px,9vw,118px)", lineHeight: .88, letterSpacing: "-0.04em", fontWeight: 900, WebkitTextStroke: `2.5px ${C.gold}`, WebkitTextFillColor: "transparent" }}>
              Anwarul
            </h1>
          </div>

          {/* Typewriter tagline */}
          <div style={{ maxWidth: "560px", marginBottom: "44px", opacity: heroInView ? 1 : 0, transition: "opacity .8s ease .5s" }}>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: C.muted, fontFamily: "'DM Sans',sans-serif" }}>
              <Typewriter
                text="I craft digital experiences where engineering meets design — obsessively refined, ruthlessly functional."
                inView={heroInView}
                delay={700}
                speed={26}
              />
            </p>
          </div>

          {/* CTA row */}
          <div style={{
            display: "flex", flexWrap: "wrap", alignItems: "center", gap: "28px",
            opacity: heroInView ? 1 : 0, transform: heroInView ? "translateY(0)" : "translateY(16px)",
            transition: "all .8s ease .9s"
          }}>
            <a href="mailto:arslananwarul1@gmail.com" className="hero-link">Say hello <span>→</span></a>
            <a href="#" className="hero-link">Download CV <span>↓</span></a>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginLeft: "8px" }}>
            {[
  { name: "LinkedIn", link: "https://www.linkedin.com/in/arslan-anwarul-3603a5296/" },
  { name: "GitHub", link: "https://github.com/GOD694" },
  { name: "LeetCode", link: "https://leetcode.com/u/Arslan-160/" }
].map((item) => (
  <a
    key={item.name}
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="nav-link"
  >
    {item.name}
  </a>
))}
            </div>
          </div>
        </div>

        {/* ── TICKER / MARQUEE ── */}
        <div style={{ marginTop: "clamp(36px,7vh,72px)", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "13px 0", overflow: "hidden", position: "relative", zIndex: 10 }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, r) => (
              <div key={r} style={{ display: "flex", alignItems: "center", gap: "32px", paddingRight: "32px" }}>
                {TICKER.map((t, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "'DM Mono',monospace", fontSize: "12px", color: "rgba(201,168,76,.45)", whiteSpace: "nowrap" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: C.gold, opacity: .5, display: "inline-block", flexShrink: 0 }} />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════
          SKILLS SECTION
      ══════════════════════════════════════════════════ */}
      <section id="skills" style={{ background: C.section, borderTop: `1px solid ${C.border}`, paddingTop: "80px", paddingBottom: "88px" }}>
        <div style={container} className="container-pad">

          {/* Section header */}
          <Reveal style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
              <div>
                <span className="label" style={{ display: "block", marginBottom: "12px" }}>Expertise</span>
                <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(36px,5vw,54px)", fontWeight: 700, lineHeight: 1.05, color: C.text }}>
                  What I do
                  <br />
                  <em style={{ fontStyle: "italic", fontWeight: 300, color: C.muted }}>best.</em>
                </h2>
              </div>
              <p style={{ fontSize: "14px", maxWidth: "260px", lineHeight: 1.75, color: C.muted }}>
                1+ years honing a craft across startups, scale-ups, and solo builds.
              </p>
            </div>
          </Reveal>

          {/* Skill rows */}
          <div ref={skillsRef}>
            {SKILLS.map(({ name, pct, cat }, i) => {
              const col = CAT[cat];
              return (
                <Reveal key={name} delay={i * 65}>
                  <div className="skill-row">
                    <span style={{ fontSize: "14px", fontWeight: 500, color: C.text, fontFamily: "'DM Sans',sans-serif" }}>{name}</span>
                    <div className="pill pill-col" style={{ background: col.bg, color: col.text }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: col.dot, flexShrink: 0, display: "inline-block" }} />
                      {cat}
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: skillsInView ? `${pct}%` : "0%", transitionDelay: `${i * 85}ms` }} />
                    </div>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: C.muted, textAlign: "right" }}>{pct}%</span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Tech stack pills */}
          <Reveal delay={280} style={{ marginTop: "48px" }}>
            <span className="label" style={{ display: "block", marginBottom: "16px" }}>Tech Stack</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {TAGS.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </Reveal>

          {/* Stats grid */}
          <Reveal delay={360}>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "28px", marginTop: "56px", paddingTop: "36px", borderTop: `1px solid ${C.border}` }}>
              {STATS.map(({ n, l }) => (
                <div key={n}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: C.gold }}>{n}</div>
                  <div className="label" style={{ marginTop: "6px" }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer id="contact" style={{ background: C.footer, borderTop: `1px solid rgba(201,168,76,.2)`, paddingTop: "64px", paddingBottom: "48px" }}>
        <div style={container} className="container-pad">

          {/* CTA block */}
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "36px", paddingBottom: "40px", borderBottom: "1px solid rgba(245,240,255,.1)" }}>

              <div>
                <span style={{ fontFamily: "'DM Mono',monospace", display: "block", fontSize: "11px", letterSpacing: ".25em", textTransform: "uppercase", color: C.gold, marginBottom: "18px" }}>
                  Get in touch
                </span>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(38px,5.5vw,66px)", fontWeight: 700, lineHeight: .92, color: "#f5f0ff" }}>
                  Let's work
                </div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(38px,5.5vw,66px)", fontStyle: "italic", fontWeight: 300, lineHeight: .92, color: "rgba(245,240,255,.45)", marginTop: "4px" }}>
                  together.
                </div>
              </div>

              <a
                href="mailto:arslananwarul1@gmail.com"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  padding: "14px 30px", borderRadius: "99px",
                  background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                  color: "#0e0b1a", fontSize: "14px", fontWeight: 700,
                  fontFamily: "'DM Sans',sans-serif",
                  letterSpacing: ".02em", textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(201,168,76,.3)",
                  transition: "transform .2s, box-shadow .2s",
                  whiteSpace: "nowrap", alignSelf: "flex-end",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(201,168,76,.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(201,168,76,.3)"; }}
              >
                arslananwarul1@gmail.com →
              </a>

            </div>
          </Reveal>

          {/* Bottom bar */}
          <Reveal delay={100}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px", paddingTop: "28px" }}>

              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontFamily: "'Fraunces',serif", fontSize: "20px", fontWeight: 700, color: "#f5f0ff" }}>
                  Arslan<span style={{ color: C.gold }}>.</span>
                </span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: ".1em", color: "rgba(245,240,255,.3)" }}>© 2026</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                {[
                  { name: "LeetCode", link: "https://leetcode.com/u/Arslan-160/" },
                  { name: "GitHub", link: "https://github.com/GOD694" },
                  { name: "LinkedIn", link: "https://www.linkedin.com/in/arslan-anwarul-3603a5296/" },
                  { name: "Dribbble", link: "https://dribbble.com/yourusername" }
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="foot-link"
                  >
                    {s.name}
                  </a>
                ))}
              </div>

              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: ".08em", color: "rgba(245,240,255,.25)" }}>
                React + Tailwind ✦
              </span>

            </div>
          </Reveal>

        </div>
      </footer>

    </div>
  );
}