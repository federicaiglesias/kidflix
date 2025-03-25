
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { FaGoogle, FaSignOutAlt } from "react-icons/fa";

function Login() {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 text-center shadow"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="mb-4">LOGIN TO KIDFLIX</h2>
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
            <button
              className="btn btn-danger d-flex align-items-center justify-content-center gap-2 w-100"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center gap-2 w-100"
            onClick={handleLogin}
          >
            <FaGoogle /> Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
