import { WEBUI_API_BASE_URL, LMS_BASE_URL, CLIENT_ID, CLIENT_SECRET } from '$lib/constants';

export const getLMSSession = async (email: string, pass: string) => {
	let error = null;

	const res = await fetch(`${LMS_BASE_URL}/oauth/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"grant_type": "password",
			"client_id": CLIENT_ID,
			"client_secret": CLIENT_SECRET,
			"scope": "rest",
		},
		body: JSON.stringify({			
			username: email,
			password: pass,
		})
	})
	.then(async (resource) => {
		if (!resource.ok) throw await resource.json();
		return resource.json();
	})
	.catch((err) => {
		console.log(err);
		error = err.detail;
		return null;
	});
		
	if (error) {
		throw error;
	}
	console.log(res);
	return res;
};

export const updateUserPassword = async (token: string, password: string, newPassword: string) => {
	let error = null;

	const res = await fetch(`${LMS_BASE_URL}/auths/update/password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token && { authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			password: password,
			new_password: newPassword
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getLMSTrainings = async (token: string) => {
	let error = null;
	const res = await fetch(`${LMS_BASE_URL}/boomgpt/getProgress`, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		redirect: "follow"
	})
	.then((response) => response.text())
	.then((result) => console.log(result))
	.catch((error) => console.error(error));
		
	if (error) {
		throw error;
	}

	console.log(res);

	return res;
};