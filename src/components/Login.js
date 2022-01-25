import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios';

import '../style/Auth.css';

const API_BASE = process.env.REACT_APP_API_BASE;

function Login({ setUserId }) {
    const [alertOpen, setAlertOpen] = useState(false);

    const navigate = useNavigate();
	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
 
	// login 버튼 클릭 이벤트
    const onLogin = (e) => {
        
        e.preventDefault();

        const id = e.target.id.value;
        const pwd = e.target.pwd.value;

        axios.post(`${API_BASE}/auth/login`, {
            'user_id': id,
            'password': pwd
        })
        .then(res => {
            console.log(res.data);
            if(res.data.msg) {
                setAlertOpen(true);
            }
            else {
                setUserId(res.data.userId);
                window.sessionStorage.setItem('userId', res.data.userId);
                navigate(`/lobby`);
            }
        })
        .catch(err =>
            {
                console.log(err);
            });
    }

    const onClickRegister = (target) => {
        navigate(`/${target}`);
    }
 
    return(
        <div className='Auth'>
            <div className='Background'>
                <div className='Title'>EYE</div>
                <div className='Title'>Love U</div>
                <form className='LoginForm' onSubmit={onLogin}>
                    <div className='LoginFormInput'>
                        <TextField inputProps={{style: {fontFamily:'pretty'}}} InputLabelProps={{style: {fontFamily:'pretty'}}} label="ID" color="secondary" style={{ marginBottom: "0.6rem", width: "100%", style: {fontFamily:'pretty'} }} autoComplete="off" size="small" name="id"/>
                        <TextField InputLabelProps={{style: {fontFamily:'pretty'}}} label="PASSWORD" color="secondary" style={{ width: "100%", style: {fontFamily:'pretty'} }} type="password" size="small" autoComplete="off" name="pwd"/>
                    </div>
                    <div className='LoginButtonForm'>
                        <Button style={{ fontFamily: "pretty"}} color="secondary" variant='outlined' type='submit'  >Login</Button>
                    </div>
                    <div className='LoginButtonForm'>
                        <Button style={{ fontFamily: "pretty"}} color="secondary" variant='outlined' type='button' onClick={(e) => {
                            e.preventDefault();
                            onClickRegister("register");}}>Register</Button>
                    </div>
                </form>
                
                <Dialog open={alertOpen}>
                    <DialogTitle style={{ display: "flex", justifyContent: "center", fontFamily: "pretty"}} >로그인에 실패했습니다.</DialogTitle>
                    <DialogActions>
                        <Button style={{ fontFamily: "pretty"}} onClick={() => {
                            setAlertOpen(false);
                        }}>확인</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
 
export default Login;