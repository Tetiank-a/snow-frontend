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
import EditTask from './pages/EditTask';
import TaskInfo from './pages/TaskInfo';
import AddTask from './pages/AddTask';
import { BadRequest, Unauthorized, AccessDenied, PageNotFound } from './pages/Error';
import SearchSession from './pages/SearchSession';
import Sessions from './pages/Sessions';
import CreateSession from './pages/CreateSession';
import MySessions from './pages/MySessions';

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
      <Route path='/sessions' element={<SearchSession />}/>
      <Route path='/sessions/filtered' element={<Sessions />}/>
      <Route path='/sessions/my' element={<MySessions />}/>
      <Route path='/sessions/create' element={<CreateSession />}/>
      <Route path='/users/edit/:id' element={<EditUser/>}/>
      <Route path='/tasks/edit/:id' element={<EditTask/>}/>
      <Route path='/tasks/info/:id' element={<TaskInfo/>}/>
      <Route path='/403' element={<AccessDenied />} />
      <Route path='/401' element={<Unauthorized />} />
      <Route path='/400' element={<BadRequest />} />
      <Route path='*' element={<PageNotFound />} />
      <Route path='/addtask' element={<AddTask />}/>
    </Routes>
  </div>
);

export default App;
