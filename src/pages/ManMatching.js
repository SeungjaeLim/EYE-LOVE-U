import {useState, useEffect} from 'react'
import './Calibration.css'

export default function ManMatching() {
  const webgazer = window.webgazer
  let cnt1 =0, cnt2 =0;
  const [pictures1, setpictures1] = useState([]);
  const [pictures2, setpictures2] = useState([]);

  useEffect(()=>{
    //그림1 상하좌우 좌표
    let pictur1 = document.querySelector(".picture1");
    let picture1 = pictur1.getBoundingClientRect();
    setpictures1([picture1.top, picture1.bottom, picture1.left, picture1.right]);

    //그림2 상하좌우 좌표
    let pictur2 = document.querySelector(".picture2");
    let picture2 = pictur2.getBoundingClientRect();
    setpictures2([picture2.top, picture2.bottom, picture2.left, picture2.right]);

    webgazer.showPredictionPoints(false) 
    webgazer.setGazeListener((data, clock)=>{
    }).begin()
    
  }, [])

  // axios.get('localhost:8080/api/download?user_id=??')
  useEffect(()=>{
    console.log('cnt1', cnt1);
      webgazer.setGazeListener((data, clock)=>{
        if(data == null)
          return;
        if(data.y > pictures1[0] && data.y < pictures1[1] && data.x >pictures1[2] && data.x < pictures1[3]){
        cnt1 = cnt1 + 1;
        if(cnt1 > 50){
          window.alert("You Choosed left")
        }
      }
      if(data.y > pictures2[0] && data.y < pictures2[1] && data.x >pictures2[2] && data.x < pictures2[3]){
        cnt2 += 1;
        if( cnt2 > 50){
          window.alert("You Choosed right")
        }
      }
      }).begin()
  
  })

  return (
    <div>
      <div className='top1'> </div>
      Calibration
      <div className='top2'></div>
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