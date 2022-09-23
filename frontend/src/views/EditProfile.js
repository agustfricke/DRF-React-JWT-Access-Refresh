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

function EditProfile() {
  const { user } = useContext(AuthContext);

    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    let [usuario, setUsuario] = useState([]);
    const [show, setShow] = useState(false);
    const [record, setRecord] = useState(null);
    const [blogs, setBlogs] = useState([]);


    const [name, setName] = useState
    ("");
    const [last_name, setLastName] = useState
    ("");
    const [bio, setBio] = useState
    ("");


    const handleSubmit = e => {
        
        axios.post("http://127.0.0.1:8000/api/createProfile/", {
            name:name,
            last_name:last_name,
            bio:bio
        },
        {headers: {
            'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)


            }}


        
        ).then((res) => {
            setBio("");
            setName("");
            setLastName("");
            const { data } = res;
            setBlogs([
                ...blogs,
                data
            ]).catch(() => {
                alert("Algo fue mal")
            })
        })
        }









  return (
    <div>
    <h1>Crear desde cero tus datos Personales</h1> <br></br>
    <h3>Atencion, si ya tines datos debes eliminarlos para agregar nuevos!</h3>
    <Form onSubmit={handleSubmit}>
                
                <FormControl 
                onChange={e => setName(e.target.value)}
                value={name}
                type="text"
                placeholder='Tu nombre'/>
                <br></br>
                <FormControl 
                onChange={e => setLastName(e.target.value)}

                value={last_name}
                type="text"
                placeholder='Tu Apellido!'/>
                <br></br>
                <FormControl 
                onChange={e => setBio(e.target.value)}

                value={bio}
                type="text"
                placeholder='Agrega una Biografia!'/>
                <br></br>
                <Button variant='dark' type='submit' >
                    Agregar Datos Personales
                </Button>
        </Form>
  
        </div>

);
}



export default EditProfile;