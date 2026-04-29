import { useState, useEffect, useRef } from "react";
import { useAuth } from "../store/auth";
import toast, { Toaster } from 'react-hot-toast';



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
      transform:  inView ? "none" : "translateY(36px)",
      transition: `opacity 0.85s ease ${delay}ms, transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}ms`,
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

/* ─── Data ───────────────────────────────────────────── */
// const SERVICES = [
//   {
//     icon:  "⬡",
//     title: "Frontend Development",
//     price: "From $500",
//     clr:   "#8b5cf6",
//     tags:  ["React","Next.js","TypeScript","Tailwind"],
//     desc:  "Pixel-perfect, accessible, and blazing-fast UIs. From landing pages to complex dashboards — built with modern tooling and obsessive attention to detail.",
//     items: ["Responsive UI development","Component libraries & design systems","Performance optimisation (Lighthouse 95+)","Animations & micro-interactions"],
//   },
//   {
//     icon:  "◎",
//     title: "Full-Stack Development",
//     price: "From $1200",
//     clr:   "#0ea5e9",
//     tags:  ["Node.js","PostgreSQL","REST","GraphQL"],
//     desc:  "End-to-end product development — from database schema to polished frontend. I handle the full stack so you don't have to stitch teams together.",
//     items: ["REST & GraphQL API design","Database architecture & optimisation","Authentication & authorisation","Deployment on Vercel / AWS"],
//     featured: true,
//   },
//   {
//     icon:  "◈",
//     title: "UI / UX Design",
//     price: "From $400",
//     clr:   "#ec4899",
//     tags:  ["Figma","Prototyping","Design Systems","UX Research"],
//     desc:  "Interfaces that feel intuitive before the user reads a single word. I design with engineers in mind — every spec is handoff-ready from day one.",
//     items: ["Wireframing & prototyping","User flow & information architecture","Design systems in Figma","Developer handoff (Figma → code)"],
//   },
//   {
//     icon:  "◉",
//     title: "Code Review & Consulting",
//     price: "From $150 / hr",
//     clr:   "#10b981",
//     tags:  ["Audit","Architecture","Mentoring","Best Practices"],
//     desc:  "Get an expert eye on your codebase. I identify bottlenecks, security issues, and architectural smells — and show you exactly how to fix them.",
//     items: ["Codebase audit & report","Architecture recommendations","Performance profiling","1-on-1 mentoring sessions"],
//   },
//   {
//     icon:  "✦",
//     title: "Website Maintenance",
//     price: "From $200 / mo",
//     clr:   "#f59e0b",
//     tags:  ["Updates","Bug Fixes","Monitoring","SEO"],
//     desc:  "Keep your site healthy, up to date, and performing. Monthly retainer packages that cover updates, fixes, and peace of mind.",
//     items: ["Monthly dependency updates","Bug fixes & hotfixes","Uptime & performance monitoring","SEO audits & improvements"],
//   },
//   {
//     icon:  "⊙",
//     title: "Open Source / Pro-Bono",
//     price: "Let's talk",
//     clr:   "#a78bfa",
//     tags:  ["OSS","Non-Profit","Community","Education"],
//     desc:  "I dedicate time every month to open source and social-impact projects. If you're building something meaningful, reach out — I'd love to contribute.",
//     items: ["Open source contributions","Non-profit websites","Educational projects","Community tools"],
//   },
// ];

const PROCESS = [
  { n:"01", title:"Discovery",   desc:"We start with a call to understand your goals, constraints, and success criteria." },
  { n:"02", title:"Proposal",    desc:"I send a detailed scope, timeline, and fixed-price quote within 24 hours." },
  { n:"03", title:"Build",       desc:"Weekly check-ins and a shared staging environment so you see progress in real time." },
  { n:"04", title:"Launch",      desc:"Deployment, handover, and 30 days of free post-launch support included." },
];

const FAQS = [
  { q:"What's your typical turnaround time?",    a:"Small projects (landing pages, audits) take 1–2 weeks. Full-stack apps typically 4–8 weeks depending on scope." },
  { q:"Do you work with international clients?",  a:"Yes — I work fully remote with clients across the US, Europe, and Asia. Async-first with weekly video calls." },
  { q:"Can I request changes after delivery?",   a:"Absolutely. Each project includes a revision round. Ongoing changes are covered by the maintenance retainer." },
  { q:"What if I only have a rough idea?",        a:"That's totally fine. Discovery calls are free — we'll scope it out together before any commitment." },
];

