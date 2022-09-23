import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <hr />
        <div>
        <Form.Group className="mb-3">

          <Form.Control
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </Form.Group>

        </div>
        <div>
        <Form.Group className="mb-3">

          <Form.Control
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </Form.Group>

        </div>
        <div>
        <Form.Group className="mb-3">

          <Form.Control 
            type="password"
            id="confirm-password"
            onChange={e => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </Form.Group>

          <p>{password2 !== password ? "Passwords do not match" : ""}</p>
        </div>
        <Button variant="warning" type="submit">Register</Button>
      </form>
    </div>
  );
}

export default Register;