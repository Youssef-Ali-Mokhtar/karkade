import {BsPersonPlus} from "react-icons/bs";

const Friend = (props) => {
    return ( <div className="note">
        <div className="original-poster-section friend-space-between">
            <div className="friend-info-wrapper">
                <img alt="pic" src={"https://i.imgur.com/3hWUzZr.jpg"} />
                <p className="original-poster-name">{props.author}</p>
            </div>
            <div className="follow-button">
                <BsPersonPlus className="friend-icon" size={16}/>
                <p className="friend-text">Follow</p>
            </div>
        </div>
    </div> );
}
 
export default Friend;