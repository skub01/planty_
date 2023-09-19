import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup ,updateProfile,GoogleAuthProvider} from "firebase/auth";
import { doc, setDoc,getDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/");
    } catch (err) {
      setError("Failed to log in: " + err.message);
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, googleProvider);

    // You can customize the behavior after successful login here
    console.log("Successfully signed in with Google:", user);

    // If you want to check if the user is new or existing and perform additional actions, you can do so here
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      const name = user.displayName || "No Name";

      // Update the user's profile with their name (regardless of whether it's a new user)
      await updateProfile(user, { displayName: name });

      // Add the user's data to the "users" collection in Firestore
      const userData = {
        id: user.uid,
        name: name,
        email: user.email,
      };
      // Use setDoc to explicitly specify the document ID (user's uid) in the "users" collection
      await setDoc(doc(db, "users", user.uid), userData);
      navigate("/user-details");
    } else {
      // User is existing, perform any necessary actions for existing users
      console.log("Existing user, performing login...");
      navigate("/");
    }   
    } catch (err) {
      setError("Failed to sign in with Google: " + err.message);
    }
  };

  return (
    <div className="auth-form">
      <div>
        <h2>Log In</h2>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              required
            />
          </div>
          <button type="submit"  onClick={handleEmailLogin}>
            Log In with Email
          </button>
          <button type="button" onClick={handleGoogleLogin}>
            Log In with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
