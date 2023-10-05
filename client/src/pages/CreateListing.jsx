import React from 'react';

export default function CreateListing() {
	const changeHandler = () => {};

	return (
		<main className="p-3 mx-auto max-w-4xl">
			<h1 className="text-3xl my-7 text-center font-semibold">
				Create a Listing
			</h1>
			<form className="flex flex-col gap-4 sm:flex-row">
				<div className="flex flex-col gap-4 flex-1">
					<input
						type="text"
						placeholder="Name"
						className="border p-3 rounded-lg"
						id="name"
						maxLength={62}
						minLength={10}
						required
						onChange={changeHandler}
					/>
					<textarea
						type="text"
						placeholder="Description"
						className="border p-3 rounded-lg"
						id="description"
						required
						onChange={changeHandler}
					/>
					<input
						type="text"
						placeholder="Address"
						className="border p-3 rounded-lg"
						id="address"
						required
						onChange={changeHandler}
					/>
					<div className="flex flex-wrap gap-6">
						<div className="flex gap-2">
							<input type="checkbox" id="sale" className="w-5" />
							<span>Sell</span>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="rent" className="w-5" />
							<span>Rent</span>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="parking" className="w-5" />
							<span>Parking</span>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="furnished" className="w-5" />
							<span>Furnished</span>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="offer" className="w-5" />
							<span>Offer</span>
						</div>
					</div>
					<div className="flex flex-wrap gap-6">
						<div className="flex items-center gap-1">
							<input
								type="number"
								id="bedrooms"
								className="px-3 py-1 border-gray-300"
								min={1}
								max={10}
								required
							/>
							<span className="px-3 py-1">Bedrooms</span>
						</div>
						<div className="flex items-center gap-1">
							<input
								type="number"
								id="bathrooms"
								className="px-3 py-1 border-gray-300"
								min={1}
								max={10}
								required
							/>
							<span className="px-3 py-1">Bathrooms</span>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="number"
								id="regularPrice"
								className="px-10 py-3 border-gray-300"
								required
							/>
							<div>
								<p>Regular Price</p>
								<span className="px-3 py-1 text-xs">($/month)</span>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="number"
								id="discountPrice"
								className="px-10 py-3 border-gray-300"
								required
							/>
							<div>
								<p>Discounted Price</p>
								<span className="px-3 py-1 text-xs">($/month)</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4 flex-1">
					<p>
						<b>Images: </b>The first image will be the cover (max-6)
					</p>
					<div className="flex gap-3">
						<input
							className="p-3 border border-gray-300 rounded w-full"
							type="file"
							id="images"
							accept="image/*"
							multiple
						/>
						<button className="p-3 text-green-500 border-green-500 border rounded uppercase hover:shadow-lg disabled:opacity-80">
							Upload
						</button>
					</div>
					<button className="uppercase p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80">
						Create Listing
					</button>
				</div>
			</form>
		</main>
	);
}
