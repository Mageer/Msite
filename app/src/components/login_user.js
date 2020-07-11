import React from "react";
import { useForm } from "react-hook-form";

export default function ({ isFetching, loginUser }) {
  const { register, handleSubmit, errors } = useForm();

  const registerUser = data => {
    console.log("Registering as " + data.username);
  }

  const login = data => {
    loginUser(data.username, data.password);
  }

  return (
    <form>
        <br/>
        <br/>
        <input 
            name="username" 
            placeholder="Username" 
            ref={register({ required: true })}
        />
        {errors.username && <span style={{color: "red"}}> required</span>}

        <br/>
        <input 
            name="password" 
            placeholder="Password" 
            ref={register({ required: true })} 
        />
        {errors.password && <span style={{color: "red"}}> required</span>}

        <br/>
        <button type="submit" name="login" onClick={handleSubmit(login)}>Login</button>
        <button type="submit" name="register" onClick={handleSubmit(registerUser)}>Register</button>
    </form>
  );
}
