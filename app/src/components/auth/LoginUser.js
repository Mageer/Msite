import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, TextField } from '@material-ui/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { loginUser } from '../../actions/user';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  status: {
    display: 'table',
    width: '95%',
    margin: '5px auto',
    height: '50px',
    textAlign: 'center',
  },
  loginForm: {
    display: 'table',
    margin: '0 auto',
    padding: '15px',
  },
  submit: {
    display: 'table',
    margin: '0 auto',
  },
});

function LoginUser() {
  const dispatch = useDispatch();

  const { error: loginError, isFetching } = useSelector((state) => state.user, shallowEqual);
  const { register, handleSubmit } = useForm();
  const classes = useStyles();

  const login = (data) => dispatch(loginUser(data.username, data.password));

  const loginStatus = () => {
    if (loginError) {
      return (<Alert severity="error"> Login failed! </Alert>);
    }
    if (isFetching) {
      return <ScaleLoader size={50} color={'#99ff99'}/>;
    }
    return null;
  };

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
              type="password"
            />
            <br/>

            <div className={classes.submit}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
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

export default LoginUser;
