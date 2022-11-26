import List from "../../List";
import Friend from "./Friend";

const Connections = (props) => {
    const {
        data: user,
        loadingMessage,
        errorMessage,
    } = props.user;

    return ( <div className="home">
        {loadingMessage && <div>Loading...</div>}
        {user?.following && 
            <List>
                {Object.keys(user?.following).map((user)=>{
                    return <Friend user={user} key={user}/>
                })}
                <p className="connections-title">Connections</p>
            </List>
        }
        {errorMessage && <div>{errorMessage}</div>}
    </div> );
}
 
export default Connections;