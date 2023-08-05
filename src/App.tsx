import './App.css'
import UserTable from './components/UserTable/UserTable'
import { User } from "./types/UserType"
import { useState, useEffect, useRef } from 'react'
import { UserService } from './services/UserServices'

function App() {

  const [users, setUsers] = useState<Array<User>>([])
  const [errorLoad, setErrorLoad] = useState<boolean>(false)
  const initialized = useRef(false)


  useEffect(()  => {
    UserService.getAll()
      .then((data:User[]) => { 
        if (!initialized.current) {
          initialized.current = true
          setUsers(data)
        }
      })
      .catch(err => {
        console.log(err)
        setErrorLoad(true)
      })
  },[])
  
  if(errorLoad) return <h1>Ha habido un problema al cargar los datos</h1>

  if(users.length == 0) return <h1>Cargando....</h1>


  return (
    <main>
        <UserTable users={users} />
    </main>
  )
}

export default App
