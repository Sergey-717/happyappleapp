import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import styles from "../styles/Home.module.less";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.login}>
      <div className={styles.login_form}>
        <Input
          aria-label="user"
          id="login1"
          placeholder="User"
          onChange={(x) => setUser(x.target.value)}
        />
        <Input.Password
          aria-label="pass"
          id="login2"
          initialValue="password"
          onChange={(x) => setPassword(x.target.value)}
        />
        <Button id="login3">Log in</Button>
      </div>
    </div>
  );
};

export default Login;
