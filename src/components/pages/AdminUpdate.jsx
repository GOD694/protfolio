import React, { useEffect, useState } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const AdminUpdate = () => {
  const { id } = useParams();
  const { user, isAuthorization , API } = useAuth();
  const [values, setValues] = useState({
    username: "",
    phone: "",
    email: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [baseline, setBaseline] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [loadError, setLoadError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      setLoadError(null);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const response = await fetch(
          `${API}/admin/users/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: isAuthorization,
            },
          }
        );
        const resdata = await response.json().catch(() => ({}));
        if (!response.ok || !resdata.data) {
          if (!cancelled) {
            setLoadError(resdata.msg || "Could not load user.");
            setLoading(false);
          }
          return;
        }
        const u = resdata.data;
        const next = {
          username: u.username ?? "",
          phone: u.phone ?? "",
          email: u.email ?? "",
        };
        if (!cancelled) {
          setValues(next);
          setBaseline(next);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setLoadError("Network error.");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAuthorization]);

  useEffect(() => {
    if (id) return;
    const next = {
      username: user.username ?? "",
      phone: user.phone ?? "",
      email: user.email ?? "",
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(next);
    setBaseline(next);
  }, [id, user.username, user.email, user.phone]);

  const validate = () => {
    const next = {};
    const username = values.username.trim();
    const email = values.email.trim();
    const phone = values.phone.trim();

    if (!username) next.username = "Username is required";
    if (!email) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email";
    if (phone && !/^[\d\s+\-()]{7,20}$/.test(phone))
      next.phone = "Use a valid phone number (digits and common symbols only)";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!validate()) return;
    // When you add a profile PATCH route, call it here with `values` then refresh auth state.

    setMessage({ type: "success", text: "All fields look good." });
    try {
      const response = await fetch(`${API}/admin/users/update/${id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
          Authorization:isAuthorization,
        },
        body:JSON.stringify(values),
      })
      const resdata = await response.json();
      console.log(resdata);
      if(!response.ok){
        console.log("Failed to update user");
      }else{
        setMessage({ type: "success", text: "User updated successfully." });
        console.log(resdata);
        navigate("/admin/user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/40 shadow-inner focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40";

  if (loading) {
    return (
      <div className="flex w-full min-h-[40vh] items-center justify-center p-6 text-white/80">
        Loading user…
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex w-full min-h-[40vh] items-center justify-center p-6">
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {loadError}
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-full justify-center items-start p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-white/10 p-5 sm:p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-1 text-xl font-bold text-white sm:text-2xl">
          Update details
        </h1>
        <p className="mb-6 text-sm text-white/70 sm:text-base">
          Edit username, phone, and email. Layout adapts on phones, tablets, and
          desktops.
        </p>

        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="admin-update-username"
              className="mb-1.5 block text-sm font-medium text-white/90"
            >
              Username
            </label>
            <input
              id="admin-update-username"
              name="username"
              type="text"
              autoComplete="username"
              className={inputClass}
              value={values.username}
              onChange={(e) =>
                setValues((v) => ({ ...v, username: e.target.value }))
              }
              placeholder="Your name"
            />
            {errors.username && (
              <p className="mt-1.5 text-sm text-red-300">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="admin-update-phone"
              className="mb-1.5 block text-sm font-medium text-white/90"
            >
              Phone
            </label>
            <input
              id="admin-update-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className={inputClass}
              value={values.phone}
              onChange={(e) =>
                setValues((v) => ({ ...v, phone: e.target.value }))
              }
              placeholder="+1 234 567 8900"
            />
            {errors.phone && (
              <p className="mt-1.5 text-sm text-red-300">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="admin-update-email"
              className="mb-1.5 block text-sm font-medium text-white/90"
            >
              Email
            </label>
            <input
              id="admin-update-email"
              name="email"
              type="email"
              autoComplete="email"
              className={inputClass}
              value={values.email}
              onChange={(e) =>
                setValues((v) => ({ ...v, email: e.target.value }))
              }
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-300">{errors.email}</p>
            )}
          </div>

          {message && (
            <p
              className={
                message.type === "success"
                  ? "rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100"
                  : "rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-100"
              }
              role="status"
            >
              {message.text}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="w-full rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-6"
              onClick={() => {
                setErrors({});
                setMessage(null);
                setValues({
                  username: "",
                  phone: "",
                  email: "",
                })
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              className="w-full rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-amber-500 sm:w-auto sm:px-8"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdate;
