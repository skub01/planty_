import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase"
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserLoggedIn(!!user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Failed to log out: ", err.message);
    }
  };

  return (
    <div className="navbar-container">
      <div className="nav-links">
      <Link to="/home">Home</Link>
        <Link to="/allrecipes">Browse Recipes</Link>
        {userLoggedIn && <Link to="/favorites">Favorites</Link>}
        </div>
        {userLoggedIn ? (
        <button className="logout-button" onClick={logOut}>
          Logout
        </button>
      ) : (
        <div className="nav-auth-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
