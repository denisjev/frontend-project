import { UserItemProps } from "../../types/UserType"

  export default function UserItem({ user, handleRemoveUser  } : UserItemProps ) {

  return (
    <tr>
      <td><img src={user.picture.thumbnail} /></td>
      <td>{user.name.title} {user.name.first} {user.name.last}</td>
      <td>{user.email}</td>
      <td>{user.location.country}</td>
      <td><button onClick={ () => handleRemoveUser(user) }>Eliminar</button></td>
    </tr>
  )
}