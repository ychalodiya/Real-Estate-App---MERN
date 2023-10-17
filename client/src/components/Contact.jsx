import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
	const [cookies, setCookies] = useCookies('access_token');
	const [landlord, setLandlord] = useState(null);
	const [message, setMessage] = useState('');

	const changeHandler = (e) => {
		setMessage(e.target.value);
	};

	const fetchLandlord = async () => {
		try {
			const { data } = await axios.get(
				`http://localhost:4000/api/user/${listing.userRef}`,
				{
					headers: {
						authorization: cookies.access_token,
					},
				}
			);

			setLandlord(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchLandlord();
	}, [listing.userRef]);

	return (
		<>
			{landlord && (
				<div className="flex flex-col gap-2">
					<p>
						Contact <span className="font-semibold">{landlord.userName}</span>{' '}
						for {''}
						<span className="font-semibold">{listing.name.toLowerCase()}</span>
					</p>
					<textarea
						name="message"
						id="message"
						value={message}
						onChange={changeHandler}
						rows={2}
						placeholder="Enter your message here..."
						className="w-full border p-3 rounded-lg"
					></textarea>
					<Link
						to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
						className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
					>
						Send Message
					</Link>
				</div>
			)}
		</>
	);
}
