import SubLoginForm from "../SubLoginForm";
import { useRef, useState } from "react";
import { signup, writeUserData} from "../../firebase";

const SignupForm = (props) => {
    // const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
  
    async function handleSignup() {
      setLoading(true);
      try {
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            alert("Passwords don't match!");
            return;
        }
        await signup(emailRef.current.value, passwordRef.current.value);
        props.loggedInHandler(true);
      } catch {
        alert("Can't sign up!");
      }
      
      writeUserData(usernameRef.current.value, emailRef.current.value);
      
      setLoading(false);
    }

    return ( 
            <SubLoginForm onSubmit={handleSignup}
                onClick={(e) => e.stopPropagation()}
                overlayHandler={props.overlayHandler}>
                    <form className="signup-content-wrapper">
                        <p className="signup-title">Sign up</p>
                        {/* {error&&<p>{error}</p>}
                        <p>This is an error!</p> */}
                        <input type="text" ref={usernameRef} className="input-field" placeholder="Username" required/>
                        <input type="email" ref={emailRef} className="input-field" placeholder="Email" required/>
                        <input type="password" ref={passwordRef} className="input-field" placeholder="Password" required/>
                        <input type="password" ref={confirmPasswordRef} className="input-field" placeholder="Confirm Password" required/>
                        <div className="login-button-wrapper">
                            <button className="login-button" onClick={handleSignup} disabled={loading}>Sign up</button>
                        </div>
                    </form>
            </SubLoginForm>
    );
}
 
export default SignupForm;