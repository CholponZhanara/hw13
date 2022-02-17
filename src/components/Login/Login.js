import React, { useReducer, useContext, useState, useEffect } from 'react'
import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import AuthContext from '../../store/auth-context'

const usernameRegExp = /[0-9]/
const usernameReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		// console.log(action)
		return {
			...state,
			value: action.val,
			isValid: usernameRegExp.test(action.val),
		}
	}
	if (action.type === 'INPUT_BLUR') {
		console.log(state)
		return {
			...state,
			value: state.value,
			isValid: usernameRegExp.test(state.value),
			error:usernameRegExp.test(state.value)?"":state.value ===""? "Введите Имя":"username must have digits"
		}
	}
	return {
		value: '',
		isValid: false,
	}
}
const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
)

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			...state,
			value: action.val,
			isValid: validEmailRegex.test(action.val),
		}
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			...state,
			value: state.value,
			isValid: validEmailRegex.test(state.value),
			error:validEmailRegex.test(state.value)?"":state.value ===""? "Введите Email":"please write the symbol"
		}
	}
	return {
		value: '',
		isValid: false,
	}
}

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		const newArr = action.val.split('').slice(0, 2)
		const reverseArr = action.val.split('').reverse().join('')
		return {
			...state,
			value: reverseArr + newArr.join(''),
			isValid: action.val.trim().length > 6,
		}
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			...state,
			value: state.value,
			isValid: state.value.trim().length > 6,
		}
	}
	return {
		value: '',
		isValid: false,
	}
}

const Login = (props) => {
	const cntxtData = useContext(AuthContext)
	const [usernameState, dispatchUserName] = useReducer(usernameReducer, {
		value: '',
		isValid: false,
		error:''
	})
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: false,
		error:''
	})
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: false,
		error:''
	})
	// console.log()
	// const [enteredEmail, setEnteredEmail] = useState('');
	// const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState('')
	// const [passwordIsValid, setPasswordIsValid] = useState()
	const [formIsValid, setFormIsValid] = useState(false)

	// const { isValid: emailIsValid } = emailState
	// const { isValid: passwordIsValid } = passwordState
	// const { isValid: usernameIsValid } = usernameState

	useEffect(() => {
		const identifer = setTimeout(() => {
			console.log('Valid')
			setFormIsValid(
				emailState.isValid &&
					passwordState.isValid &&
					usernameState.isValid,
			)
		}, 2000)
		return () => {
			clearTimeout(identifer)
		}
	}, [emailState.isValid, passwordState.isValid, usernameState.isValid])
	// console.log(passwordState.value)
	const usernameChangeHandler = (event) => {
		dispatchUserName({ type: 'USER_INPUT', val: event.target.value })
	}

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
		// setFormIsValid(event.target.valur.includes('@') && enteredPassword.trim().length > 6)
		// setEnteredEmail(event.target.value)

		// 	setFormIsValid(
		// 		event.target.value.includes('@') &&
		// 			enteredPassword.trim().length > 6,
		// 	)
	}

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value })
		// setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
		// setEnteredPassword(event.target.value)
	}
	const validateUserNameHandler = () => {
		dispatchUserName({ type: 'INPUT_BLUR' })
	}

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' })
	}

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' })
	}

	const submitHandler = (event) => {
		event.preventDefault()
		cntxtData.onLogin(
			usernameState.value,
			emailState.value,
			passwordState.value,
		)
	}
	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						usernameState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='username'>UserName</label>
					<input
						type='username'
						id='userneme'
						value={usernameState.value}
						onChange={usernameChangeHandler}
						onBlur={validateUserNameHandler}
					/> 
					 <p className={classes.p}>{usernameState.error}</p>
				</div>

				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
					<p className = {classes.p}>{emailState.error}</p>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						type='submit'
						className={classes.btn}
						disabled={!formIsValid}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}
export default Login
