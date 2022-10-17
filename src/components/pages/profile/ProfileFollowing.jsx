import List from "../../List";
import Friend from "../connections/Friend";

const ProfileFollowing = () => {
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
                return <Friend author={post.author} key={post.id}/>
            })}
        </List>
    </div> );
}
 
export default ProfileFollowing;