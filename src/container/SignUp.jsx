import React, { useState } from "react";
import { Logo } from "../assets";
import { UserAuthinput } from "../components";
import { FaEnvelope } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { MdPassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { signInWithGoogle, signInWithGitHub } from "../utils/helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animations";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginWithEmailPassword = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => {
          console.log(err.message);
          if (err.message.includes("user-not-found")) {
            setAlert(true);
            setAlertMsg("Invalid Id : User Not Found");
          }
          else if (err.message.includes("wrong-password")) {
            setAlert(true);
            setAlertMsg("Password Mismatch");
          }
          else {
            setAlert(true);
            setAlertMsg("Temporarily disabled due to many failed login");
          }

          setInterval(() => {
            setAlert(false);
          },4000);
          
        });
    }
  };

  return (
    <div className="w-full py-6 ">
      <img
        src={Logo}
        className="w-32 h-auto object-contain opacity-50"
        alt="Logo"
      />
      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="text-2xl text-primaryText py-12">Join With Us! 🙂</p>

        <div className="w-full md:w-[400px] px-4 py-6 rounded-xl bg-gray-800 shadow-lg flex flex-col items-center justify-center gap-6">
          <UserAuthinput
            label="Email"
            placeHolder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />

          <UserAuthinput
            label="Password"
            placeHolder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

          {/* ALert Section */}

          <AnimatePresence>
            {alert && (
              <motion.p
              key={"AlertMessage"}
              {...fadeInOut}
              className="text-red-500"
            >
              {alertMsg}
            </motion.p>
            )}
          </AnimatePresence>

          {!isLogin ? (
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={createNewUser}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={loginWithEmailPassword}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Login</p>
            </motion.div>
          )}

          {!isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already Have an account !{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Doesn't Have an account !{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Create Here
              </span>
            </p>
          )}

          {/* or section */}
          <div className="flex items-center justify-center gap-4 w-full">
            <div className="h-px bg-white w-full opacity-20"></div>
            <p className="text-sm text-white opacity-60">OR</p>
            <div className="h-px bg-white w-full opacity-20"></div>
          </div>

          {/* sign in with google */}
          <motion.div
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign in with Google</p>
          </motion.div>

          <div className="flex items-center justify-center gap-4 w-full">
            <div className="h-px bg-white w-full opacity-20"></div>
            <p className="text-sm text-white opacity-60">OR</p>
            <div className="h-px bg-white w-full opacity-20"></div>
          </div>

          {/* sign in with Github */}

          <motion.div
            onClick={signInWithGitHub}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="text-3xl text-white" />
            <p className="text-xl text-white">Sign in with GitHub</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
