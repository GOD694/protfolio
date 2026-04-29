import React, { useEffect } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
const {LogoutUser} = useAuth();
const Navigate = useNavigate();

    useEffect(()=>{
        LogoutUser();
        Navigate("/login")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>logging out...</div>
  )
}

export default Logout