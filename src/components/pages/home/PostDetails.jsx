import { useParams} from "react-router-dom";
import useFetchById from "../../useFetchById";
import PostDetailsBody from "./PostDetailsBody";

const PostDetails = () => {
    const { id } = useParams();
    // const navigate = useNavigate();

    const {data: blogPosts,
        loadingMessage,
        errorMessage} = useFetchById(`https://test-blog-bdc36-default-rtdb.firebaseio.com/posts/${id}.json`);
    
    return ( <div className="post-details">
        {loadingMessage && <div>Loading...</div>}
        {blogPosts && <PostDetailsBody data={blogPosts}/>}
        {errorMessage && <div>{errorMessage}</div>}
    </div> );
}
 
export default PostDetails;