import { BrowserRouter, Routes, Route } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import Layout from "./components/Layout"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Home from "./pages/Home"
import Users from "./pages/Users"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>

          <Route element={<PrivateRoute/>}>

            <Route path='/users' element={<Users/>} />

          </Route>

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route index element={<Home />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
