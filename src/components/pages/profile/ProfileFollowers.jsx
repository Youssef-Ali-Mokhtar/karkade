import List from "../../List";
import Friend from "../connections/Friend";
import useFetchById from "../../useFetchById";

const ProfileFollowers = (props) => {

    const {data: userData }  = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/users/${props.profileId}.json`
    )

    return ( <div className="profile-posts">
        <List>
          {userData?.followers?
              Object.keys(userData.followers).map((user)=>{
                console.log(user);
                  return <Friend user={user} key={user}/>
              }):
              "No followers"
          }
        </List>
    </div> );
}
 
export default ProfileFollowers;