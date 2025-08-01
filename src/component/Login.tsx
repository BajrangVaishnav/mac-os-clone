import { useEffect, useState } from "react";
// import { GoogleLogin } from '@react-oauth/google';
// import {jwtDecode} from "jwt-decode";

import bg1 from "../assets/bglogin.png";
// import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { IoLockClosedSharp } from "react-icons/io5";
import { FiCheck } from "react-icons/fi";
// import ReCAPTCHA from "react-google-recaptcha";

import Particles from "./Particles";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Loader from "./Loader";
interface FormData {
  username: string;
  email: string;
  password: string;
  check: boolean;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const onSubmit = async (data: FormData) => {
    setLoader(true);
    // if (!captchaToken) {
    //   alert("Please complete the CAPTCHA");
    //   return;
    // }
    // try {
    //   const response = await fetch(`${import.meta.env.VITE_API}auth/verifyCaptcha`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ token: captchaToken }),
    //   });

    //   const data = await response.json();

    //   if (data.verified) {
    //     console.log("data=>>",data)
    //     // navigate('/os');
    //     alert("CAPTCHA verified. Proceeding with form submission.");
    //     // Submit your actual form data here or continue your logic
    //   } else {
    //     alert("CAPTCHA failed. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("CAPTCHA verification error:", error);
    //   alert("An error occurred during CAPTCHA verification.");
    // }

    try {
      const response = await fetch(`${import.meta.env.VITE_API}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });


      const res = await response.json();

      if (res.data !== null) {
        setLoader(false);

        const token = res.data.token;
        const user = res.data.existingUser;
        localStorage.setItem("access_token", token);
        localStorage.setItem("user", JSON.stringify(user));
        
        // navigate(`/os/${token}`);
        alert("process success ('-_-') -->>>Enter   ");
      } else if (res.message === "OTP sent successfully. Otp expire in 5 min") {
        const userOTP = prompt(`OTP sent to ${data.email}. Please enter it:`); // <- default alert-style input
        const userEmail = data.email;
        if (userOTP) {
          verifyOTP(userEmail, userOTP);
          toggleFullScreen();
    
          setLoader(false);

        } else {
      setLoader(false);

          alert("OTP input cancelled.");
        }
      } else {
        toast.dismiss();
        toast.warning(res.message);
      }
    } catch (error) {
      setLoader(false);
      console.log("login register error:", error);
    }
    // console.log(data);
    toggleFullScreen();
  };


      // Toggle full-screen mode
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.error("Failed to enter full-screen:", err);
          // toast.error('Failed to enter full-screen');
        });
      } else {
        document.exitFullscreen();
      }
    };
  const verifyOTP = async (email: string, otp: string) => {

    const res = await axios.post(
      `${import.meta.env.VITE_API}auth/verifyRegisterOtp`,
      {
        email,
        otp,
      }
    );
      if(res){
        setLoader(false);

      }
    const token = res.data.data.token;
    // console.log("response verify=>", res.data.data.token);
    if (res.data.data === null) {
      // navigate(`/os/${token}`);
      toast.dismiss();
      toast.warning(res.data.data.message);
    } else if (token) {
      const user = res.data.data.user;
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", user);
      // navigate(`/os/${token}`);
      alert("register success ('-_-') -->>>Enter");
    }
  };

  const forgotPassword = async () => {
    const email = prompt(`Enter your email id:`);
    if (email) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API}auth/forgotpwdsendOtp`,
          {
            email,
          }
        );
        console.log("result forgot pwd=>", res.data.success === true);
        if (res.data.success === true) {
          const Otp = prompt(`OTP sent to ${email}. Please enter it:`);
          const newPassword = prompt(`Enter your new pssword:`);
          if (Otp && newPassword) {
            verifyPwdOTP(email, Otp, newPassword);
          }
        }
      } catch (error) {
        console.log("forgot passowrd error=>", error);
      }
    }
  };

  const verifyPwdOTP = async (email: string, otp: string, password: string) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}auth/forgotverifyOtp`,
        {
          email,
          otp,
          password,
        }
      );

      console.log("forgot verify otp=> ", res);
      if (res.data.message === "Password updated successfully.") {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("forgot verify otp error=>", error);
    }
  };
  // console.log("env api-=>",import.meta.env.VITE_API)
  // Full-screen functionality removed as it is unused

  // captcha

  // const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  //   const handleCaptchaChange = (token: string | null) => {
  //     setCaptchaToken(token);
  //     console.log("Captcha Token:", token);
  //   };
  // // google login
  // interface GoogleUser {
  //   name: string;
  //   email: string;
  //   picture: string;
  // }
  // const handleSuccess = (credentialResponse: any) => {
  //   const decoded: GoogleUser = jwtDecode(credentialResponse.credential);
  //   console.log("User Info:", decoded);
  //   console.log("Google token:", credentialResponse.credential);
  //   console.log("Google:", credentialResponse);
  //   // You can send this token to your backend for verification and user creation
  // };

  // const handleError = () => {
  //   console.log("Login Failed");
  // };

  // checking token and navigate to the os page
  const tokenVerify = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}auth/verifyToken`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }), // token must be a string
          }
        );

        const res = await response.json();
        // console.log("tokenVerify =>", res?.data?.tokenVerify);

        if (res?.data?.tokenVerify === true) {
          navigate(`/os/${token}`);
        } else {
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        console.error("Token verification error:", error);
        localStorage.removeItem("access_token");
      }
    }
  };

  useEffect(() => {
    tokenVerify();
  });
  return (
    <>
    {loader ? 
    <div className="relative position-fixed">
      <Loader
        height="100vh"
        background="white"
        // NOTE: Using GIFs for the background looks super cool :)
        imgUrl="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
      />
    </div>:

      <div
        className="w-full max-w-full h-[100vh] max-h-full overflow-auto grid md:grid-cols-2 relative py-auto md:py-0 font-inter no-scrollbar "
        style={{
          background: `url(${bg1})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        <div className="col-span-0 md:block hidden"></div>
        <div className="col-span-0 flex flex-col justify-center items-center text-white z-50 gap-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-2xl md:px-2 lg:px-4 py-10 px-5 backdrop:blur-xl bg-gradient-to-tl from-red-600/80 to-black/60 shadow-2xl shadow-blue-400"
          >
            <div className="w-full flex flex-col gap-0 md:gap-2">
              <span className="text-center md:text-5xl text-4xl font-bold ">
                Login!
              </span>
            </div>

            {/* Email */}
            <label
              htmlFor="email"
              className="border-b border-gray-700 flex items-center gap-2 md:w-100 pb-2"
            >
              <MdAlternateEmail className="text-lg md:text-3xl" />
              <input
                id="email"
                type="email"
                // value={"user@example.com"}
                {...register("email", { required: "Email is required" })}
                className="md:w-100 caret-red-600 bg-transparent autofll:bg-green-700 outline-none"
                placeholder="Email"
              />
            </label>
            {errors.email && (
              <span className="text-blue-400 text-xs w-full">
                {String(errors.email.message)}
              </span>
            )}

            {/* Password */}
            <label
              htmlFor="password"
              className="border-b border-gray-700 flex items-center gap-2 md:w-100 pb-2"
            >
              <IoLockClosedSharp className="text-lg md:text-3xl" />
              <input
                id="password"
                type="password"
                // value={"user@example.com"}
                {...register("password", { required: "Password is required" })}
                className="md:w-100 caret-red-600 bg-transparent autofll:bg-green-700 outline-none"
                placeholder="Password"
              />
            </label>
            {errors.password && (
              <span className="text-blue-400 text-xs w-full">
                {String(errors.password.message)}
              </span>
            )}
            <div className="w-full">
              {/* <ReCAPTCHA
                sitekey="6Lf_QykrAAAAAB1bqzDDizJ70Kn7lBXpqvza5hvK" // Get it from https://www.google.com/recaptcha/admin
                onChange={handleCaptchaChange}
                theme="dark"     
                size="normal"
                className="recaptcha-container "
              /> */}

              {/* terms and condition */}
              <div className="flex items-center w-full pt-4  ps-1">
                <div className="border rounded border-gray-700 w-4 h-4 flex items-center relative overflow-hidden">
                  <input
                    type="checkbox"
                    id="check"
                    // checked
                    className="absolute cursor-pointer opacity-0 z-10 peer"
                    {...register("check", { required: "This is required" })}
                  />
                  <FiCheck className="font-bold bg-[#fb1e1e]  peer-checked:block hidden transition transform-3d ease-in-out" />
                </div>
                <label htmlFor="check" className="ml-2 text-[8px] md:text-xs">
                  By Checking this box,I agree to{" "}
                  <span className="text-[#fb1e1e] cursor-pointer hover:underline">
                    terms and conditios
                  </span>
                  .
                </label>
              </div>
              {errors.check && (
                <span className="text-blue-400 text-xs w-full">
                  {String(errors.check.message)}
                </span>
              )}
            </div>
            <div
              className="text-xs hover:text-red-600 cursor-pointer hover:underline"
              onClick={() => forgotPassword()}
            >
              Forgot password...
            </div>
            <div className="pt-5 w-full ps-1 flex items-center justify-center ">
              <span className="relative flex items-center justify-center w-60  px-4  py-1 rounded bg-[#e62727] hover:bg-[#fb6363] text-white shadow-2xl shadow-black transition transform-3d ease-in-out group">
                <input
                  type="submit"
                  value="Submit"
                  className="outline-none w-full h-full px-4 md:px-8 md:py-2 cursor-pointer"
                />
              </span>
            </div>

            {/* <span className="w-full text-center ">or</span>
            <span className="w-full md:px-20"><GoogleLogin onSuccess={handleSuccess} onError={handleError}/></span> */}
          </form>
        </div>
      </div>
    }
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
