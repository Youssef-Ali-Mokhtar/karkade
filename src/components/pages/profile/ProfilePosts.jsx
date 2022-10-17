import List from "../../List";
import Post from "../home/Post";

const ProfilePosts = () => {
    const data = [
        {
          author:"Youssef Ali Mokhtar",
          title:
            "Did science try to explain the levitating Asian monks somehow, except claiming that they’re a hoax?",
          image: "https://i.imgur.com/gwcgCzZ.jpg",
          id: 1,
        },
        {
          author:"Omar Ali Mokhtar",
          title:
            "Did science try to explain the levitating Asian monks somehow, except claiming that they’re a hoax?",
          image: "https://i.imgur.com/3hWUzZr.jpg",
          id: 2,
        },
        {
          author:"Sarah Ali Mokhtar",
          title:
            "Did science try to explain the levitating Asian monks somehow, except claiming that they’re a hoax?",
          image: "https://i.imgur.com/Mc7TI2p.png",
          id: 3,
        },
      ];
    return ( <div className="profile-posts">
        <List>
            {data.map((post)=>{
                return <Post post={post} key={post.id}/>
            })}
        </List>
    </div> );
}
 
export default ProfilePosts;