const SOCIAL_LINKS = {
  GitHub:   "https://github.com/GOD694",
  LinkedIn: "https://www.linkedin.com/in/arslan-anwarul-3603a5296/",
  Twitter:  "https://twitter.com/your-username",
  leetcode: "https://leetcode.com/u/Arslan-160/",
};

/* ══════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  const [mouse, setMouse] = useState({ x:0.5, y:0.5 });
  const [headerRef, headerInView] = useInView(0.05);

  /* ── Contact form state ── */
  const [form, setForm]     = useState({ name:"", phone:"", email:"", message:"" });
  const [touched, setTouched] = useState({});
  const [focused, setFocused] = useState(null);
  const [sent, setSent]     = useState(false);
  const [isVerifed, setisVerifed]     = useState(true);
  const {AuthenticationUser,user,SERVICES ,API} = useAuth();

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onBlur   = (e) => setTouched(t => ({ ...t, [e.target.name]: true }));
  const onFocus  = (e) => setFocused(e.target.name);

  if(isVerifed && user){
    
    setisVerifed(false)
    setForm({ name:user.username, phone:user.phone, email:user.email, message:"" })
  }

  const validate = () => {
    const e = {};
    if (!form.name.trim())                                         e.name    = "Name is required";
    if (!form.phone.trim() || !/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim() || form.message.length < 10)          e.message = "Please write at least 10 characters";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const errors = validate();
  
    setTouched({ name: true, phone: true, email: true, message: true });
  
    if (Object.keys(errors).length !== 0) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/form/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username:form.name, phone:form.phone, email:form.email, userText:form.message }),
      });
      const data = await response.json(); // ✅ get response data
  
      if (response.ok) {
        setSent(true);
        toast.success("Message sent successfully!", { duration: 1000 });
      } else {
        toast.error(data.error?.message || "Failed to send message. Please try again.", { duration: 2000 });
        console.log("Error from backend:", data.error?.message || data);
      }
  
    } catch (error) {
      console.log("Network Error:", error);
    }
  };
  const errors = validate();

  useEffect(() => {
    const fn = (e) => setMouse({ x: e.clientX/window.innerWidth, y: e.clientY/window.innerHeight });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  /* ── Field border helper ── */
  const fieldStyle = (name) => ({
    width: "100%",
    padding: "13px 16px 13px 44px",
    borderRadius: "12px",
    background: touched[name] && errors[name]
      ? "rgba(239,68,68,.06)"
      : focused === name
      ? "rgba(201,168,76,.07)"
      : "rgba(255,255,255,.04)",
    border: `1.5px solid ${
      touched[name] && errors[name]
        ? "rgba(239,68,68,.55)"
        : focused === name
        ? C.gold
        : "rgba(245,240,255,.1)"
    }`,
    boxShadow: focused === name && !(touched[name] && errors[name])
      ? `0 0 0 4px rgba(201,168,76,.1)`
      : "none",
    color: C.text,
    fontSize: "14px",
    fontFamily: "'DM Sans',sans-serif",
    outline: "none",
    transition: "all .2s ease",
  });

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
        @keyframes popIn  { from{opacity:0;transform:scale(.6) rotate(-8deg)} to{opacity:1;transform:scale(1) rotate(0)} }

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

        /* Service card */
        .svc-card {
          padding:32px 28px; border-radius:18px;
          border:1px solid rgba(245,240,255,.07);
          background:rgba(255,255,255,.025);
          transition:transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, background .3s, box-shadow .3s;
          display:flex; flex-direction:column; gap:18px;
          position:relative; overflow:hidden;
        }
        .svc-card:hover {
          transform:translateY(-6px);
          border-color:rgba(201,168,76,.25);
          background:rgba(201,168,76,.04);
          box-shadow:0 20px 50px rgba(0,0,0,.35);
        }
        .svc-card.featured {
          border-color:rgba(201,168,76,.35);
          background:rgba(201,168,76,.06);
        }

        /* Process step */
        .step-card {
          padding:28px 24px; border-radius:14px;
          border:1px solid rgba(245,240,255,.07);
          background:rgba(255,255,255,.025);
          transition:border-color .25s, background .25s;
        }
        .step-card:hover {
          border-color:rgba(201,168,76,.22);
          background:rgba(201,168,76,.04);
        }

        /* FAQ */
        .faq-item {
          padding:20px 24px; border-radius:12px;
          border:1px solid rgba(245,240,255,.07);
          background:rgba(255,255,255,.02);
          transition:border-color .2s, background .2s;
          cursor:pointer;
        }
        .faq-item:hover {
          border-color:rgba(201,168,76,.2);
          background:rgba(201,168,76,.03);
        }

        /* Input icon */
        .input-icon {
          position:absolute; left:14px; top:50%; transform:translateY(-50%);
          font-size:14px; pointer-events:none;
          transition:color .2s;
        }

        .foot-link {
          font-family:'DM Mono',monospace; font-size:11px;
          letter-spacing:.12em; text-transform:uppercase;
          color:rgba(245,240,255,.42); text-decoration:none;
          transition:color .2s;
        }
        .foot-link:hover { color:#f0d080; }

        input::placeholder, textarea::placeholder { color:rgba(245,240,255,.2); }
        textarea { resize:vertical; }

        @media (max-width:680px) {
          .svc-grid    { grid-template-columns:1fr !important; }
          .proc-grid   { grid-template-columns:1fr !important; }
          .form-row    { grid-template-columns:1fr !important; }
          .container-pad { padding:0 24px !important; }
        }
      `}</style>

     

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{ position:"relative", background: C.bg, paddingTop:"88px", paddingBottom:"72px", overflow:"hidden" }}>

        <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 55% 50% at 25% 45%, rgba(124,58,237,.15) 0%, transparent 65%), radial-gradient(ellipse 35% 40% at 78% 65%, rgba(201,168,76,.09) 0%, transparent 60%)" }} />
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(circle, rgba(201,168,76,.09) 1px, transparent 1px)", backgroundSize:"38px 38px", transform:`translate(${(mouse.x-.5)*10}px,${(mouse.y-.5)*10}px)`, transition:"transform .3s ease" }} />
        <div className="blob1" style={{ position:"absolute", top:"18%", right:"12%", width:"110px", height:"110px", borderRadius:"50%", background:"radial-gradient(circle,#c9a84c,transparent 70%)", opacity:.2, filter:"blur(3px)", pointerEvents:"none" }} />
        <div className="blob2" style={{ position:"absolute", bottom:"22%", left:"7%", width:"85px", height:"85px", borderRadius:"50%", background:"radial-gradient(circle,#7c3aed,transparent 70%)", opacity:.24, filter:"blur(3px)", pointerEvents:"none" }} />
        <div className="ring" style={{ position:"absolute", top:"0", left:"50%", marginLeft:"-340px", width:"680px", height:"680px", borderRadius:"50%", border:"1px dashed rgba(201,168,76,.07)", pointerEvents:"none" }} />

        <div ref={headerRef} style={{ ...container, position:"relative", zIndex:10, textAlign:"center" }} className="container-pad">

          <div style={{ opacity:headerInView?1:0, transform:headerInView?"none":"translateY(18px)", transition:"all .65s ease", marginBottom:"20px" }}>
            <span className="label">What I offer</span>
          </div>

          <div style={{ opacity:headerInView?1:0, transform:headerInView?"none":"translateY(40px)", transition:"all .95s cubic-bezier(.16,1,.3,1) .12s" }}>
            <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(48px,9vw,110px)", fontWeight:900, lineHeight:.88, letterSpacing:"-0.04em", color: C.text, marginBottom:"28px" }}>
              Services &<br />
              <span style={{ WebkitTextStroke:`2.5px ${C.gold}`, WebkitTextFillColor:"transparent" }}>solutions.</span>
            </h1>
          </div>

          <div style={{ opacity:headerInView?1:0, transition:"opacity .8s ease .5s", maxWidth:"520px", margin:"0 auto 40px" }}>
            <p style={{ fontSize:"17px", lineHeight:1.75, color: C.muted }}>
              From a single landing page to a full product — I bring engineering precision and design sensibility to every engagement.
            </p>
          </div>

          <div style={{ opacity:headerInView?1:0, transition:"opacity .8s ease .7s", display:"flex", justifyContent:"center", gap:"14px", flexWrap:"wrap" }}>
            <a href="#services" style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"13px 28px", borderRadius:"99px", background:`linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color:"#0e0b1a", fontSize:"14px", fontWeight:700, fontFamily:"'DM Sans',sans-serif", textDecoration:"none", boxShadow:"0 6px 22px rgba(201,168,76,.3)", transition:"transform .2s, box-shadow .2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.04)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; }}>
              View services ↓
            </a>
            <a href="#contact" style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"13px 28px", borderRadius:"99px", border:`1.5px solid rgba(245,240,255,.15)`, color: C.muted, fontSize:"14px", fontFamily:"'DM Sans',sans-serif", textDecoration:"none", transition:"border-color .2s, color .2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.gold; e.currentTarget.style.color=C.goldLight; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(245,240,255,.15)"; e.currentTarget.style.color=C.muted; }}>
              Get a quote →
            </a>
          </div>
        </div>
      </section>

      {/* ══ SERVICES GRID ═════════════════════════════════ */}
      <section id="services" style={{ background: C.section, borderTop:`1px solid ${C.border}`, paddingTop:"80px", paddingBottom:"80px" }}>
        <div style={container} className="container-pad">

          <Reveal style={{ marginBottom:"48px" }}>
            <span className="label" style={{ display:"block", marginBottom:"12px" }}>Services</span>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(34px,5vw,52px)", fontWeight:700, lineHeight:1.05, color: C.text }}>
              What I can<br />
              <em style={{ fontStyle:"italic", fontWeight:300, color: C.muted }}>do for you.</em>
            </h2>
          </Reveal>

          <div className="svc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px" }}>
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className={`svc-card${s.featured ? " featured" : ""}`} style={{ height:"100%" }}>

                  {/* Featured badge */}
                  {s.featured && (
                    <div style={{ position:"absolute", top:"16px", right:"16px", padding:"4px 10px", borderRadius:"99px", background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, color:"#0e0b1a", fontSize:"9px", fontFamily:"'DM Mono',monospace", letterSpacing:".1em", textTransform:"uppercase", fontWeight:700 }}>
                      Most Popular
                    </div>
                  )}

                  {/* Icon + price */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontSize:"28px", lineHeight:1, color: s.clr }}>{s.icon}</span>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"12px", color: C.gold, letterSpacing:".04em" }}>{s.price}</span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:"20px", color: C.text, marginBottom:"10px" }}>{s.title}</h3>
                    <p style={{ fontSize:"13px", lineHeight:1.75, color: C.muted }}>{s.desc}</p>
                  </div>

                  {/* Items */}
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"8px", marginTop:"auto" }}>
                    {s.items.map(item => (
                      <li key={item} style={{ display:"flex", alignItems:"flex-start", gap:"10px", fontSize:"13px", color: C.muted }}>
                        <span style={{ color: s.clr, marginTop:"1px", flexShrink:0 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                    {s.tags.map(t => (
                      <span key={t} style={{ padding:"3px 9px", borderRadius:"99px", fontSize:"10px", fontFamily:"'DM Mono',monospace", background:`${s.clr}18`, border:`1px solid ${s.clr}33`, color: s.clr }}>{t}</span>
                    ))}
                  </div>

                  {/* Bottom accent */}
                  <div style={{ height:"2px", borderRadius:"99px", background:`linear-gradient(90deg, ${s.clr}, transparent)` }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ═══════════════════════════════════════ */}
      <section style={{ background: C.bg, borderTop:`1px solid ${C.border}`, paddingTop:"80px", paddingBottom:"80px" }}>
        <div style={container} className="container-pad">

          <Reveal style={{ marginBottom:"48px" }}>
            <span className="label" style={{ display:"block", marginBottom:"12px" }}>How it works</span>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(34px,5vw,52px)", fontWeight:700, lineHeight:1.05, color: C.text }}>
              My simple<br />
              <em style={{ fontStyle:"italic", fontWeight:300, color: C.muted }}>process.</em>
            </h2>
          </Reveal>

          <div className="proc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
            {PROCESS.map((step, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="step-card">
                  <div style={{ fontFamily:"'Fraunces',serif", fontSize:"40px", fontWeight:900, color:`rgba(201,168,76,.18)`, lineHeight:1, marginBottom:"16px" }}>{step.n}</div>
                  <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:"18px", color: C.text, marginBottom:"10px" }}>{step.title}</div>
                  <p style={{ fontSize:"13px", lineHeight:1.75, color: C.muted }}>{step.desc}</p>
                  <div style={{ width:"32px", height:"2px", borderRadius:"99px", background:`linear-gradient(90deg,${C.gold},transparent)`, marginTop:"16px" }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════ */}
      <section style={{ background: C.section, borderTop:`1px solid ${C.border}`, paddingTop:"80px", paddingBottom:"80px" }}>
        <div style={container} className="container-pad">

          <Reveal style={{ marginBottom:"48px" }}>
            <span className="label" style={{ display:"block", marginBottom:"12px" }}>FAQ</span>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(34px,5vw,52px)", fontWeight:700, lineHeight:1.05, color: C.text }}>
              Common<br />
              <em style={{ fontStyle:"italic", fontWeight:300, color: C.muted }}>questions.</em>
            </h2>
          </Reveal>

          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="faq-item">
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"16px" }}>
                    <div>
                      <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:"15px", color: C.text, marginBottom:"8px" }}>{faq.q}</div>
                      <p style={{ fontSize:"14px", lineHeight:1.75, color: C.muted }}>{faq.a}</p>
                    </div>
                    <span style={{ color: C.gold, fontSize:"18px", flexShrink:0, marginTop:"2px" }}>✦</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT FORM ══════════════════════════════════ */}
      <section id="contact" style={{ background: C.bg, borderTop:`1px solid ${C.border}`, paddingTop:"88px", paddingBottom:"88px" }}>
        <div style={container} className="container-pad">

          <Reveal style={{ marginBottom:"56px", textAlign:"center" }}>
            <span className="label" style={{ display:"block", marginBottom:"14px" }}>Contact</span>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(38px,6vw,72px)", fontWeight:900, lineHeight:.9, letterSpacing:"-0.03em", color: C.text, marginBottom:"18px" }}>
              Let's build<br />
              <span style={{ WebkitTextStroke:`2px ${C.gold}`, WebkitTextFillColor:"transparent" }}>something.</span>
            </h2>
            <p style={{ fontSize:"16px", color: C.muted, maxWidth:"440px", margin:"0 auto", lineHeight:1.75 }}>
              Have a project in mind? Fill out the form and I'll get back to you within 24 hours.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ maxWidth:"680px", margin:"0 auto" }}>

              {sent ? (
                /* ── Success state ── */
                <div style={{ textAlign:"center", padding:"64px 32px", borderRadius:"20px", background:"rgba(201,168,76,.06)", border:`1px solid rgba(201,168,76,.25)` }}>
                  <div style={{ fontSize:"56px", marginBottom:"20px", animation:"popIn .5s cubic-bezier(.16,1,.3,1) both" }}>✦</div>
                  <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:"32px", fontWeight:700, color: C.text, marginBottom:"10px" }}>Message sent!</h3>
                  <p style={{ fontSize:"15px", color: C.muted, lineHeight:1.7 }}>Thank you for reaching out. I'll reply to your email within 24 hours.</p>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={onSubmit} noValidate style={{ display:"flex", flexDirection:"column", gap:"20px" }}>

                  {/* Row 1 — Name + Phone */}
                  <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>

                    {/* Name */}
                    <div>
                      <label style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:".2em", textTransform:"uppercase", color: touched.name && errors.name ? "#ef4444" : focused==="name" ? C.gold : "rgba(245,240,255,.5)", display:"block", marginBottom:"8px" }}>
                        Full Name *
                      </label>
                      <div style={{ position:"relative" }}>
                        <span className="input-icon" style={{ color: touched.name && errors.name ? "#ef4444" : focused==="name" ? C.gold : "rgba(245,240,255,.25)" }}>◈</span>
                        <input name="name" type="text" placeholder="Alex Rivera" value={form.name} onChange={onChange} onFocus={onFocus} onBlur={onBlur} style={fieldStyle("name")} />
                      </div>
                      {touched.name && errors.name && <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"#f87171", marginTop:"6px" }}>⚠ {errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:".2em", textTransform:"uppercase", color: touched.phone && errors.phone ? "#ef4444" : focused==="phone" ? C.gold : "rgba(245,240,255,.5)", display:"block", marginBottom:"8px" }}>
                        Phone *
                      </label>
                      <div style={{ position:"relative" }}>
                        <span className="input-icon" style={{ color: touched.phone && errors.phone ? "#ef4444" : focused==="phone" ? C.gold : "rgba(245,240,255,.25)" }}>◎</span>
                        <input name="phone" type="tel" placeholder="+1 234 567 8900" value={form.phone} onChange={onChange} onFocus={onFocus} onBlur={onBlur} style={fieldStyle("phone")} />
                      </div>
                      {touched.phone && errors.phone && <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"#f87171", marginTop:"6px" }}>⚠ {errors.phone}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:".2em", textTransform:"uppercase", color: touched.email && errors.email ? "#ef4444" : focused==="email" ? C.gold : "rgba(245,240,255,.5)", display:"block", marginBottom:"8px" }}>
                      Email Address *
                    </label>
                    <div style={{ position:"relative" }}>
                      <span className="input-icon" style={{ color: touched.email && errors.email ? "#ef4444" : focused==="email" ? C.gold : "rgba(245,240,255,.25)" }}>◉</span>
                      <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={onChange} onFocus={onFocus} onBlur={onBlur} style={fieldStyle("email")} />
                    </div>
                    {touched.email && errors.email && <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"#f87171", marginTop:"6px" }}>⚠ {errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:".2em", textTransform:"uppercase", color: touched.message && errors.message ? "#ef4444" : focused==="message" ? C.gold : "rgba(245,240,255,.5)", display:"block", marginBottom:"8px" }}>
                      Message *
                    </label>
                    <div style={{ position:"relative" }}>
                      <span style={{ position:"absolute", left:"14px", top:"14px", fontSize:"14px", color: touched.message && errors.message ? "#ef4444" : focused==="message" ? C.gold : "rgba(245,240,255,.25)", pointerEvents:"none", transition:"color .2s" }}>⊙</span>
                      <textarea
                        name="message" rows={5}
                        placeholder="Tell me about your project, timeline, and budget..."
                        value={form.message}
                        onChange={onChange} onFocus={onFocus} onBlur={onBlur}
                        style={{ ...fieldStyle("message"), padding:"13px 16px 13px 44px" }}
                      />
                    </div>
                    {touched.message && errors.message && <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"#f87171", marginTop:"6px" }}>⚠ {errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button type="submit"
                    style={{ width:"100%", padding:"16px", borderRadius:"14px", background:`linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color:"#0e0b1a", fontSize:"15px", fontWeight:700, fontFamily:"'DM Sans',sans-serif", letterSpacing:".04em", border:"none", cursor:"pointer", boxShadow:"0 8px 28px rgba(201,168,76,.3)", transition:"transform .2s, box-shadow .2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.02)"; e.currentTarget.style.boxShadow="0 12px 36px rgba(201,168,76,.45)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(201,168,76,.3)"; }}
                  >
                    Send Message →
                  </button>

                  <p style={{ textAlign:"center", fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(245,240,255,.25)", letterSpacing:".06em" }}>
                    🔒 Your info is safe. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════ */}
      <footer style={{ background: C.footer, borderTop:`1px solid rgba(201,168,76,.2)`, paddingTop:"56px", paddingBottom:"44px" }}>
        <div style={container} className="container-pad">

          <Reveal>
            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"20px", paddingBottom:"28px", borderBottom:"1px solid rgba(245,240,255,.08)" }}>

              <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                <span style={{ fontFamily:"'Fraunces',serif", fontSize:"20px", fontWeight:700, color:"#f5f0ff" }}>Arslan<span style={{ color: C.gold }}>.</span></span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", letterSpacing:".1em", color:"rgba(245,240,255,.3)" }}>© 2026</span>
              </div>

              <div style={{ display:"flex", gap:"24px" }}>
                {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="foot-link">{name}</a>
                ))}
              </div>

              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"11px", color:"rgba(245,240,255,.22)" }}>React + Tailwind ✦</span>
            </div>
          </Reveal>

        </div>
      </footer>

    </div>
  );
}