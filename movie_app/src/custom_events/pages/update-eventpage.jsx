import React from 'react'
import UpdateEvent from '../componets/update-event'
import EventSidebar from '../componets/event-siderbar'

function UpdateEventPage() {
  return (
    <div>
        <EventSidebar  myevents={"sidebar-item active"}/>
        <UpdateEvent/>
    </div>
  )
}

export default UpdateEventPage