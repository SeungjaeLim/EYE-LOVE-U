import {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import './Calibration.css'

export default function ManMatching( {setSelectedId} ) {
  const webgazer = window.webgazer
  const cnt1 = useRef(0), cnt2 = useRef(0), cnt3 = useRef(0), cnt4 = useRef(0);
  const [idlist ,setIdList] = useState();
  const [pictures1, setPictures1] = useState([]);
  const [pictures2, setPictures2] = useState([]);
  const [pictures3, setPictures3] = useState([]);
  const [pictures4, setPictures4] = useState([]);
  const [images, setImages] = useState([]);
  
  useEffect(()=>{
    //그림1 상하좌우 좌표
    let pictur1 = document.querySelector(".picture1");
    let picture1 = pictur1.getBoundingClientRect();
    setPictures1([picture1.top, picture1.bottom, picture1.left, picture1.right]);

    //그림2 상하좌우 좌표
    let pictur2 = document.querySelector(".picture2");
    let picture2 = pictur2.getBoundingClientRect();
    setPictures2([picture2.top, picture2.bottom, picture2.left, picture2.right]);

    //그림3 상하좌우 좌표
    let pictur3 = document.querySelector(".picture3");
    let picture3 = pictur3.getBoundingClientRect();
    setPictures3([picture3.top, picture3.bottom, picture3.left, picture3.right]);

    //그림4 상하좌우 좌표
    let pictur4 = document.querySelector(".picture4");
    let picture4 = pictur4.getBoundingClientRect();
    setPictures4([picture4.top, picture4.bottom, picture4.left, picture4.right]);

    setImage();

    webgazer.showPredictionPoints(false) 
    webgazer.setGazeListener((data, clock)=>{
    }).begin()

  }, [])

  const setImage = async () =>{
    axios.get('http://143.248.192.66:8080/auth/random').then(result => {
      console.log(result.data);
        const resArr = [ result.data.id_1, result.data.id_2, result.data.id_3, result.data.id_4 ];
        setIdList(resArr)
        console.log(resArr);
        Promise.all(
          resArr.map((e) => axios.get((`http://143.248.192.66:8080/api/download?user_id=${e}`), { responseType: 'arraybuffer'})
        )).then(res => {
          setImages(res.map((e) => {
              let blob = new Blob([e.data], { type: "image/*" });
              return window.URL.createObjectURL(blob);
          }))
        });
    })
  }
  
  useEffect(()=>{
      webgazer.setGazeListener((data, clock)=>{
        if(data == null)
          return;
        if(data.y > pictures1[0] && data.y < pictures1[1] && data.x >pictures1[2] && data.x < pictures1[3]){
          cnt1.current += 1;
          if(cnt1.current > 10 ){
            setSelectedId(idlist[0])
            webgazer.pause()
            window.sessionStorage.setItem('selectedId', idlist[0]);
            window.location.replace('/sendpost')
          }
        }
        else if(data.y > pictures2[0] && data.y < pictures2[1] && data.x >pictures2[2] && data.x < pictures2[3]){
          cnt2.current += 1;
          if( cnt2.current > 10 ){
            setSelectedId(idlist[1])
            webgazer.pause()
            window.sessionStorage.setItem('selectedId', idlist[1]);
            window.location.replace('/sendpost')
          }
        }
        else if(data.y > pictures3[0] && data.y < pictures3[1] && data.x >pictures3[2] && data.x < pictures3[3]){
          cnt3.current += 1;
          if( cnt3.current > 10 ){
            setSelectedId(idlist[2])
            webgazer.pause()
            window.sessionStorage.setItem('selectedId', idlist[2]);
            window.location.replace('/sendpost')
          }
        }
        else if(data.y > pictures4[0] && data.y < pictures4[1] && data.x >pictures4[2] && data.x < pictures4[3]){
          cnt4.current += 1;
          if( cnt4.current > 10 ){
            setSelectedId(idlist[3])
            webgazer.pause()
            window.sessionStorage.setItem('selectedId', idlist[3]);
            window.location.replace('/sendpost')
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
              <img src={images[0]} className='image' alt="first"/>
            </div>
          </div>
          <div>
              <div className ='picture2'>
                <img src={images[1]} className='image' alt="second"/>
              </div>
          </div>
        </div>

        <div className = 'picturelow'>
          <div >
              <div className ='picture3'>
                <img src={images[2]} className='image' alt="third"/>
              </div>
          </div>
          <div>
              <div className ='picture4'>
                <img src={images[3]} className='image' alt="fourth"/>
              </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}