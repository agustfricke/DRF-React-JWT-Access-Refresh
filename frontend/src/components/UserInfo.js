import React, { useState, useEffect, useContext } from 'react'
import AuthContext from "../context/AuthContext";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup"



function UserInfo({ user }) {
  let [notes, setNotes] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)







    return (
      <ListGroup>
        <p>DashBoard</p>
        
        

      </ListGroup>
        
        
    );
  }
  
  export default UserInfo;