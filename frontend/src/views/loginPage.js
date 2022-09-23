import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <h1>Login </h1>
        <hr />
        <Form.Group className="mb-3">
        <Form.Control type="text" id="username" placeholder="Enter Username" />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Control type="password" id="password" placeholder="Enter Password" />
        </Form.Group>
        <Button type="submit" variant="warning" >Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;