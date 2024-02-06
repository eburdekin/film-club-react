// import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Flowbite } from "flowbite-react";

import Layout from "./components/Layout";
import Home from "./routes/Home";
import Films from "./routes/Films";
import FilmPage from "./routes/FilmPage";
import Clubs from "./routes/Clubs";
import ClubPage from "./routes/ClubPage";
import Profile from "./routes/Profile";
import MyClubs from "./components/MyClubs";
import Settings from "./components/Settings";

import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Flowbite>
          <Layout>
            <Switch>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/films">
                <Films />
              </Route>
              <Route exact path="/films/:filmId">
                <FilmPage />
              </Route>
              <Route exact path="/clubs">
                <Clubs />
              </Route>
              <Route path="/clubs/:clubId">
                <ClubPage />
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
        </Flowbite>
      </Router>
    </UserProvider>
  );
}

export default App;
