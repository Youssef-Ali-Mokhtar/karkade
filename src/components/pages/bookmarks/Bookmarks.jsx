import List from "../../List";
import useFetch from "../../useFetch";
import Post from "../home/Post";
const Bookmarks = () => {

    const {
        data: blogPosts,
        loadingMessage,
        errorMessage,
    } = useFetch(
        "https://test-blog-bdc36-default-rtdb.firebaseio.com/posts.json"
    );
    return ( <div className="bookmarks">
        <p className="settings-title">Bookmarks</p>
        <div className="divider"></div>
        {loadingMessage && <div>Loading...</div>}
        {blogPosts && 
            <List>
                {blogPosts.map((post)=>{
                    return <Post post={post} key={post.id}/>
                })}
            </List>
        }
        {errorMessage && <div>{errorMessage}</div>}
    </div> );
}
 
export default Bookmarks;