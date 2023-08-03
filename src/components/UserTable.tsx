import { useState, useRef } from "react"
import { User, UserTableProps } from "../types/UserType"
import UserItem from "./UserItem"
import '../css/UserTableStyles.css'

export default function UserTable({ users }: UserTableProps) {
        
    const [usersTable, setUsersTable] = useState(users) 
    const [stripedTable, setStripedTable ] = useState<boolean>(false)
    const [notFoundCountry, setNotFoundCountry] = useState<boolean>(false)
    const [valueInputCountry, setValueInputCountry ] = useState<string>('')
    const sortOrderColumn = useRef('');
    const completeUserData = useRef(users);
    
    
    const handleRemoveUser = (user: User):void => {
      const userFiltered = completeUserData.current.filter(current => current.login.uuid != user.login.uuid)
      completeUserData.current = userFiltered
      handleFilterTableByCountry(valueInputCountry)
   }

    const handleFilterTableByCountry = (country: string): void => {
      setValueInputCountry(country)

      console.log("Call filtered table")
      let userFiltered: User[] = []
      
      if(country.length === 0)
        userFiltered = completeUserData.current
      else
        userFiltered = completeUserData.current.filter(user => user.location.country.toLocaleLowerCase().includes(country.toLocaleLowerCase()))    
      
      setNotFoundCountry(userFiltered.length === 0)
      setUsersTable(fnOrderUserArrayByColumn([...userFiltered], sortOrderColumn.current))
    }

    const handleRestoreState = ():void => {
      completeUserData.current = users
      setUsersTable(users)
      setValueInputCountry('')
      setNotFoundCountry(false)
      sortOrderColumn.current = ''
    }
    const fnOrderUserArrayByColumn = (userData: User[], columnName: string):User[] => {
      let copyUserData = [...userData];
      
      if(columnName === 'picture.thumbnail')
        copyUserData.sort((current: User, next: User):number => {
        return current.picture.thumbnail.localeCompare(next.picture.thumbnail)
      })

      else if(columnName === 'name.first')
        copyUserData.sort((current: User, next: User):number => {
          return current.name.first.localeCompare(next.name.first)
      })

      else if(columnName === 'email')
        copyUserData.sort((current: User, next: User):number => {
          return current.email.localeCompare(next.email)
      })
      
      else if(columnName === 'location.country')
        copyUserData.sort((current: User, next: User):number => {
          return current.location.country.localeCompare(next.location.country)
      })

      return copyUserData
      
    }

    const handleOrderByColumn = (columnName: string):void => {
      sortOrderColumn.current = columnName
      setUsersTable(fnOrderUserArrayByColumn([...usersTable], columnName))
    }

    const userListRender =  usersTable.map(user => <UserItem key={user.login.uuid}
        user={user}
        handleRemoveUser={handleRemoveUser}
      />)

    return (
      <>
        <header className='header-table'>
          <button onClick={() => setStripedTable(!stripedTable)}>
            {stripedTable ? 'No colorear' : 'Colorear'}
          </button>
          <button onClick={() => handleRestoreState()}>Restaurar</button>
          <input type='text' placeholder="Filtro por pais" value={valueInputCountry} onChange={(e) => handleFilterTableByCountry(e.target.value)} />
        </header>

        <table className={ (stripedTable)?'striped-table':'' }>
          <thead>
          <tr>
            <th onClick={() => handleOrderByColumn('picture.thumbnail')}
                className={ sortOrderColumn.current === 'picture.thumbnail'?'selected':'' }>
                Imagen
            </th>
            <th onClick={() => handleOrderByColumn('name.first')}
                className={ sortOrderColumn.current === 'name.first'?'selected':'' }>
                Nombre completo
            </th>
            <th onClick={() => handleOrderByColumn('email')}
                className={ sortOrderColumn.current === 'email'?'selected':'' }>
                Email
            </th>
            <th onClick={() => handleOrderByColumn('location.country')}
                className={ sortOrderColumn.current === 'location.country'?'selected':'' }>
                Pais
            </th>
            <th className='handles'>Eliminar</th>
          </tr>
          </thead>
          <tbody>
            { userListRender }
          </tbody>
        </table>

        { (notFoundCountry)?'No se han encontrado coincidencias':'' }

      </>
    )
}