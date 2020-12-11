import React, { useState } from "react";
import "./App.css";
import Footer from "./components/footer";
import Card from "./components/Card";
import Header from "./components/Header";
import LogIn from "./components/login";
import Main from "./components/main";
import SignIn from "./components/SignIn";
import { Route, BrowserRouter as Router } from "react-router-dom";
import ProfileMaking from "./components/ProfileMaking";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import List from "./components/ProfilesList";
import ChoosePack from "./components/ChoosePack";
import NewRate from "./components/NewRate";
import ProfilePublicProject from "./components/ProfilePublicProject";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Header} />
        <Route path="/" exact component={Main} />
        <Route path="/" exact component={Card} />
        <Route path="/" exact component={Footer} />
        <Route path="/LogIn" component={LogIn} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/ProfileMaking" component={ProfileMaking} />
        <Route path="/Profile/:_id" component={Profile} />
        <Route path="/ProfilePublicProject/:_id/:index" component={ProfilePublicProject} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/Freelancer/:domain" component={List} />
        <Route path="/Choose/Pack" component={ChoosePack} />
      </div>
    </Router>
  );
}

export default App;
