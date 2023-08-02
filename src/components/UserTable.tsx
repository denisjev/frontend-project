import { useState, useEffect } from "react"
import { User, UserTableProps } from "../types/UserType"
import UserItem from "./UserItem"
import '../css/styles.css'

export default function UserTable({ users, strippedTable }: UserTableProps) {
    
    const [usersTable, setUsersTable] = useState<Array<User>>([]) 
    console.log(strippedTable)
    
    useEffect(()  => {
      setUsersTable(users)
    },[users])


    const actionRemove = (user: User) => {
      setUsersTable(usersTable.filter(current => current.login.uuid != user.login.uuid))
    }

    const userListRender =  usersTable.map(user => <UserItem key={user.login.uuid}
      user={user}
      actionRemove={actionRemove}
      />)

    return (
      <table className={ (strippedTable)?'stripped-table':'' }>
        <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre completo</th>
          <th>Email</th>
          <th>Pais</th>
          <th>Eliminar</th>
        </tr>
        </thead>
        <tbody>
          { userListRender }
        </tbody>
      </table>
    )
}