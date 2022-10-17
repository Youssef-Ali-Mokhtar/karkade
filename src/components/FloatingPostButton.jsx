import {AiOutlinePlus} from "react-icons/ai";

const FloatingPostButton = (props) => {
    return ( <div className="floating-post-button" onClick={()=>props.floatingPostButtonHandler(true)}>
        <AiOutlinePlus size={20}/>
    </div> );
}
 
export default FloatingPostButton;