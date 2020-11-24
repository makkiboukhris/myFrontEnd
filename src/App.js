import React from 'react';
import './App.css';
import Footer from './components/footer';
import Card from './components/Card';
import Header from './components/Header';
import LogIn from './components/login';
import Main from './components/main';
import SignIn from './components/SignIn';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import ProfileMaking from './components/ProfileMaking';
import Profile from './components/Profile';
import WorkingDashboard from './components/Dashboard-Working';
import ClientDashboard from './components/Dashboard-Client';


function App() {
  return (
    <Router>
    <div className="App">
    <Route path="/" exact component={Header} />
    <Route path="/" exact component={Main} />
    <Route path="/" exact component={Card} />
    <Route path="/" exact component={Footer} />
    <Route path="/LogIn" component={LogIn}/>
    <Route path="/SignIn" component={SignIn}/>
    {/* <Route path="/ClassifyUsers" component={ClassifyUsers}/> */}
    {/* <Route path='/ClassifyUser' component={ClassifyUser}/> */}
    <Route path="/ProfileMaking" component={ProfileMaking}/>
    <Route path="/Profile" component={Profile}/>
    <Route path="/dashboard" component={WorkingDashboard}/>
    <Route path="dashboard" component={ClientDashboard} />
    </div>
    </Router>
  );
}

export default App;
