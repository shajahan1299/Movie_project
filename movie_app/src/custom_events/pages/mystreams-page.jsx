import React from 'react'
import EventSidebar from '../componets/event-siderbar'
import MyStreams from '../componets/mystreams'

function MyStreamsPage() {
  return (
    <>
    <EventSidebar mystreams={"sidebar-item active"} />
    <MyStreams/>
    
    </>
  )
}

export default MyStreamsPage