import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [, setCookies] = useCookies('access_token');
	const clickHandlerr = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const auth = getAuth(app);
			const result = await signInWithPopup(auth, provider);
			const { data } = await axios.post(
				'http://localhost:4000/api/auth/google',
				{
					name: result.user.displayName,
					email: result.user.email,
					photo: result.user.photoURL,
				}
			);
			setCookies('access_token', data.token);
			dispatch(signInSuccess(data.userInfo));
			navigate('/');
		} catch (err) {
			console.log('Could not sign in with Google', err);
		}
	};

	return (
		<button
			onClick={clickHandlerr}
			type="submit"
			className="bg-red-700 text-white py-3 rounded-lg hover:opacity-95 uppercase"
		>
			Continue with Google
		</button>
	);
}
