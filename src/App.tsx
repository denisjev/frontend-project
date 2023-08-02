import './App.css'
import UserTable from './components/UserTable'
import { User } from "./types/UserType"
import { useState, useEffect } from 'react'


function App() {

  const [strippedTable, setStrippedTable ] = useState<boolean>(false)

  const [users, setUsers] = useState<Array<User>>([]) 

  useEffect(()  => {
    fetch('https://randomuser.me/api/?results=10')
      .then(res => res.json())
      .then(data => setUsers(data.results))
      .catch(err => {
        console.log(err)
      })
  },[])

  return (
    <>
      <button onClick={() => setStrippedTable(!strippedTable)}>Colorear</button>
      <UserTable users={users} strippedTable={strippedTable} />
    </>
  )
}

export default App
