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
      opacity:    inView ? 1 : 0,
      transform:  inView ? "none" : "translateY(32px)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── Theme ──────────────────────────────────────────── */
const C = {
  bg:        "#0e0b1a",
  section:   "#130f24",
  footer:    "#07050f",
  text:      "#f5f0ff",
  muted:     "rgba(245,240,255,0.42)",
  border:    "rgba(245,240,255,0.08)",
  gold:      "#c9a84c",
  goldLight: "#f0d080",
};

const container = {
  width: "100%", maxWidth: "1024px",
  margin: "0 auto", padding: "0 48px",
  boxSizing: "border-box",
};

/* ─── 4 Full-Stack Projects ──────────────────────────── */
const PROJECTS = [
  {
    id:    1,
    title: "DevConnect",
    icon:  "⬡",
    clr:   "#8b5cf6",
    year:  "2024",
    tech:  ["React", "Node.js", "MongoDB", "Socket.io", "Firebase"],
    desc:  "A social platform for developers to share projects, find collaborators, and discuss tech in real time. Built real-time chat with Socket.io and push notifications with Firebase. Scaled to 200+ beta users in the first week.",
    live:  "#",
    repo:  "#",
    stat:  { n:"200+", l:"Beta users" },
    highlights: ["Real-time chat via Socket.io", "JWT auth + OAuth (GitHub)", "RESTful API with Express", "MongoDB Atlas cloud DB"],
  },
  {
    id:    2,
    title: "ShopEase",
    icon:  "◎",
    clr:   "#0ea5e9",
    year:  "2024",
    tech:  ["Next.js", "Tailwind CSS", "Stripe", "PostgreSQL", "Prisma"],
    desc:  "Full-stack e-commerce platform with product listings, cart, wishlist, and Stripe checkout. Includes a full admin dashboard to manage orders, inventory, and customers. Handles 1 000+ daily transactions.",
    live:  "#",
    repo:  "#",
    stat:  { n:"1K+", l:"Daily txns" },
    highlights: ["Stripe payment integration", "Admin dashboard with analytics", "SSR + ISR with Next.js", "Prisma ORM + PostgreSQL"],
  },
  {
    id:    3,
    title: "TaskFlow",
    icon:  "✦",
    clr:   "#c9a84c",
    year:  "2024",
    tech:  ["React", "TypeScript", "Supabase", "Zustand", "Recharts"],
    desc:  "Kanban-style project management tool with drag-and-drop boards, team collaboration, real-time sync, and a built-in analytics dashboard. Inspired by Linear. Built end-to-end solo in 3 weeks.",
    live:  "#",
    repo:  "#",
    stat:  { n:"3 wks", l:"Solo build" },
    highlights: ["Drag-and-drop (dnd-kit)", "Real-time sync via Supabase", "Role-based access control", "Interactive Recharts dashboard"],
  },
  {
    id:    4,
    title: "AI Study Buddy",
    icon:  "◈",
    clr:   "#10b981",
    year:  "2023",
    tech:  ["React", "Flask", "OpenAI API", "PostgreSQL", "Docker"],
    desc:  "AI-powered study assistant that summarises uploaded notes, auto-generates MCQs, and answers subject-specific questions using GPT-4. Used by 500+ students across 3 universities.",
    live:  "#",
    repo:  "#",
    stat:  { n:"500+", l:"Students" },
    highlights: ["GPT-4 note summarisation", "Auto MCQ generation", "Dockerised deployment", "Flask REST API backend"],
  },
];

const SOCIAL_LINKS = {
  GitHub:   "https://github.com/GOD694",
  LinkedIn: "https://www.linkedin.com/in/arslan-anwarul-3603a5296/",
  Twitter:  "https://twitter.com/your-username",
  leetcode: "https://leetcode.com/u/Arslan-160/",
};

