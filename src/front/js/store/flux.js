const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: localStorage.getItem("token") || null,
			auth: false,
			user: null
		},
		actions: {
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			login: async (email, password) => {
				const requestOptions = {  
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({ email, password })
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/login', requestOptions);
					if (response.ok) {
						const data = await response.json();
						localStorage.setItem("token", data.access_token);
						setStore({ token: data.access_token, auth: true });
						console.log("Login successful, token:", data.access_token);
						return true; // Login successful
					} else {
						const errorData = await response.json();
						console.log("Login failed:", errorData);
						setStore({ auth: false });
						return false; // Login failed
					}
				} catch (error) {  
					console.error("Login error:", error);
					setStore({ auth: false });
					return false; // Login failed
				}
			},

			checkAuth: () => {
				const token = localStorage.getItem('token');
				if (token) {
					setStore({ auth: true });
					console.log("User is authenticated, token:", token);
				} else {
					setStore({ auth: false });
					console.log("User is not authenticated");
				}
			},

			

			// AQUI EL SIGNUP 
			signup: async (firstName, lastName, email, password) => {
				const requestOptions = {  
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password })
				};
				try {
					console.log("Attempting sign up with", { first_name: firstName, last_name: lastName, email, password });
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", requestOptions);
					console.log("Response status:", response.status);
					if (response.ok) {
						const data = await response.json();
						console.log("Response data:", data);
						setStore({ message: "User created successfully" });
						return true;
					} else {
						const errorData = await response.json();
						console.log('Sign up failed:', errorData);
						setStore({ message: errorData.msg || "Sign up failed" });
						return false;
					}
				} catch (error) {
					console.log('Sign up error:', error);
					setStore({ message: "Sign up error" });
					return false;
				}
			},

			getMessage: async () => {
				// try {
				// 	// fetching data from the backend
				// 	const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
				// 	const data = await resp.json();
				// 	setStore({ message: data.message });
				// 	// don't forget to return something, that is how the async resolves
				// 	return data;
				// } catch (error) {
				// 	//console.log("Error loading message from backend", error);
				// }
			},
			
			changeColor: (index, color) => {
				// get the store
				const store = getStore();

				// we have to loop the entire demo array to look for the respective index
				// and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				// reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
