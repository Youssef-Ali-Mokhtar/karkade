import SubLoginForm from "../SubLoginForm";

const ForgotPassword = (props) => {
    return (             
        <SubLoginForm
            onClick={(e) => e.stopPropagation()}
            overlayHandler={props.overlayHandler}>
                <form className="signup-content-wrapper">
                    <p className="signup-title">Find Your Account</p>
                    <input type="email" className="input-field" placeholder="Email"/>
                    <div className="login-button-wrapper">
                        <button className="login-button">Submit</button>
                    </div>
                </form>
        </SubLoginForm> 
    );
}
 
export default ForgotPassword;