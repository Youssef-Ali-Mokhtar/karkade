import SubLoginForm from "./SubLoginForm";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const FloatingSearch = (props) => {
    const search = useRef();
    const navigate = useNavigate();
    return ( <SubLoginForm 
        onClick={(e) => e.stopPropagation()}
        overlayHandler={props.overlayHandler}>
            <form className="floating-search" onSubmit={(e)=>{
                e.preventDefault();
                if(search.current.value){
                    // setFocusedIcon("/Search");
                    props.overlayHandler(false);
                    props.searchValueHandler(search.current.value) ;
                    search.current.value = "";
                    navigate("/Search");
                }
            }}>
                    <input type="search" ref={search} placeholder="Search Karkade"/>
                    <button>Search</button>
            </form>
            
    </SubLoginForm> );
}
 
export default FloatingSearch;