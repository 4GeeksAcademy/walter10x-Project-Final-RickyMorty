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
            auth: !!localStorage.getItem("token"),
            user: null,
            characters: [],
            locations: [],
            episodes: []
        },
        actions: {
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

            logout: () => {
                localStorage.removeItem("token");
                setStore({ auth: false, token: null });
            },

            checkAuth: () => {
                const token = localStorage.getItem('token');
                if (token) {
                    setStore({ auth: true, token: token });
                    console.log("User is authenticated, token:", token);
                } else {
                    setStore({ auth: false, token: null });
                    console.log("User is not authenticated");
                }
            },

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

            getCharacters: async () => {
                const store = getStore();
                if (!store.token) return;

                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/characters', {
                        headers: {
                            'Authorization': `Bearer ${store.token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ characters: data.results });
                    }
                } catch (error) {
                    console.error('Error fetching characters:', error);
                }
            },

            getLocations: async () => {
                const store = getStore();
                if (!store.token) return;

                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/locations', {
                        headers: {
                            'Authorization': `Bearer ${store.token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ locations: data.results });
                    }
                } catch (error) {
                    console.error('Error fetching locations:', error);
                }
            },

            getEpisodes: async () => {
                const store = getStore();
                if (!store.token) return;

                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/episodes', {
                        headers: {
                            'Authorization': `Bearer ${store.token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ episodes: data.results });
                    }
                } catch (error) {
                    console.error('Error fetching episodes:', error);
                }
            },

            getMessage: async () => {
                // Implement your message fetching logic if needed
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;
