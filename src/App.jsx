import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Loader from "./components/layout/Loader";
import Navbar from './components/layout/Navbar'
import Home from "./components/pages/Home"
import { Helmet } from 'react-helmet-async'
import AdminLayout from "./components/layout/AdminLayout";
const AdminContacts = lazy(() => import("./components/pages/AdminContacts"));
const Logout = lazy(() => import("./components/pages/Logout"))
const About = lazy(() => import("./components/pages/About"));
const Services = lazy(() => import("./components/pages/Services"));
const Project = lazy(() => import("./components/pages/Project"));
const Login = lazy(() => import("./components/pages/Login"));
const Register = lazy(() => import("./components/pages/Register"));
const ErrorPage = lazy(() => import("./components/pages/ErrorPage"))
const AdminUser = lazy(() => import("./components/pages/AdminUser"))
const AdminUpdate = lazy(() => import("./components/pages/AdminUpdate"))

import './App.css'

const App = () => {

  const [loading, setloading] = useState(true);

  useEffect(() => {
    document.title = "My Portfolio"
    setTimeout(() => setloading(false), 2000)
  })
  return (
    <>
    <Helmet>
        <title>Arslan | Full Stack Developer & Web Designer Portfolio</title>
        <meta name="description" content="Welcome to Arslan's portfolio — a passionate Full Stack Developer specializing in React, Node.js, and modern web design. Explore projects, skills, and get in touch." />
        <meta name="keywords" content="Arslan portfolio, full stack developer, web developer Pakistan, React developer, Node.js developer, frontend developer, hire developer" />
        <meta name="author" content="Arslan" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://arslan-protfolio.vercel.app/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arslan-protfolio.vercel.app/" />
        <meta property="og:title" content="Arslan | Full Stack Developer Portfolio" />
        <meta property="og:description" content="Explore Arslan's portfolio — projects, skills, and contact." />
        <meta property="og:image" content="https://arslan-protfolio.vercel.app/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arslan | Full Stack Developer" />
        <meta name="twitter:description" content="Passionate developer building modern web experiences." />
        <meta name="twitter:image" content="https://arslan-protfolio.vercel.app/og-image.png" />
      </Helmet>
      <div className="app-container">

        {loading ? <Loader /> : (<>

          <Navbar />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/project" element={<Project />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ErrorPage />} />

            <Route path="/admin" element={<AdminLayout />} >
              <Route path="user" element={<AdminUser />} />
              <Route path="user/update/:id" element={<AdminUpdate />} />
              <Route path="contacts" element={<AdminContacts />} />
            </Route>

          </Routes>
        </>

        )}
      </div>
    </>
  )
}

export default App