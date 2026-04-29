import React from 'react'
import { Outlet , useNavigate} from 'react-router-dom'
import AdminNav from './AdminNav'
import { useAuth  } from '../store/auth'

const AdminLayout = () => {

const Navigate = useNavigate();
const { user ,isLoggedin ,isLoading} = useAuth();

if (isLoading) {
    return <div className='w-full h-screen flex justify-center items-center text-3xl font-bold text-gray-700'>Loading...</div>
}

if (user.isAdmin === false || user.isAdmin === "" || user.isAdmin === undefined || isLoggedin === false) {  
    return Navigate("/login")
    
}
    return (
        <>
            <div className="w-full h-screen bg-gray-900 " >
                <header className="text-3xl bg-amber-600 text-white font-bold pl-7 h-[10%] w-full flex justify-start items-center mb-2.5 rounded">
                    Hello Admin :
                </header>

                <main className="w-full h-[88%] flex flex-col md:flex-row gap-2 px-1.5 pb-1">

                    {/* SIDEBAR */}
                    <aside className="w-full md:w-1/5 bg-gray-700 h-auto md:h-full rounded">
                        <AdminNav />
                    </aside>

                    {/* CONTENT SECTION */}
                    <section className="w-full md:w-4/5 bg-gray-700 h-full rounded overflow-auto p-3">
                        <Outlet />
                    </section>

                </main>
            </div>

        </>
    )
}

export default AdminLayout