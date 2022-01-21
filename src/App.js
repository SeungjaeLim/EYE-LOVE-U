import './App.css';
<<<<<<< Updated upstream
import { Auth, Register, Calibration, Lobby, Post, ManMatching, WomanMatching, SendPost} from './pages';
import {useRoutes} from 'react-router-dom';
import {useState} from 'react';

function App() {
  const element = useRoutes([
    {path: '/', element: <Auth/>},
    {path: '/register', element: <Register/>},
    {path: '/calibration', element: <Calibration/>},
    {path: '/lobby', element: <Lobby/>},
    {path: '/post', element: <Post/>},
    {path: '/manmatching', element: <ManMatching/>},
    {path: '/wonmanmatching', element: <WomanMatching/>},
    {path: '/sendpost', element: <SendPost/>}
  ])
  
  
  return element;
=======
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';

function App() {
  
  return (
    
    <div className="App">
      <Routes>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/game" component={GamePage} />
      </Routes>
    </div>
  );
>>>>>>> Stashed changes
}

export default App;