import SettingsItem from "./SettingsItem";
import useFetchById from "../../useFetchById";
import { useState } from "react";
import { useEffect } from "react";
import Overlay from "../../Overlay";
import SubLoginForm from "../../SubLoginForm";

const Settings = () => {
    const [overlayUpdateInfo, setOverlayUpdateInfo] = useState(false);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);

    const {data: userData,
        loadingMessage,
        errorMessage} = useFetchById(`https://karkade-development-default-rtdb.firebaseio.com//users/${localStorage.getItem("userId")}.json`);

    console.log(userData);

    return ( <div className="settings">
        <p className="settings-title">Account Settings</p>
        <div className="divider"></div>
            {loadingMessage && <div>Loading...</div>}
            {
                userData && [
                        {title:"Username", value:userData.username},
                        {title:"Email", value:userData.email},
                        {title:"Country", value:"Egypt"},
                        {title:"Bio", value:userData.bio}
                    ].map((item)=>
                    (       
                        <div key={Math.floor(Math.random()*1000)}>
                            <SettingsItem  title={item.title} value={item.value}/>
                        </div>
                    )
                )
            }
            { userData && <div className="update-user-info-button-wraper">
                    <button onClick={()=>setOverlayUpdateInfo(true)} className="update-user-info">Update User Info</button>
                </div>}
            {errorMessage && <div>{errorMessage}</div>}
        

    </div> );
}
 
export default Settings;