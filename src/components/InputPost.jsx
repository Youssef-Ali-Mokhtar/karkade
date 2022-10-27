import {AiOutlinePicture} from "react-icons/ai";
import SubLoginForm from "./SubLoginForm";
import { storage, getUserInfo } from "../firebase";
import { useState } from "react";
import {MdCancel} from "react-icons/md";
import {ref, uploadBytes, getDownloadURL } from "firebase/storage";

const InputPost = (props) => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const handleImageChange=(e)=>{
        if(e.target.files.length!==0){
            setImage(e.target.files[0]);
            e.target.value = null;
        }
    }

    const handleCancelImage=(e)=>{
        setImage(null);
    }

    const handleSubmitPost = ()=>{
        const imageRef = ref(storage, image.name);
        uploadBytes(imageRef, image).then(()=>{
            getDownloadURL(imageRef).then((url)=>{
                setUrl(url);
            }).catch((error)=>{
                console.log(error.message);
            })
            setImage(null);
        }).catch((error)=>{
            console.log(error.message);
        })

    }
    console.log(url);
    return (
        <SubLoginForm
            onClick={(e) => e.stopPropagation()}
            overlayHandler={props.overlayHandler}>
            <form className="input-form">
                <textarea className="input-title scrollbar"  maxLength={150}/>
                <textarea className="input-article" maxLength={1000}/>
                {image && 
                    <div className="uploaded-image-wrapper">
                        <MdCancel className="uploaded-image-close-icon" size={25} onClick={handleCancelImage}/>
                        <img src={URL.createObjectURL(image)}  alt="Haha"/>
                    </div>
                    
                }
                {/* <input type="file"  onChange={handleImageChange}/> */}
                
                <div className="input-post-buttons-holder">
                    <input type="file" id="files" className="hidden" onChange={handleImageChange}/>
                    <label className="upload-picture-button" htmlFor="files">
                        <AiOutlinePicture className="upload-picture-icon" size={25}/>
                        <p>Upload picture</p>
                    </label>
                    <button className="upload-picture-button" onClick={e=>{
                        e.preventDefault();

                        handleSubmitPost();
                        props.overlayHandler(false);
                    }}>
                        Post
                    </button>
                </div>
            </form>
            <button onClick={()=>console.log(getUserInfo().email)}>test</button>
        </SubLoginForm> 
    );
}
 
export default InputPost;