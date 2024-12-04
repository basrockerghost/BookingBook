import { Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
import DetailPage from "./components/Detail/DetailPage"
import Manage from "./components/Manage/Manage"

function App() {

  return (
    <Routes>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/detail/:bookId" element={<DetailPage/>}></Route>
      <Route path="/manage" element={<Manage/>}></Route>
    </Routes>
  )
}

export default App
