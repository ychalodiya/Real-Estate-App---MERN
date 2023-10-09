import React, { useState } from 'react';
import { convertToBase64 } from '../utils/convertToBase64';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function CreateListing() {
	const [cookies, _] = useCookies('access_token');
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [imageUploadError, setImageUploadError] = useState(false);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		address: '',
		type: 'rent',
		bedrooms: 1,
		bathrooms: 1,
		regularPrice: 0,
		discountPrice: 0,
		offer: false,
		furnished: false,
		parking: false,
		images: [],
		userRef: currentUser._id,
	});

	const handleImagesUpload = async () => {
		setUploading(true);
		if (
			formData.images.length + files.length <= 6 &&
			formData.images.length + files.length > 0
		) {
			const images = [];
			for (let i = 0; i < files.length; i++) {
				images.push(await storeImage(files[i]));
			}

			setFormData({ ...formData, images: formData.images.concat(images) });
			document.getElementById('images').value = '';
		} else {
			document.getElementById('images').value = '';
			setImageUploadError('You can only upload 6 images per listing');
		}
		setUploading(false);
	};

	const storeImage = async (file) => {
		const blobImg = await convertToBase64(file);
		return blobImg;
	};

	const deleteImageHandler = (index) => {
		setFormData({
			...formData,
			images: formData.images.filter((_, i) => i !== index),
		});
	};

	const changeHandler = (e) => {
		const { id, value, type } = e.target;
		if (id === 'sale' || id === 'rent') {
			setFormData({ ...formData, type: id });
		}
		if (id === 'parking' || id === 'furnished' || id === 'offer') {
			setFormData({ ...formData, [id]: e.target.checked });
		}
		if (type === 'text' || type === 'number' || type === 'textarea') {
			setFormData({ ...formData, [id]: value });
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			if (formData.images.length < 1)
				return setError('You must upload at least one image');
			if (formData.regularPrice < formData.discountPrice)
				return setError('Discount price must be lower than regular price');
			setLoading(true);
			setError(false);

			const { data } = await axios.post(
				'http://localhost:4000/api/listing/create',
				formData,
				{
					headers: {
						authorization: cookies.access_token,
					},
				}
			);
			setLoading(false);
			navigate(`/listings/${data._id}`);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};

	return (
		<main className="p-3 mx-auto max-w-4xl">
			<h1 className="text-3xl my-7 text-center font-semibold">
				Create a Listing
			</h1>
			<form
				className="flex flex-col gap-4 sm:flex-row"
				onSubmit={submitHandler}
			>
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
						value={formData.name}
					/>
					<textarea
						type="text"
						placeholder="Description"
						className="border p-3 rounded-lg"
						id="description"
						required
						onChange={changeHandler}
						value={formData.description}
					/>
					<input
						type="text"
						placeholder="Address"
						className="border p-3 rounded-lg"
						id="address"
						required
						onChange={changeHandler}
						value={formData.address}
					/>
					<div className="flex flex-wrap gap-6">
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="sale"
								className="w-5"
								onChange={changeHandler}
								checked={formData.type === 'sale'}
							/>
							<span>Sale</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="rent"
								className="w-5"
								onChange={changeHandler}
								checked={formData.type === 'rent'}
							/>
							<span>Rent</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="parking"
								className="w-5"
								onChange={changeHandler}
								checked={formData.parking}
							/>
							<span>Parking</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="furnished"
								className="w-5"
								onChange={changeHandler}
								checked={formData.furnished}
							/>
							<span>Furnished</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="offer"
								className="w-5"
								onChange={changeHandler}
								checked={formData.offer}
							/>
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
								onChange={changeHandler}
								value={formData.bedrooms}
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
								onChange={changeHandler}
								value={formData.bathrooms}
							/>
							<span className="px-3 py-1">Bathrooms</span>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="number"
								id="regularPrice"
								className="px-10 py-3 border-gray-300"
								required
								onChange={changeHandler}
								value={formData.regularPrice}
							/>
							<div>
								<p>Regular Price</p>
								<span className="px-3 py-1 text-xs">($/month)</span>
							</div>
						</div>
						{formData.offer && (
							<div className="flex items-center gap-2">
								<input
									type="number"
									id="discountPrice"
									className="px-10 py-3 border-gray-300"
									required
									onChange={changeHandler}
									value={formData.discountPrice}
								/>
								<div>
									<p>Discounted Price</p>
									<span className="px-3 py-1 text-xs">($/month)</span>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-4 flex-1">
					<p>
						<b>Images: </b>The first image will be the cover (max 6)
					</p>
					<div className="flex gap-3">
						<input
							onChange={(e) => setFiles(e.target.files)}
							className="p-3 border border-gray-300 rounded w-full"
							type="file"
							id="images"
							accept="image/*"
							multiple
						/>
						<button
							type="button"
							onClick={handleImagesUpload}
							className="p-3 text-green-500 border-green-500 border rounded uppercase hover:shadow-lg disabled:opacity-80"
						>
							{uploading ? 'Uploading...' : 'Upload'}
						</button>
					</div>
					<p className="text-red-500">{imageUploadError && imageUploadError}</p>
					{formData.images.length > 0 &&
						formData.images.map((image, index) => (
							<div
								key={index}
								className="flex justify-between p-3 border items-center"
							>
								<img
									className="w-20 h-20 object-cover rounded-lg"
									src={image}
									alt={`Listing Image ${index + 1}`}
								/>
								<button
									onClick={() => deleteImageHandler(index)}
									className="border border-red-500 text-red-500 rounded px-5 hover:opacity-70"
								>
									Delete
								</button>
							</div>
						))}

					<button
						disabled={loading || uploading}
						className="uppercase p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80"
					>
						{loading ? 'Creating...' : 'Create Listing'}
					</button>
					{error && <p className="text-sm  text-red-700">{error}</p>}
				</div>
			</form>
		</main>
	);
}
