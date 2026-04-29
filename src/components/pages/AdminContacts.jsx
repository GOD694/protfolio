import React, { useEffect, useState } from 'react'
import { useAuth } from "../store/auth";
const AdminContacts = () => {

  const { isAuthorization ,API } = useAuth();
  const [contactData, setContactData] = useState([]);


  //===========================================
  //get all contacts
  //===========================================

  const getAllContacts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: isAuthorization
        },
      });

      if (response.ok) {
        const resData = await response.json();
        setContactData(resData.data);
        console.log('Contacts fetched successfully:', resData.data);
      } else {
        console.error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }

  //===========================================
  // deleted by id contact
  //===========================================

    const deleteContact = async (id) => {
      try {
        const response = await fetch(`${API}/admin/contacts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: isAuthorization
          },
        });

        if (response.ok) {
          console.log('Contact deleted successfully');
          // Optionally, you can refresh the contact list after deletion
          getAllContacts();
        } else {
          console.error('Failed to delete contact');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    };

  useEffect(() => {
    getAllContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <div className="w-full h-full flex justify-center items-start p-6">
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">

          <table className="w-full hidden md:table">
            <thead>
              <tr className="bg-red-500/80 text-white text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Delete</th>
              </tr>
            </thead>

            <tbody className="text-white/90">
              {contactData.map((curElem) => (
                <tr
                  key={curElem._id}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-3 px-4">{curElem.username}</td>
                  <td className="py-3 px-4">{curElem.email}</td>
                  <td className="py-3 px-4">{curElem.phone}</td>
                  <td className="py-3 px-4 wrap-break-word">
                    {curElem.userText}
                  </td>
                  <td className="py-3 px-4">
                    <button className="px-3 py-1 bg-red-500/70 rounded-lg text-white hover:bg-red-600 transition" onClick={() => deleteContact(curElem._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* MOBILE VIEW */}
          <div className="md:hidden p-4 space-y-4">
            {contactData.map((curElem) => (
              <div
                key={curElem._id}
                className="bg-white/10 border border-white/20 rounded-xl p-4 text-white/90 space-y-2 shadow-lg"
              >
                <div>
                  <span className="font-semibold">Name: </span> {curElem.username}
                </div>
                <div>
                  <span className="font-semibold">Email: </span> {curElem.email}
                </div>
                <div>
                  <span className="font-semibold">Phone: </span> {curElem.phone}
                </div>
                <div>
                  <span className="font-semibold text-wrap">msg: </span> {curElem.userText}
                </div>

                <div className="flex gap-3 pt-2">

                  <button className="flex-1 py-2 bg-red-500/70 rounded-lg text-white hover:bg-red-600 transition" onClick={() => deleteContact(curElem._id)}>
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

export default AdminContacts