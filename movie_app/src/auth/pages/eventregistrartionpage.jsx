import React from 'react'
import Footer from '../../footer/footer'
import Publicnavbarblack from '../componets/publicnavbarblack'
import EventRegistration from '../componets/eventregistration'

function EventRegistrationPage() {
  return (
    <div>
         <Publicnavbarblack activehost="active" />
         <EventRegistration/>
        <Footer/>
    </div>
  )
}

export default EventRegistrationPage