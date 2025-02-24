import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Books from './Components/Books'
import MembersList from './Components/Members'
import IssuanceList from './Components/Issuance'
import TaskDetails from './Components/TaskDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/book' element={<Books/>}></Route>
        <Route path='/member' element={<MembersList/>}></Route>
        <Route path='/issuance' element={<IssuanceList/>}></Route>
        <Route path='/taskDetails' element={<TaskDetails/>}></Route>
      </Routes>
    </>
  )
}

export default App
