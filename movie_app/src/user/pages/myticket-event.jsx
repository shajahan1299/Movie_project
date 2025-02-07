import React from "react";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../config/config";
import QRCode from "qrcode.react";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import UserNavBar from "../usernavbar/usernavbar";
import Footer from "../../footer/footer";
import GoBackButton from "../../public/gobackButton";

function MyticketEvent() {
    const location = useLocation();
    console.log(location.state);
    const {
        title,
        amount,
        bookingDate,
        location: eventLocation,
        paymentId,
        paymentTime,
        posterUrl,
        razorpayOrderId,
        seatNumber,
        eventStartsAt,
        status,
        ticketCount
    } = location.state;

    const bookingDateFormatted = new Date(bookingDate).toLocaleDateString();
    const options = {
        method: "open",
        resolution: Resolution.HIGH, // Use Resolution.HIGH for higher resolution
        page: {
            margin: Margin.SMALL,
            format: "letter",
            orientation: "landscape",
        },
        canvas: {
            mimeType: "image/jpeg",
            qualityRatio: 0.8,
        },
        overrides: {
            pdf: {
                compress: true,
            },
            canvas: {
                useCORS: true,
            },
        },
    };
    const getTargetElement = () => document.getElementById("content-id");

    return (
        <>
            <UserNavBar />
            <GoBackButton/>
            <br />
            <div className="container" id="content-id">
                <div className="col-xl-4 col-md-6 col-sm-12 mx-auto">
                    <div className="card">
                        <div className="card-content">
                            <div style={{ margin: '20px' }}>
                                <div class="row justify-content-md-center">
                                    <div class="col ">
                                        <img
                                            src={`${baseUrl}/event_poster/${posterUrl}`}
                                            alt={`Poster`}
                                            className="img-fluid rounded"
                                            style={{ width: "190px", height: "260px" }}
                                        />
                                    </div>
                                    <div class="col-md-auto">
                                        <QRCode
                                            value={`Event Location: ${eventLocation} | Event Start Time: ${eventStartsAt} | Seat Number: ${seatNumber} | Payment ID: ${paymentId}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">
                                    Location: {eventLocation} <br />
                                    Event Start Time: {eventStartsAt} <br />
                                    Booking Date: {bookingDateFormatted} <br />
                                    Payment Status: <span style={{ color: 'green', fontWeight: 'bold' }}>{status}</span><br/>
                                    Amount Paid: <span style={{  fontWeight: 'bold' }}>{amount}</span>

                                </p>
                            </div>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"></li>
                                {seatNumber===""? 
                                <li className="list-group-item">Tickets Count :<h3> {ticketCount}</h3></li>
                                :
                                <li className="list-group-item">Seat Number :<h3>{seatNumber}</h3></li>
                                }
                          
                            
                            <li className="list-group-item">Payment ID:{paymentId}</li>
                        </ul>
                    </div>
                </div>
                <br />
            </div>
            <div className="container text-center">
                <button className="btn btn-primary mt-3" onClick={() => generatePDF(getTargetElement, options)}>
                    Download Ticket
                </button>
              
            </div>
            <br />
            <Footer />
        </>
    );
}

export default MyticketEvent;
