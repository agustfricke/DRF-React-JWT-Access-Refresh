import React, {useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import AuthContext from "../context/AuthContext";



export function BlogForm() {
    const [blogs, setBlogs] = useState([]);
    let {authTokens, logoutUser} = useContext(AuthContext)


    const [body, setBody] = useState
    ("");

    const handleChange = e => {
        setBody(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!body) {
            alert("Pon Algo para postear")
        }

        axios.post("http://127.0.0.1:8000/api/createBlog/", {
            body:body
        },
        {headers: {
            'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)


            }}


        
        ).then((res) => {
            setBody("");
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
        <Form onSubmit={handleSubmit}>
            <InputGroup className='mb-3'>
                <FormControl 
                onChange={handleChange}
                value={body}
                type="text"
                placeholder='Agrega un Post!'/>
                <Button variant='dark' type='submit' onClick={event =>  window.location.href='/blogs'}>
                    Postear
                </Button>
            </InputGroup>
        </Form>
    );
}

export default BlogForm;