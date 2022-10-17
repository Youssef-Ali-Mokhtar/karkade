import Overlay from "../Overlay";
import { useState } from "react";
import SignupForm from "./SignupForm";
import ForgotPassword from "./ForgotPassword";

const Login = (props) => {
    const [postOverlay, setPostOverlay] = useState(false);
    const [signupOrForgotPassword, setSignupOrForgotPassword] = useState(null);

    return ( <div className="login-page">
        <Overlay onClick={() => setPostOverlay(false)} overlay={postOverlay}>
            {signupOrForgotPassword==="signup"?<SignupForm overlayHandler={setPostOverlay}/>:""}
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
                        <input type="email" className="input-field" placeholder="Your email"/>
                        <input type="password" className="input-field" placeholder="Your password"/>
                        <button className="login-button" onClick={(e)=>{
                            e.preventDefault();
                            props.loggedInHandler(true);
                        }}>Login</button>
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