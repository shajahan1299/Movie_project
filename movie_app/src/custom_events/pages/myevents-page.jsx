import React from 'react'
import EventSidebar from '../componets/event-siderbar'
import MyEvents from '../componets/myevents'

function MyEventPage() {
  return (
    <>
    <EventSidebar myevents={"sidebar-item active"} />
    <MyEvents/>
    </>
  )
}

export default MyEventPage