/* ════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════ */
export default function ProjectsPage() {
  const [mouse, setMouse]         = useState({ x:0.5, y:0.5 });
  const [headerRef, headerInView] = useInView(0.05);

  useEffect(() => {
    const fn = (e) => setMouse({ x: e.clientX/window.innerWidth, y: e.clientY/window.innerHeight });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background: C.bg, overflowX:"hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:#0e0b1a; overflow-x:hidden; }

        @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(16px,-12px)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-12px,10px)} }
        @keyframes ping   { 0%{box-shadow:0 0 0 0 rgba(201,168,76,.55)} 70%{box-shadow:0 0 0 9px rgba(201,168,76,0)} 100%{box-shadow:0 0 0 0 rgba(201,168,76,0)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        @keyframes glow   { 0%,100%{opacity:.7} 50%{opacity:1} }

        .blob1 { animation:drift1 11s ease-in-out infinite; }
        .blob2 { animation:drift2 15s ease-in-out infinite; }
        .ring  { animation:spin 24s linear infinite; }

        .pulse-dot {
          width:8px; height:8px; border-radius:50%;
          background:#c9a84c; flex-shrink:0;
          animation:ping 2s ease infinite;
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

        /* ── Project card ── */
        .proj-card {
          border-radius:20px;
          border:1px solid rgba(245,240,255,.07);
          background:rgba(255,255,255,.028);
          overflow:hidden;
          transition:transform .35s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s;
        }
        .proj-card:hover {
          transform:translateY(-8px);
          box-shadow:0 28px 64px rgba(0,0,0,.45);
        }

        /* Banner */
        .card-banner {
          height:160px;
          position:relative;
          display:flex; align-items:center; justify-content:center;
          overflow:hidden;
        }
        .card-banner-icon {
          font-size:64px; line-height:1; user-select:none;
          transition:transform .4s cubic-bezier(.16,1,.3,1), filter .4s;
          animation:glow 3s ease-in-out infinite;
        }
        .proj-card:hover .card-banner-icon {
          transform:scale(1.15);
        }

        /* Highlight tick */
        .tick-item {
          display:flex; align-items:flex-start; gap:10px;
          font-size:13px; line-height:1.6;
          color:rgba(245,240,255,.45);
        }

        /* Tech tag */
        .tech-tag {
          display:inline-block; padding:3px 10px; border-radius:99px;
          font-size:10px; font-family:'DM Mono',monospace;
          border:1px solid rgba(245,240,255,.1);
          color:rgba(245,240,255,.4);
          transition:all .2s;
        }
        .tech-tag:hover { border-color:#c9a84c; color:#f0d080; }

        /* Link buttons */
        .btn-ghost {
          display:inline-flex; align-items:center; gap:6px;
          padding:8px 16px; border-radius:99px;
          font-family:'DM Mono',monospace; font-size:11px;
          letter-spacing:.08em; text-transform:uppercase;
          border:1.5px solid rgba(245,240,255,.12);
          color:rgba(245,240,255,.5); text-decoration:none;
          transition:all .2s;
        }
        .btn-ghost:hover {
          border-color:#c9a84c; color:#f0d080;
          background:rgba(201,168,76,.08);
        }

        .foot-link {
          font-family:'DM Mono',monospace; font-size:11px;
          letter-spacing:.12em; text-transform:uppercase;
          color:rgba(245,240,255,.42); text-decoration:none;
          transition:color .2s;
        }
        .foot-link:hover { color:#f0d080; }

        @media (max-width:680px) {
          .container-pad { padding:0 22px !important; }
          .cards-grid    { grid-template-columns:1fr !important; }
        }
        @media (min-width:681px) and (max-width:900px) {
          .cards-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>

      

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{ position:"relative", background: C.bg, paddingTop:"80px", paddingBottom:"64px", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 55% 50% at 25% 45%, rgba(124,58,237,.15) 0%, transparent 65%), radial-gradient(ellipse 35% 40% at 78% 65%, rgba(201,168,76,.08) 0%, transparent 60%)" }} />
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(circle, rgba(201,168,76,.09) 1px, transparent 1px)", backgroundSize:"38px 38px", transform:`translate(${(mouse.x-.5)*10}px,${(mouse.y-.5)*10}px)`, transition:"transform .3s ease" }} />
        <div className="blob1" style={{ position:"absolute", top:"20%", right:"10%", width:"100px", height:"100px", borderRadius:"50%", background:"radial-gradient(circle,#c9a84c,transparent 70%)", opacity:.2, filter:"blur(3px)", pointerEvents:"none" }} />
        <div className="blob2" style={{ position:"absolute", bottom:"18%", left:"6%", width:"80px", height:"80px", borderRadius:"50%", background:"radial-gradient(circle,#7c3aed,transparent 70%)", opacity:.22, filter:"blur(3px)", pointerEvents:"none" }} />
        <div className="ring" style={{ position:"absolute", top:"-5%", left:"50%", marginLeft:"-340px", width:"680px", height:"680px", borderRadius:"50%", border:"1px dashed rgba(201,168,76,.07)", pointerEvents:"none" }} />

        <div ref={headerRef} style={{ ...container, position:"relative", zIndex:10 }} className="container-pad">

          <div style={{ opacity:headerInView?1:0, transform:headerInView?"none":"translateY(16px)", transition:"all .65s ease", marginBottom:"16px" }}>
            <span className="label">Full-Stack · Portfolio</span>
          </div>

          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"24px" }}>
            <div style={{ opacity:headerInView?1:0, transform:headerInView?"none":"translateY(40px)", transition:"all .9s cubic-bezier(.16,1,.3,1) .1s" }}>
              <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(48px,8vw,96px)", fontWeight:900, lineHeight:.88, letterSpacing:"-0.04em", color: C.text }}>
                Selected<br />
                <span style={{ WebkitTextStroke:`2.5px ${C.gold}`, WebkitTextFillColor:"transparent" }}>projects.</span>
              </h1>
            </div>
            <div style={{ opacity:headerInView?1:0, transition:"opacity .8s ease .4s", maxWidth:"280px" }}>
              <p style={{ fontSize:"15px", lineHeight:1.8, color: C.muted }}>
                4 full-stack builds — real databases, real APIs, real users.
              </p>
              <a href="https://github.com/GOD694" target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:"6px", marginTop:"14px", fontFamily:"'DM Mono',monospace", fontSize:"11px", letterSpacing:".1em", textTransform:"uppercase", color: C.muted, textDecoration:"none", borderBottom:`1px solid rgba(245,240,255,.2)`, paddingBottom:"2px", transition:"color .2s, border-color .2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.color=C.goldLight; e.currentTarget.style.borderColor=C.gold; }}
                onMouseLeave={e=>{ e.currentTarget.style.color=C.muted; e.currentTarget.style.borderColor="rgba(245,240,255,.2)"; }}>
                More on GitHub →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CARDS ═════════════════════════════════════════ */}
      <section style={{ background: C.section, borderTop:`1px solid ${C.border}`, paddingTop:"64px", paddingBottom:"88px" }}>
        <div style={container} className="container-pad">
          <div className="cards-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"24px" }}>

            {PROJECTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <div className="proj-card" style={{ borderColor: i === 0 ? "rgba(201,168,76,.28)" : "rgba(245,240,255,.07)" }}>

                  {/* ── Banner ── */}
                  <div className="card-banner" style={{ background:`linear-gradient(145deg, ${p.clr}1a, ${p.clr}06)` }}>

                    {/* Subtle grid pattern inside banner */}
                    <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle, ${p.clr}18 1px, transparent 1px)`, backgroundSize:"28px 28px", pointerEvents:"none" }} />

                    <span className="card-banner-icon" style={{ color: p.clr, filter:`drop-shadow(0 0 24px ${p.clr}88)` }}>{p.icon}</span>

                    {/* Year badge */}
                    <div style={{ position:"absolute", top:"14px", left:"16px", fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:".15em", color: p.clr, opacity:.7 }}>{p.year}</div>

                    {/* Stat */}
                    <div style={{ position:"absolute", top:"10px", right:"14px", display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
                      <span style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:"18px", color: p.clr }}>{p.stat.n}</span>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", letterSpacing:".1em", textTransform:"uppercase", color: C.muted, marginTop:"1px" }}>{p.stat.l}</span>
                    </div>

                    {/* Featured mark on first card */}
                    {i === 0 && (
                      <div style={{ position:"absolute", bottom:"12px", right:"14px", padding:"3px 10px", borderRadius:"99px", background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:"#0e0b1a", fontSize:"9px", fontFamily:"'DM Mono',monospace", letterSpacing:".1em", textTransform:"uppercase", fontWeight:700 }}>
                        Featured
                      </div>
                    )}

                    {/* Bottom line */}
                    <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"1px", background:`linear-gradient(90deg, transparent, ${p.clr}55, transparent)` }} />
                  </div>

                  {/* ── Body ── */}
                  <div style={{ padding:"26px 26px 22px", display:"flex", flexDirection:"column", gap:"18px" }}>

                    {/* Title */}
                    <div>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px" }}>
                        <h3 style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:"22px", color: C.text, lineHeight:1.1 }}>{p.title}</h3>
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:".08em", textTransform:"uppercase", color: p.clr, opacity:.8 }}>Full-Stack</span>
                      </div>
                      <p style={{ fontSize:"14px", lineHeight:1.8, color: C.muted }}>{p.desc}</p>
                    </div>

                    {/* Highlights */}
                    <div>
                      <span className="label" style={{ display:"block", marginBottom:"10px" }}>Key features</span>
                      <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                        {p.highlights.map(h => (
                          <div key={h} className="tick-item">
                            <span style={{ color: p.clr, flexShrink:0, marginTop:"2px" }}>✓</span>
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div>
                      <span className="label" style={{ display:"block", marginBottom:"10px" }}>Tech stack</span>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                        {p.tech.map(t => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height:"1px", background: C.border }} />

                    {/* Links */}
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div style={{ display:"flex", gap:"10px" }}>
                        <a href={p.live}   target="_blank" rel="noopener noreferrer" className="btn-ghost">Live ↗</a>
                        <a href={p.repo}   target="_blank" rel="noopener noreferrer" className="btn-ghost">GitHub ⌥</a>
                      </div>
                      <a href={p.live} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", letterSpacing:".08em", textTransform:"uppercase", color: p.clr, textDecoration:"none", display:"flex", alignItems:"center", gap:"6px", transition:"gap .2s" }}
                        onMouseEnter={e=>e.currentTarget.style.gap="11px"}
                        onMouseLeave={e=>e.currentTarget.style.gap="6px"}>
                        View <span>→</span>
                      </a>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div style={{ height:"3px", background:`linear-gradient(90deg, ${p.clr}, ${p.clr}00)` }} />
                </div>
              </Reveal>
            ))}

          </div>

          {/* GitHub CTA */}
          <Reveal delay={200} style={{ marginTop:"56px", textAlign:"center" }}>
            <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", gap:"14px", padding:"36px 56px", borderRadius:"20px", background:"rgba(201,168,76,.05)", border:`1px solid rgba(201,168,76,.18)` }}>
              <span className="label">More work</span>
              <p style={{ fontSize:"14px", color: C.muted, maxWidth:"340px", lineHeight:1.75 }}>
                More side projects, experiments, and open-source contributions live on GitHub.
              </p>
              <a href="https://github.com/GOD694" target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:"9px", padding:"12px 28px", borderRadius:"99px", background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:"#0e0b1a", fontSize:"13px", fontWeight:700, fontFamily:"'DM Sans',sans-serif", textDecoration:"none", boxShadow:"0 6px 20px rgba(201,168,76,.28)", transition:"transform .2s, box-shadow .2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(201,168,76,.45)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(201,168,76,.28)"; }}>
                ⌥ GitHub Profile →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════ */}
      <footer style={{ background: C.footer, borderTop:`1px solid rgba(201,168,76,.2)`, paddingTop:"56px", paddingBottom:"44px" }}>
        <div style={container} className="container-pad">

          <Reveal>
            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-end", justifyContent:"space-between", gap:"28px", paddingBottom:"36px", borderBottom:`1px solid rgba(245,240,255,.08)` }}>
              <div>
                <span style={{ fontFamily:"'DM Mono',monospace", display:"block", fontSize:"10px", letterSpacing:".25em", textTransform:"uppercase", color: C.gold, marginBottom:"14px" }}>Like what you see?</span>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(30px,4.5vw,52px)", fontWeight:700, lineHeight:.92, color:"#f5f0ff" }}>Let's build</div>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(30px,4.5vw,52px)", fontStyle:"italic", fontWeight:300, lineHeight:.92, color:"rgba(245,240,255,.4)", marginTop:"4px" }}>together.</div>
              </div>
              <a href="mailto:arslananwarul1@gmail.com"
                style={{ display:"inline-flex", alignItems:"center", gap:"10px", padding:"13px 28px", borderRadius:"99px", background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:"#0e0b1a", fontSize:"14px", fontWeight:700, fontFamily:"'DM Sans',sans-serif", textDecoration:"none", boxShadow:"0 8px 24px rgba(201,168,76,.28)", transition:"transform .2s, box-shadow .2s", alignSelf:"flex-end", whiteSpace:"nowrap" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(201,168,76,.45)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(201,168,76,.28)"; }}>
                arslananwarul1@gmail.com →
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"18px", paddingTop:"24px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                <span style={{ fontFamily:"'Fraunces',serif", fontSize:"20px", fontWeight:700, color:"#f5f0ff" }}>Arslan<span style={{ color: C.gold }}>.</span></span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", letterSpacing:".1em", color:"rgba(245,240,255,.28)" }}>© 2026</span>
              </div>
              <div style={{ display:"flex", gap:"22px" }}>
                {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="foot-link">{name}</a>
                ))}
              </div>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(245,240,255,.2)" }}>React + Tailwind ✦</span>
            </div>
          </Reveal>

        </div>
      </footer>

    </div>
  );
}