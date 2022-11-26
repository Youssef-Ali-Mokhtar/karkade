import {AiOutlinePicture} from "react-icons/ai";
import SubLoginForm from "./SubLoginForm";
import { useState, useRef } from "react";
import {MdCancel} from "react-icons/md";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const InputPost = (props) => {
    const [image, setImage] = useState(null);
    const title = useRef();
    const body = useRef();
    const navigate = useNavigate();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const handleImageChange=(e)=>{
        if(e.target.files.length!==0){
            setImage(e.target.files[0]);
            e.target.value = null;
        }
    }

    const handleCancelImage=(e)=>{
        setImage(null);
    }

    const handleSubmit = (imageUrl) => {
        const d = new Date();
        let minute = d.getMinutes().toString();
        let hour = d.getHours().toString();
        let day = d.getDate().toString();
        let month = d.getMonth().toString();
        let year = d.getFullYear().toString();
        const postId = Date.now();
        const post = {  author: props.userInfo.data.username,
                        authorId: localStorage.getItem("userId"),
                        authorImageUrl: props.userInfo.data.imageUrl,
                        date: `${hour.length===1?`0${hour}`:hour}:${minute.length===1?`0${minute}`:minute} . ${day} ${months[month]} ${year}`,
                        title:title.current.value?title.current.value:false,
                        body:body.current.value?body.current.value:false,
                        imageUrl:imageUrl?imageUrl:false};

        

        fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/${postId}.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        }).then(()=>{
            navigate("/");
            window.location.reload();
        })

        const userPost = {
            [postId]: true
        }

        fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}/posts.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userPost),
          }).then(()=>{
              navigate("/");
              window.location.reload();
          })


    
    }

    const postHandler = (e) => {
        e.preventDefault();
        if(image){
            props.loadingHandler(true);
            const imageRef = ref(storage, image.name);
            uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(imageRef)
                .then((url) => {
                    console.log("IMAGE WORKING");
                    handleSubmit(url);
                })
                .catch((error) => {
                    setImage(null);
                    props.loadingHandler(false);
                    props.overlayHandler(false);
                    alert(error.message)
                });
                setImage(null);
                props.loadingHandler(false);
                props.overlayHandler(false);
            })
            .catch((error) => {
                setImage(null);
                props.loadingHandler(false);
                props.overlayHandler(false);
                alert(error.message)
            });
        }else if(title||body){
            props.loadingHandler(true);
            handleSubmit();
            props.loadingHandler(false);
            props.overlayHandler(false);
        }


      };


    return (
        <SubLoginForm
            onClick={(e) => e.stopPropagation()}
            overlayHandler={props.overlayHandler}>
            <form className="input-form">
                <textarea ref={title} className="input-title scrollbar"  maxLength={150}/>
                <textarea ref={body} className="input-article" maxLength={1000}/>
                {image && 
                    <div className="uploaded-image-wrapper">
                        <MdCancel className="uploaded-image-close-icon" size={25} onClick={handleCancelImage}/>
                        <img src={URL.createObjectURL(image)}  alt="Haha"/>
                    </div>
                    
                }

                <div className="input-post-buttons-holder">
                    <input type="file" id="files" className="hidden" onChange={handleImageChange}/>
                    <label className="upload-picture-button" htmlFor="files">
                        <AiOutlinePicture className="upload-picture-icon" size={25}/>
                        <p>Upload picture</p>
                    </label>
                    <button className="upload-picture-button" onClick={postHandler}>
                        Post
                    </button>
                </div>
                
            </form>
        </SubLoginForm> 
    );
}
 
export default InputPost;