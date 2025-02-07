import React from 'react'
import AdminSidebar from '../../sidebar/admin_sidebar'
import AdminViewHost from '../componets/admin_view_host'

function AdminViewHostPage() {
  return (
    <div>
        <AdminSidebar host={"sidebar-item active"} />
        <AdminViewHost/>
    </div>
  )
}

export default AdminViewHostPage