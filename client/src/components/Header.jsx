import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice';

export default function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);
	const [cookies, setCookies] = useCookies(['access_token']);
	const [searchTerm, setSearchTerm] = useState('');

	const changeHandler = (e) => {
		setSearchTerm(e.target.value);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const searchTermFromURL = urlParams.get('searchTerm');
		if (searchTermFromURL) {
			setSearchTerm(searchTermFromURL);
		}
	}, []);

	const submitHandler = (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set('searchTerm', searchTerm);

		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
	};

	const clickHandler = () => {
		setCookies('access_token', '');
		dispatch(signOut());
		navigate('/signin');
	};

	return (
		<header className="bg-slate-200 shadow-md">
			<div className="flex justify-between items-center max-w-6xl mx-auto p-3">
				<h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
					<span className="text-slate-500">Maverick</span>
					<span className="text-slate-700">Estate</span>
				</h1>
				<form
					onSubmit={submitHandler}
					className="bg-slate-100 p-3 rounded-lg flex items-center"
				>
					<input
						type="text"
						placeholder="Search..."
						className="bg-transparent focus:outline-none w-24 sm:w-64"
						value={searchTerm}
						onChange={changeHandler}
					/>
					<button>
						<FaSearch className="text-slate-600" />
					</button>
				</form>
				<ul className="flex gap-4 ">
					<li className="hidden sm:inline text-slate-700 hover:underline">
						<Link to="/">Home</Link>
					</li>
					<li className="hidden sm:inline text-slate-700 hover:underline">
						<Link to="/about">About</Link>
					</li>

					<Link to="/profile">
						{currentUser ? (
							<img
								className="rounded-full w-10 object-cover"
								src={currentUser.avatar}
								alt={currentUser.userName}
							/>
						) : (
							<li className="text-slate-700 hover:underline">Sign in</li>
						)}
					</Link>
				</ul>
			</div>
		</header>
	);
}
