import React from 'react'

const UserItemTable = ({username , email , updatedAt}) => {
   return (
      <tr className='bg-white border-b'>
         <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font font-medium text-gray-900 whitespace-nowrap'>
            <img src="/noAvatar.png" width={40} height={40} />
            <p>{username}</p>
         </th>

         <td className='px-6 py-4'>
            {email}
         </td>

         <td className='px-6 py-4'>
            {updatedAt}
         </td>

         <td className='px-6 py-4 cursor-pointer'>
            X
         </td>

      </tr>
   )
}

export default UserItemTable