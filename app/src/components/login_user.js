import React from "react";
import { useForm } from "react-hook-form";
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import { 
  Button, 
  Card, 
  TextField,
} from '@material-ui/core';
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/core";

function LoginUser (props) {
  const { classes, loginError, loginUser, isFetching } = props;
  const { register, handleSubmit} = useForm();

  const login = data => {
    loginUser(data.username, data.password);
  }

  const loginStatus = () => {
    if ( loginError ) {
      return (<Alert severity="error"> Login failed! </Alert>);
    }
    if ( isFetching ) {
      return <ScaleLoader size={50} color={"#99ff99"} css={css`
      display: block;
      margin: 0 auto;
      border-color: red;
      `}/>
    }
    return null;
  }

  return (
    <div>
    <Card className={classes.root}>
      <div className={classes.loginForm}>
        <form onSubmit={handleSubmit(login)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <br/>

          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
          />
          <br/>

          <div className={classes.submit}>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              className={classes.button} 
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    </Card>

    <div className={classes.status}>
      {loginStatus()}
    </div>

    </div>
  );
}


const styles = {
  root: {
    //backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  status: {
    display: 'table',
    width: '95%',
    margin: '5px auto',
    height: '50px',
    textAlign: 'center'
  },
  loginForm: {
    display: 'table',
    margin: '0 auto',
    padding: '15px',
  },
  submit: {
    display: 'table', 
    margin: '0 auto',
    color: 'red'
  },
};

export default withStyles(styles)(LoginUser)