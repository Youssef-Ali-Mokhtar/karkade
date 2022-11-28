import List from "../../List";
import useFetch from "../../useFetch";
import Post from "../home/Post";
const Bookmarks = (props) => {

    const {
        data: blogPosts,
        loadingMessage,
        errorMessage
    } = useFetch(
        `https://karkade-development-default-rtdb.firebaseio.com/posts.json`
    );

    return ( <div className="bookmarks">
        <p className="settings-title">Bookmarks</p>
        <div className="divider"></div>
        {loadingMessage && <div>Loading...</div>}
        {blogPosts && 
            <List>
                {
                    blogPosts.filter((post)=>Object.keys(post?.bookmarks?post.bookmarks:"").includes(localStorage.getItem("userId"))).map((post)=>{
                        return <Post post={post} key={post.id}/>;
                    })
                }
            </List>
        }
        {errorMessage && <div>{errorMessage}</div>}
    </div> );
}
 
export default Bookmarks;