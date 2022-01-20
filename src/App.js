import './App.css';
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
}

export default App;
