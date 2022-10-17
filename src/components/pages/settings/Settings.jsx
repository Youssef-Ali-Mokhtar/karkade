import SettingsItem from "./SettingsItem";

const Settings = () => {
    const settingsItem = [
            {title:"Username", value:"Youssef"},
            {title:"Email", value:"Youssef96mokhtar@gmail.com"},
            {title:"Password", value:"Change Password"},
            {title:"Country", value:"Hehehe"},
        ];
    return ( <div className="settings">
        <p className="settings-title">Account Settings</p>
        <div className="divider"></div>
        {settingsItem.map((item, index)=>
            (<SettingsItem key={index} title={item.title} value={item.value}/>)
        )}
        

    </div> );
}
 
export default Settings;