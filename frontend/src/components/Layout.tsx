import { Outlet } from "react-router-dom"
import Header from "./Header";
import { Toaster } from 'react-hot-toast';

const Layout = () => {

  return (

    <>
      <Toaster/>
      <Header/>

      <div className="bg-gray-50 dark:bg-gray-900  w-full min-h-screen">
        <Outlet />
      </div>

    </>

  )
}

export default Layout
