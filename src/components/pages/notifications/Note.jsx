const Note = (props) => {
    return ( <div className="note">
        <div className="original-poster-section">
                <img alt="pic" src={"https://i.imgur.com/3hWUzZr.jpg"} />
                <div className="original-poster-info-section">
                    <p className="original-poster-name">{props.author} {" . "} {"28 sep 21"}</p>
                    <p className="original-poster-time">Hahaha, how dare you my nigga!</p>
                </div>
        </div>
    </div> );
}
 
export default Note;