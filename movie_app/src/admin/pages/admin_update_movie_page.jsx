import React from 'react'
import AdminSidebar from '../../sidebar/admin_sidebar'
import UpdateMovie from '../componets/admin_update_movies'

function AdminUpadateMoviePage() {
  return (
    <>
    <AdminSidebar viewmovie={"sidebar-item active"}/>
    <UpdateMovie/>
    </>
  )
}

export default AdminUpadateMoviePage