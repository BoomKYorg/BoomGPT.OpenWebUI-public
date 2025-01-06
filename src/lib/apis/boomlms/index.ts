import { WEBUI_API_BASE_URL, LMS_BASE_URL, CLIENT_ID, CLIENT_SECRET } from '$lib/constants';

export const getLMSSession = async (email: string, pass: string) => {
	let error = null;

	const res = await fetch(`${LMS_BASE_URL}/oauth/token`, {
		method: "POST",
		headers: {
		  "Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
		  grant_type: "password",
		  client_id: CLIENT_ID,
		  client_secret: CLIENT_SECRET,
		  scope: "learner",
		  username: email,
		  password: pass,
		}).toString(),
		credentials: "include",
	  });
	try {
	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.detail || "Unknown error occurred");
	}
	
	const data = await res.json();
	console.log("Token received:", data);
		return data;
	} catch (err) {
	console.error("Error during authentication:", err.message);
		return null;
	}
	
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
	try {
		const res = await fetch(`${LMS_BASE_URL}/boomgpt/getUserTrainings?_format=json`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: 'include'
		});

		// Check for HTTP errors
		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(`Error ${res.status}: ${errorData.message || "Request failed"}`);
		}

		// Parse response JSON
		const result = await res.json();
		console.log("Result:", result);

		return result;
	} catch (error: any) {
		console.error("Fetch error:", error.message);
		throw error; // Rethrow error for higher-level handling
	}
};

export const getLMSLearningPathProgress = async (token: string, group: number) => {
	try {
		const res = await fetch(`${LMS_BASE_URL}/boomgpt/learning_path_progress/${group}?_format=json`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: 'include',
			mode: "no-cors", // Bypass CORS enforcement
		});

		// Check for HTTP errors
		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(`Error ${res.status}: ${errorData.message || "Request failed"}`);
		}

		// Parse response JSON
		const result = await res.json();
		console.log("Result:", result);

		return result;
	} catch (error: any) {
		console.error("Fetch error:", error.message);
		throw error; // Rethrow error for higher-level handling
	}
};