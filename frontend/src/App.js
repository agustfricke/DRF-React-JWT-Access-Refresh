import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Users from './components/Users';
import Home from './components/Home';
import Login from './components/Login';
import Layout from './components/Layout';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route element={<PrivateRoute/>}>
            <Route path='/users' element={<Users/>} />
          </Route>

          <Route path='/' index element={<Home/>}/>
          <Route path='/login' element={<Login/>} />
          </Route>

        </Routes>
      </AuthProvider>
   </BrowserRouter>
  );
}

export default App;
