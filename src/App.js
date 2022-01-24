import './App.css';
import { Auth, Register, Calibration, Lobby, ManMatching, WomanMatching, SendPost} from './pages';
import {useRoutes} from 'react-router-dom';
import {useState} from 'react';


function App() {
  const [ userId, setUserId ] = useState("");
  const element = useRoutes([
    {path: '/', element: <Auth setUserId={setUserId} />},
    {path: '/register', element: <Register/>},
    {path: '/calibration', element: <Calibration/>},
    {path: '/lobby', element: <Lobby userId={userId} setUserId={setUserId} />},
    {path: '/manmatching', element: <ManMatching/>},
    {path: '/wonmanmatching', element: <WomanMatching/>},
    {path: '/sendpost', element: <SendPost userId={userId} />}
  ])
  
  
  return element;
}

export default App;