function LoginPage(){
   
    function joinHandler(){
        console.log("JoinHandler click ... ");
    }
    return(
        <div>
            <span>Login Page</span>
            <button type="button" onClick={joinHandler}>Join</button>
        </div>
    )
}

export default LoginPage;