import SubLoginForm from "./SubLoginForm";

const FloatingSearch = (props) => {
    return ( <SubLoginForm 
        onClick={(e) => e.stopPropagation()}
        overlayHandler={props.overlayHandler}>
            <form className="floating-search">
                    <input type="search" placeholder="Search Karkade"/>
                    <button>Search</button>
            </form>
            
    </SubLoginForm> );
}
 
export default FloatingSearch;