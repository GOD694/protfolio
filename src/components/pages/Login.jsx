import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../store/auth";

import toast, { Toaster } from 'react-hot-toast';




const FIELDS = [
  { name: "email",    label: "Email Address", type: "email",    placeholder: "you@example.com", icon: "◈" },
  { name: "password", label: "Password",      type: "password", placeholder: "Your password",   icon: "◉" },
];

function validate(form) {
  const e = {};
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = "Enter a valid email address";
  if (!form.password || form.password.length < 1)
    e.password = "Password is required";
  return e;
}

export default function LoginPage() {
  const Navigate = useNavigate();
  const [form,      setForm]      = useState({ email: "", password: "" });
  const [touched,   setTouched]   = useState({});
  const [focused,   setFocused]   = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [remember,  setRemember]  = useState(false);
  const {storeLocalStorage,API} = useAuth();
  const URL = `${API}/auth/login`;

  const errors = validate(form);

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onBlur   = (e) => { setTouched(t => ({ ...t, [e.target.name]: true })); setFocused(null); };
  const onFocus  = (e) => setFocused(e.target.name);
  const onSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch(URL,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    
    if(response.ok){
      const data = await response.json();
      storeLocalStorage(data.token);
      setForm({ email: "", password: "" });
      // setSubmitted(true);

      Navigate("/")
      

    }else{
      const errorData = await response.json();
      const errorMessage = errorData.error?.message || "Login failed. Please try again.";
      setForm({ email: "", password: "" });
      toast.error(errorMessage)
      console.error("Login failed:", errorMessage);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes popScale {
          from { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          to   { opacity: 1; transform: scale(1)   rotate(0deg);   }
        }
        @keyframes gradientMove {
          0%,100% { background-position: 0% 50%;  }
          50%     { background-position: 100% 50%; }
        }
        @keyframes ripple {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-8px); }
        }

        .anim-up  { animation: fadeSlideUp 0.65s cubic-bezier(.16,1,.3,1) both; }
        .anim-pop { animation: popScale    0.55s cubic-bezier(.16,1,.3,1) 0.1s both; }
        .d1 { animation-delay: .06s; }
        .d2 { animation-delay: .12s; }

        .btn-gradient {
          background: linear-gradient(135deg, #7c3aed, #6d28d9, #4f46e5, #7c3aed);
          background-size: 250% 250%;
          animation: gradientMove 5s ease infinite;
          transition: filter .2s, transform .15s, box-shadow .2s;
        }
        .btn-gradient:hover {
          filter: brightness(1.1);
          box-shadow: 0 8px 32px rgba(124,58,237,0.45);
        }
        .btn-gradient:active { transform: scale(0.98); }

        .field-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          border-radius: 14px;
          font-size: 0.875rem;
          font-weight: 400;
          outline: none;
          transition: all 0.2s ease;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.1);
          color: #f8fafc;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.22); }
        .field-input:focus {
          background: rgba(124,58,237,0.1);
          border-color: #7c3aed;
          box-shadow: 0 0 0 4px rgba(124,58,237,0.18);
        }
        .field-input.err {
          background: rgba(239,68,68,0.07);
          border-color: rgba(239,68,68,0.6);
          box-shadow: 0 0 0 4px rgba(239,68,68,0.12);
        }
        .field-input.ok { border-color: rgba(16,185,129,0.5); }

        .ripple-circle {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid rgba(124,58,237,0.5);
          animation: ripple 1.8s ease-out infinite;
        }
        .ripple-circle-2 {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid rgba(124,58,237,0.3);
          animation: ripple 1.8s ease-out 0.6s infinite;
        }

        .logo-float { animation: float 4s ease-in-out infinite; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ─── Root ──────────────────────────────────────────── */}
      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f0a1e 0%, #12101f 40%, #0a0f1e 100%)" }}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #4f46e5 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute top-20 right-20 w-48 h-48 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "64px 64px"
            }} />
          {[{ top:"15%",left:"8%" },{ top:"70%",left:"5%" },{ top:"30%",right:"8%" },{ top:"80%",right:"12%" }].map((pos,i)=>(
            <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-violet-400 opacity-40" style={pos} />
          ))}
        </div>

        {/* ─── Content ───────────────────────────────────── */}
        <div className="relative z-10 w-full max-w-[420px]">

          ─── Success ─────────────────────────────────
          {submitted ? (
            <div className="anim-up text-center px-8 py-14 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"
              }}>
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="ripple-circle" />
                <div className="ripple-circle-2" />
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center text-4xl anim-pop text-white font-bold"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                  ✓
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome back!</h2>
              <p className="text-slate-400 text-sm mb-6">You've signed in successfully.</p>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider text-violet-300 uppercase"
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}>
                ✦ Good to see you again
              </div>
            </div>

          ) : (
            <>
              {/* ─── Header ─────────────────────────────── */}
              <div className="text-center mb-8 anim-up">
                <div className="logo-float inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 text-2xl"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 8px 32px rgba(124,58,237,0.4)" }}>
                  ✦
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Welcome back</h1>
                <p className="text-slate-400 text-sm font-light">Sign in to continue your journey</p>
              </div>

              {/* ─── Card ───────────────────────────────── */}
              <div className="anim-up rounded-3xl p-8"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(24px)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"
                }}>

                <form onSubmit={onSubmit} noValidate>

                  {/* Fields */}
                  {FIELDS.map(({ name, label, type, placeholder, icon }, i) => {
                    const isFocused = focused === name;
                    const hasError  = touched[name] && errors[name];
                    const isValid   = touched[name] && !errors[name];
                    const inputCls  = hasError ? "err" : isValid ? "ok" : "";

                    return (
                      <div key={name} className={`mb-5 anim-up d${i + 1}`}>
                        <div className="flex items-center justify-between mb-2">
                          <label
                            className="text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
                            style={{ color: hasError ? "#ef4444" : isFocused ? "#a78bfa" : "rgba(148,163,184,0.8)" }}
                          >
                            {label}
                          </label>
                          {name === "password" && (
                            <a href="#" className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors font-medium">
                              Forgot password?
                            </a>
                          )}
                        </div>

                        <div className="relative">
                          <span
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none select-none transition-all duration-200"
                            style={{ color: hasError ? "#ef4444" : isFocused ? "#a78bfa" : "rgba(148,163,184,0.4)" }}
                          >
                            {icon}
                          </span>

                          <input
                            name={name}
                            type={type}
                            value={form[name]}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            autoComplete={name === "password" ? "current-password" : "email"}
                            className={`field-input ${inputCls}`}
                          />

                          {isValid && !isFocused && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-sm">✓</span>
                          )}
                        </div>

                        {hasError && (
                          <p className="mt-1.5 text-[11px] text-red-400 font-medium flex items-center gap-1.5">
                            <span className="text-xs">⚠</span> {errors[name]}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  {/* Remember me */}
                  <div className="flex items-center mb-6 mt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setRemember(r => !r)}>
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 flex-shrink-0"
                        style={{
                          background: remember ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "rgba(255,255,255,0.06)",
                          border: remember ? "none" : "1.5px solid rgba(255,255,255,0.15)",
                          boxShadow: remember ? "0 2px 12px rgba(124,58,237,0.4)" : "none"
                        }}
                      >
                        {remember && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                      <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors select-none">
                        Keep me signed in
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button type="submit" className="btn-gradient w-full py-4 rounded-2xl text-white font-bold text-sm tracking-wide">
                    Sign In →
                  </button>

                  {/* Register link */}
                  <p className="text-center mt-5 text-xs text-slate-500">
                    Don't have an account?{" "}
                    <a href="#" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors duration-200 underline underline-offset-2 decoration-violet-600 hover:decoration-violet-400">
                      Create one here
                    </a>
                  </p>
                </form>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 mt-6 anim-up">
                {["🔒 Secure", "⚡ Instant", "✦ Free"].map((badge, i) => (
                  <span key={i} className="text-[11px] text-slate-600 font-medium tracking-wider">{badge}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}