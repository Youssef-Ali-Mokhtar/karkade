import { useParams} from "react-router-dom";
import useFetchById from "../../useFetchById";
import PostDetailsBody from "./PostDetailsBody";

const PostDetails = () => {
    const { id } = useParams();
    // const navigate = useNavigate();

    const {data: blogPosts,
        loadingMessage,
        errorMessage} = useFetchById(`https://karkade-development-default-rtdb.firebaseio.com/posts/${id}.json`);
    console.log(id);
    return ( <div className="post-details">
        {loadingMessage && <div>Loading...</div>}
        {blogPosts && <PostDetailsBody data={blogPosts}/>}
        {errorMessage && <div>{errorMessage}</div>}
    </div> );
}
 
export default PostDetails;