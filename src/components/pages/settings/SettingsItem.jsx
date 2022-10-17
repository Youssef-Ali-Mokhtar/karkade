const SettingsItem = (props) => {
    return (<>
                <div className="settings-row">
                    <div className="settings-item"><p>{props.title}</p></div>
                    <div className="settings-item"><p>{props.value}</p></div>
                </div>
                <div className="divider"></div>
            </>
            );
}
 
export default SettingsItem;