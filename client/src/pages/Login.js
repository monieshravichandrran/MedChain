import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <>
      <form>
        <label>Email</label>
        <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
      </form>
    </>
  )
}

export default Login;