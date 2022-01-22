import {useEffect} from 'react'
import './Calibration.css'
import { useNavigate } from 'react-router-dom';

export default function Calibration() {
  const navigate = useNavigate();
  const webgazer = window.webgazer
  // const [number,setnumber] = useState(0);

  useEffect(()=>{
    webgazer.clearData()
    webgazer.setGazeListener((data, clock)=>{
    }).begin()
  }, [])

  const onClick = (target) => {
    webgazer.pause();
    navigate(`/manmatching`);
  }

  return (
    <div>
      <div className='top1'> </div>
      Calibration
      <div className='top2'></div>

      <div onClick={(e) => {
        e.preventDefault();
        onClick("calibration"); 
      }}>
        Calibration
      </div>

    </div>
  );
}