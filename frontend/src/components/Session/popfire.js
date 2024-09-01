import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../Session/firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        closeModal(); // Close the modal after successful login
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Error during sign-in", { position: "top-center" });
    }
  };

  return (
    <div>
      <button onClick={openModal}>Sign in with Google</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Sign in with Google</h2>
            <button onClick={googleLogin}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignInModal;
