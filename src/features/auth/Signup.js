import React, { useRef, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";

export default function Signup() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return; // Return early if passwords don't match
    }

    const name = nameRef.current.value.trim();
    if (!name) {
      setError("Name cannot be empty");
      return; // Return early if name is empty
    }

    try {
      setError("");
      setLoading(true);

      // Create the user and log them in
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      // Update the user's profile with their name
      await updateProfile(firebaseUser, { displayName: name });

      // Create the "users" collection and add a document with user data
      const userData = {
        id: firebaseUser.uid,
        name: name,
        email: firebaseUser.email,
        // Add any additional user data you want to store in the collection
      };

      // Use addDoc to automatically generate a unique ID for the new document
      await setDoc(doc(db, "users", firebaseUser.uid), userData);

      navigate("/user-details");
    } catch (err) {
      setError("Failed to create an account: " + err.message);
    }
    setLoading(false);
  }

  const signInWithGoogle = async () => {
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
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        <label>Name</label>
        <input type="text" ref={nameRef} required />

        <label>Email</label>
        <input type="email" ref={emailRef} required />

        <label>Password</label>
        <input type="password" ref={passwordRef} required />

        <label>Password Confirmation</label>
        <input type="password" ref={passwordConfirmRef} required />

        <button onClick={handleSubmit} disabled={loading} type="submit">
          Sign Up
        </button>
      </form>

      <button onClick={signInWithGoogle}>Sign Up With Google</button>
    </div>
  );
}
