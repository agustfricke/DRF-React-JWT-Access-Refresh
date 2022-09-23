import { useContext, useState, useEffect } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const { user } = useContext(AuthContext);
  let {authTokens, logoutUser} = useContext(AuthContext)
  let [notes, setNotes] = useState([]);
  let [blogs, setBlog] = useState([])
  const { id } = useParams();
  let [usuario, setUsuario] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/getProfile/",
    {headers: {
        'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
        }}
    ).then((res) => {
        setUsuario(res.data)
    }).catch(() => {
      alert("Algo fue mal")
    })
  }, [])


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/getBlog/", 
    {headers: {
        'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
        }}
    ).then((res) => {
      setBlog(res.data)
    }).catch(() => {
      alert("Algo fue mal")
    })
  }, [])



  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/profile/${id}/`);
        setNotes(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
         


      


    <div>
      <center>
      <p>DashBoard</p>
      <h1>{notes.username}</h1>
      <p>{notes.id}</p>
      <p>{notes.first_name}</p>
     
      </center>

      {blogs.map( b =>  {
        return  <div>

        
        <br></br>
        
        {
            notes.username === b.user &&
            <>
        Condicional
        <Card key={b.id}>
      <Card.Header>{b.user}</Card.Header>
      <Card.Body>
        <Card.Title>Titulo Super Especial</Card.Title>
        <Card.Text>
        {b.body}
        </Card.Text>
        </Card.Body>
        </Card>
            </>
        }

    </div>
    } )}

    </div>



  );
};

export default Home;