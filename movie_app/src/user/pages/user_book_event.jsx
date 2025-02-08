import React, { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import UserNavBar from "../usernavbar/usernavbar";
import Footer from "../../footer/footer";
import GoBackButton from "../../public/gobackButton";
import { baseUrl } from "../../config/config";
import axios from "axios";

function UserBookEvents() {
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const myorientation = location.state.seat_arrangement;
  const rows = location.state.rows;
  const event_id = location.state.event_id;
  const columns = location.state.cols;
  const seatPrice = location.state.ticket_price;

  const ticket_availability = location.state.ticket_availability;
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedseats, setbookedseats] = useState("");

  useEffect(() => {
    if (!event_id) return; // Prevent API call if event_id is null or undefined
  
    const mydata = {
      event_id: event_id,
    };
  
    axios
      .get(`${baseUrl}/api/fetcheventseats`, {
        params: mydata,
      })
      .then((response) => {
        console.log("Response:", response.data); // Log the response data
        if (response.data) {
          setbookedseats(response.data.BookedSeats);
          console.log("Booked Seats:", response.data.BookedSeats); // Log the booked seats
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [event_id, selectedSeats]); // ✅ Added event_id to the dependency array

  const [ticketAvailability, setTicketAvailability] = useState(null);

  useEffect(() => {
    if (!event_id) return; // Prevent API call if event_id is null or undefined
  
    const fetchTicketAvailability = () => {
      axios
        .get(`${baseUrl}/api/ticket_availability/${event_id}`)
        .then((response) => {
          console.log(response.data.count);
          setTicketAvailability(response.data.count);
        })
        .catch((error) => {
          console.error("Error fetching ticket availability:", error);
        });
    };
  
    fetchTicketAvailability();
  }, [event_id, selectedSeats]); // ✅ Added event_id to the dependency array
  

  const [totalPrice, settotalPrice] = useState(seatPrice);
  const totalPrice2 = selectedSeats.length * seatPrice;

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const unavailable = myorientation ? myorientation.split(",") : [];
  const myBooking = bookedseats ? bookedseats.split(",") : [];

  const isBooked = (seatNumber) => myBooking.includes(seatNumber);

  const handleClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats((prevSeats) =>
        prevSeats.filter((seat) => seat !== seatNumber)
      );
    } else {
      setSelectedSeats((prevSeats) => [...prevSeats, seatNumber]);
    }
  };

  const handleIncrease = () => {
    setTicketQuantity(ticketQuantity + 1);
    settotalPrice(seatPrice * (ticketQuantity + 1)); // Use the updated ticketQuantity
  };

  const handleDecrease = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity(ticketQuantity - 1);
      settotalPrice(seatPrice * (ticketQuantity - 1)); // Use the updated ticketQuantity
    }
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(totalPrice) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post("http://localhost:5000/payment/orders", {
      totalPrice,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_vwFYRANZsk49Qu", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Movie Verse.",
      description: "Test Transaction",
      image: {},
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:5000/payment/success",
          data
        );
        if (result.data.msg === "success") {
          alert("Payment done successfully!. Your booking is processing");
        }
        const orderId = result.data.orderId;
        console.log(orderId);
        const paymentId = result.data.paymentId;
        console.log(paymentId);
        if (result.data.msg === "success") {
          bookmyevent(orderId, paymentId, amount.toString());
        }
      },
      prefill: {
        name: "Movie Verse",
        email: "movieverse@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Movie verse Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const bookmyevent = (orderId, paymentId, amount) => {
    // Handling selectedSeats
    let seats = selectedSeats.length > 0 ? selectedSeats : "";

    // Handling ticketQuantity
    let quantity = selectedSeats.length > 0 ? 0 : ticketQuantity;

    const data = {
      userId: userId,
      event_id: event_id,
      selectedSeats: seats,
      ticketQuantity: quantity,
      amount: amount,
      paymentId: paymentId,
      orderId: orderId,
    };

    axios
      .post(`${baseUrl}/api/eventbookings`, data)
      .then((response) => {
        console.log("Booking successful:", response.data);

        console.log("useState:", response.data.BookedSeats);
        if (response.data.status === true) {
          alert("Booking successful! Your seats have been reserved.");
          setSelectedSeats([]);
        } else {
          alert("Booking failed. Contact Admin.");
        }
        console.log(bookedseats);
      })
      .catch((error) => {
        console.error("Booking failed:", error);
      });
  };

  return (
    <div>
      <UserNavBar activehome="active" />

      {ticket_availability === 0 ? (
        <>
          {myorientation ? (
            <>
              <div>
                <GoBackButton />
                <center>
                  <h2>Select Your Seats</h2>
                </center>
                <div
                  className="seat-grid"
                  style={{ margin: "80px", padding: "90px" }}
                >
                  {(() => {
                    const seatRow = [];
                    for (let i = 0; i < rows; i++) {
                      const seatCols = [];
                      for (let j = 1; j <= columns; j++) {
                        const seatNumber = alphabet[i] + "-" + j;
                        const seatNo = alphabet[i] + "-" + j;
                        const isSelected = selectedSeats.includes(seatNumber);
                        const isUnavailable = unavailable.includes(seatNo);
                        const isBookedSeat = isBooked(seatNumber);
                        const backgroundColor = isSelected
                          ? "#25CA00"
                          : isBookedSeat
                          ? "#e33545"
                          : "";

                        seatCols.push(
                          <div className="seat" key={seatNumber}>
                            {isUnavailable ? (
                              <div className="seat unavailable"></div>
                            ) : (
                              <div>
                                {isBookedSeat ? (
                                  <button
                                    className="btn btn-outline-dark btn-sm"
                                    style={{
                                      fontSize: "12px",
                                      backgroundColor: backgroundColor,
                                      height: "38px",
                                      width: "38px",
                                      cursor: "not-allowed",
                                    }}
                                  >
                                    {alphabet[i] + "" + j}
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-outline-dark btn-sm"
                                    style={{
                                      fontSize: "12px",
                                      backgroundColor: backgroundColor,
                                      height: "38px",
                                      width: "38px",
                                    }}
                                    onClick={() => handleClick(seatNumber)}
                                  >
                                    {alphabet[i] + "" + j}
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }
                      seatRow.push(
                        <div className="myrow" key={i}>
                          {seatCols}
                        </div>
                      );
                    }
                    return seatRow;
                  })()}
                </div>
              </div>
              <div
                className="card"
                style={{ marginLeft: "200px", marginRight: "200px" }}
              >
                <div className="card-body">
                  <div className="card mb-3"></div>

                  <h5 className="card-title">Selected Seats:</h5>
                  <div className="billing-container">
                    <div className="selected-seats">
                      {selectedSeats.map((seat, index) => (
                        <span
                          className="badge rounded-pill bg-success"
                          style={{ marginLeft: "5px" }}
                          key={index}
                        >
                          {seat}{" "}
                        </span>
                      ))}
                    </div>
                    <div className="billing-info">
                      <p>Total Price: ₹{totalPrice2}</p>
                      <p>Buy Now!</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => displayRazorpay(totalPrice2)}
                        disabled={totalPrice2 === 0}
                      >
                        Pay ₹{totalPrice2}
                      </button>

                      <button
                        style={{ marginLeft: "20px" }}
                        className="btn btn-primary"
                        onClick={() => {
                          setSelectedSeats([]);
                        }}
                      >
                        Clear Selection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          <GoBackButton />

          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Event Ticket Booking</h5>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <button className="btn btn-danger" onClick={handleDecrease}>
                  -
                </button>
                <span className="quantity mx-3">{ticketQuantity}</span>
                <button className="btn btn-danger" onClick={handleIncrease}>
                  +
                </button>
              </div>
              <p className="card-text">
                <strong>Total Tickets:</strong> {ticketQuantity}
                <br />
                <strong>Total Amount:</strong> {totalPrice}
              </p>
              {ticketAvailability !== null &&
              ticketQuantity > ticketAvailability ? (
                <p>All tickets are sold out. Sorry for the inconvenience.</p>
              ) : (
                <>
                  <p>Tickets available: {ticketAvailability}</p>
                  <p className="card-text">
                   By booking tickets, you agree to our{" "}
                 <a href="/privacy-policy">Privacy Policy</a>.
                  </p>
                  {ticketAvailability !== null && ticketAvailability > 0 ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => displayRazorpay(totalPrice)}
                    >
                      Proceed to Payment
                    </button>
                  ) : (
                    <p>No tickets available for booking.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default UserBookEvents;
