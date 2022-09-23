import Button from 'react-bootstrap/Button';
import React, { useState, useEffect }from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup"
import Modal from "react-bootstrap/Modal";
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import useAxios from "../utils/useAxios";
import BlogForm from './BlogForm';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Blogs() {
  const { user } = useContext(AuthContext);

    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    let [usuario, setUsuario] = useState([]);
    const [show, setShow] = useState(false);
    const [record, setRecord] = useState(null);

    const handleUpdate = async (id, value) => {
        return axios.put(`http://127.0.0.1:8000/api/updateBlog/${id}/`, value 
        ,{headers: {
            'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)


            }

        })
        .then((res) => {
            const { data } = res;
            const newBlogs = notes.map( b => {
                if (b.id === id){
                    return data;

                }
                return b;
            })
            setNotes(newBlogs);
        }).catch(() => {
            alert("Algo fue mal")
        })
    }

    const handleSaveChanges = async () => {
        await handleUpdate(record.id, {body: record.body});

        handleClose();
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleChange = (e) => {
    setRecord({
        ...record,
        body: e.target.value
    })
    }

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/deleteBlog/${id}`
        ,{headers: {
            'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)


            }

        })
        .then(() => {
            const newBlogs = notes.filter(t => {
                return t.id !== id
            });
            setNotes(newBlogs);
        }).catch(() => {
            alert("Algo fue mal")
        })
    }




  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/getBlog/", 
    {headers: {
        'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
        }}
    ).then((res) => {
        setNotes(res.data)
    }).catch(() => {
      alert("Algo fue mal")
    })
  }, [])


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/profile/",
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


 

  return (
    <ListGroup>
    {usuario.map( u =>  {
        return  <div>

          {
            user.username === u.username &&
            <>
            <Link to={`/profile/${u.id}`}>
              <li>{u.username} | {u.id} </li>
            </Link>
            </>
        }

            </div>
    })}

    



    {notes.map( b =>  {
        return  <div>

        
        <br></br>
        <Card key={b.user.id}>
      <Card.Header>{b.user}</Card.Header>

       {usuario.map( u =>  {
        return  <div>

          {
            b.user === u.username &&
            <>
            <Link to={`/getProfile/${u.id}`}>
              <li>{u.username} | {u.id} </li>
            </Link>
            </>
        }

            </div>
    })}
      




      <Card.Body>
        <Card.Title>Titulo Super Especial</Card.Title>
        <Card.Text>
        {b.body}
        </Card.Text>
        {
            user.username === b.user &&
            <>
        <Button variant="dark" onClick={() => {setRecord(b); setShow(true)}}>Editar</Button>
        &nbsp; &nbsp;
        <Button variant="dark" onClick={() => {handleDelete(b.id);}}>Eliminar</Button>
            </>
        }
      </Card.Body>
        </Card>


        <Modal show={show} onHide={handleClose}>

            <ModalHeader closeButton>
                <Modal.Title>
                    Editar Post
                </Modal.Title>
            </ModalHeader>

            <Modal.Body>
                <FormControl value={record ? record.body : ""}
                onChange={handleChange}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='dark' onClick={handleClose}>Cerrar </Button>

                <Button variant='warning' onClick={handleSaveChanges}>Guardar</Button>
            </Modal.Footer>
        </Modal>


    </div>
    } )}
</ListGroup>
);
}



export default Blogs;