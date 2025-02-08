import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function AddNewEvent() {
  const userId = localStorage.getItem("userId");
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(10);
  const [unavailableseats, setunavailableseats] = useState([]);
  const [selectedSeats] = useState([]);

  const handleClick = (seatNumber) => {
    //console.log(unavailableseats);
    if (unavailableseats.includes(seatNumber)) {
      setunavailableseats((prevUnavailableSeats) =>
        prevUnavailableSeats.filter((seat) => seat !== seatNumber)
      );
    } else {
      setunavailableseats((prevUnavailableSeats) => [
        ...prevUnavailableSeats,
        seatNumber,
      ]);
    }
  };

  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("event_name", data.event_name);
    formData.append("event_type", data.event_type);
    formData.append("location", data.location);
    formData.append("event_date", data.event_date);
    formData.append("event_time", data.event_time);
    formData.append("ticket_price", data.ticket_price);
 
    formData.append("description", data.description);
    formData.append("rows", rows);
    formData.append("cols", columns);

    if (isChecked === true) {
      formData.append("ticket_availability", 0);
      formData.append("seat_arrangement", unavailableseats);
    } else {
      formData.append("ticket_availability", data.ticket_availability);
      formData.append("seat_arrangement", "no");
    }

    if (file) {
      formData.append("poster_url", file);
      const imageUrl = URL.createObjectURL(file);
      console.log("Image URL:", imageUrl);
    }

    if (!formData.get("poster_url")) {
      alert("Poster URL is required");
      return; // Stop execution if poster_url is empty
    } else {
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
    }

    axios
      .post("http://localhost:5000/api/addevent", formData)
      .then((response) => {
        console.log("Success:", response.data); // Use response.data.message if available
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error");
      });
  };

  //console.log(errors);

  const validationRules = {
    event_name: {
      required: "Event name is required",
      minLength: {
        value: 3,
        message: "Event name must have at least 3 characters",
      },
    },
    event_type: {
      required: "Event type is required",
    },
    location: {
      required: "Location is required",
    },
    event_date: {
      required: "Event date is required",
      validate: {
        futureDate: (value) => {
          const selectedDate = new Date(value);
          const currentDate = new Date();
          
          if (selectedDate < currentDate) {
            return "Event date should not be in the past";
          }
          return true;
        }
      }
    },
    event_time: {
      required: "Event Time is required",
    },
    ticket_price: {
      required: "Ticket price is required",
      validate: {
        nonNegative: (value) => {
          if (parseFloat(value) < 0) {
            return "Ticket price cannot be negative";
          }
          return true;
        },
        lessThanTwoThousandFiveHundred: (value) => {
          if (parseFloat(value) > 2500) {
            return "Ticket price must be less than or equal to 2500";
          }
          return true;
        }
      }
    },
    ticket_availability: {
      required: "Ticket availability is required",
      validate: {
        nonNegative: (value) => {
          if (parseInt(value) < 0) {
            return "Ticket count cannot be negative";
          }
          return true;
        },
        lessThanTenThousand: (value) => {
          if (parseInt(value) >= 10000) {
            return "Ticket count must be less than 10,000";
          }
          return true;
        }
      }
    },
   
    description: {
      required: "Description is required",
    },
    poster_url: {
      required: "**Poster URL is required",
    },
    rows: {
      required: "Number of Rows is required",
      max: {
        value: 20,
        message: "Number of Rows must not exceed 20",
      },
    },
    columns: {
      required: "Number of Columns is required",
      max: {
        value: 25,
        message: "Number of Columns must not exceed 25",
      },
    },
  };

  return (
    <div style={{ backgroundColor: "#f2f7ff" }}>
      <div id="main">
        <header className="mb-3">
          <p className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3"></i>
          </p>
        </header>
        <div className="page-heading">
          <div>
            <h3>Host New Event</h3>
          </div>
        </div>
        <div className="page-content">
          <section id="multiple-column-form">
            <div className="row match-height">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-eventname">
                      Add new Event using below form
                    </h4>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <form
                        className="form form-horizontal"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="form-body">
                          <div className="row">
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Event Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="event_name"
                                  {...register(
                                    "event_name",
                                    validationRules.event_name
                                  )}
                                  placeholder="Event Name"
                                />
                                <p className="text-danger">
                                  {errors?.event_name &&
                                    errors.event_name.message}
                                </p>
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Event Type</label>
                                <select
                                  className="btn  dropdown-toggle dropdown-toggle-split"
                                  name="event_type"
                                  defaultValue=""
                                  {...register(
                                    "event_type",
                                    validationRules.event_type
                                  )}
                                >
                                  <option value="">Select Event Type</option>
                                  <option value="Music Show">Music Show</option>
                                  <option value="Dance Show">Dance Show</option>
                                  <option value="Promotion">
                                    Promotion Event
                                  </option>
                                  <option value="Conference">Conference</option>
                                  <option value="Exhibition">Exhibition</option>
                                  <option value="Comedy Show">
                                    Comedy Show
                                  </option>
                                  <option value="Fashion Show">
                                    Fashion Show
                                  </option>
                                  <option value="Workshop">Workshop</option>
                                  <option value="Cultural Show">Cultural Show</option>

                                  {/* Add more event types here */}
                                </select>
                                <p className="text-danger">
                                  {errors?.event_type &&
                                    errors.event_type.message}
                                </p>{" "}
                              </div>
                            </div>

                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Location</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="location"
                                  {...register(
                                    "location",
                                    validationRules.location
                                  )}
                                  placeholder="Event Location"
                                />
                                <p className="text-danger">
                                  {errors?.location && errors.location.message}
                                </p>{" "}
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Event Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="event_date"
                                  {...register(
                                    "event_date",
                                    validationRules.event_date
                                  )}
                                />
                                <p className="text-danger">
                                  {errors?.event_date &&
                                    errors.event_date.message}
                                </p>{" "}
                              </div>
                            </div>

                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Event Time</label>
                                <input
                                  type="time"
                                  className="form-control"
                                  name="event_time"
                                  {...register(
                                    "event_time",
                                    validationRules.event_time
                                  )}
                                />
                                <p className="text-danger">
                                  {errors?.event_time &&
                                    errors.event_time.message}
                                </p>
                              </div>
                            </div>

                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Ticket Price</label>{" "}
                                <input
                                  type="number"
                                  className="form-control"
                                  name="ticket_price"
                                  {...register(
                                    "ticket_price",
                                    validationRules.ticket_price
                                  )}
                                  placeholder="Ticket Price"
                                />
                                <p className="text-danger">
                                  {errors?.ticket_price &&
                                    errors.ticket_price.message}
                                </p>
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              {isChecked ? (
                                <div class="form-group">
                                  <label for="disabledInput">
                                    Ticket Count
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="disabledInput"
                                    placeholder="Ticket Count"
                                    disabled
                                  />
                                </div>
                              ) : (
                                <div class="form-group">
                                  <label>Ticket Count</label>{" "}
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="ticket_availability"
                                    {...register(
                                      "ticket_availability",
                                      validationRules.ticket_availability
                                    )}
                                    placeholder="ticket_availability"
                                  />
                                  <p className="text-danger">
                                    {errors?.ticket_availability &&
                                      errors.ticket_availability.message}
                                  </p>
                                </div>
                              )}
                            </div>

                           
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Description</label>{" "}
                                <textarea
                                  className="form-control"
                                  name="description"
                                  {...register(
                                    "description",
                                    validationRules.description
                                  )}
                                  placeholder="Event description"
                                ></textarea>
                                <p className="text-danger">
                                  {errors?.description &&
                                    errors.description.message}
                                </p>
                              </div>
                            </div>

                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Poster URL</label>{" "}
                                <input
                                  type="file"
                                  className="form-control"
                                  name="poster_url"
                                  onChange={(e) => setFile(e.target.files[0])}
                                />
                                <p className="text-danger">
                                  {errors?.poster_url &&
                                    errors.poster_url.message}
                                </p>
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group"></div>

                              <div class="form-check form-switch">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={handleCheckboxChange}
                                  id="flexSwitchCheckDefault"
                                />

                                <label
                                  class="form-check-label"
                                  for="flexSwitchCheckDefault"
                                >
                                  <p>Turn On Seating Arrangement</p>
                                </label>
                              </div>
                            </div>
                            {isChecked && (
                              <div class="seat-grid ">
                                <div className="row">
                                  <div class="form-group col-md-6">
                                    <label for="inputEmail4">
                                      Number of rows
                                    </label>
                                    <input
                                      type="number"
                                      class="form-control"
                                      id="inputEmail4"
                                      placeholder="Number of rows"
                                      value={rows}
                                      name="rows"
                                      {...register(
                                        "rows",
                                        validationRules.rows
                                      )}
                                      onChange={(event) => {
                                        const newValue = parseInt(event.target.value, 10); // Parse the input value to an integer
                                        if (!isNaN(newValue) && newValue >= 2 && newValue <= 25) { // Check if it's a valid number between 2 and 25
                                          setRows(newValue);
                                        }
                                      }}
                                      
                                    />
                                    <p className="text-danger">
                                      {errors?.rows && (
                                        <p className="text-danger">
                                          {errors.rows.message}
                                        </p>
                                      )}
                                    </p>
                                  </div>

                                  <div class="form-group col-md-6">
                                    <label for="inputPassword4">
                                      Number of Columns
                                    </label>
                                    <input
                                      type="number"
                                      class="form-control"
                                      id="inputPassword4"
                                      placeholder="Number of cols"
                                      value={columns}
                                      name="columns"
                                      {...register(
                                        "columns",
                                        validationRules.columns
                                      )}
                                      onChange={(event) => {
                                        const newValue = parseInt(event.target.value, 10); // Parse the input value to an integer
                                        if (!isNaN(newValue) && newValue >= 2 && newValue <= 25) { // Check if it's a valid number between 2 and 25
                                          setColumns(newValue);
                                        }
                                      }}
                                      
                                    />
                                    <p className="text-danger">
                                      {errors?.columns && (
                                        <p className="text-danger">
                                          {errors.columns.message}
                                        </p>
                                      )}
                                    </p>
                                  </div>
                                </div>

                                <p>
                                  Design Guidelines for Your Theatre Seating
                                  Arrangement:
                                  <br></br>
                                  1. Click on a seat to designate it as
                                  unavailable.
                                  <br></br>
                                  2. Click on the same seat again to restore its
                                  availability.
                                </p>

                                {(() => {
                                  const seatRow = [];
                                  for (let i = 0; i < rows; i++) {
                                    const seatCols = [];
                                    for (let j = 1; j <= columns; j++) {
                                      const seatNumber = alphabet[i] + "-" + j;
                                      const seatno = alphabet[i] + "-" + j;
                                      const isSelected =
                                        selectedSeats.includes(seatNumber);
                                      const isUnavailable =
                                        unavailableseats.includes(seatno);
                                      //If seactno exists in the unavailable array, it means that the seat is marked as unavailable, and isUnavailable will be true.
                                      const backgroundColor = isSelected
                                        ? "#60E01C"
                                        : "";

                                      seatCols.push(
                                        <div
                                          className="seat"
                                          style={{}}
                                          key={seatNumber}
                                        >
                                          {isUnavailable ? (
                                            <button
                                              type="button"
                                              className="btn btn btn-light btn-sm"
                                              style={{ color: "#d4d4d4" }}
                                              onClick={() =>
                                                handleClick(seatno)
                                              }
                                            >
                                              X
                                            </button>
                                          ) : (
                                            <button
                                              type="button"
                                              className="btn btn-outline-dark btn-sm"
                                              style={{
                                                fontSize: "10px",
                                                backgroundColor:
                                                  backgroundColor,
                                                height: "38px",
                                                width: "50px",
                                              }}
                                              onClick={() =>
                                                handleClick(seatno)
                                              }
                                            >
                                              {alphabet[i] + "" + j}
                                            </button>
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

                                <div className="col-sm-12 d-flex justify-content-start">
                                  <button
                                    onClick={() => {
                                      setunavailableseats([]);
                                    }}
                                    type="button"
                                    class="btn btn-danger"
                                  >
                                    Restore{" "}
                                  </button>
                                </div>
                              </div>
                            )}

                            <div className="col-sm-12 d-flex justify-content-end">
                              <button
                                type="submit"
                                className="btn btn-primary me-1 mb-1"
                              >
                                Submit
                              </button>
                              <button
                                type="reset"
                                className="btn btn-light-secondary me-1 mb-1"
                              >
                                Reset
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AddNewEvent;
