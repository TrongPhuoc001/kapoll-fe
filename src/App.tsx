import React from "react";
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";

interface User {
  email: string;
  _id: string;
}

const initialUser = {
  isLoggedIn: false,
  user: {} as User,
};

function App() {
  const [user, setUser] = React.useState(initialUser);
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="nav">
          <div className="link-item">
            <Link to="/">Home</Link>
          </div>

          <div className="right-nav">
            {user.isLoggedIn ? (
              <>
                <div className="link-item">
                  <Link to="/profile">{user.user.email}</Link>
                </div>
                <div
                  className="link-item"
                  onClick={() => {
                    setUser(initialUser);
                  }}
                >
                  <span>Logout</span>
                </div>
              </>
            ) : (
              <>
                <div className="link-item">
                  <Link to="/login">Login</Link>
                </div>
                <div className="link-item">
                  <Link to="/register">Register</Link>
                </div>
              </>
            )}
          </div>
        </nav>
        <Routes>
          <Route
            path="/login"
            element={<Login userState={{ user, setUser }} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
