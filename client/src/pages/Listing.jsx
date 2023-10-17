import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
	SwiperCore.use([Navigation]);
	const { listingId } = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetchListing = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(
				`http://localhost:4000/api/listing/get/${listingId}`
			);
			setLoading(false);
			if (!data) {
				setError(true);
				return;
			}
			console.log(data);

			setListing(data);
			setError(false);
		} catch (error) {
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchListing();
	}, [listingId]);

	return (
		<main>
			{loading && <p className="text-center my-7 text-2xl">Loading...</p>}
			{error && (
				<p className="text-center my-7 text-2xl">Something went Wrong!</p>
			)}
			{listing && !loading && !error && (
				<>
					<Swiper navigation>
						{listing.images.map((url, index) => (
							<SwiperSlide key={index}>
								<div
									className="h-[550px]"
									style={{
										background: `url(${url}) center no-repeat`,
										backgroundSize: 'cover',
									}}
								></div>
							</SwiperSlide>
						))}
					</Swiper>
				</>
			)}
		</main>
	);
}
