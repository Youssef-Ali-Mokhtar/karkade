import List from "../../List";
import Post from "./Post";
import FloatingPostButton from "../../FloatingPostButton";

const Home = (props) => {
    const {data: blogPosts,
    loadingMessage,
    errorMessage} = props.data;
    return ( <div className="home">
        {loadingMessage && <div>Loading...</div>}
        {blogPosts && 
            <List>
                {blogPosts.map((post)=>{
                    return <Post post={post} key={post.id}/>
                })}
            </List>
        }
        {errorMessage && <div>{errorMessage}</div>}
        {props.mobileMode && <FloatingPostButton floatingPostButtonHandler={props.postOverlayHandler}/>}
    </div> );
}
 
export default Home;