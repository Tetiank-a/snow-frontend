import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

const App = () => (
  <div className="app">
    <Header />
    <Main />
    <Footer />
  </div>
);

const Main = () => (
  <div className="main">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
    </Routes>
  </div>
);

export default App;
