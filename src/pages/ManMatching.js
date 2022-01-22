import {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import './Calibration.css'

export default function ManMatching() {
  const webgazer = window.webgazer
  let cnt1 =useRef(0), cnt2 = useRef(0), cnt3 = useRef(0), cnt4 = useRef(0);
  const [pictures1, setpictures1] = useState([]);
  const [pictures2, setpictures2] = useState([]);
  const [pictures3, setpictures3] = useState([]);
  const [pictures4, setpictures4] = useState([]);
  const [image1, setimgae1] = useState();

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

    axios.get('http://143.248.192.87:8080/api/download?user_id=ImIU',{ responseType: 'arraybuffer' }).then(result => {
      console.log(result.data);
      let blob = new Blob([result.data], { type: "image/jpeg" });
      const url = window.URL.createObjectURL(blob);
      setimgae1(url);
      console.log(url);
    })

  }, [])

  
  useEffect(()=>{
      webgazer.setGazeListener((data, clock)=>{
        if(data == null)
          return;
        if(data.y > pictures1[0] && data.y < pictures1[1] && data.x >pictures1[2] && data.x < pictures1[3]){
          // cnt1 = cnt1 + 1;
          cnt1.current += 1;
          if(cnt1.current > 30 ){
            window.alert("You Choosed first")
          }
          // console.log(cnt1);
        }
        else if(data.y > pictures2[0] && data.y < pictures2[1] && data.x >pictures2[2] && data.x < pictures2[3]){
          // cnt2 += 1;
          cnt2.current += 1;
          if( cnt2.current > 30 ){
            window.alert("You Choosed second")
          }
        }
        else if(data.y > pictures3[0] && data.y < pictures3[1] && data.x >pictures3[2] && data.x < pictures3[3]){
          // cnt3 += 1;
          cnt3.current += 1;
          if( cnt3.current > 30 ){
            window.alert("You Choosed third")
          }
        }
        else if(data.y > pictures4[0] && data.y < pictures4[1] && data.x >pictures4[2] && data.x < pictures4[3]){
          // cnt4 += 1;
          cnt4.current += 1;
          if( cnt4.current > 30 ){
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
            <div className ='picture1'>
              <img src={image1} className='image' alt="first"/>
            </div>
          </div>
          <div>
              <div className ='picture2'>
                <img src={`iu.jpg`} className='image' alt="second"/>
              </div>
          </div>
        </div>

        <div className = 'picturelow'>
          <div >
              <div className ='picture3'>
                <img src={`iu.jpg`} className='image' alt="third"/>
              </div>
          </div>
          <div>
              <div className ='picture4'>
                <img src={`iu.jpg`} className='image' alt="fourth"/>
              </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}