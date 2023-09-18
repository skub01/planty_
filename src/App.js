import React, { useEffect, useState } from 'react';
import { auth, db } from "./firebase";
import Navbar from './features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserLoggedIn(!!user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);


  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  );
};

export default App;
