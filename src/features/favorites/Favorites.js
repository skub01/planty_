import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const Favorites = ( { user } ) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUserFavorites = async () => {
    if (auth.currentUser) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userRecipes = userDocSnapshot.data().userRecipes;
        setFavorites(userRecipes);
      } 
          }
        };
        fetchUserFavorites();
      }, [favorites]);

  return (
    <div className="favorites-container">
      <h3>Welcome to your favorites page, {auth.currentUser.displayName}!</h3>
      {favorites.length ? (
        <>
          <h4>Saved Recipes:</h4>
          <ul className="favorite-list">
            {favorites.map((favorite) => (
              <li key={favorite.id}>
                <img src={favorite.image} className="favorite-recipe-img" />
                <Link to={`/allrecipes/${favorite.id}`}>
                  {favorite.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No favorites yet!</p>
      )}
    </div>
  );
};

export default Favorites;
