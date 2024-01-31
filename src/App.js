// import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Films from "./Films";
import Clubs from "./Clubs";
import Profile from "./Profile";
import MyClubs from "./MyClubs";
import Settings from "./Settings";

function App() {
  // const [user, setUser] = useState();
  // useEffect(() => {
  //   fetch("/check_session")
  //     .then((r) => r.json())
  //     .then((u) => setUser(u));
  // }, []);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/films">
            <Films />
          </Route>
          <Route exact path="/clubs">
            <Clubs />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/profile/my_clubs">
            <MyClubs />
          </Route>
          <Route exact path="/profile/settings">
            <Settings />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
