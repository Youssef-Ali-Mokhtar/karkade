import SubLoginForm from "../SubLoginForm";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignupForm = (props) => {
    // const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
  

    const register = async (e)=>{
      e.preventDefault();

      setLoading(true);
      
      // props.loadingHandler(true);
      if(passwordRef.current.value !== confirmPasswordRef.current.value){
          alert("Passwords don't match!");
            return;
      }
      try{
        const user = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
        localStorage.setItem("userId", user.user.uid);
        writeUserData(usernameRef.current.value, emailRef.current.value, user.user.uid);
        props.overlayHandler(false);
        props.loggedInHandler(true);
      }catch(error){
        console.log(error.message);
      }
      setLoading(false);
    }

    function writeUserData(username, email, uid) {
        const user = {  username: username,
                        email: email,
                        country: false,
                        bio: "My funny collection",
                        imageUrl: false
                    };

        fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${uid}.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }).then(()=>{
          window.location.reload();
        })

    }


    

    return ( 
            <SubLoginForm
                onClick={(e) => e.stopPropagation()}
                overlayHandler={props.overlayHandler}>
                    <form className="signup-content-wrapper">
                        <p className="signup-title">Sign up</p>
                        <input type="text" ref={usernameRef} className="input-field" placeholder="Username" required/>
                        <input type="email" ref={emailRef} className="input-field" placeholder="Email" required/>
                        <input type="password" ref={passwordRef} className="input-field" placeholder="Password" required/>
                        <input type="password" ref={confirmPasswordRef} className="input-field" placeholder="Confirm Password" required/>
                        <div className="login-button-wrapper">
                            <button className="login-button"  onClick={register} disabled={loading}>Sign up</button>
                        </div>
                    </form>
            </SubLoginForm>
    );
}
 
export default SignupForm;