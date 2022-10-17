import SubLoginForm from "../SubLoginForm";

const SignupForm = (props) => {
    return ( 
            <SubLoginForm
                onClick={(e) => e.stopPropagation()}
                overlayHandler={props.overlayHandler}>
                    <form className="signup-content-wrapper">
                        <p className="signup-title">Sign up</p>
                        <input type="text" className="input-field" placeholder="Username"/>
                        <input type="email" className="input-field" placeholder="Email"/>
                        <input type="password" className="input-field" placeholder="Password"/>
                        <div className="login-button-wrapper">
                            <button className="login-button">Sign up</button>
                        </div>
                    </form>
            </SubLoginForm>
    );
}
 
export default SignupForm;