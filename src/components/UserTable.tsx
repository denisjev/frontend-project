import { useState, useEffect } from "react"
import { User, UserTableProps } from "../types/UserType"
import UserItem from "./UserItem"
import '../css/styles.css'

export default function UserTable({ users }: UserTableProps) {
    
    const [usersTable, setUsersTable] = useState<Array<User>>([]) 
    const [stripedTable, setStripedTable ] = useState<boolean>(false)

    const actionRemove = (user: User):void => {
      setUsersTable(usersTable.filter(current => current.login.uuid != user.login.uuid))
    }

    const actioRestoreState = ():void => {
      setUsersTable(users)  
    }

    const actionOrderByColumn = (columName: string):void => {
      let copyUserTable = [...usersTable];
      
      if(columName === 'picture.thumbnail')
      copyUserTable.sort((current: User, next: User):number => {
        return current.picture.thumbnail.localeCompare(next.picture.thumbnail)
      })

      else if(columName === 'name.first')
        copyUserTable.sort((current: User, next: User):number => {
          return current.name.first.localeCompare(next.name.first)
        })

      else if(columName === 'email')
        copyUserTable.sort((current: User, next: User):number => {
          return current.email.localeCompare(next.email)
        })
      
      else if(columName === 'location.country')
        copyUserTable.sort((current: User, next: User):number => {
          return current.location.country.localeCompare(next.location.country)
        })
      setUsersTable(copyUserTable)
    }

    useEffect(()  => {
      setUsersTable(users)
    },[users])


    const userListRender =  usersTable.map(user => <UserItem key={user.login.uuid}
        user={user}
        actionRemove={actionRemove}
      />)

    return (
      <>
        <button onClick={() => setStripedTable(!stripedTable)}>Colorear</button>
        <button onClick={() => actioRestoreState()}>Restaurar</button>
        
        <table className={ (stripedTable)?'striped-table':'' }>
          <thead>
          <tr>
            <th onClick={() => actionOrderByColumn('picture.thumbnail')}>Imagen</th>
            <th onClick={() => actionOrderByColumn('name.first')}>Nombre completo</th>
            <th onClick={() => actionOrderByColumn('email')}>Email</th>
            <th onClick={() => actionOrderByColumn('location.country')}>Pais</th>
            <th>Eliminar</th>
          </tr>
          </thead>
          <tbody>
            { userListRender }
          </tbody>
        </table>
      </>
    )
}