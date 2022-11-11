import Overlay from "../Overlay";
import { useState, useRef } from "react";
import SignupForm from "./SignupForm";
import ForgotPassword from "./ForgotPassword";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = (props) => {
    const [postOverlay, setPostOverlay] = useState(false);
    const [signupOrForgotPassword, setSignupOrForgotPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    
    const login = async (e)=>{
        e.preventDefault();
        console.log("LOGIN");
        setLoading(true);
        try{
          const user = await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
          props.loggedInHandler(true);
          localStorage.setItem("userId", user.user.uid);
        }catch(error){
          console.log(error.message);
        }
        setLoading(false);
      }

    return ( <div className="login-page">
        <Overlay onClick={() => setPostOverlay(false)} overlay={postOverlay}>
            {signupOrForgotPassword==="signup"?<SignupForm loadingHandler={props.loadingHandler} loggedInHandler={props.loggedInHandler} overlayHandler={setPostOverlay}/>:""}
            {signupOrForgotPassword==="forgotPassword"?<ForgotPassword overlayHandler={setPostOverlay}/>:""}
        </Overlay>
        <div className="login-form">
            <h1 className="login-logo">Karkade</h1>
            <div className="login-motto">A place to enjoy while it lasts</div>
            <p className="login-title">Login</p>
            <div className="login-input-section">
                <div className="social-media-login">
                    <div className="google">Google</div>
                    <div className="google">Facebook</div>
                    <p className="signup-with-email" onClick={()=>{
                        setPostOverlay(true);
                        setSignupOrForgotPassword("signup");
                    }}>Sign up with email</p>
                </div>

                <div className="login-divider"></div>
                
                <div className="email-login">
                    <form className="email-login-form">
                        <input type="email" ref={emailRef} className="input-field" placeholder="Your email"/>
                        <input type="password" ref={passwordRef} className="input-field" placeholder="Your password"/>
                        <button className="login-button" disabled={loading} onClick={login}>Login</button>
                    </form>
                </div>
            </div>

            <p className="forgot-password" onClick={()=>{
                        setPostOverlay(true);
                        setSignupOrForgotPassword("forgotPassword");
                    }}>Forgot password?</p>
        </div>
    </div> );
}
 
export default Login;