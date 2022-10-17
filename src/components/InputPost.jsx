import {AiOutlinePicture} from "react-icons/ai";
import SubLoginForm from "./SubLoginForm";

const InputPost = (props) => {
    return (           
        <SubLoginForm
            onClick={(e) => e.stopPropagation()}
            overlayHandler={props.overlayHandler}>
            <form className="input-form">
                <textarea className="input-title scrollbar"  maxLength={150}/>
                <textarea className="input-article" maxLength={1000}/>
                <div className="input-post-buttons-holder">
                    <div className="upload-picture-button">
                        <AiOutlinePicture className="upload-picture-icon" size={25}/>
                        <p>Upload picture</p>
                    </div>
                    <button className="upload-picture-button">
                        Post
                    </button>
                </div>
            </form>
        </SubLoginForm> 
    );
}
 
export default InputPost;