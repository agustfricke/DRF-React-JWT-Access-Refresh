import React, { useState, useEffect }from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";


// Imports
import Header from "./components/Navbar";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";
import Blogs from "./views/Blog";
import BlogForm from "./views/BlogForm";
import EditProfile from './views/EditProfile';
import miPerfil from "./views/MiPerfil";

function App() {




  return (
    <Router>
        <AuthProvider>
          <Header />
          <br></br>
          <div className="container">
          <Switch>
            <PrivateRoute component={ProtectedPage} path="/protected" exact />
            <PrivateRoute component={Blogs } path="/blogs" exact />
            <PrivateRoute component={BlogForm } path="/blogForm" exact />
            <PrivateRoute component={EditProfile } path="/crearPerfil" exact />
            <PrivateRoute component={miPerfil } path="/MiPerfil" exact />
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={Home} path="/profile/:id/" />
          </Switch>
          </div>
        </AuthProvider>
    </Router>
  );
}

export default App;
