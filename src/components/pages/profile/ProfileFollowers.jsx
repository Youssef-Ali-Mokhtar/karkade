import List from "../../List";
import Friend from "../connections/Friend";

const ProfileFollowers = (props) => {

    return ( <div className="profile-posts">
        <List>
          {props.user?.followers?
              Object.keys(props.user.followers).map((user)=>{
                  return <Friend user={user} key={user}/>
              }):
              "No followers"
          }
        </List>
    </div> );
}
 
export default ProfileFollowers;