import React from 'react'
import UserItemTable from '../components/UserItemTable'

const userData = [
  {
    username: "exmaple 1",
    email: "exmaple1@mail.com",
    updatedAt: "04/05/20025",
  },
  {
    username: "exmaple 2",
    email: "exmaple2@mail.com",
    updatedAt: "04/05/20025",
  },
  {
    username: "exmaple 3",
    email: "exmaple3@mail.com",
    updatedAt: "04/05/20025",
  },
  {
    username: "exmaple 1",
    email: "exmaple1@mail.com",
    updatedAt: "04/05/20025",
  },
  {
    username: "exmaple 2",
    email: "exmaple2@mail.com",
    updatedAt: "04/05/20025",
  },
  {
    username: "exmaple 3",
    email: "exmaple3@mail.com",
    updatedAt: "04/05/20025",
  },
  {
    username: "exmaple 1",
    email: "exmaple1@mail.com",
    updatedAt: "04/05/20025",
  },
  {
    username: "exmaple 2",
    email: "exmaple2@mail.com",
    updatedAt: "04/05/20025",
  },
  {
    username: "exmaple 3",
    email: "exmaple3@mail.com",
    updatedAt: "04/05/20025",
  },
  {
    username: "exmaple 1",
    email: "exmaple1@mail.com",
    updatedAt: "04/05/20025",
  },
  {
    username: "exmaple 2",
    email: "exmaple2@mail.com",
    updatedAt: "04/05/20025",
  },
  {
    username: "exmaple 3",
    email: "exmaple3@mail.com",
    updatedAt: "04/05/20025",
  }
]
const UsersList = () => {



  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-lg font-bold'>All Users</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>
                User Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className=' px-6 py-3'>
                Updated At
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {userData.map((user, index) => {
              return <UserItemTable key={index} username ={user.username} email={user.email} updatedAt={user.updatedAt}/>
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default UsersList;