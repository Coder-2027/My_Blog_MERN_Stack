import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import About from './pages/About'
import Home from './pages/Home'
import Header from './components/Header'
import FooterComp from './components/Footer'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <FooterComp/>
      </BrowserRouter>
    </div>
  )
}

export default App