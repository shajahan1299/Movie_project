import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { useNavigate } from 'react-router-dom';
import UserNavBar from '../usernavbar/usernavbar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import GoBackButton from '../../public/gobackButton';

function UserViewMyTickets() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [ticketDetails, setTicketDetails] = useState([]);

  const handleNavigation = (selectedTicket) => {

    
    const passingData = {
      title:selectedTicket[0].eventId.event_name,
      amount: selectedTicket[0].amount,
      bookingDate: selectedTicket[0].bookingDate,
      location: selectedTicket[0].location,
      paymentId: selectedTicket[0].paymentId,
      paymentTime: selectedTicket[0].paymentTime,
      posterUrl: selectedTicket[0].posterUrl,
      razorpayOrderId: selectedTicket[0].razorpayOrderId,
      seatNumber: selectedTicket.map(ticket => ticket.seatNumber).join(', '),

      eventStartsAt: selectedTicket[0].eventStartsAt,
      status: selectedTicket[0].status,
      ticketCount: selectedTicket[0].ticketCount
    };
    navigate('/my-event-ticket', { state: passingData });
  };

  useEffect(() => {
    // Fetch ticket details by userId
    axios.get(`${baseUrl}/api/getmyeventbooking/${userId}`)
      .then((response) => {
        console.log(response.data);
        setTicketDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching ticket details:', error);
      });
  }, [userId]);

  return (
    <div>
      <UserNavBar />
      <div className="container mt-5">
        <GoBackButton/>
        <h2>Ticket Details</h2>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button onClick={() => { navigate('/mybookings') }}>Movie Tickets</Button>
          <Button onClick={() => { navigate('/mybookings-events') }}>Events Tickets</Button>
        </ButtonGroup>
        {ticketDetails.length > 0 ? (
          <div className="card mt-3">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Event Details</th>
                    <th>Booking Details</th>
                    <th>Payment ID</th>
                    <th>View My Ticket</th>
                    <th>Seat No/Count</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketDetails.map((ticket, index) => {
                    const isNewPaymentId = index === 0 || ticketDetails[index - 1].paymentId !== ticket.paymentId;
                    const selectedSeats = ticketDetails.filter(t => t.paymentId === ticket.paymentId);


                    const eventTimeParts = ticket.eventStartsAt.split(":");
                    let hour = parseInt(eventTimeParts[0]);
                    const minute = eventTimeParts[1];
                    let period = "AM";
                    
                    if (hour >= 12) {
                      period = "PM";
                      if (hour > 12) {
                        hour -= 12;
                      }
                    }
                    
                    const formattedTime = `${hour}:${minute} ${period}`;



                    return (
                      <tr key={index}>
                        {isNewPaymentId && (
                          <>
                            <td rowSpan={selectedSeats.length}>
                              <div className="movie-card">
                                <h4>{ticket.eventId.event_name}</h4>
                                <img
                                  src={`${baseUrl}/event_poster/${ticket.posterUrl}`}
                                  alt={`${ticket.event_name} Poster`}
                                  style={{ width: '100px', height: '150px', borderRadius: '10px' }}
                                />
                              </div>
                            </td>
                            <td rowSpan={selectedSeats.length}>
                           
                              <strong>Organizer: {ticket.organizer}</strong><br />
                              <strong>Location: {ticket.location}</strong><br />
                              <strong>Event starts at: {formattedTime}</strong><br />
                              <strong>Show Date:</strong> {new Date(ticket.bookingDate).toLocaleDateString()}<br />
                            </td>
                            <td rowSpan={selectedSeats.length}>
                              <strong>Booking Status:</strong> {ticket.status}<br />
                              <strong>Razorpay Order ID:</strong> {ticket.razorpayOrderId}
                            </td>
                            <td rowSpan={selectedSeats.length}>
                              {ticket.paymentId}
                            </td>
                            <td rowSpan={selectedSeats.length}>
                              <button className='btn btn-success' onClick={() => handleNavigation(selectedSeats)}>My Ticket</button>
                            </td>
                          </>
                        )}
                        <td>
                        <div className='cols'>
  {ticket.seatNumber === "" ? ticket.ticketCount : ticket.seatNumber}
</div>

                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card mt-3">
          <div className="card-body">
               <i className="bi bi-exclamation-circle text-danger fs-1"></i> {/* Bootstrap icon */}
            <h5 className="card-title">No Ticket Details Found</h5>
            <p className="card-text">We couldn't find any ticket details for you.</p>
            <p className="card-text">Please try again later or contact support for assistance.</p>
         
          </div>
        </div>
        
        )}
      </div>
    </div>
  );
}

export default UserViewMyTickets;
