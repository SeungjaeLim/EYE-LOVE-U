import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
 
function Login() {

    const [img, setImage] = useState(null);

    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    const navigate = useNavigate();
 
	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        axios.post('http://localhost:8080/auth/login', {
            'user_id': inputId,
            'password': inputPw
        })
        .then(res => console.log(res))
        .catch()
    }

    //사진 등록
    const onChange = (e) => {
        setImage(e.target.files[0]);
    }
    
    const onClick = async () => {
        const formData = new FormData();
        formData.append('file', img);
        // 서버의 upload API 호출
        const res = await axios.post("http://localhost:8080/api/upload", formData);
        console.log(res);
        navigate(`/`);
    }

 
    return(
        <div>
            <h2>Register</h2>
            <div>
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <input 
                    name="file"
                    type="file" 
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                    onChange={onChange}/>
                <button onClick={onClick}>제출</button>
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Register</button>
            </div>
        </div>
    )
}
 
export default Login;