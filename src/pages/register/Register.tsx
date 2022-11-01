import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerFetcher } from "../../api/authApi";
import logo from "../../assets/images/logo.svg";
import "./Register.css";
export const Register = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const handleFormSubmit = async (e: any) => {
    try {
      await registerFetcher(form.getFieldsValue());
      navigate("/login");
    } catch (err) {
      message.error((err as any).response.data.message);
    }
  };
  return (
    <div className="screen">
      <Form form={form} className="form">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Register</h1>
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
            required
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
        <Form.Item
          name={"confirmPassword"}
          rules={[
            { required: true },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "Please enter a valid password with mininum 8 characters, at least one uppercase letter, one lowercase letter and one number",
            },
            {
              validator: (rule, value) => {
                if (value !== form.getFieldValue("password")) {
                  return Promise.reject("Passwords do not match");
                }
              },
            },
          ]}
        >
          <Input.Password
            className="password-input"
            name={"confirmPassword"}
            placeholder={"confirm passoword"}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            required
          />
        </Form.Item>
        <Form.Item>
          <div className="site-button-ghost-wrapper w-full">
            <Button
              type="primary"
              className="w-full"
              ghost
              onClick={handleFormSubmit}
            >
              Register
            </Button>
          </div>
        </Form.Item>
        <div className="footer">
          <Link to="/login">Sign in</Link>
        </div>
      </Form>
    </div>
  );
};
