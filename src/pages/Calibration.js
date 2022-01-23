import {useEffect} from 'react'
import './Calibration.css'
import { useNavigate } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


export default function Calibration() {
  const navigate = useNavigate();
  const webgazer = window.webgazer
  let vari = ['.cell1','.cell']
  let elements = [];
  // const [number,setnumber] = useState(0);

  useEffect(()=>{
    // webgazer.clearData()
    // webgazer.setGazeListener((data, clock)=>{
    // }).begin()
    let temp = document.querySelectorAll('.cell')
    for(var i=0, n; n = temp[i]; ++i) elements.push(n)
    elements.sort(() => Math.random() - 0.5);
    elements[0].style.visibility = "visible";
    console.log(elements);
  }, [])

  const onClick = (target) => {
    webgazer.pause();
    navigate(`/manmatching`);
  }

  function Calibration(e){
    let cell = elements.shift();
    // console.log(cell, vari);
    // document.querySelector(cell).style.visibility = "hidden";
    // document.querySelector(elements[0]).style.visibility = "visible";
    // cell.style.visibility = "hidden";
    cell.style.visibility = "hidden";
    elements[0].style.visibility = "visible";
    elements.push(cell)
    // vari



    // .style.visibility = "hidden";
  }
  

  // <div>
  //     <div className='top1'> </div>
  //     Calibration
  //     <div className='top2'></div>

  //     <div onClick={(e) => {
  //       e.preventDefault();
  //       onClick("calibration"); 
  //     }}>
  //       Calibration
  //     </div>

  //   </div>

  return (
    <div className='calrow'>
      <div className='calcolumn'>
        <div className='cell'>
          <CheckBoxOutlineBlankIcon onClick={Calibration} className='bnt1'>
          </CheckBoxOutlineBlankIcon>
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
    
  );
}