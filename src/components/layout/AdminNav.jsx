import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
  const getLinkClass = ({ isActive }) =>
    [
      'w-full block text-center rounded px-2 py-1.5 transition-colors',
      isActive ? 'bg-white/20 text-white' : 'hover:bg-white/20',
    ].join(' ');

  return (
    <nav className="w-full h-full px-2 py-3 md:py-4" id="admin-nav">
      <ul className="flex w-full flex-row gap-2 overflow-x-auto md:flex-col md:gap-4 font-bold text-sm sm:text-base md:text-lg text-white md:overflow-visible">
        <li className="min-w-[120px] md:min-w-0 flex justify-center items-center bg-white/10 border border-white/20 backdrop-blur-md rounded-lg p-2">
          <NavLink className={getLinkClass} to="/admin/user">
            users
          </NavLink>
        </li>
        <li className="min-w-[120px] md:min-w-0 flex justify-center items-center bg-white/10 border border-white/20 backdrop-blur-md rounded-lg p-2">
          <NavLink className={getLinkClass} to="/admin/contacts">
            contacts
          </NavLink>
        </li>
        <li className="min-w-[120px] md:min-w-0 flex justify-center items-center bg-white/10 border border-white/20 backdrop-blur-md rounded-lg p-2">
          <NavLink className={getLinkClass} to="/services">
            service
          </NavLink>
        </li>
        <li className="min-w-[120px] md:min-w-0 flex justify-center items-center bg-white/10 border border-white/20 backdrop-blur-md rounded-lg p-2">
          <NavLink className={getLinkClass} to="/">
            home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav