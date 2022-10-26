import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useState } from "react";

export const PasswordInput = ({
  name,
  label,
  errorMsg,
}: {
  name: string;
  label: string;
  errorMsg?: string;
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="password">
      <label htmlFor={name}>{label}</label>
      <div className="sec-2">
        <LockOutlined />
        <input
          className="pas"
          type={visible ? "text" : "password"}
          name={name}
          placeholder="············"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
          title="Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
          required
        />
        {visible ? (
          <EyeOutlined
            onClick={() => {
              setVisible(false);
            }}
          />
        ) : (
          <EyeInvisibleOutlined
            onClick={() => {
              setVisible(true);
            }}
          />
        )}
      </div>
      {errorMsg && <span className="error">{errorMsg}</span>}
    </div>
  );
};
