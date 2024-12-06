import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as session from '../../store/firebase';

import "./index.css"

function SignInwithGoogle({ closeModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      await dispatch(session.googleLogin()).then(closeModal());
      navigate(`/`);
    } catch (error) {
      toast.error(`Error during sign-in ${error}`, { position: "top-center" });
    }
  };

  return (
    <div>
      <div>
        <CircularButton src={require("../../assets/images/google_button.png")} alt = "Google" onClick={handleGoogleLogin}></CircularButton>
      </div>




    </div>
  );
}

const CircularButton = styled.img`
  width: 50px; /* Size of the circular button */
  height: 50px;
  border-radius: 50%; /* Makes it circular */
  object-fit: cover;
`;

export default SignInwithGoogle;