const Overlay = (props) => {
    return (<div
        className="post-overlay"
        style={{
          visibility: props.overlay ? "visible" : "hidden",
          background: props.overlay ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
          opacity: props.overlay ? "1" : "0",
        }}
        onClick={props.onClick}
      >
        {props.children}
      </div> );
}
 
export default Overlay;