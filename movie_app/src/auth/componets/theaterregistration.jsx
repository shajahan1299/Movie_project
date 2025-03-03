import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Theaterregistration() {

    const {register,handleSubmit,formState:{ errors },} = useForm({mode: "onChange"});
    const navigate = useNavigate();
    const onSubmit = (data) =>
     {
       console.log(data);
       
       axios.post('https://movie-backend-1-a9jv.onrender.com/api/theaterreg', data)
      .then((response) => {
        console.log('Theater Registered:', response.data);
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
          
          password: {
            required: '**Password is required',
            minLength: {
              value: 4,
              message: '**Password must have at least 4 characters',
            },
          },

        //   password: {
        //     required: '**Password is required',
        //     pattern: {
        //         value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/,
        //         message: '**Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&+=!)',
        //     },
        // },
        
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
          <h5>Theater Registration</h5>
          <p className="">
                  Log in with your data that you entered during registration.
          </p>
        </div>
        
        <div className="row px-xl-5 px-sm-4 px-3">
  <div className="col-3 ms-auto px-1">
    <button className="btn btn-outline-light w-100">
      <svg width="24px" height="32px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
          <g transform="translate(3.000000, 3.000000)" fillRule="nonzero">
            <circle fill="#3C5A9A" cx="29.5091719" cy="29.4927506" r="29.4882047" />
            <path d="M39.0974944,9.05587273 L32.5651312,9.05587273 C28.6886088,9.05587273 24.3768224,10.6862851 24.3768224,16.3054653 C24.395747,18.2634019 24.3768224,20.1385313 24.3768224,22.2488655 L19.8922122,22.2488655 L19.8922122,29.3852113 L24.5156022,29.3852113 L24.5156022,49.9295284 L33.0113092,49.9295284 L33.0113092,29.2496356 L38.6187742,29.2496356 L39.1261316,22.2288395 L32.8649196,22.2288395 C32.8649196,22.2288395 32.8789377,19.1056932 32.8649196,18.1987181 C32.8649196,15.9781412 35.1755132,16.1053059 35.3144932,16.1053059 C36.4140178,16.1053059 38.5518876,16.1085101 39.1006986,16.1053059 L39.1006986,9.05587273 L39.0974944,9.05587273 Z" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </button>
  </div>

  <div className="col-3 px-1">
    <button className="btn btn-outline-light w-100">
      <svg width="24px" height="32px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
          <g transform="translate(7.000000, 0.564551)" fill="#000000" fillRule="nonzero">
            <path d="M40.9233048,32.8428307 C41.0078713,42.0741676 48.9124247,45.146088 49,45.1851909 C48.9331634,45.4017274 47.7369821,49.5628653 44.835501,53.8610269 C42.3271952,57.5771105 39.7241148,61.2793611 35.6233362,61.356042 C31.5939073,61.431307 30.2982233,58.9340578 25.6914424,58.9340578 C21.0860585,58.9340578 19.6464932,61.27947 15.8321878,61.4314159 C11.8738936,61.5833617 8.85958554,57.4131833 6.33064852,53.7107148 C1.16284874,46.1373849 -2.78641926,32.3103122 2.51645059,22.9768066 C5.15080028,18.3417501 9.85858819,15.4066355 14.9684701,15.3313705 C18.8554146,15.2562145 22.5241194,17.9820905 24.9003639,17.9820905 C27.275104,17.9820905 31.733383,14.7039812 36.4203248,15.1854154 C38.3824403,15.2681959 43.8902255,15.9888223 47.4267616,21.2362369 C47.1417927,21.4153043 40.8549638,25.1251794 40.9233048,32.8428307 M33.3504628,10.1750144 C35.4519466,7.59650964 36.8663676,4.00699306 36.4804992,0.435448578 C33.4513624,0.558856931 29.7884601,2.48154382 27.6157341,5.05863265 C25.6685547,7.34076135 23.9632549,10.9934525 24.4233742,14.4943068 C27.7996959,14.7590956 31.2488715,12.7551531 33.3504628,10.1750144" />
          </g>
        </g>
      </svg>
    </button>
  </div>

  <div className="col-3 me-auto px-1">
    <button className="btn btn-outline-light w-100">
      <svg width="24px" height="32px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
          <g transform="translate(3.000000, 2.000000)" fillRule="nonzero">
            <path d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267" fill="#4285F4" />
          </g>
        </g>
      </svg>
    </button>
  </div>

  <div className="mt-2 position-relative text-center">
    <p className="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">
      or
    </p>
  </div>
</div>

        <div className="card-body">


        <form className="text-left" onSubmit={handleSubmit(onSubmit)}>

           


          <div className={`mb-3 ${errors.name ? "has-danger" : ""}`}>
              <input type="text" 
                     name="name"
                     {...register("name", validationRules.name)}
                     className={`form-control ${ errors.name ? "is-invalid" : ""}`} 
                     placeholder="Theater Name" 
                     aria-label="name" 
                     aria-describedby="name-addon" />
            </div>
            <p className="text-danger">
                                {" "}
                                {errors?.name && errors.name.message}
            </p>



            <div className={`mb-3 ${errors.email ? "has-danger" : ""}`}>
              <input type="text" 
                     name="owner"
                     {...register("owner", validationRules.owner)}
                     className={`form-control ${ errors.owner ? "is-invalid" : ""}`} 
                     placeholder="Owner Name" 
                     aria-label="owner" 
                     aria-describedby="owner-addon" />
            </div>
            <p className="text-danger">
                                {" "}
                                {errors?.owner && errors.owner.message}
            </p>

            <div className={`mb-3 ${errors.email ? "has-danger" : ""}`}>
              <input type="text" 
                     name="location"
                     {...register("location", validationRules.location)}
                     className={`form-control ${ errors.location ? "is-invalid" : ""}`} 
                     placeholder="Theater Location" 
                     aria-label="location" 
                     aria-describedby="location-addon" />
            </div>
            <p className="text-danger">
                                {" "}
                                {errors?.location && errors.location.message}
            </p>




            <div className="mb-3">
              <input type="email" 
              name="email"
              {...register("email", validationRules.email)}
              className={`form-control ${errors.email ? "is-invalid" : ""}`} 
                placeholder="User Email" aria-label="email" 
                aria-describedby="email-addon" />
            </div>
            <p className="text-danger">{" "}{errors?.email && errors.email.message}</p>



             <div className="mb-3">
              <input type="text" 
              name="phone"
              {...register("phone", validationRules.phone)}
              className={`form-control ${errors.phone ? "is-invalid" : ""}`} 
                placeholder="Contact Number" aria-label="phone" 
                aria-describedby="phone-addon" />
            </div>
            <p className="text-danger">{" "}{errors?.phone && errors.phone.message}</p>


            

            


            <div className="mb-3">
              <input type="password" 
              name="password"
              {...register("password", validationRules.password)}
              className={`form-control ${errors.password ? "is-invalid" : ""}`} 
                placeholder="Set Password" aria-label="password" 
                aria-describedby="dob-addon" />
            </div>
            <p className="text-danger">{" "}{errors?.password && errors.password.message}</p>


            <div className="mb-3">
              <input type="password" 
              name="confirmPassword"
              {...register("confirmPassword", validationRules.confirmPassword)}
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`} 
                placeholder="Confirm Password" aria-label="confirmPassword" 
                aria-describedby="Confirm Password-addon" />
            </div>
            <p className="text-danger">{" "}{errors?.confirmPassword && errors.confirmPassword.message}</p>




            {/* <div className="form-check form-check-info text-left">
              <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" defaultChecked />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I agree the <a href="javascript:;" className="text-dark font-weight-bolder">Terms and Conditions</a>
              </label>
            </div> */}

            <div className="text-center">
              <button type="submit" className="attractive-button btn-block btn-lg shadow-lg mt-5">Register</button>
            </div>

           

            <p className="text-sm mt-3 mb-0">
  Already have an account? 
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

export default Theaterregistration