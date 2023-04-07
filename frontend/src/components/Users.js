import { useState, useEffect } from "react"
import axios from "axios"
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";


const Users = () => {

    let [users, setUsers] = useState([])

    const axi = useAxios()

    useEffect(()=> {
        getUsers()
    }, [])

  const getUsers = async () => {
    try {
        const { data } = await axi.get(`http://127.0.0.1:8000/api/users/`);

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
