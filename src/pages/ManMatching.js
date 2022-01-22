import {useState, useEffect} from 'react'
import './Calibration.css'

export default function ManMatching() {
  const webgazer = window.webgazer
  let cnt1 =0, cnt2 =0, cnt3 =0, cnt4 =0;
  const [pictures1, setpictures1] = useState([]);
  const [pictures2, setpictures2] = useState([]);
  const [pictures3, setpictures3] = useState([]);
  const [pictures4, setpictures4] = useState([]);

  useEffect(()=>{
    //그림1 상하좌우 좌표
    let pictur1 = document.querySelector(".picture1");
    let picture1 = pictur1.getBoundingClientRect();
    setpictures1([picture1.top, picture1.bottom, picture1.left, picture1.right]);

    //그림2 상하좌우 좌표
    let pictur2 = document.querySelector(".picture2");
    let picture2 = pictur2.getBoundingClientRect();
    setpictures2([picture2.top, picture2.bottom, picture2.left, picture2.right]);

    //그림3 상하좌우 좌표
    let pictur3 = document.querySelector(".picture3");
    let picture3 = pictur3.getBoundingClientRect();
    setpictures3([picture3.top, picture3.bottom, picture3.left, picture3.right]);

    //그림4 상하좌우 좌표
    let pictur4 = document.querySelector(".picture4");
    let picture4 = pictur4.getBoundingClientRect();
    setpictures4([picture4.top, picture4.bottom, picture4.left, picture4.right]);

    webgazer.showPredictionPoints(false) 
    webgazer.setGazeListener((data, clock)=>{
    }).begin()
    // axios.get('localhost:8080/api/download?user_id=??')

  }, [])

  
  useEffect(()=>{
    console.log('cnt1', cnt1);
      webgazer.setGazeListener((data, clock)=>{
        if(data == null)
          return;
        if(data.y > pictures1[0] && data.y < pictures1[1] && data.x >pictures1[2] && data.x < pictures1[3]){
          cnt1 = cnt1 + 1;
          if(cnt1 > 30 ){
            window.alert("You Choosed first")
          }
        }
        else if(data.y > pictures2[0] && data.y < pictures2[1] && data.x >pictures2[2] && data.x < pictures2[3]){
          cnt2 += 1;
          if( cnt2 > 30 ){
            window.alert("You Choosed second")
          }
        }
        else if(data.y > pictures3[0] && data.y < pictures3[1] && data.x >pictures3[2] && data.x < pictures3[3]){
          cnt3 += 1;
          if( cnt3 > 30 ){
            window.alert("You Choosed third")
          }
        }
        else if(data.y > pictures4[0] && data.y < pictures4[1] && data.x >pictures4[2] && data.x < pictures4[3]){
          cnt4 += 1;
          if( cnt4 > 30 ){
            window.alert("You Choosed fourth")
          }
        }
      }).begin()
  })

  return (
    <div>
      <div className='top1'> </div>
      Calibration
      <div className ='pictures'>
        <div className = 'picturelow'>
          <div >
            <div className ='picture1'></div>
          </div>
          <div>
              <div className ='picture2'></div>
          </div>
        </div>

        <div className = 'picturelow'>
          <div >
              <div className ='picture3'></div>
          </div>
          <div>
              <div className ='picture4'></div>
          </div>
        </div>
      
      </div>
    </div>
  );
}