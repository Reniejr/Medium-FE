import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//BOOTSTRAP IMPORTS
import { Modal } from "react-bootstrap";

import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/home/Home";
import NewStory from "./pages/new-story/NewStory";
import Topics from "./pages/topics/Topics";
import Read from "./pages/read/Read";
import Search from "./pages/search/Search";
import Stats from "./pages/stats";
import Stories from "./pages/stories";
import LoginPage from "./pages/login/LoginPage";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./Store/User/actions";
import { setTokens } from "./Store/Tokens/actions";

//UTILITIES IMPORTS
import { fetchLogout } from "./utilities";

const routes = [
  { path: "/", component: LoginPage },
  { path: "/home", component: Home },
  { path: "/new-story", component: NewStory },
  { path: "/topics", component: Topics },
  { path: "/read/:slug", component: Read },
  { path: "/search", component: Search },
  { path: "/stats", component: Stats },
  { path: "/stories", component: Stories },
];

function App() {
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const logout = async () => {
    await fetchLogout(
      state.tokens.access_token,
      state.user.user.username,
      password
    );
  };

  const confirmLogout = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      logout();
      dispatch(setUser({}));
      dispatch(setTokens(""));
      setTimeout(() => setModal(false), 500);
    } else {
      const password = e.currentTarget.value;
      setPassword(password);
    }
  };

  const showModal = () => {
    setModal(!modal);
  };

  return (
    <Router>
      <Modal.Dialog style={{ display: modal ? "" : "none" }}>
        <Modal.Header>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="password"
            placeholder="Password"
            onChange={confirmLogout}
            onKeyDown={confirmLogout}
          />
        </Modal.Body>
      </Modal.Dialog>
      <NavBar showModal={showModal} />
      {routes.map(({ path, component }) => (
        <Route exact path={path} component={component} />
      ))}
    </Router>
  );
}

export default App;
