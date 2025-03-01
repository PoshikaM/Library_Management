import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Books from './Components/Books'
import MembersList from './Components/Members'
import IssuanceList from './Components/Issuance'
import TaskDetails from './Components/TaskDetails'
import NeverBorrowedBooks from './Components/NeverBorrowed'
import OutstandingBooks from './Components/OutstandingBooks'
import TopBorrowedBooks from './Components/TopBorrowedBooks'
import BooksManagement from './Components/BooksManagement'
import MembersManagement from './Components/MembersManagement'
import IssuanceManagement from './Components/IssuanceManagement'

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
        <Route path='/never-borrowed-books' element={<NeverBorrowedBooks/>}></Route>
        <Route path='/outstanding-books' element={<OutstandingBooks/>}></Route>
        <Route path='/top-borrowed-books' element={<TopBorrowedBooks/>}></Route>
        <Route path='/manageBooks' element={<BooksManagement/>}></Route>
        <Route path='/manageMembers' element={<MembersManagement/>}></Route>
        <Route path='manageIssuance' element={<IssuanceManagement/>}></Route>
      </Routes>
    </>
  )
}

export default App
