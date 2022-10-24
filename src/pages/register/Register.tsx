import { MailOutlined } from "@ant-design/icons";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerFetcher } from "../../api/authApi";
import logo from "../../assets/images/logo.svg";
import { PasswordInput } from "../../components/inputs/PasswordInput";
import "./Register.css";
export const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const handleFormChange = (e: FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "confirmPassword") {
      if (value !== registerForm.password) {
        setErrorMsg("Passwords do not match");
      } else {
        setErrorMsg(undefined);
      }
    }
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorMsg || !registerForm.password || !registerForm.confirmPassword)
      return;
    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    try {
      await registerFetcher(registerForm);
      navigate("/login");
      toast.success("Register successful!");
    } catch (err) {
      toast.error((err as any).response.data.message);
    }
  };

  return (
    <div className="">
      <form
        className="screen"
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Register</h1>
        <div className="email">
          <label htmlFor="email">Email Address</label>
          <div className="sec-2">
            <MailOutlined />
            <input
              type="email"
              name="email"
              placeholder="Username@gmail.com"
              required
            />
          </div>
        </div>
        <PasswordInput name="password" label="Password" />
        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          errorMsg={errorMsg}
        />
        <button className="register">Register</button>
        <div className="footer">
          <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
};
