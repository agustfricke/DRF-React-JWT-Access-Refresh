import { useState, useEffect } from "react"
import axios from "axios"
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


const Users = () => {

    let [users, setUsers] = useState([])

    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(()=> {
        getUsers()
    }, [])

  const getUsers = async () => {
    try {

        const config = {
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        }

        const { data } = await axios.get(`http://127.0.0.1:8000/api/users/`, config);

      setUsers(data)

    } catch (err) {
        console.error(err)

    }
}


  return (
    <>
      {users.map(user => 
        <div key={user.id}>
          <p> {user.username}</p>
        </div>
      )}
    </>  
  )

}
export default Users
