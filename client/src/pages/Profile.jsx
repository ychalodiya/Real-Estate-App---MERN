import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { convertToBase64 } from '../utils/convertToBase64';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
	signOut,
} from '../redux/user/userSlice';

export default function Profile() {
	const [cookies, setCookies] = useCookies('access_token');
	const fileRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser, isLoading, error } = useSelector((state) => state.user);
	const [file, setFile] = useState(currentUser.avatar);
	const [formData, setFormData] = useState({});
	const [updateSuccess, setUpdateSuccess] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			dispatch(updateUserStart());
			const { data } = await axios.post(
				`http://localhost:4000/api/user/update/${currentUser._id}`,
				formData,
				{
					headers: {
						authorization: cookies.access_token,
					},
				}
			);
			dispatch(updateUserSuccess(data));
			setUpdateSuccess(true);
		} catch (error) {
			dispatch(updateUserFailure(error.message));
		}
	};

	const deleteHandler = async () => {
		try {
			dispatch(deleteUserStart());
			const { data } = await axios.delete(
				`http://localhost:4000/api/user/delete/${currentUser._id}`,
				{
					headers: {
						authorization: cookies.access_token,
					},
				}
			);
			dispatch(deleteUserSuccess());
			setCookies('access_token', '');
			navigate('/signin');
		} catch (error) {
			dispatch(deleteUserFailure(error.message));
		}
	};

	const signoutHandler = () => {
		try {
			dispatch(signOut());
			setCookies('access_token', '');
			navigate('/signin');
		} catch (error) {
			dispatch(deleteUserFailure(error.message));
		}
	};

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const fileUpload = async (file) => {
		const base64 = await convertToBase64(file);
		setFile(base64);
		setFormData({ ...formData, avatar: base64 });
	};
	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
			<form className="flex flex-col gap-4" onSubmit={submitHandler}>
				<input
					onChange={(e) => fileUpload(e.target.files[0])}
					type="file"
					ref={fileRef}
					className="hidden"
					accept="image/*"
				/>
				<img
					className="rounded-full self-center cursor-pointer object-cover h-24 w-24"
					src={file}
					alt={currentUser.userName}
					onClick={() => fileRef.current.click()}
				/>
				<input
					type="text"
					placeholder="userName"
					defaultValue={currentUser.userName}
					className="border p-3 rounded-lg"
					id="userName"
					onChange={changeHandler}
				/>
				<input
					type="text"
					placeholder="email"
					defaultValue={currentUser.email}
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
				<span className="text-red-700 cursor-pointer" onClick={deleteHandler}>
					Delete Account
				</span>
				<span className="text-red-700 cursor-pointer" onClick={signoutHandler}>
					Sign Out
				</span>
			</div>
			<p className="mt-5 text-red-700">{error ? error : ''}</p>
			<p className="mt-5 text-green-500">
				{updateSuccess ? 'Profile updated successfully' : ''}
			</p>
		</div>
	);
}
