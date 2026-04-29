import { useState, useEffect, useRef } from "react";

/* ─── Intersection Observer ──────────────────────────── */
function useInView(threshold = 0.08) {
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

/* ─── Reveal ─────────────────────────────────────────── */
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(36px)",
      transition: `opacity 0.85s ease ${delay}ms, transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── Theme ──────────────────────────────────────────── */
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

const container = {
  width: "100%", maxWidth: "1024px",
  margin: "0 auto", padding: "0 48px",
  boxSizing: "border-box",
};

/* ─── Data ───────────────────────────────────────────── */
const EDUCATION = [
  {
    year: "2022 — 2026",
    degree: "B.Tech in Computer Science",
    school: "RR Institute of Modern Technology",
    grade: "CGPA 7.7 / 10",
    desc: "Focused on data structures, algorithms, web development, and software engineering. Active member of the coding club and open-source community.",
    tag: "Undergraduate",
    tagClr: "rgba(167,139,250,0.15)",
    tagTxt: "#c4b5fd",
  },
  {
    year: "2019 — 2021",
    degree: "Higher Secondary (PCM + CS)",
    school: "Preston international School",
    grade: "74.4%",
    tag: "Class XII",
    tagClr: "rgba(201,168,76,0.15)",
    tagTxt: "#f0d080",
  },
];

const PROJECTS = [
  {
    icon: "⬡",
    title: "DevConnect",
    tech: ["React", "Node.js", "MongoDB"],
    desc: "A social platform for developers to share projects, find collaborators, and discuss tech. Built real-time chat with Socket.io. 200+ beta users.",
    link: "#",
    clr: "#8b5cf6",
  },
  {
    icon: "◎",
    title: "ShopEase",
    tech: ["Next.js", "Tailwind", "Stripe"],
    desc: "Full-stack e-commerce app with cart, wishlist, payment gateway, and admin dashboard. Deployed on Vercel with PostgreSQL backend.",
    link: "#",
    clr: "#0ea5e9",
  },
  {
    icon: "◈",
    title: "AI Study Buddy",
    tech: ["Python", "OpenAI API", "Flask"],
    desc: "An AI-powered study assistant that summarises notes, generates MCQs, and answers subject-specific questions using GPT-4.",
    link: "#",
    clr: "#10b981",
  },
  {
    icon: "✦",
    title: "Portfolio Website",
    tech: ["React", "Framer Motion", "CSS"],
    desc: "This very portfolio — scroll-driven animations, typewriter effects, and a custom design system. Scored 98 on Lighthouse performance.",
    link: "#",
    clr: "#c9a84c",
  },
];

const CERTS = [
  { title: "Meta Front-End Developer", issuer: "Coursera / Meta", year: "2024", clr: "#6366f1" },
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024", clr: "#f59e0b" },
  { title: "CS50x — Intro to CS", issuer: "Harvard / edX", year: "2023", clr: "#ef4444" },
  { title: "JavaScript Algorithms & DS", issuer: "freeCodeCamp", year: "2023", clr: "#10b981" },
];

const SOFT_SKILLS = [
  { icon: "💬", label: "Communication" },
  { icon: "🧩", label: "Problem Solving" },
  { icon: "🤝", label: "Team Player" },
  { icon: "⏱", label: "Time Management" },
  { icon: "📖", label: "Quick Learner" },
  { icon: "🎯", label: "Goal-Oriented" },
];

const SOCIAL_LINKS = {
  GitHub: "https://github.com/GOD694",
  LinkedIn: "https://linkedin.com/in/your-username",
  Twitter: "https://twitter.com/your-username",
  LeetCode: "https://leetcode.com/your-username",
};

/* ════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [headerRef, headerInView] = useInView(0.05);

  useEffect(() => {
    const fn = (e) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: C.bg, overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
        html { scroll-behavior: smooth; }
        body { background: #0e0b1a; overflow-x: hidden; }

        @keyframes drift1  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(16px,-12px)} }
        @keyframes drift2  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-12px,10px)} }
        @keyframes ping    { 0%{box-shadow:0 0 0 0 rgba(201,168,76,.55)} 70%{box-shadow:0 0 0 9px rgba(201,168,76,0)} 100%{box-shadow:0 0 0 0 rgba(201,168,76,0)} }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

        .blob1 { animation: drift1 11s ease-in-out infinite; }
        .blob2 { animation: drift2 15s ease-in-out infinite; }
        .ring  { animation: spin 24s linear infinite; }

        .pulse-dot {
          width:8px; height:8px; border-radius:50%;
          background:#c9a84c; flex-shrink:0;
          animation: ping 2s ease infinite;
        }

        .label {
          font-family:'DM Mono',monospace; font-size:10px;
          letter-spacing:.25em; text-transform:uppercase;
          color:#c9a84c; opacity:.8;
        }

        .nav-link {
          font-family:'DM Mono',monospace; font-size:11px;
          letter-spacing:.15em; text-transform:uppercase;
          color:rgba(245,240,255,.42); text-decoration:none;
          border-bottom:1px solid transparent; padding-bottom:2px;
          transition:color .2s, border-color .2s;
        }
        .nav-link:hover  { color:#f0d080; border-color:#c9a84c; }
        .nav-link.active { color:#f0d080; border-color:#c9a84c; }

        /* Education card */
        .edu-card {
          display:grid; grid-template-columns:130px 1fr;
          gap:24px; padding:28px 24px; border-radius:14px;
          border:1px solid rgba(245,240,255,.07);
          background:rgba(255,255,255,.025);
          transition:border-color .25s, background .25s, transform .25s;
        }
        .edu-card:hover {
          border-color:rgba(201,168,76,.28);
          background:rgba(201,168,76,.04);
          transform:translateX(4px);
        }

        /* Project card */
        .proj-card {
          padding:28px 24px; border-radius:14px;
          border:1px solid rgba(245,240,255,.07);
          background:rgba(255,255,255,.025);
          transition:border-color .3s, background .3s, transform .3s;
          display:flex; flex-direction:column; gap:14px;
        }
        .proj-card:hover {
          border-color:rgba(201,168,76,.25);
          background:rgba(201,168,76,.04);
          transform:translateY(-5px);
        }

        /* Cert card */
        .cert-card {
          display:flex; align-items:center; gap:16px;
          padding:18px 20px; border-radius:12px;
          border:1px solid rgba(245,240,255,.07);
          background:rgba(255,255,255,.02);
          transition:border-color .2s, background .2s;
        }
        .cert-card:hover {
          border-color:rgba(201,168,76,.22);
          background:rgba(201,168,76,.03);
        }

        /* Soft skill pill */
        .soft-pill {
          display:inline-flex; align-items:center; gap:8px;
          padding:10px 18px; border-radius:99px;
          border:1.5px solid rgba(245,240,255,.1);
          color:rgba(245,240,255,.55); font-size:13px;
          transition:all .2s; cursor:default;
        }
        .soft-pill:hover {
          border-color:#c9a84c; color:#f0d080;
          background:rgba(201,168,76,.07);
        }

        .tech-badge {
          display:inline-block; padding:3px 10px; border-radius:99px;
          font-size:10px; font-family:'DM Mono',monospace;
          letter-spacing:.04em;
          border:1px solid rgba(245,240,255,.12);
          color:rgba(245,240,255,.45);
          transition:all .2s;
        }
        .tech-badge:hover { border-color:#c9a84c; color:#f0d080; }

        .foot-link {
          font-family:'DM Mono',monospace; font-size:11px;
          letter-spacing:.12em; text-transform:uppercase;
          color:rgba(245,240,255,.42); text-decoration:none;
          transition:color .2s;
        }
        .foot-link:hover { color:#f0d080; }

        @media (max-width:680px) {
          .edu-card      { grid-template-columns:1fr !important; gap:12px !important; }
          .proj-grid     { grid-template-columns:1fr !important; }
          .cert-grid     { grid-template-columns:1fr !important; }
          .container-pad { padding:0 24px !important; }
          .hero-grid     { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────── */}
   

      {/* ── HERO ────────────────────────────────────────── */}
      <section style={{ position: "relative", background: C.bg, paddingTop: "80px", paddingBottom: "80px", overflow: "hidden" }}>

        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 55% 50% at 25% 45%, rgba(124,58,237,.15) 0%, transparent 65%), radial-gradient(ellipse 35% 40% at 80% 60%, rgba(201,168,76,.08) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(circle, rgba(201,168,76,.09) 1px, transparent 1px)", backgroundSize: "38px 38px", transform: `translate(${(mouse.x - .5) * 10}px,${(mouse.y - .5) * 10}px)`, transition: "transform .3s ease" }} />
        <div className="blob1" style={{ position: "absolute", top: "15%", right: "12%", width: "100px", height: "100px", borderRadius: "50%", background: "radial-gradient(circle,#c9a84c,transparent 70%)", opacity: .22, filter: "blur(3px)", pointerEvents: "none" }} />
        <div className="blob2" style={{ position: "absolute", bottom: "20%", left: "6%", width: "80px", height: "80px", borderRadius: "50%", background: "radial-gradient(circle,#7c3aed,transparent 70%)", opacity: .25, filter: "blur(3px)", pointerEvents: "none" }} />

        <div ref={headerRef} style={{ ...container, position: "relative", zIndex: 10 }} className="container-pad">

          <div style={{ opacity: headerInView ? 1 : 0, transform: headerInView ? "none" : "translateY(18px)", transition: "all .65s ease", marginBottom: "20px" }}>
            <span className="label">About me</span>
          </div>

          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "56px", alignItems: "center", opacity: headerInView ? 1 : 0, transform: headerInView ? "none" : "translateY(40px)", transition: "all .9s cubic-bezier(.16,1,.3,1) .1s" }}>

            {/* Left text */}
            <div>
              <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(42px,7vw,84px)", fontWeight: 900, lineHeight: .9, letterSpacing: "-0.03em", color: C.text, marginBottom: "28px" }}>
                Hi, I'm<br />
                <span style={{ WebkitTextStroke: `2.5px ${C.gold}`, WebkitTextFillColor: "transparent" }}>Arslan Anwarul</span>
              </h1>

              {/* Fresher badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 16px", borderRadius: "99px", background: "rgba(201,168,76,.12)", border: `1px solid rgba(201,168,76,.3)`, marginBottom: "24px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.gold, animation: "ping 2s ease infinite", display: "inline-block" }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: C.goldLight, letterSpacing: ".1em", textTransform: "uppercase" }}>
                  2026 Graduate · Actively seeking roles
                </span>
              </div>

              <p style={{ fontSize: "16px", lineHeight: 1.8, color: C.muted, maxWidth: "500px", marginBottom: "16px" }}>
                A passionate <span style={{ color: C.text, fontWeight: 600 }}>Computer Science graduate</span> with a strong foundation in full-stack development, a love for clean UI, and a hunger to build things that matter.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: C.muted, maxWidth: "500px", marginBottom: "36px" }}>
                I've spent the last 2 years building personal projects, contributing to open source, and sharpening my skills in <span style={{ color: C.goldLight, fontWeight: 600 }}>React, Node.js</span> and <span style={{ color: C.goldLight, fontWeight: 600 }}>TypeScript</span>. Ready for my first professional role.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a href="mailto:arslananwarul1@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 26px", borderRadius: "99px", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: "#0e0b1a", fontSize: "14px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif", textDecoration: "none", boxShadow: "0 6px 22px rgba(201,168,76,.3)", transition: "transform .2s, box-shadow .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(201,168,76,.45)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(201,168,76,.3)"; }}>
                  Hire me →
                </a>
                <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 26px", borderRadius: "99px", border: `1.5px solid rgba(245,240,255,.15)`, color: C.muted, fontSize: "14px", fontFamily: "'DM Sans',sans-serif", textDecoration: "none", transition: "border-color .2s, color .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.goldLight; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,240,255,.15)"; e.currentTarget.style.color = C.muted; }}>
                  ↓ Resume
                </a>
              </div>
            </div>

            {/* Right — avatar card */}
            <div style={{ position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "3/4", borderRadius: "20px", background: "linear-gradient(145deg, #1e1640, #130f24)", border: `1px solid rgba(245,240,255,.1)`, overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: "90px", userSelect: "none" }}>🧑‍🎓</div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,11,26,.85) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: "18px", left: "18px", right: "18px" }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: "17px", color: C.text }}>Arslan Anwarul</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: C.muted, letterSpacing: ".06em", marginTop: "3px" }}>CS Graduate · Class of 2026</div>
                </div>
                <div style={{ position: "absolute", top: 0, left: "20px", right: "20px", height: "2px", background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
              </div>

              {/* Floating badges */}
              <div style={{ position: "absolute", top: "14px", right: "-14px", padding: "9px 14px", borderRadius: "12px", background: "rgba(14,11,26,.92)", border: `1px solid rgba(201,168,76,.3)`, backdropFilter: "blur(8px)" }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: "20px", color: C.gold }}>4+</div>
                <div className="label" style={{ marginTop: "2px", fontSize: "9px" }}>Projects</div>
              </div>
              <div style={{ position: "absolute", bottom: "22px", left: "-14px", padding: "9px 14px", borderRadius: "12px", background: "rgba(14,11,26,.92)", border: `1px solid rgba(167,139,250,.3)`, backdropFilter: "blur(8px)" }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: "20px", color: "#c4b5fd" }}>7.7</div>
                <div className="label" style={{ marginTop: "2px", fontSize: "9px", color: "#a78bfa", opacity: 1 }}>CGPA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ───────────────────────────────────── */}
      <section style={{ background: C.section, borderTop: `1px solid ${C.border}`, paddingTop: "76px", paddingBottom: "76px" }}>
        <div style={container} className="container-pad">

          <Reveal style={{ marginBottom: "44px" }}>
            <span className="label" style={{ display: "block", marginBottom: "12px" }}>Education</span>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(32px,5vw,50px)", fontWeight: 700, lineHeight: 1.05, color: C.text }}>
              My academic<br />
              <em style={{ fontStyle: "italic", fontWeight: 300, color: C.muted }}>journey.</em>
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {EDUCATION.map((e, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="edu-card">
                  <div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: C.gold, letterSpacing: ".06em", marginBottom: "10px" }}>{e.year}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "3px 9px", borderRadius: "99px", background: e.tagClr, color: e.tagTxt, fontSize: "10px", fontFamily: "'DM Mono',monospace", letterSpacing: ".04em", marginBottom: "8px" }}>{e.tag}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: C.gold, opacity: .7, marginTop: "6px" }}>{e.grade}</div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: "19px", color: C.text }}>{e.degree}</span>
                    </div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "12px", color: C.gold, marginBottom: "10px", letterSpacing: ".04em" }}>@ {e.school}</div>
                    <p style={{ fontSize: "14px", lineHeight: 1.75, color: C.muted }}>{e.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────── */}
      <section style={{ background: C.bg, borderTop: `1px solid ${C.border}`, paddingTop: "76px", paddingBottom: "76px" }}>
        <div style={container} className="container-pad">

          <Reveal style={{ marginBottom: "44px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span className="label" style={{ display: "block", marginBottom: "12px" }}>Projects</span>
                <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(32px,5vw,50px)", fontWeight: 700, lineHeight: 1.05, color: C.text }}>
                  Things I've<br />
                  <em style={{ fontStyle: "italic", fontWeight: 300, color: C.muted }}>built.</em>
                </h2>
              </div>
              <a href="https://github.com/GOD694" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: ".12em", textTransform: "uppercase", color: C.muted, textDecoration: "none", borderBottom: `1px solid rgba(245,240,255,.2)`, paddingBottom: "2px", transition: "color .2s, border-color .2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = C.goldLight; e.currentTarget.style.borderColor = C.gold; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = "rgba(245,240,255,.2)"; }}>
                View all on GitHub →
              </a>
            </div>
          </Reveal>

          <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "16px" }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="proj-card">
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "28px", lineHeight: 1 }}>{p.icon}</span>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: C.muted, textDecoration: "none", border: `1px solid rgba(245,240,255,.12)`, padding: "4px 10px", borderRadius: "99px", transition: "all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.goldLight; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,240,255,.12)"; e.currentTarget.style.color = C.muted; }}>
                      View ↗
                    </a>
                  </div>

                  {/* Title */}
                  <div>
                    <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: "20px", color: C.text, marginBottom: "8px" }}>{p.title}</div>
                    <p style={{ fontSize: "13px", lineHeight: 1.75, color: C.muted }}>{p.desc}</p>
                  </div>

                  {/* Tech badges */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
                    {p.tech.map(t => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>

                  {/* Color accent bar */}
                  <div style={{ height: "2px", borderRadius: "99px", background: `linear-gradient(90deg, ${p.clr}, transparent)`, marginTop: "4px" }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ──────────────────────────────── */}
      <section style={{ background: C.section, borderTop: `1px solid ${C.border}`, paddingTop: "76px", paddingBottom: "76px" }}>
        <div style={container} className="container-pad">

          <Reveal style={{ marginBottom: "44px" }}>
            <span className="label" style={{ display: "block", marginBottom: "12px" }}>Certifications</span>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(32px,5vw,50px)", fontWeight: 700, lineHeight: 1.05, color: C.text }}>
              I keep<br />
              <em style={{ fontStyle: "italic", fontWeight: 300, color: C.muted }}>learning.</em>
            </h2>
          </Reveal>

          <div className="cert-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "12px" }}>
            {CERTS.map((cert, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="cert-card">
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: `${cert.clr}22`, border: `1px solid ${cert.clr}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: cert.clr, fontSize: "18px" }}>✦</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: C.text, marginBottom: "3px" }}>{cert.title}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: C.muted, letterSpacing: ".04em" }}>{cert.issuer} · {cert.year}</div>
                  </div>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: cert.clr, flexShrink: 0, opacity: .7 }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOFT SKILLS ─────────────────────────────────── */}
      <section style={{ background: C.bg, borderTop: `1px solid ${C.border}`, paddingTop: "76px", paddingBottom: "76px" }}>
        <div style={container} className="container-pad">

          <Reveal style={{ marginBottom: "44px" }}>
            <span className="label" style={{ display: "block", marginBottom: "12px" }}>Beyond code</span>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(32px,5vw,50px)", fontWeight: 700, lineHeight: 1.05, color: C.text }}>
              Soft skills &<br />
              <em style={{ fontStyle: "italic", fontWeight: 300, color: C.muted }}>values.</em>
            </h2>
          </Reveal>

          <Reveal delay={100} style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {SOFT_SKILLS.map(({ icon, label }) => (
                <div key={label} className="soft-pill">
                  <span style={{ fontSize: "18px" }}>{icon}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Fresher quote */}
          <Reveal delay={180}>
            <div style={{ padding: "32px 36px", borderRadius: "18px", background: "rgba(201,168,76,.06)", border: `1px solid rgba(201,168,76,.2)`, borderLeft: `4px solid ${C.gold}` }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(17px,2.2vw,22px)", fontStyle: "italic", fontWeight: 300, color: C.text, lineHeight: 1.65, marginBottom: "18px" }}>
                "I may not have years of industry experience — but I bring curiosity, dedication, and the drive to grow faster than anyone expects."
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🧑‍🎓</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "14px", color: C.text }}>Alex Rivera</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: C.muted, letterSpacing: ".05em" }}>CS Graduate · Class of 2026</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer id="contact" style={{ background: C.footer, borderTop: `1px solid rgba(201,168,76,.2)`, paddingTop: "64px", paddingBottom: "48px" }}>
        <div style={container} className="container-pad">

          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "32px", paddingBottom: "36px", borderBottom: "1px solid rgba(245,240,255,.1)" }}>
              <div>
                <span style={{ fontFamily: "'DM Mono',monospace", display: "block", fontSize: "11px", letterSpacing: ".25em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>Get in touch</span>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(34px,5vw,60px)", fontWeight: 700, lineHeight: .92, color: "#f5f0ff" }}>Let's work</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(34px,5vw,60px)", fontStyle: "italic", fontWeight: 300, lineHeight: .92, color: "rgba(245,240,255,.45)", marginTop: "4px" }}>together.</div>
              </div>
              <a href="mailto:arslananwarul1@gmail.com"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", borderRadius: "99px", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: "#0e0b1a", fontSize: "14px", fontWeight: 700, fontFamily: "'DM Sans',sans-serif", textDecoration: "none", boxShadow: "0 8px 24px rgba(201,168,76,.3)", transition: "transform .2s, box-shadow .2s", whiteSpace: "nowrap", alignSelf: "flex-end" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(201,168,76,.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(201,168,76,.3)"; }}>
                arslananwarul1@gmail.com →
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px", paddingTop: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontFamily: "'Fraunces',serif", fontSize: "20px", fontWeight: 700, color: "#f5f0ff" }}>Arslan<span style={{ color: C.gold }}>.</span></span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: ".1em", color: "rgba(245,240,255,.3)" }}>© 2026</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="foot-link">{name}</a>
                ))}
              </div>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "rgba(245,240,255,.25)" }}>React + Tailwind ✦</span>
            </div>
          </Reveal>

        </div>
      </footer>

    </div>
  );
}