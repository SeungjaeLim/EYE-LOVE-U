import {useEffect, useRef} from 'react'
import './Calibration.css'
import { useNavigate } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


export default function Calibration() {
  const navigate = useNavigate();
  const webgazer = window.webgazer
  let elements = [];
  let calicnt =useRef(0);

  useEffect(()=>{
    webgazer.clearData()
    webgazer.setGazeListener((data, clock)=>{
    }).begin()
    console.log(elements);
  }, [])


  function goToMatching(e){
    webgazer.pause();
    navigate(`/manmatching`);
  }

  function startCalibration(e){
    let temp = document.querySelectorAll('.cell')
    for(var i=0, n; n = temp[i]; ++i) elements.push(n)
    elements.sort(() => Math.random() - 0.5);
    elements[0].style.visibility = "visible";
    document.querySelector('.startcali').style.visibility = 'hidden';
  }

  function Calibration(e){
    calicnt.current += 1;
    let cell = elements.shift();
    cell.style.visibility = "hidden";
    elements[0].style.visibility = "visible";
    elements.push(cell)
    if(calicnt.current > 8){
      document.querySelector('.goToMatching').style.visibility = 'visible'
    }
  }
  
  return (
    <div className='Lobby'> 
      <div className='calrow'>
        <div className='calcolumn'>
          <div className='cell2'>
            {/* <CheckBoxOutlineBlankIcon onClick={Calibration} className='bnt1'>
            </CheckBoxOutlineBlankIcon> */}
          </div>
          <div className='cell'>
            <CheckBoxOutlineBlankIcon onClick={Calibration} className='bnt2'>
            </CheckBoxOutlineBlankIcon>
          </div>
          <div className='cell'>
            <CheckBoxOutlineBlankIcon onClick={Calibration} className='bnt3'>
            </CheckBoxOutlineBlankIcon>
          </div>
        </div>
        <div className='calcolumn'>
          <div className='cell'>
            <CheckBoxOutlineBlankIcon onClick={Calibration} className='bnt4'>
            </CheckBoxOutlineBlankIcon>
          </div>
          <div className='cell1'>
            <div className = 'startcali'>
              <span> 이 단계는 사용자의 환경에 모델을 최적화 시키는 과정입니다.<br/>무작위로 나타나는 버튼과 빨간 점의 거리가 가까워지면 버튼을 눌러주세요.</span>
              <div className = 'start'>
                <button onClick = {startCalibration} > Start Calibration </button>
              </div>
            </div>
            <div className='goToMatching'>
              <button onClick={goToMatching}> Go to Matching </button>
            </div>
          </div>
          <div className='cell'>
            <CheckBoxOutlineBlankIcon onClick={Calibration} className='bnt5'>
            </CheckBoxOutlineBlankIcon>
          </div>
        </div>
        <div className='calcolumn'>
          <div className='cell'>
            <CheckBoxOutlineBlankIcon onClick={Calibration} className='bnt6'>
            </CheckBoxOutlineBlankIcon>
          </div>
          <div className='cell'>
            <CheckBoxOutlineBlankIcon onClick={Calibration} className='bnt7'>
            </CheckBoxOutlineBlankIcon>
          </div>
          <div className='cell'>
            <CheckBoxOutlineBlankIcon onClick={Calibration} className='bnt8'>
            </CheckBoxOutlineBlankIcon>
          </div>
        </div>

      </div>
    </div>
  );
}