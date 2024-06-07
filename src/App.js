// import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Flowbite } from "flowbite-react";

import Layout from "./components/UI/Layout";
import Home from "./pages/Home";
import Films from "./pages/Films";
import FilmPage from "./pages/FilmPage";
import Clubs from "./pages/Clubs";
import ClubPage from "./pages/ClubPage";
import ScreeningRoom from "./pages/RoomPage";
import MyDashboard from "./components/profile/MyDashboard";
import Settings from "./components/profile/Settings";
import UserDash from "./components/admin/UserDash";
import ClubDash from "./components/admin/ClubDash";
import RoomDash from "./components/admin/RoomDash";

import { UserProvider } from "./contexts/userContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Flowbite>
            <Switch>
              <Route exact path="/">
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
              <Route path="/rooms/:roomId">
                <ScreeningRoom />
              </Route>
              <Route exact path="/profile/dashboard">
                <MyDashboard />
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
              <Route exact path="/admin/room_dash">
                <RoomDash />
              </Route>
            </Switch>
          </Flowbite>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;
