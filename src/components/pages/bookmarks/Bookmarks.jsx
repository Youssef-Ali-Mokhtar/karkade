import List from "../../List";
import useFetchById from "../../useFetchById";
import Post from "../home/Post";
const Bookmarks = (props) => {

    const {
        data: blogPosts,
    } = props.posts;

    const {
        data: bookmarks,
        loadingMessage,
        errorMessage,
    } = useFetchById(
        `https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/bookmarks.json`
    );

    return ( <div className="bookmarks">
        <p className="settings-title">Bookmarks</p>
        <div className="divider"></div>
        {loadingMessage && <div>Loading...</div>}
        {blogPosts && 
            <List>
                {
                    blogPosts.filter((post)=>Object.keys(bookmarks?bookmarks:"").includes(post.id)).map((post)=>{
                        return <Post post={post} key={post.id}/>;
                    })
                }
            </List>
        }
        {errorMessage && <div>{errorMessage}</div>}
    </div> );
}
 
export default Bookmarks;