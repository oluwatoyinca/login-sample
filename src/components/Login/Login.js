import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailVal = {
  value: '',
  isValid: null
}

const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')}
  }

  if(action.type === 'INPUT_BLUR') {
    return {value: prevState.value, isValid: prevState.value.includes('@')}
  }

  return {
    value: '',
    isValid: false
  }
}

const passVal = {
  value: '',
  isValid: null
}

const passReducer = (prevState, action) => {
  if (action.type === 'PASS_INPUT') {
    return {value: action.val, isValid: action.val.trim().length > 6}
  }

  if(action.type === 'INPUT_BLUR') {
    return {value: prevState.value, isValid: prevState.value.trim().length > 6}
  }

  return {
    value: '',
    isValid: false
  }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, emailVal)
  const [passState, dispatchPass] = useReducer(passReducer, passVal)

  const { isValid: emailIsValid } = emailState
  const { isValid: passIsValid } = passState

  useEffect(() => {
    const validtyCheck = setTimeout(() => {
      setFormIsValid(
        emailIsValid && passIsValid
      );
    }, 500)

    return () => {
      clearTimeout(validtyCheck)
    }
  }, [emailIsValid, passIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({type: 'PASS_INPUT', val: event.target.value});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
