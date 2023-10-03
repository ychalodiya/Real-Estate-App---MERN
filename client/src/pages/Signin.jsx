import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import {
	signInStart,
	signInSuccess,
	signInFailure,
} from '../redux/user/userSlice.js';

export default function Signin() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [, setCookies] = useCookies('access_token');
	const [formData, setFormData] = useState({});
	const { isLoading, error } = useSelector((state) => state.user);

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const submitHandler = async (e) => {
		try {
			e.preventDefault();
			dispatch(signInStart());
			const { data } = await axios.post(
				'http://localhost:4000/api/auth/signin',
				formData
			);
			setCookies('access_token', data.token);
			localStorage.setItem('userId', data.id);
			dispatch(signInSuccess(data.userInfo));
			navigate('/');
		} catch (error) {
			dispatch(signInFailure(error.response.data.message || error.message));
		}
	};

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
			<form className="flex flex-col gap-4 bg-" onSubmit={submitHandler}>
				<input
					type="text"
					placeholder="email"
					className="border p-3 rounded-lg"
					id="email"
					onChange={changeHandler}
				/>
				<input
					type="password"
					placeholder="password"
					className="border p-3 rounded-lg"
					id="password"
					onChange={changeHandler}
				/>
				<button
					disabled={isLoading}
					className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80"
				>
					{isLoading ? 'Loading...' : 'Sign In'}
				</button>
			</form>
			<div className="flex gap-2 mt-5">
				<p>Do not have an account?</p>
				<Link to={'/signup'}>
					<span className="text-blue-700">Sign Up</span>
				</Link>
			</div>
			{error && <p className="mt-5 text-red-500">{error}</p>}
		</div>
	);
}
