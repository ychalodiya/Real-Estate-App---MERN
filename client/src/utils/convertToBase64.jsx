export const convertToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file); // This line will convert file into Base64 format
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.onerror = (err) => {
			reject(err);
		};
	});
};
