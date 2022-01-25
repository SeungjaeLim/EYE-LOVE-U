import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Button} from '@mui/material'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
 
import '../style/Register.css';
const API_BASE = process.env.REACT_APP_API_BASE;

function Register() {

    const [img, setImage] = useState(null)
    const [selectimg, setSelected] = useState('파일 선택')
    const navigate = useNavigate();

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
        console.log(e.target.value)
        setInputGender(e.target.value)
    }
 
	// Register 버튼 클릭 이벤트
    const onClickRegister = () => {
        const formData = new FormData();
        formData.append('file', img);
        // 서버의 upload API 호출
        axios.post(`${API_BASE}/api/upload`, formData).then(res =>{
            axios.post(`${API_BASE}/auth/register`, {
                'user_id': inputId,
                'password': inputPw,
                'profileImg':res.data.url,
                'ismale':inputgender,
                'phone':inputPn
            })
            .then(res => {
                navigate(`/`);
            })
            .catch()
        })
    }

    //사진 등록
    const onChange = (e) => {
        console.log(e.target.files[0])
        setSelected(e.target.files[0].name)
        setImage(e.target.files[0]);
    }
 
    return(
        <div className='Reg'>
            <div className='RegBackground'>
                <div className='RegFrorm'>
                <div className='RegId'>
                    <TextField inputProps={{style: {fontFamily:'pretty'}}} InputLabelProps={{style: {fontFamily:'pretty'}}} type='text' name='input_id' label="ID" color="secondary" value={inputId} onChange={handleInputId} />
                </div>
                <div className='RegPwd'>
                    <TextField InputLabelProps={{style: {fontFamily:'pretty'}}} type="password" name='input_pw' color="secondary" label="Password" value={inputPw} onChange={handleInputPw} />
                </div>
                <div className='RegPhone'>
                    <TextField inputProps={{style: {fontFamily:'pretty'}}} InputLabelProps={{style: {fontFamily:'pretty'}}} type='phone' name='input_pn' color="secondary" label="Phone Number" value={inputPn} onChange={handleInputPn} />
                </div>
                <div className='RegSex'>
                    <ToggleButtonGroup
                        value={inputgender}
                        exclusive
                        onChange={handleInputGender}>
                            <ToggleButton style={{ width: "7rem", height: "3rem", fontFamily:'pretty'}} value="true">
                                남
                            </ToggleButton>
                            <ToggleButton style={{ width: "7rem", height: "3rem", fontFamily:'pretty'}}value="false">
                                여
                            </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className='RegPic'>
                    <Button style={{ fontFamily: "pretty"}} color="secondary" variant='outlined' component='label' for='profile'>
                        {selectimg}
                    </Button>
                    <input 
                        id="profile"
                        type="file" 
                        accept="image/jpg,image/png,image/jpeg,image/gif"
                        hidden
                        onChange={onChange}/>
                </div>
                <div className='RegButton'>
                    <Button style={{ fontFamily: "pretty"}} color="secondary" variant='outlined' type='button' onClick={onClickRegister}>Register</Button>
                </div>
                </div>
            </div>
        </div>
    )
}
 
export default Register;