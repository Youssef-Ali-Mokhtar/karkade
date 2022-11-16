import List from "../../List";
import Friend from "../connections/Friend";

const ProfileFollowing = (props) => {
  
  return ( <div className="profile-posts">
        <List>
          {props.user?.following?
              Object.keys(props.user.following).map((user)=>{
                  return <Friend user={user} key={user}/>
              }):
              "No followings"
          }
        </List>
  </div> );
}
 
export default ProfileFollowing;