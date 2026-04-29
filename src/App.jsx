import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Loader from "./components/layout/Loader";
import Navbar from './components/layout/Navbar'
import Home from "./components/pages/Home"
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