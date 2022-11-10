import {AiOutlinePicture} from "react-icons/ai";
import SubLoginForm from "./SubLoginForm";
import { useState, useRef } from "react";
import {MdCancel} from "react-icons/md";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const InputPost = (props) => {
    const [image, setImage] = useState(null);
    const title = useRef();
    const body = useRef();

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
        let minute = d.getMinutes();
        let hour = d.getHours();
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
         

        const post = {  author: props.userInfo.data.username,
                        authorId: localStorage.getItem("userId"),
                        authorImageUrl: props.userInfo.data.imageUrl,
                        date: `${hour}:${minute} . ${day} ${months[month]} ${year}`,
                        title:title.current.value?title.current.value:false,
                        body:body.current.value?body.current.value:false,
                        imageUrl:imageUrl?imageUrl:false};

        fetch(`https://karkade-development-default-rtdb.firebaseio.com/posts/.json`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
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

    // const handleSubmitPost = ()=>{
    //     if(image){
    //         const imageRef = ref(storage, image.name);
    //         uploadBytes(imageRef, image).then(()=>{
    //             getDownloadURL(imageRef).then((url)=>{
    //                 console.log("IT'S WORKING");
    //                 setUrl(url);
    //             }).catch((error)=>{
    //                 console.log(error.message);
    //             })
    //             setImage(null);
    //         }).catch((error)=>{
    //             console.log(error.message);
    //         })
    //     }
    //     console.log(url);
    // }



    // const handleSubmitPost = () => {
    //     const imageRef = ref(storage, image.name);
    //     uploadBytes(imageRef, image)
    //       .then(() => {
    //         getDownloadURL(imageRef)
    //           .then((url) => {
    //             setUrl(url);
    //             console.log("WHERE URL:", url);
    //           })
    //           .catch((error) => {
    //             console.log(error.message, "error getting the image url");
    //           });
    //         setImage(null);
    //       })
    //       .catch((error) => {
    //         console.log(error.message);
    //       });
          
    //   };


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