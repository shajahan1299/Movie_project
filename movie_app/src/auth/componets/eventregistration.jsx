import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function EventRegistration() {

    const {register,handleSubmit,formState:{ errors },} = useForm({mode: "onChange"});
    const navigate = useNavigate();
    const onSubmit = (data) =>
    {
      console.log(data);
      
      axios.post('https://movie-backend-1-a9jv.onrender.com/api/hostreg', data)
     .then((response) => {
       console.log('Host Registered:', response.data);
       if(response.data.navigation===true)
       {
         alert(response.data.message);
         navigate("/requestpending");
       }
       if(response.data.navigation===false)
       {
       alert(response.data.message);
        
       }
       
     })
     .catch((error) => {
       alert("Something Went Wrong");
       console.error('Error while Registering theater:', error);
  
     });
   }

    const validationRules = {
      name: {
        required: "**Name is required",
        minLength: {
          value: 2,
          message: "**Name must have at least 2 characters",
        },
        pattern: {
          value: /^[A-Za-z\s]+$/, // Allow only alphabetic characters and spaces
          message: '**Name should not contain numbers or special characters',
        },
      },
      location: {
        required: "**location is required",
        minLength: {
          value: 4,
          message: "**location must have at least 4 characters",
        },
        pattern: {
          value: /^[A-Za-z\s]+$/, // Allow only alphabetic characters and spaces
          message: '**location should not contain numbers or special characters',
        },
      },
          owner: {
            required: "**Onwer Name is required",
            minLength: {
              value: 3,
              message: "** OnwerName must have at least 3 characters",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/, // Allow only alphabetic characters and spaces
              message: '**Onwer Name should not contain numbers or special characters',
            },
          },
          email: {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/i,
              message: 'Invalid email address',
            },
          },
          
          phone: {
            required: '**Phone number is required',
            pattern: {
              value: /^[6-9]{1}[0-9]{9}$/, // Allow only valid 10-digit phone numbers starting with digits 6-9
              message: '**Invalid phone number'
            },
          },
          
        //   password: {
        //     required: '**Password is required',
        //     minLength: {
        //       value: 4,
        //       message: '**Password must have at least 4 characters',
        //     },
        //   },

          password: {
            required: '**Password is required',
            pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/,
                message: '**Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&+=!)',
            },
        },
        
          confirmPassword: {
            required: '**Confirm password is required',
            validate: (value, context) => {
              return value === context.password || '**Passwords do not match';
            },
          },
        
    }
  return (
    <div>
     
          <br></br>
          <div className="container" style={{}}>
       <div className="row mt-lg-n10 mt-md-n11 mt-n10" >
       <div className="col-xl-4 col-lg-5 col-md-7 mx-auto" style={{width:"430px"}}>
         <div className="card z-index-0">
          <div className="card-header text-center pt-4">
          <h5>Host Registration</h5>
          <p className="">
                  Log in with your data that you entered during registration.
          </p>
        </div>
        
        <div className="row px-xl-5 px-sm-4 px-3">
  {/* Facebook Button */}
  <div className="col-3 ms-auto px-1">
    <a
      className="btn btn-outline-light w-100"
      href="https://www.facebook.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg width="24px" height="32px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(3,3)" fillRule="nonzero">
            <circle fill="#3C5A9A" cx="29.5" cy="29.5" r="29.5" />
            <path
              d="M39.1,9.1H32.6c-3.9,0-8.2,1.6-8.2,7.2v6H19.9v7.1h4.6v20.5h8.5V29.2h5.6l0.5-7.1h-6.3v-4.1c0-2.2,2.3-2.1,2.5-2.1h6.3V9.1Z"
              fill="#FFFFFF"
            />
          </g>
        </g>
      </svg>
    </a>
  </div>

  {/* Apple Button */}
  <div className="col-3 px-1">
    <a
      className="btn btn-outline-light w-100"
      href="https://www.apple.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg width="24px" height="32px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(7,0.5)" fill="#000" fillRule="nonzero">
            <path d="M40.9,32.8c0.1,9.2,7.9,12.3,8.1,12.4c-0.1,0.2-1.2,4.2-4.1,8.5c-2.5,3.7-5.1,7.4-9.2,7.5c-4,0.1-5.3-2.6-9.9-2.6c-4.6,0-6.1,2.3-9.5,2.5c-4,0.1-7.2-3.9-9.8-7.6C1.2,46.1-2.8,32.3,2.5,23c2.6-4.6,7.3-7.5,12.5-7.6c3.9-0.1,7.5,2.7,9.9,2.7c2.4,0,6.2-3.3,10.9-2.8c1.9,0.1,7.4,0.8,10,5.8C47.1,21.4,40.9,25.1,40.9,32.8Z" />
            <path d="M33.3,10.2c2.1-2.6,3.5-6.2,3.2-9.7c-3,0.1-6.7,2-8.9,4.6c-1.9,2.3-3.6,5.9-3.1,9.4C27.8,14.8,31.2,12.8,33.3,10.2Z" />
          </g>
        </g>
      </svg>
    </a>
  </div>

  {/* Google Button */}
  <div className="col-3 me-auto px-1">
    <a
      className="btn btn-outline-light w-100"
      href="https://accounts.google.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg width="24px" height="32px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(3,2)" fillRule="nonzero">
            <path d="M57.8,30.2c0-2.4-0.2-4.2-0.6-6.1H29.5V35.1H45.8c-0.3,2.7-2.1,6.8-6,9.6l-0.1,0.4l8.8,6.8l0.6,0.1C54.6,46.7,57.8,39.1,57.8,30.2Z" fill="#4285F4" />
            <path d="M29.5,59c8,0,14.7-2.6,19.5-7.2l-9.3-7.2c-2.5,1.7-5.8,3-9.7,3c-7.8,0-14.4-5.1-16.8-12.3l-0.3,0.1L3.3,42.4l-0.1,0.3C8,52.4,18,59,29.5,59Z" fill="#34A853" />
            <path d="M12.7,35.3c-0.6-1.8-1-3.8-1-5.8s0.3-4,0.9-5.8l-0.1-0.4L3.4,16.1l-0.3,0.1C1.1,20.3,0,24.7,0,29.5s1.1,9.2,3.1,13.2l9.6-7.4Z" fill="#FBBC05" />
            <path d="M29.5,11.4c5.5,0,9.2,2.4,11.4,4.4l9.3-8.1c-5.1-5-11.7-7.7-19.5-7.7C18,0,8,6.6,3.1,16.3l9.6,7.4C15.1,16.6,21.7,11.4,29.5,11.4Z" fill="#EB4335" />
          </g>
        </g>
      </svg>
    </a>
  </div>

  {/* OR Divider */}
  <div className="mt-2 position-relative text-center">
    <p className="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">
      or
    </p>
  </div>
</div>

<div className="card-body">
<form onSubmit={handleSubmit(onSubmit)}>

    {/* Name Input */}
    <div className={`mb-3 ${errors.name ? "has-danger" : ""}`}>
      <input
        type="text"
        {...register("name", validationRules.name)}
        className={`form-control ${errors.name ? "is-invalid" : ""}`}
        placeholder="Host Company Name"
        aria-label="name"
        aria-describedby="name-addon"
      />
    </div>
    <p className="text-danger">{errors?.name && errors.name.message}</p>

    {/* Email Input */}
    <div className="mb-3">
      <input
        type="email"
        {...register("email", validationRules.email)}
        className={`form-control ${errors.email ? "is-invalid" : ""}`}
        placeholder="Email"
        aria-label="email"
        aria-describedby="email-addon"
      />
    </div>
    <p className="text-danger">{errors?.email && errors.email.message}</p>

    {/* Phone Input */}
    <div className="mb-3">
      <input
        type="text"
        {...register("phone", validationRules.phone)}
        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
        placeholder="Contact Number"
        aria-label="phone"
        aria-describedby="phone-addon"
      />
    </div>
    <p className="text-danger">{errors?.phone && errors.phone.message}</p>

    {/* Password Input */}
    <div className="mb-3">
      <input
        type="password"
        {...register("password", validationRules.password)}
        className={`form-control ${errors.password ? "is-invalid" : ""}`}
        placeholder="Set Password"
        aria-label="password"
        aria-describedby="password-addon"
      />
    </div>
    <p className="text-danger">{errors?.password && errors.password.message}</p>

    {/* Confirm Password Input */}
    <div className="mb-3">
      <input
        type="password"
        {...register("confirmPassword", validationRules.confirmPassword)}
        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
        placeholder="Confirm Password"
        aria-label="confirmPassword"
        aria-describedby="confirm-password-addon"
      />
    </div>
    <p className="text-danger">{errors?.confirmPassword && errors.confirmPassword.message}</p>

    {/* Submit Button */}
    <div className="text-center">
      <button type="submit" className="attractive-button btn-block btn-lg shadow-lg mt-5">
        Register
      </button>
    </div>

    {/* Login & Forgot Password Links */}
    <p className="text-sm mt-3 mb-0">
      Already have an account?{" "}
      <Link to="/" className="font-bold">Login</Link>
    </p>
    <p>
      <Link to="/forgotpwd" className="font-bold">Forgot password?</Link>
    </p>
  </form>
</div>
      </div>
    </div>
  </div>
        </div>
    </div>
  )
}

export default EventRegistration