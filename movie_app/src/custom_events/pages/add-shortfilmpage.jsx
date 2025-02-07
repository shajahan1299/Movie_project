import React from 'react'
import EventSidebar from '../componets/event-siderbar'
import AddShortFilm from '../componets/add-shortfilm'


function AddShortFilmPage() {
  return (
    <div>
        <EventSidebar addshortfilm={"sidebar-item active"} />
        <AddShortFilm/>
    </div>
  )
}

export default AddShortFilmPage