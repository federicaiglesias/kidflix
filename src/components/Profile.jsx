import { useEffect } from "react";
import { loadFavorites } from "../redux/favoritesSlice"; // Importa la acción
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = auth.currentUser;
  const favorites = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(loadFavorites(user.uid)); // Cargar los favoritos del usuario
    }
  }, [dispatch, navigate, user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 text-center shadow"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="mb-4">MY PROFILE</h2>
        {user ? (
          <>
            <img
              src={user.photoURL || "https://via.placeholder.com/80"}
              alt="User Avatar"
              className="rounded-circle mb-3"
              style={{ width: "80px", height: "80px" }}
            />
            <h4>{user.displayName}</h4>
            <p>{user.email}</p>
            <h5 className="mt-4">Favorites</h5>
            <ul className="list-group">
              {favorites.length > 0 ? (
                favorites.map((movie, index) => (
                  <li key={index} className="list-group-item">
                    {movie.title}
                  </li>
                ))
              ) : (
                <li className="list-group-item">No favorites added</li>
              )}
            </ul>
            <button
              className="btn btn-danger d-flex align-items-center justify-content-center gap-2 w-100 mt-3"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
