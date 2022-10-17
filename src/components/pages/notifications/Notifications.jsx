import useFetch from "../../useFetch";
import List from "../../List";
import Note from "./Note";

const Notifications = () => {
    const {
        data: blogPosts,
        loadingMessage,
        errorMessage,
    } = useFetch(
        "https://test-blog-bdc36-default-rtdb.firebaseio.com/posts.json"
    );
    return ( <div className="home">
        {loadingMessage && <div>Loading...</div>}
        {blogPosts && 

                <List>
                    {blogPosts.map((post)=>{
                        return <Note author={post.author} key={post.id}/>
                    })}
                    <p className="notifications-title">Notifications</p>
                </List>
        }
        {errorMessage && <div>{errorMessage}</div>}
    </div> );
}
 
export default Notifications;