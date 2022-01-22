import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
function Register() {

    const [img, setImage] = useState(null);

    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [inputPn, setInputPn] = useState('')
    const [inputgender, setInputGender] = useState(true)

	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const handleInputPn = (e) => {
        setInputPn(e.target.value)
    }
    const handleInputGender = (e) => {
        setInputGender(e.target.value)
    }
 
	// Register 버튼 클릭 이벤트
    const onClickRegister = () => {
        const formData = new FormData();
        formData.append('file', img);
        // 서버의 upload API 호출
        axios.post("http://localhost:8080/api/upload", formData).then(res =>{
            axios.post('http://localhost:8080/auth/register', {
                'user_id': inputId,
                'password': inputPw,
                'profileImg':res.data.url,
                'ismale':inputgender,
                'phone':inputPn
            })
            .then(res => console.log(res))
            .catch()
        })
    }

    //사진 등록
    const onChange = (e) => {
        setImage(e.target.files[0]);
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
                <label htmlFor='phonenumber'>P/N : </label>
                <input type='phone' name='input_pn' value={inputPn} onChange={handleInputPn} />
            </div>
            <div>
                <label htmlFor='Gender'>성별 : </label>
                <select name='gender' onChange={handleInputGender}>
                    <option value={true}> 남자 </option>
                    <option value={false}> 여자 </option>
                </select>
            </div>
            <div>
                <input 
                    name="file"
                    type="file" 
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                    onChange={onChange}/>
            </div>
            <div>
                <button type='button' onClick={onClickRegister}>Register</button>
            </div>
        </div>
    )
}
 
export default Register;