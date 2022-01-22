import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios';

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
                setAlertOpen(true);
            });
    }

    const onClickRegister = (target) => {
        navigate(`/${target}`);
    }
 
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={onLogin}>
                <div>
                    <TextField label="ID" style={{ marginBottom: "0.6rem", width: "100%", style: {fontFamily:'paybooc'} }} autoComplete="off" size="small" name="id"/>
                    <TextField label="PASSWORD" style={{ width: "100%", style: {fontFamily:'paybooc'} }} type="password" size="small" autoComplete="off" name="pwd"/>
                </div>
                <input className="SubmitButton" type="submit" value="LOGIN"/>
            </form>
            <div className="RegisterButton" onClick={(e) => {
                e.preventDefault();
                onClickRegister("register"); }}>
                계정이 없으신가요?
            </div>
            <Dialog open={alertOpen}>
                <DialogTitle style={{ display: "flex", justifyContent: "center"}} >로그인에 실패했습니다.</DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        setAlertOpen(false);
                    }}>확인</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
 
export default Login;