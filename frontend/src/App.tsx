import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Chats from './pages/Chats'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext'

function App() {

  console.log(useAuth()?.isLoggedIn)
  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<Chats />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
