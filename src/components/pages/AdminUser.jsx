import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const {isAuthorization , API} = useAuth();
    
    const fetchUsers = async()=>{
      try {
        const response = await fetch(`${API}/admin/users`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Authorization":isAuthorization,
          }
        })
        if(!response.ok){
          console.log("Failed to fetch users");
        }
        const resdata = await response.json();
        console.log('here is data',resdata);
        setUsers(resdata.data);
      } catch (error) {
        console.log(error);
      }
    }


    const deleteuser = async(id)=>{
      try {
        const response = await fetch(`${API}/admin/users/${id}`,{
          method:"DELETE",
          headers:{
            "Content-Type":"application/json",
            "Authorization":isAuthorization,
          }

        })
        if(!response.ok){
          console.log("Failed to delete user");
        }else{
          console.log("User deleted successfully");
          // Optionally, you can refresh the user list after deletion
          fetchUsers();
        }

      } catch (error) {
         console.log(error);
        
      }
    };
   
   
    useEffect(()=>{
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchUsers();
     
    },[]);
  return (
    <>
    <div className="w-full h-full flex justify-center items-start p-6">
  <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden">

    <table className="w-full hidden md:table">
      <thead>
        <tr className="bg-red-500/80 text-white text-left">
          <th className="py-3 px-4">Name</th>
          <th className="py-3 px-4">Email</th>
          <th className="py-3 px-4">Role</th>
          <th className="py-3 px-4">Edit</th>
          <th className="py-3 px-4">Delete</th>
        </tr>
      </thead>

      <tbody className="text-white/90">
        {users.map((curelem) => (
          <tr
            key={curelem._id}
            className="border-b border-white/10 hover:bg-white/5 transition"
          >
            <td className="py-3 px-4">{curelem.username}</td>
            <td className="py-3 px-4">{curelem.email}</td>
            <td className="py-3 px-4">{curelem.isAdmin ? "Admin" : "User"}</td>
            <td className="py-3 px-4">
              <Link
                to={`/admin/user/update/${curelem._id}`}
                className="inline-block rounded-lg bg-blue-500/70 px-3 py-1 text-white transition hover:bg-blue-600"
              >
                Edit
              </Link>
            </td>
            <td className="py-3 px-4">
              <button className="px-3 py-1 bg-red-500/70 rounded-lg text-white hover:bg-red-600 transition " onClick={()=>deleteuser(curelem._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* MOBILE VIEW */}
    <div className="md:hidden p-4 space-y-4">
      {users.map((curelem) => (
        <div
          key={curelem._id}
          className="bg-white/10 border border-white/20 rounded-xl p-4 text-white/90 space-y-2 shadow-lg"
        >
          <div>
            <span className="font-semibold">Name: </span> {curelem.username}
          </div>
          <div>
            <span className="font-semibold">Email: </span> {curelem.email}
          </div>
          <div>
            <span className="font-semibold">Role: </span> {curelem.isAdmin ? "Admin" : "User"}
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              to={`/admin/user/update/${curelem._id}`}
              className="flex-1 rounded-lg bg-blue-500/70 py-2 text-center text-white transition hover:bg-blue-600"
            >
              Edit
            </Link>
            <button className="flex-1 py-2 bg-red-500/70 rounded-lg text-white hover:bg-red-600 transition" onClick={()=>deleteuser(curelem._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </>
  )
}

export default AdminUser