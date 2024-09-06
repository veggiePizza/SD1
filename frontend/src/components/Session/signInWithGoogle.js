import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import * as session from '../../store/firebase';
import "./index.css"

function SignInwithGoogle({ closeModal }) {
  const dispatch = useDispatch();
  const handleGoogleLogin = async () => {
    try {
      await dispatch(session.googleLogin()).then(closeModal());
    } catch (error) {
      toast.error("Error during sign-in", { position: "top-center" });
    }
  };

  return (
    <div>
      <div
        style={{ cursor: "pointer" }}
        onClick={handleGoogleLogin}>
        <img src={require("../../images/google.png")} width={"35%"} />
      </div>
    </div>
  );
}
export default SignInwithGoogle;