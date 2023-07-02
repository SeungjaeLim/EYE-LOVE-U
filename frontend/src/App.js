import './App.css';
import { Auth, Register, Calibration, Lobby, ManMatching, WomanMatching, SendPost } from './pages';
import Chat from './pages/Chat'
import {useRoutes} from 'react-router-dom';
import {useState} from 'react';


function App() {
  const [ userId, setUserId ] = useState("");
  const [selectedId, setSelectedId] = useState();
  const element = useRoutes([
    {path: '/', element: <Auth setUserId={setUserId} />},
    {path: '/register', element: <Register/>},
    {path: '/calibration', element: <Calibration/>},
    {path: '/lobby', element: <Lobby userId={userId} setUserId={setUserId} />},
    {path: '/manmatching', element: <ManMatching setSelectedId={setSelectedId}/>},
    {path: '/wonmanmatching', element: <WomanMatching/>},
    {path: '/sendpost', element: <SendPost selectedId={selectedId} userId={userId} />},
    {path: '/chat', element: <Chat userName={"test"} roomName={"123"}/>}
  ])
  
  
  return element;

}

export default App;