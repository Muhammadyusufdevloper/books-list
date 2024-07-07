import { Route, Routes } from "react-router-dom"
import NoteFound from "./pages/note-found/NoteFound"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Auth from "./pages/auth/Auth"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoteFound />} />
      </Routes>
    </>
  )
}

export default App