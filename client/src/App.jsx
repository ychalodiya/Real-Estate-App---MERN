import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import About from './pages/About';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Header from './components/Header';
import { useCookies } from 'react-cookie';

export default function App() {
	const [cookies] = useCookies('access_token');

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />

				{cookies?.access_token && (
					<>
						<Route path="/signin" element={<Navigate to="/" />} />
						<Route path="/signup" element={<Navigate to="/" />} />
					</>
				)}
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/about" element={<About />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</BrowserRouter>
	);
}
