// import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Flowbite } from "flowbite-react";

import Layout from "./components/UI/Layout";
import Home from "./routes/Home";
import Films from "./routes/Films";
import FilmDetails from "./components/modals/FilmDetailsModal";
import Clubs from "./routes/Clubs";
import ClubPage from "./routes/ClubPage";
import ScreeningRoom from "./routes/ScreeningRoom";
import MyClubs from "./components/profile/MyClubs";
import Settings from "./components/profile/Settings";
import UserDash from "./components/admin/UserDash";
import ClubDash from "./components/admin/ClubDash";

import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Flowbite>
            <Switch>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/films">
                <Films />
              </Route>
              <Route exact path="/films/:filmId">
                <FilmDetails />
              </Route>
              <Route exact path="/clubs">
                <Clubs />
              </Route>
              <Route path="/clubs/:clubId">
                <ClubPage />
              </Route>
              <Route path="/rooms/:roomId">
                <ScreeningRoom />
              </Route>
              <Route exact path="/profile/my_clubs">
                <MyClubs />
              </Route>
              <Route exact path="/profile/settings">
                <Settings />
              </Route>
              <Route exact path="/admin/user_dash">
                <UserDash />
              </Route>
              <Route exact path="/admin/club_dash">
                <ClubDash />
              </Route>
            </Switch>
          </Flowbite>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;
