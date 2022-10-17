import useFetch from "../../useFetch";
import List from "../../List";
import Friend from "./Friend";

const Connections = () => {
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
                    return <Friend author={post.author} key={post.id}/>
                })}
                <p className="connections-title">Connections</p>
            </List>
        }
        {errorMessage && <div>{errorMessage}</div>}
    </div> );
}
 
export default Connections;