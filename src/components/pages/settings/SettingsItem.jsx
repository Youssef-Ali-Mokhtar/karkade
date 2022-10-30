const SettingsItem = (props) => {
    return (<>
                <div className="settings-row settings-wrapper">
                    <div className="settings-item"><p>{props.title}</p></div>
                    <div className="settings-item"><p>{props.value}</p></div>
                </div>
                <div className="divider settings-wrapper"></div>
            </>
            );
}
 
export default SettingsItem;