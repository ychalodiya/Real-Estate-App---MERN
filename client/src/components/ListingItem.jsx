import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBath, FaBed } from 'react-icons/fa';
export default function ListingItem({ listing }) {
	return (
		<div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden rounded-lg w-full sm:w-[350px]">
			<Link to={`/listings/${listing._id}`}>
				<img
					src={listing.images[0]}
					alt={listing.name}
					className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
				/>
				<div className="p-3 ">
					<p className="text-lg font-semibold text-slate-700 truncate ">
						{listing.name}
					</p>
					<div className="flex items-center gap-1">
						<MdLocationOn className="h-4 w-4 text-green-700" />
						<p className="text-sm text-gray-600 truncate w-full">
							{listing.address}
						</p>
					</div>
					<p className="text-sm text-gray-600 truncate w-full my-2 ">
						{listing.description}
					</p>
					<p className="text-slate-500 mt-2 font-semibold ">
						$
						{listing.offer
							? listing.discountPrice.toLocaleString('en-US')
							: listing.regularPrice.toLocaleString('en-US')}
						{listing.type === 'rent' && ' / month'}
					</p>
					<div className="text-slate-700 flex gap-4">
						<div className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-2 sm:gap-1">
							<FaBed className="text-lg" />
							{listing.bedrooms > 1
								? `${listing.bedrooms} beds `
								: `${listing.bedrooms} bed `}
						</div>
						<div className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-2 sm:gap-1">
							<FaBath className="text-lg" />
							{listing.bathrooms > 1
								? `${listing.bathrooms} baths `
								: `${listing.bathrooms} bath `}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
