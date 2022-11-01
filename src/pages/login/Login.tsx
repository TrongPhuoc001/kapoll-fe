import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginFetcher } from "../../api/authApi";
import logo from "../../assets/images/logo.svg";
import "./Login.css";
export const Login = ({ userState }: any) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleFormSubmit = async (e: FormEvent) => {
    try {
      const res = await loginFetcher(form.getFieldsValue());
      userState.setUser({
        isLoggedIn: true,
        user: res.data.user,
      });
      navigate("/");
    } catch (err) {
      message.error((err as any).response.data.message);
      console.log(err);
    }
  };
  return (
    <div className="screen">
      <Form form={form} className="form">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Login</h1>
        <Form.Item
          name={"email"}
          rules={[
            { required: true },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            placeholder="Enter your email"
            prefix={<MailOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[
            { required: true },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "Please enter a valid password with mininum 8 characters, at least one uppercase letter, one lowercase letter and one number",
            },
          ]}
        >
          <Input.Password
            className="password-input"
            name={"pasword"}
            placeholder={"Password"}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            required
          />
        </Form.Item>
        <div className="site-button-ghost-wrapper w-full">
          <Button
            type="primary"
            className="w-full"
            ghost
            onClick={handleFormSubmit}
          >
            Login
          </Button>
        </div>
        <div className="footer">
          <Link to={"/register"}>Sign up</Link>
          <span>Forgot Password?</span>
        </div>
      </Form>
    </div>
  );
};
