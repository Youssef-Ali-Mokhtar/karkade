import SubLoginForm from "./SubLoginForm";
import profileImage from "../assets/empty-avatar.jpg";
import { RiImageEditFill } from "react-icons/ri";
import { useState, useRef } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UpdateUserInfo = (props) => {
    const [image, setImage] = useState(null);
    const username = useRef();
    const country = useRef();
    const bio = useRef();
    const handleImageChange=(e)=>{
        if(e.target.files.length!==0){
            setImage(e.target.files[0]);
            console.log("WHERE IMAGE?");
            e.target.value = null;
        }
    }

    const { data: userData } = props.userInfo;

    const handleCancelImage=(e)=>{
        setImage(null);
    }

    const handleSubmit = (imageUrl) => {
        
        const post = {  username:username.current.value?username.current.value:userData.username,
                        country:country.current.value?country.current.value:userData.country,
                        bio: bio.current.value?bio.current.value:userData.bio,
                        imageUrl:imageUrl?imageUrl:userData.imageUrl};
        fetch(`https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem("userId")}.json`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        }).then(()=>{
            window.location.reload()
        })
    
    }
        
      const updateInfoHandle = (e) => {
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
        }else if(username||country||bio){
            props.loadingHandler(true);
            handleSubmit();
            props.loadingHandler(false);
            props.overlayHandler(false);
        }
      };

    return ( <SubLoginForm
        onClick={(e) => e.stopPropagation()}
        overlayHandler={props.overlayHandler} >
            
            <form className="update-profile-info">
                <input type="file" id="filez" className="hidden" onChange={handleImageChange}/>
                <label className="update-profile-pic-wrapper" htmlFor="filez">
                    <RiImageEditFill className="update-profile-pic-icon" size={30}/>
                    <img className="update-profile-pic" src={image?URL.createObjectURL(image):profileImage} alt="profile_pic" />
                </label>
                <p onClick={handleCancelImage}>Cancel Image</p>
                <input type="text"  ref={username} className="input-field" placeholder="Username" maxLength={30} required/>
                <input type="text"  ref={country} className="input-field" placeholder="Country" maxLength={30} required/>
                <input type="text"  ref={bio} className="input-field" placeholder="Bio" maxLength={150} required/>
                <button className="update-user-info" style={{margin:"10px"}} onClick={updateInfoHandle}>Update</button>
            </form>
        
    </SubLoginForm> );
}
 
export default UpdateUserInfo;