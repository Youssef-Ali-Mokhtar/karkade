import SettingsItem from "./SettingsItem";
import profileImage from "../../../assets/empty-avatar.jpg";

const Settings = (props) => {
    const {data: userData,
        loadingMessage,
        errorMessage} = props.userInfo;
        
    return ( <div className="settings">
        <div className="settings-profile-pic-wrapper">
            <p className="settings-title">Account Settings</p>
            {userData && <img className="update-profile-pic" src={userData.imageUrl?userData.imageUrl:profileImage} alt="profile_pic"/>}
        </div>

        <div className="divider"></div>
            {loadingMessage && <div>Loading...</div>}
            {
                userData && [
                        {title:"Username", value:userData.username},
                        {title:"Email", value:userData.email},
                        {title:"Country", value:userData.country},
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
                    <button onClick={()=>props.setOverlayUpdateInfo(true)} className="update-user-info">Update User Info</button>
                </div>}
            {errorMessage && <div>{errorMessage}</div>}
        

    </div> );
}
 
export default Settings;