import useFetch from "../../useFetch";
import List from "../../List";
import Note from "./Note";
import { useState } from "react";
import { useEffect } from "react";

const Notifications = () => {
    const [uncheckedNotifications, setUncheckedNotifications] = useState(0);
    const {
        data: note,
        loadingMessage,
        errorMessage,
    } = useFetch(
        `https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/notifications.json`
    );

    useEffect(()=>{
        const countUncheckedNotifications = ()=>{
            let countNotifications = 0;
            if(note){
                for(let i = 0;i<note.length;i++){
                    if(!note[i].checked){
                        countNotifications++;
                    }
                }
            }
            return countNotifications;
        }
        setUncheckedNotifications(countUncheckedNotifications());
    },[uncheckedNotifications, note])
    
    return ( <div className="home">
        {loadingMessage && <div>Loading...</div>}
        {note && 

                <List>
                    {note.map((notePost)=>{
                        return <Note unCheckedNotificationsHandler={setUncheckedNotifications} notePost={notePost} key={notePost.notificationId}/>
                    })}
                    <p className="notifications-title">{uncheckedNotifications} Unchecked Notification{uncheckedNotifications===1?"":"s"}</p>
                </List>
        }
        {errorMessage && <div>{errorMessage}</div>}
    </div> );
}
 
export default Notifications;