import React from 'react'
import AddNewEvent from '../componets/event-add'
import EventSidebar from '../componets/event-siderbar'

function AddnewEventPage() {
  return (
    <div>
          <EventSidebar addevent={"sidebar-item active"} />
          <AddNewEvent/>
    </div>
  )
}

export default AddnewEventPage