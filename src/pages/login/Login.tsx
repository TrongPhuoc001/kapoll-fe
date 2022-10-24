import { MailOutlined } from "@ant-design/icons";
import "./Login.css";
import logo from "../../assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "../../components/inputs/PasswordInput";
import { useState, FormEvent } from "react";
import { loginFetcher } from "../../api/authApi";
export const Login = ({ userState }: any) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const handleFormChange = (e: FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setLoginForm({ ...loginForm, [name]: value });
  };
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginFetcher(loginForm);
      userState.setUser({ isLoggedIn: true, user: res.data.user });
      navigate("/");
    } catch (err) {
      setErrorMsg((err as any).response.data.message);
    }
  };
  return (
    <form
      className="screen-1"
      onChange={handleFormChange}
      onSubmit={handleFormSubmit}
    >
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Login</h1>
      <div className="email">
        <label htmlFor="email">Email Address</label>
        <div className="sec-2">
          <MailOutlined />
          <input type="email" name="email" placeholder="Username@gmail.com" />
        </div>
      </div>
      <PasswordInput name="password" label="Password" />
      {errorMsg && <span className="error">{errorMsg}</span>}
      <button className="login">Login </button>
      <div className="footer">
        <Link to={"/register"}>Sign up</Link>
        <span>Forgot Password?</span>
      </div>
    </form>
  );
};
