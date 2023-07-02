import {useEffect} from 'react'

function App() {

  useEffect(()=>{
    const webgazer = window.webgazer
    webgazer.setGazeListener((data, clock)=>{
      console.log(data, clock);
    }).begin()
  })
  return (

    <div className="GamePage">
      <span>Select Page</span>
    </div>
  );
}

export default App;
