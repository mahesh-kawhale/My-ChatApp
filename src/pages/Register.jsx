import React, { useState } from "react";
import Add from "../assets/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import { useNavigate,Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();   // to got Home Page from register

  const handleSubmit = async (e) => {
  e.preventDefault(); // to avoid refresh on submit

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // create a user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            });


            // create user on firestore by
            // adding data to database firestore
            await setDoc(doc(db,"users",res.user.uid),{
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              
            });

            await setDoc(doc(db, "userChats", res.user.uid),{});

            navigate("/");

            // console.log("donee.")
            
          }catch (error) {
            setError(true);
          }
        });
    });
  }catch(error){
    setError(true);
  }
};

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h3 className="logo">My Chat</h3>
        <h3 className="title">Register</h3>
        <form onSubmit={handleSubmit} className="formbox">
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} id="file" type="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button className="btn">sign up</button>
        </form>
        <p className="formtext">You do have an Accont? <Link to='/login'>Login</Link></p>
        {error && <span>Something went wrong</span>}
        
      </div>
    </div>
  );
};

export default Register;
