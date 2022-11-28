import useFetchById from "../../useFetchById";
import profileImage from "../../../assets/empty-avatar.jpg";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
const Note = (props) => {

    const {
        data: sender,
    } = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/users/${props.notePost.sender}.json`
    );

    const checkNotificationHandler = ()=>{
        const updateChecked = {checked:true};
        fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/notifications/${props.notePost.notificationId}.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateChecked),
          })
          props.unCheckedNotificationsHandler(prev=>prev-1)
    }

    const deleteNotification = ()=>{
        fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/notifications/${props.notePost.notificationId}.json`, {
            method: "DELETE"
        }).then(()=>{
            window.location.reload();
        })
    }
        
    return ( <div className="note" 
                style={{background:props.notePost.checked?
                "var(--contentBackgroundTheme)":"var(--navbarBackgroundTheme)"}}
            >
        <div className="original-poster-section">
            {!sender&&<img alt="pic" src={profileImage} />}
            {sender&&
                <Link to={`/Profile/${props.notePost.sender}`}>
                    <img alt="pic" className="notification-image" src={sender?.imageUrl} />
                </Link>}
                <div className="notification-text-content">
                    <div className="name-date-and-delete">
                        <div className="notification-name-and-date">
                            <Link to={`/Profile/${props.notePost.sender}`}>
                                <p className="original-poster-name" style={{fontSize:"14px"}}>
                                    {sender?.username}&nbsp;&nbsp;
                                </p>
                            </Link>
                            <Link onClick={checkNotificationHandler} className="notification-date-holder" to={props.notePost.target}>
                                    <span className="comment-date">{props.notePost.date}</span>
                            </Link>
                        </div>
                        <div className="post-status-item delete-notification-icon">
                            <AiOutlineDelete className="post-icon" onClick={deleteNotification} size={20}/>
                        </div>
                    </div>
                     <Link className="notification-content-holder" onClick={checkNotificationHandler} to={props.notePost.target}>
                        <span className="notification-content">{props.notePost.message}</span>
                    </Link>
                </div>
        </div>
        
    </div> );
}


export default Note;