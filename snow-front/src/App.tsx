import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Logout from './pages/Logout';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import BackUp from './pages/BackUp';
import Tasks from './pages/Tasks';
import { BadRequest, Unauthorized, AccessDenied, PageNotFound } from './pages/Error';

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
      <Route path='/logout' element={<Logout />} />
      <Route path='/backup' element={<BackUp />}/>
      <Route path='/users' element={<Users />}/>
      <Route path='/tasks' element={<Tasks />}/>
      <Route path='/users/edit/:id' element={<EditUser/>}/>
      <Route path='/403' element={<AccessDenied />} />
      <Route path='/401' element={<Unauthorized />} />
      <Route path='/400' element={<BadRequest />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  </div>
);

export default App;
