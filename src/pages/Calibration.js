import {useState, useEffect} from 'react'
import './Calibration.css'

export default function Calibration() {
  const webgazer = window.webgazer
  const [cnt1, setcnt1] = useState(0);
  const [cnt2, setcnt2] = useState(0);
  // const [number,setnumber] = useState(0);
  const [pictures1, setpictures1] = useState([]);
  const [pictures2, setpictures2] = useState([]);

  useEffect(()=>{
    webgazer.clearData()
    let pictur1 = document.querySelector(".picture1");
    let picture1 = pictur1.getBoundingClientRect();
    console.log('picture1', picture1);
    setpictures1([picture1.top, picture1.bottom, picture1.left, picture1.right]);

    let pictur2 = document.querySelector(".picture2");
    let picture2 = pictur2.getBoundingClientRect();
    setpictures2([picture2.top, picture2.bottom, picture2.left, picture2.right]);
  }, [])


  useEffect(()=>{

    // console.log('cnt1', cnt1);
    
    webgazer.setGazeListener((data, clock)=>{
      if (data == null) {
        return;
      }
      // if(data.x > pictures1[0] && data.x < pictures1[1] && data.y >pictures1[2] && data.y < pictures1[3]){
      //   setcnt1(cnt1 + 1)
      //   console.log('cnt1', cnt1);
      // }
      // if(data.x > pictures2[0] && data.x < pictures2[1] && data.y >pictures2[2] && data.y < pictures2[3]){
      //   setcnt2(cnt2 + 1)
      // }

    }).begin()
  })

  const onClickstart = (target) => {
    webgazer.end();
  }

  const onClickfinish = (target) => {
    webgazer.end();
  }

  return (
    <div>
      <div className='top1'> </div>
      Calibration

      <div onClick={(e) => {
        e.preventDefault();
        onClickstart(); 
      }}>
        start
      </div>

      <div className='top2'></div>

      <div onClick={(e) => {
        e.preventDefault();
        onClickfinish(); 
      }}>
        finish
      </div>

      <div className ='pictures'>
      <div >
          <div className ='picture1'></div>
      </div>
      <div>
          <div className ='picture2'></div>
      </div>
      </div>


    </div>
  );
}