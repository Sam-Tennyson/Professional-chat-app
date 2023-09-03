import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../../firebase"
import { useNavigate } from 'react-router-dom';
import { ROUTES_CONSTANT } from '../../../shared/Routes';

// import "../style.css"
import { useDispatch } from 'react-redux';
import { setUpdatedToken, setUserData } from '../../../redux/Actions/Auth';
import Snackbar from '../../../shared/Snackbar';

function Login() {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault()
		if (!email || !password) return;

		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				dispatch(setUserData(user))
				dispatch(setUpdatedToken(user?.stsTokenManager?.accessToken))
				// navigate("/login")
				// ...
			})
			.catch((error) => {
				Snackbar.error(error.message);
			});
	}

	return (
		<>

				<div className="mt-4 commonBox p-3">
				<div className="row">
					<div className="col-12 m-auto">
						<div className="card-group  mb-0">
							<div className="card p-4">
								<div className="card-body login-class">
									<h1>Login</h1>
									<p >Sign In to your account</p>
									<div className="mb-3">
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
									<span className="input-group-addon"><i className="fa fa-lock"></i></span>
										<input
										className='form-control'
											type="password"
											label="Create password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
											placeholder="Enter your password"
										/>
									</div>
									
									<div className="row">
										<div className="col-6">
											<button type="button" className="my-btn px-4" onClick={onSubmit}>Login</button>
										</div>

									</div>
								</div>
							</div>
							<div className="card text-white side-color py-5 d-none d-sm-block" >
								<div className="card-body make-flex-center  text-center">
									<div>
										<h2>For New Members</h2>
										<p>Pleae Join Us Now</p>
										<button type="button" onClick={() => navigate({ pathname: ROUTES_CONSTANT.SIGN_UP })} className="my-btn mt-3">Register Now!</button>
									</div>
								</div>
							</div>
						</div>
						</div>
					</div>
				</div>
				{/* <div className="">
					<div className="">
						<div className="d-flex align-items-center mb-0">
							<div className="card p-4">
								<div className="card-body">
									<h1>Login</h1>
									<p className="text-muted">Sign In to your account</p>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-user"></i></span>
										<input
											type="email"
											label="Email address"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
											placeholder="Email address"
										/>
									</div>
									<div className="input-group mb-4">
										<span className="input-group-addon"><i className="fa fa-lock"></i></span>
										<input
											type="password"
											label="Create password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
											placeholder="Password"
										/>
									</div>
									<div className="row">
										<div className="col-6">
											<button type="button" className="btn btn-primary px-4" onClick={onSubmit}>Login</button>
										</div>

									</div>
								</div>
							</div>
							<div className="card text-white bg-primary py-5 d-md-down-none" >
								<div className="card-body text-center">
									<div>
										<h2>Sign up</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
										<button type="button" onClick={() => navigate({ pathname: ROUTES_CONSTANT.SIGN_UP })} className="btn btn-primary active mt-3">Register Now!</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> */}
	
		</>
	)
}

export default Login
