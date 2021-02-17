import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//UTILITIES IMPORTS
import { fetchPostUser, fetchGetTokens, fetchGetUser } from "./utilities";

//REDUX IMPORTS
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/User/actions";
import { setTokens } from "../../Store/Tokens/actions";

//BOOTSTRAP IMPORTS
import { Form, Button, Row, Col } from "react-bootstrap";

//STYLES IMPORTS
import "./LoginPage.scss";

export default function LoginPage() {
  const loginUser = {
    username: "",
    password: "",
  };

  const signupUser = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  };

  const [form, setForm] = useState(false);
  const [login, setLogin] = useState(loginUser);
  const [signUp, setSignUp] = useState(signupUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const fillForm = (e) => {
    let user;
    form ? (user = { ...signUp }) : (user = { ...login });
    let currentId = e.currentTarget.id;
    if (currentId === "role") {
      let isCheck = e.currentTarget.checked;
      isCheck ? (user.role = "admin") : (user.role = "user");
    } else {
      user[currentId] = e.currentTarget.value;
    }
    form ? setSignUp(user) : setLogin(user);
  };

  const signUpFunc = async () => {
    await fetchPostUser(signUp);
    const tokens = await fetchGetTokens(signUp.username, signUp.password);
    await dispatch(setTokens(tokens));
    await history.push("/home");
  };

  const loginFunc = async () => {
    const tokens = await fetchGetTokens(login.username, login.password);
    await dispatch(setTokens(tokens));
    await history.push("/home");
  };

  return (
    <div id="login-page">
      <div className="login-container">
        <div className="header">
          <img src="./assets/medium_wordmark.png" alt="" />
        </div>
        <div className="login-form" style={{ display: form ? "none" : "" }}>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                id="username"
                onChange={fillForm}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                id="password"
                onChange={fillForm}
              />
            </Form.Group>
          </Form>
          <p onClick={() => setForm(!form)}>Not registered yet? Click me</p>
        </div>
        <div className="signUp-form" style={{ display: form ? "" : "none" }}>
          <Form>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    onChange={fillForm}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    id="lastName"
                    onChange={fillForm}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={fillForm}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>E Mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={fillForm}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Admin ?"
                    id="role"
                    onChange={fillForm}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={fillForm}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <p onClick={() => setForm(!form)}>Already registered? Log in</p>
        </div>
        <Button
          variant="primary"
          type="button"
          onClick={form ? () => signUpFunc() : () => loginFunc()}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
