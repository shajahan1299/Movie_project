import React, { useEffect, useState } from "react";
import Footer from "../../footer/footer";
import UserNavBar from "../usernavbar/usernavbar";
import axios from "axios";
import { baseUrl } from "../../config/config";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

function Subscription() {
  const userId = localStorage.getItem("userId");
  const [subscriptionPlan, setSubscriptionPlan] = useState("basic");
  const [refresh, setRefresh] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.toast) {
      toast(
        location.state.msg,
        {
          duration: 3000,
        }
      );
    }
  }, [location]);

  useEffect(() => {
    const fetchSubscriptionPlan = async () => {
      if (!userId) return; // Prevent API call if userId is null

      try {
        const response = await axios.get(
          `${baseUrl}/api/get-my-subscriptions/${userId}`
        );
        setSubscriptionPlan(response.data.subscription_plan);
        console.log(response.data.subscription_plan);
      } catch (error) {
        console.error("Error fetching subscription plan:", error);
      }
    };

    fetchSubscriptionPlan();
  }, [userId, refresh]); // ✅ Added userId to the dependency array


  async function displayRazorpay(totalPrice, plan) {
    const subscription_plan = plan;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post("https://movie-backend-1-a9jv.onrender.com/payment/orders", {
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
          "https://movie-backend-1-a9jv.onrender.com/payment/success",
          data
        );
        if (result.data.msg === "success") {
          alert("Payment done successfully!. Your Subscription is processing");
        }
        const orderId = result.data.orderId;
        const paymentId = result.data.paymentId;
        if (result.data.msg === "success") {
          PurchasePlan(
            orderId,
            paymentId,
            amount.toString(),
            subscription_plan
          );
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

  const PurchasePlan = (orderId, paymentId, amount, plan) => {
    console.log("my data to be passed...");
    const subscription_plan = plan;
    let plan_validity;

    if (subscription_plan === "standard") {
      plan_validity = "6";
    } else {
      plan_validity = "12";
    }

    const currentDate = new Date();
let expirationDate;

if (plan_validity === "6") {
  expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, currentDate.getDate(), 18, 30, 0, 0);

} else if (plan_validity === "12") {
  expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 12, currentDate.getDate(), 18, 30, 0, 0);

}

const payment_date = Date.now();
const mydata = {
  userId,
  subscription_plan,
  orderId,
  paymentId,
  payment_date,
  plan_validity: expirationDate.toISOString(),
};
    console.log(mydata);

    axios
      .post(`${baseUrl}/api/subscriptions`, mydata)
      .then((response) => {
        console.log("Data posted successfully:", response.data);
        setRefresh(!refresh);
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  return (
    <div>
      <UserNavBar />
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <section className="section">
        <br />
        <br />
        <center>
          <h4 className="card-title">Choose Your Movie Subscription Plan</h4>
        </center>

        <div className="col-12 col-md-8 offset-md-2">
          <div className="pricing">
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="card">
                  <Basic />
                  <div className="card-footer">
                    {subscriptionPlan === "basic" ? (
                      <>
                        <button className="btn btn-success btn-block">
                          {" "}
                          <i className="bi bi-check-circle" /> Current Plan
                        </button>
                      </>
                    ) : (
                      <>
                        <AddTaskIcon />
                        <span style={{ paddingLeft: "10px" }}>
                          You are on {subscriptionPlan}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card card-highlighted">
                  <Standard />
                  <div className="card-footer">
                    {subscriptionPlan === "standard" ? (
                      <button className="btn btn-outline-white btn-block btn btn-success ">
                        {" "}
                        <i className="bi bi-check-circle" /> Current Plan
                      </button>
                    ) : subscriptionPlan === "premium" ? (
                      <div style={{ color: "white" }}>
                        <AddTaskIcon />
                        <span style={{ paddingLeft: "10px" }}>
                          You are on {subscriptionPlan}
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => displayRazorpay("299", "standard")}
                        className="btn btn-outline-white btn-block"
                      >
                        Order Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <Premium />
                  <div className="card-footer">
                    {subscriptionPlan === "premium" ? (
                      <>
                        <button className="btn btn-success btn-block">
                          {" "}
                          <i className="bi bi-check-circle" /> Current Plan
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => displayRazorpay("499", "premium")}
                          className="btn btn-primary btn-block"
                        >
                          Order Now
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
}

export default Subscription;

function Basic() {
  return (
    <>
      <div className="card-header text-center">
        <h4 className="card-title">Basic</h4>
        <p className="text-center">Access to limited movies</p>
      </div>
      <h1 className="price">Free</h1>
      <ul>
        <li>
          <i className="bi bi-check-circle" />
          Booking Available
        </li>
        <li>
          <i className="bi bi-check-circle" />
          View all Movies
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Save Movies
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Edit Profile
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Book Events
        </li>
        <li>
          <i className="bi bi-check-circle" />
          HD streaming available
        </li>
      </ul>
    </>
  );
}

function Premium() {
  return (
    <>
      <div className="card-header text-center">
        <h4 className="card-title">Premium</h4>
        <p className="text-center">Exclusive access and features</p>
      </div>

      <h1 className="price">₹499</h1>
      <ul>
        <li>
          <i className="bi bi-check-circle" />1 Year Plan
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Booking Available
        </li>

        <li>
          <i className="bi bi-check-circle" />
          Save Movies
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Edit Profile
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Book Events
        </li>

        <li>
          <i className="bi bi-check-circle" />
          Access to unlimited movies
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Watch all Movies
        </li>

        <li>
          <i className="bi bi-check-circle" />
          Stream all available movies
        </li>
      </ul>
    </>
  );
}

function Standard() {
  return (
    <>
      <div className="card-header text-center">
        <h4 className="card-title">Standard</h4>
        <p />
      </div>
      <h1 className="price text-white">₹299</h1>
      <ul>
        <li>
          <i className="bi bi-check-circle" />6 Months Plan
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Booking Available
        </li>
        <li>
          <i className="bi bi-check-circle" />
          View all Movies
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Save Movies
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Edit Profile
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Book Events
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Access to unlimited movies
        </li>
      </ul>
    </>
  );
}
