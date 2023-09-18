import React, { useRef, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc ,getDoc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider
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
    <>
      <Container
        fluid="lg"
        style={{ paddingTop: "3rem" }}
        className="d-flex justify-content-center"
      >
        <Card className=" form-width" style={{ width: "30rem" }}>
          <Card.Body>
            <h2 className="form-name title mb-4 text-center">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group
                id="name"
                className="form-content"
                style={{ paddingTop: ".25rem" }}
              >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" ref={nameRef} required />
              </Form.Group>
              <Form.Group
                id="email"
                className="form-content"
                style={{ paddingTop: ".25rem" }}
              >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group
                id="password"
                className="form-content"
                style={{ paddingTop: ".25rem" }}
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group
                id="password-confirm"
                className="form-content"
                style={{ paddingBottom: "2rem", paddingTop: ".25rem" }}
              >
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button
                variant="secondary"
                onClick={handleSubmit}
                disabled={loading}
                className="w-100 mb-3"
                type="submit"
              >
                Sign Up
              </Button>
            </Form>
            <Button
              variant="secondary"
              onClick={signInWithGoogle}
              className="w-100 mb-3"
            >
              Sign Up With Google
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
