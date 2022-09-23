import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import FormControl from "react-bootstrap/FormControl";
import EditProfile from './EditProfile';


const MiPerfil = () => {
    let [notes, setNotes] = useState([])

    

    let {authTokens, logoutUser} = useContext(AuthContext)
    let [usuario, setUsuario] = useState([]);
    const { user } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const [record, setRecord] = useState(null);
    let [profile, setProfile] = useState([])





    useEffect(()=> {
        getNotes()
    }, [])


    let getNotes = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/userBlogs/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if(response.status === 200){
            setNotes(data)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
        
    }


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



      const handleUpdate = async (id, value) => {
        return axios.put(`http://127.0.0.1:8000/api/updateProfile/${id}/`, value 
        ,{headers: {
            'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)


            }

        })
        .then((res) => {
            const { data } = res;
            const newBlogs = profile.map( b => {
                if (b.id === id){
                    return data;

                }
                return b;
            })
            setProfile(newBlogs);
        }).catch(() => {
            alert("Algo fue mal")
        })
    }

    const handleSaveChanges = async () => {
        await handleUpdate(record.id, {name: record.name, last_name: record.last_name, bio: record.bio});

        handleClose();
    }

    const handleClose = () => {
        setShow(false);
    }

        const handleChange = (e) => {
            setRecord({
                ...record,
                name: e.target.value
            })
            }
    
        const handleChangeLast = (e) => {
            setRecord({
                ...record,
                last_name: e.target.value
            })
            }
    
        const handleChangeBio = (e) => {
            setRecord({
                ...record,
                bio: e.target.value
            })
            }

        const [IsCreated, setIsCreated] = useState(false)

    return (
        <div>



                <Button onClick={() => setIsCreated(!IsCreated)} variant="dark">Que quieres hacer con tus datos?</Button>
                { IsCreated ? <EditProfile/> : <h1>Eliminar</h1>}
            
            
            

        {usuario.map( u =>  {
                return  <div> 
                
            
          

{
                user.username === u.user &&
                
                <>
                <Link to={`/getProfile/${u.id}`}> Info
                  <li>{u.user} | {u.id} <br></br> | {u.name}<br></br>  | {u.last_name}<br></br>  | {u.bio}<br></br> </li>
                </Link>
                {u.name}



                


                <Button variant="dark" onClick={() => {setRecord(u); setShow(true)}}>Editar</Button>
                
                
            
                
                
                
                
            
    
                
    
    
           
                </>
            }
        
        

        
            

            






                <Modal show={show} onHide={handleClose}>

                <ModalHeader closeButton>
                    <Modal.Title>
                        Editar Perfil
                    </Modal.Title>
                </ModalHeader>

            


                <Modal.Body>
                <FormControl value={record ? record.name : ""}
                onChange={handleChange}/>

                <FormControl value={record ? record.last_name : ""}
                onChange={handleChangeLast}/>

                <FormControl value={record ? record.bio : ""}
                onChange={handleChangeBio}/>   
                

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='dark' onClick={handleClose}>Cerrar </Button>

                    <Button variant='warning' onClick={handleSaveChanges} >Guardar</Button>
                </Modal.Footer>
                </Modal>
                </div>
            
   
})}



<br></br>
      
<h3>Hey {user.username} estas son tus publicaciones!</h3>
            

             


            <ul>
                {notes.map(note => (
                    <div key={note.id} >{note.body} {note.user} {note.user} 
                    
                    
                    </div>

                    
                    ))}
            </ul>


        </div>

    )

}

export default MiPerfil