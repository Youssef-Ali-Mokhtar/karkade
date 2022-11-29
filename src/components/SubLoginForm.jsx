import {IoMdClose} from "react-icons/io";
const SubLoginForm = (props) => {
    return ( 
    <div className="input-post" onClick={props.onClick}>
        <IoMdClose className="close-icon" size={25} onClick={()=>props.overlayHandler(false)}/>
        {props.children}
    </div>
    );
}

export default SubLoginForm;