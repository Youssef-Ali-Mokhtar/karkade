import List from "../../List";
import Post from "../home/Post";


const ProfilePosts = (props) => {

    return ( <div className="profile-posts">
        <List>
            {props.posts&&props.posts.map((post)=>{
                return (post.authorId===props.profileId?<Post post={post} key={post.id}/>:"")
            })}
        </List>
    </div> );
}
 
export default ProfilePosts;