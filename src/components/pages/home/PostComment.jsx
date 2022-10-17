const PostComment = () => {
    return ( <div className="post-comment">
        
        <form>
            <div className="image-and-form-wrapper">
                <img alt="pic" src={"https://i.imgur.com/3hWUzZr.jpg"} />
                <textarea type="text" maxLength={500}/>
            </div>
                
            <button>Add comment</button>
        </form>
    </div> );
}
 
export default PostComment;