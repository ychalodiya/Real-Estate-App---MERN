import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListingItem from '../components/ListingItem';

export default function Search() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [listings, setListings] = useState([]);

	const [sidebarData, setSidebarData] = useState({
		searchTerm: '',
		type: 'all',
		parking: false,
		furnished: false,
		offer: false,
		sort: 'createdAt',
		order: 'desc',
	});

	const changeHandler = (e) => {
		const { id, value, checked } = e.target;

		if (id === 'all' || id === 'rent' || id === 'sale') {
			setSidebarData({ ...sidebarData, type: id });
		}

		if (id === 'searchTerm') {
			setSidebarData({ ...sidebarData, searchTerm: value });
		}

		if (id === 'parking' || id === 'offer' || id === 'furnished') {
			setSidebarData({
				...sidebarData,
				[id]: checked || checked === 'true' ? true : false,
			});
		}

		if (id === 'sort_order') {
			const sort = value.split('_')[0] || 'createdAt';
			const order = value.split('_')[1] || 'desc';
			setSidebarData({ ...sidebarData, sort, order });
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const urlParams = new URLSearchParams();
		urlParams.set('searchTerm', sidebarData.searchTerm);
		urlParams.set('type', sidebarData.type);
		urlParams.set('parking', sidebarData.parking);
		urlParams.set('offer', sidebarData.offer);
		urlParams.set('furnished', sidebarData.furnished);
		urlParams.set('sort', sidebarData.sort);
		urlParams.set('order', sidebarData.order);
		const searchQuery = urlParams.toString();

		navigate(`/search?${searchQuery}`);
	};

	const fetchListings = async () => {
		setLoading(true);
		const urlParams = new URLSearchParams(location.search);
		const searchQuery = urlParams.toString();
		const { data } = await axios.get(
			`http://localhost:4000/api/listing/get?${searchQuery}`
		);
		setLoading(false);
		setListings(data);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTerm = urlParams.get('searchTerm');
		const type = urlParams.get('type');
		const parking = urlParams.get('parking');
		const offer = urlParams.get('offer');
		const furnished = urlParams.get('furnished');
		const sort = urlParams.get('sort');
		const order = urlParams.get('order');

		if (searchTerm || type || parking || offer || furnished || sort || order) {
			setSidebarData({
				searchTerm: searchTerm || '',
				type: type || 'all',
				parking: parking === 'true' ? true : false,
				offer: offer === 'true' ? true : false,
				furnished: furnished === 'true' ? true : false,
				sort: sort || 'createdAt',
				order: order || 'desc',
			});
		}

		fetchListings();
	}, [location.search]);

	return (
		<div className="flex flex-col md:flex-row">
			<div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
				<form className="flex flex-col gap-8" onSubmit={submitHandler}>
					<div className="flex items-center gap-2 ">
						<label className="whitespace-nowrap font-semibold">
							Search Term:{' '}
						</label>
						<input
							type="text"
							id="searchTerm"
							placeholder="Search..."
							className="border rounded-lg p-3 w-full"
							value={sidebarData.searchTerm}
							onChange={changeHandler}
						/>
					</div>
					<div className="flex gap-2 flex-wrap items-center">
						<label className="font-semibold">Type:</label>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="all"
								className="w-5"
								checked={sidebarData.type === 'all'}
								onChange={changeHandler}
							/>
							<span>Rent & Sale</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="rent"
								className="w-5"
								checked={sidebarData.type === 'rent'}
								onChange={changeHandler}
							/>
							<span>Rent</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="sale"
								className="w-5"
								checked={sidebarData.type === 'sale'}
								onChange={changeHandler}
							/>
							<span>Sale</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="offer"
								className="w-5"
								checked={sidebarData.offer}
								onChange={changeHandler}
							/>
							<span>Offer</span>
						</div>
					</div>
					<div className="flex gap-2 flex-wrap">
						<label className="font-semibold">Amenities:</label>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="parking"
								className="w-5"
								checked={sidebarData.parking}
								onChange={changeHandler}
							/>
							<span>Parking</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="furnished"
								className="w-5"
								checked={sidebarData.furnished}
								onChange={changeHandler}
							/>
							<span>Furnished</span>
						</div>
					</div>
					<div className="flex gap-2 items-center">
						<label className="font-semibold">Sort:</label>
						<select
							id="sort_order"
							className="border rounded-lg p-3"
							onChange={changeHandler}
							defaultValue={'createdAt_desc'}
						>
							<option value={'regularPrice_desc'}>Price High to Low</option>
							<option value={'regularPrice_asc'}>Price Low to High</option>
							<option value={'createdAt_desc'}>Latest</option>
							<option value={'createdAt_asc'}>Oldest</option>
						</select>
					</div>
					<button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
						Search
					</button>
				</form>
			</div>
			<div className="flex-1">
				<h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
					Listing results:
				</h1>
				<div className="p-7 flex flex-wrap gap-4">
					{!loading && listings.length === 0 && (
						<p className="text-xl text-slate-700 text-center">
							No listing found!
						</p>
					)}
					{loading && (
						<p className="text-center text-xl text-slate-700 w-full">
							Loading...
						</p>
					)}
					{!loading &&
						listings &&
						listings.map((listing) => (
							<ListingItem key={listing._id} listing={listing} />
						))}
				</div>
			</div>
		</div>
	);
}
