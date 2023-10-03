import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
	const { currentUser, isLoading } = useSelector((state) => state.user);

	const submitHandler = () => {};

	const changeHandler = (e) => {};
	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
			<form className="flex flex-col gap-4" onSubmit={submitHandler}>
				<img
					className="rounded-full self-center cursor-pointer object-cover h-24 w-24"
					src={currentUser.avatar}
					alt={currentUser.userName}
				/>
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
					{isLoading ? 'Loading...' : 'Update'}
				</button>
			</form>
			<div className="flex justify-between mt-5">
				<span className="text-red-700 cursor-pointer">Delete Account</span>
				<span className="text-red-700 cursor-pointer">Sign Out</span>
			</div>
		</div>
	);
}
