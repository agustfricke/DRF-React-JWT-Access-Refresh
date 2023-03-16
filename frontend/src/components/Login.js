import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {

  const { loginUser } = useContext(AuthContext);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = e => {
    e.preventDefault();
    loginUser(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}/>

      <input type='password' placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}/>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
