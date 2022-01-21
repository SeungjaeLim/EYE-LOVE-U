import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
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
        navigate(`/lobby`);
        
    }

    const onClickRegister = (target) => {
        navigate(`/${target}`);
    }
 
    return(
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
            <div className="RegisterButton" onClick={(e) => {
                e.preventDefault();
                onClickRegister("register"); }}>
                계정이 없으신가요?
            </div>
        </div>
    )
}
 
export default Login;