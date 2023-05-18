import { useQuery } from "@tanstack/react-query"
import { getUsersRequest } from "../api/auth"
import Loader from "../components/Loader"
import  toast from "react-hot-toast"

interface User {
  id: string
  username: string
  email: string
}

const Users = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsersRequest,
  })

  if(isLoading) return <Loader />
  
  if(error instanceof Error) return <>{toast.error(error.message)}</>

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">ID</th>
                  <th scope="col" className="px-4 py-3">Username</th>
                  <th scope="col" className="px-4 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((user: User) => (
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">{user.email}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Users
