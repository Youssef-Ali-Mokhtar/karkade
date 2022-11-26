import List from "../../List";
import Friend from "../connections/Friend";
import useFetchById from "../../useFetchById";

const ProfileFollowing = (props) => {

  const {data: userData }  = useFetchById(
      `https://karkade-development-default-rtdb.firebaseio.com/users/${props.profileId}.json`
  )

  return ( <div className="profile-posts">
      <List>
        {userData?.following?
            Object.keys(userData.following).map((user)=>{
              console.log(user);
                return <Friend user={user} key={user}/>
            }):
            "No followings"
        }
      </List>
  </div> );
}
 
export default ProfileFollowing;