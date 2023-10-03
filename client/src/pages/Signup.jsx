import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function Signup() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const submitHandler = async (e) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			const { data } = await axios.post(
				'http://localhost:4000/api/auth/signup',
				formData
			);
			setIsLoading(false);
			setError(null);
			navigate('/signin');
		} catch (error) {
			setIsLoading(false);
			setError(error.message);
		}
	};

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
			<form className="flex flex-col gap-4 bg-" onSubmit={submitHandler}>
				<input
					type="text"
					placeholder="username"
					className="border p-3 rounded-lg"
					id="userName"
					onChange={changeHandler}
				/>
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
					{isLoading ? 'Loading...' : 'Sign up'}
				</button>
				<OAuth />
			</form>
			<div className="flex gap-2 mt-5">
				<p>Have an account?</p>
				<Link to={'/signin'}>
					<span className="text-blue-700">Sign In</span>
				</Link>
			</div>
			{error && <p className="mt-5 text-red-500">{error}</p>}
		</div>
	);
}
