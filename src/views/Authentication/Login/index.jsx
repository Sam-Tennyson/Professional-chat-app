// libs
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES_CONSTANT } from '../../../shared/Routes';

// firebase
import { auth } from "../../../firebase"
import { FacebookAuthProvider, signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// actions
import { setUpdatedToken, setUserData, startLoader, stopLoader } from '../../../redux/Actions/Auth';

// constants

import { ERROR_MESSAGE, STRINGS_DATA } from '../../../shared/Constants';
import Snackbar from '../../../shared/Snackbar';
import { IMAGES } from '../../../shared/Images';

import "../style.css"

const provider_google = new GoogleAuthProvider();
const provider_facebook = new FacebookAuthProvider();

function Login() {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault()
		if (!email || !password) {
			Snackbar.error(ERROR_MESSAGE.FIELD_REQUIRED);
			return;
		};

		try {
			dispatch(startLoader())
			const userCredential = await signInWithEmailAndPassword(auth, email, password)
			const user = userCredential.user;
			console.log(user);
			dispatch(setUserData(user))
			dispatch(setUpdatedToken(user?.stsTokenManager?.accessToken))
			dispatch(stopLoader())
			Snackbar.success(STRINGS_DATA.LOGGED_IN_SUCCESS)
			
		} catch (error) {
			dispatch(stopLoader())
			Snackbar.error(error.message);
		}
		
	}
	
	
	const handleGoogleSignIn = async () => {
		try {
			dispatch(startLoader())
			const auth = getAuth()
			const result = await signInWithPopup(auth, provider_google);
			// debugger;
			const {user} = result
			const {accessToken} = result.user
			console.log(result);
			dispatch(setUserData(user))
			dispatch(setUpdatedToken(accessToken))
			dispatch(stopLoader())
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.customData.email;
			const credential = GoogleAuthProvider.credentialFromError(error);
			Snackbar.error(errorMessage);
			dispatch(stopLoader())
		}
	}

	const handleFacebookSignIn = async () => {
		try {
			dispatch(startLoader())
			const auth = getAuth()
			debugger;
			const result = await signInWithPopup(auth, provider_facebook);
			debugger;

			const credential = FacebookAuthProvider.credentialFromResult(result);
			const accessToken = credential.accessToken;
			debugger;
			// dispatch(setUserData(user))
			// dispatch(setUpdatedToken(accessToken))
			dispatch(stopLoader())
		} catch (error) {
			debugger;
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.customData.email;
			const credential = FacebookAuthProvider.credentialFromError(error);
			Snackbar.error(errorMessage);
			dispatch(stopLoader())
		}
	}


	return (
		<>

			<div className="mt-4 commonBox p-2	">
				<div className="row">
					<div className="col-12 m-auto">
						<div className="card-group  mb-0">
							<div className="card postion-relative p-md-4 p-sm-2">
								<div className="px-3 py-3 login-class ">
								{/* <div className="d-flex justify-content-center align-items-center">

								<button onClick={handleGoogleSignIn} className="btn-primary">
								<em><img className='google-icon-class border-none' src={IMAGES.googlePng} alt="google_png" height={"25px"} /></em>
									Signin with Google
								</button>
								</div> */}
									<div className='text-center'>
										<h1>Login</h1>
										<p >Webcome back! Please enter your details</p>
									</div>
									<div className="mb-3 form-group">
										<label className='text-start' htmlFor="email">Email</label>
										<span className="input-group-addon"><i className="fa fa-user"></i></span>
										<input
											type="email"
											label="Email address"
											value={email}
											className='form-control'
											onChange={(e) => setEmail(e.target.value)}
											required
											placeholder="Enter your email"
										/>
									</div>
									<div className="mb-3">
										<label className='text-start' htmlFor="password">Password</label>
										<span className="input-group-addon"><i className="fa fa-lock"></i></span>
										<input
											className='form-control'
											type={!showPassword ? "password" : "text"}
											label="Create password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
											placeholder="Enter your password"
										/>
									</div>
									<div className="col-12 my-2 ">
										<input className="form-check-input" id='show-pass' type="checkbox" onClick={() => setShowPassword((prev) => !prev)} />
										<label className="form-check-label mx-2" htmlFor='show-pass'>
											{" "}
											Show password
										</label>
									</div>
									<div className="row">
										<div className="col-12 text-center mb-2">
											<button type="button" className="my-btn px-4" onClick={onSubmit}>Login</button>
										</div>

									</div>
									<div className="d-flex justify-content-center align-items-center">

										{/* <em
											onClick={handleGoogleSignIn}
										><img className='google-icon-class border-none' src={IMAGES.googlePng} alt="google_png" height={"25px"} /></em> */}
									{/* <button onClick={handleFacebookSignIn} className="btn-primary">Signin with facebook</button> */}
									</div>
								</div>
								
							</div>
							<div className="card text-white side-color  p-3 " >
								<div className="card-body make-flex-center  text-center">
									<div>
										<h2>For New Members</h2>
										<p>Please Join Us Now</p>
										<em>
											<img src={IMAGES.gossip_image} alt="gossip_image" />
										</em>
										<button type="button" onClick={() => navigate({ pathname: ROUTES_CONSTANT.SIGN_UP })} className="my-btn mt-3">Register Now!</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</>
	)
}

export default Login
