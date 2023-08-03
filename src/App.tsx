import './App.css'
import UserTable from './components/UserTable'
import { User } from "./types/UserType"
import { useState, useEffect } from 'react'


function App() {

  const [users, setUsers] = useState<Array<User>>([])
  const [errorLoad, setErrorLoad] = useState<boolean>(false)

  useEffect(()  => {
    fetch('https://randomuser.me/api/?results=10')
      .then(res => res.json())
      .then(data => { 
        setUsers(data.results)
      })
      .catch(err => {
        console.log(err)
        setErrorLoad(true)
      })
      console.log("Cargado datos")
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
