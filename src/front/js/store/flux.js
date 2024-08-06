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
            episodes: [],
            favorites: [] // Ensure favorites is an array
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
                       // console.log("Login successful, token:", data.access_token);
                        return true; // Login successful
                    } else {
                        const errorData = await response.json();
                       // console.log("Login failed:", errorData);
                        setStore({ auth: false });
                        return false; // Login failed
                    }
                } catch (error) {
                    //console.error("Login error:", error);
                    setStore({ auth: false });
                    return false; // Login failed
                }
            },

            logout: () => {
                localStorage.removeItem("token");
                setStore({ auth: false, token: null, favorites: [] }); // Clear favorites on logout
            },

            checkAuth: () => {
                const token = localStorage.getItem('token');
                if (token) {
                    setStore({ auth: true, token: token });
                 //   console.log("User is authenticated, token:", token);
                } else {
                    setStore({ auth: false, token: null });
                   // console.log("User is not authenticated");
                }
            },

            signup: async (firstName, lastName, email, password) => {
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password })
                };
                try {
                   // console.log("Attempting sign up with", { first_name: firstName, last_name: lastName, email, password });
                    const response = await fetch(process.env.BACKEND_URL + "/api/signup", requestOptions);
                   // console.log("Response status:", response.status);
                    if (response.ok) {
                        const data = await response.json();
                       // console.log("Response data:", data);
                        setStore({ message: "User created successfully" });
                        return true;
                    } else {
                        const errorData = await response.json();
                        //console.log('Sign up failed:', errorData);
                        setStore({ message: errorData.msg || "Sign up failed" });
                        return false;
                    }
                } catch (error) {
                   // console.log('Sign up error:', error);
                    setStore({ message: "Sign up error" });
                    return false;
                }
            },

            getCharacters: async () => {
                const store = getStore();
                if (!store.token) return;
            
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/characters', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${store.token}`
                        }
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ characters: data });
                    } else {
                        const errorData = await response.json();
                       // console.error('Error response:', errorData);
                    }
                } catch (error) {
                   // console.error('Error fetching characters:', error);
                }
            },
            
            getCharacterById: async (characterId) => {
                try {
                    const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
                    if (response.ok) {
                        const data = await response.json();
                        return data;
                    } else {
                      //  console.error("Failed to fetch character details");
                        return null;
                    }
                } catch (error) {
                  //  console.error("Error fetching character details:", error);
                    return null;
                }
            },
            
            getLocations: async () => {
                const store = getStore();
                if (!store.token) {
                  console.log("No token found.");
                  return;
                }
            
                try {
                 // console.log("Fetching locations from API..."); // Log cuando empieza a buscar
                  const response = await fetch(process.env.BACKEND_URL + '/api/locations', {
                    headers: {
                      'Authorization': `Bearer ${store.token}`
                    }
                  });
            
                  if (response.ok) {
                    const data = await response.json();
                  //  console.log("Locations data received:", data); // Log para verificar los datos
                    setStore({ locations: data }); // Asegúrate de que `data` tiene el formato esperado
                  } else {
                  //  console.error("Failed to fetch locations:", response.status);
                  }
                } catch (error) {
                //  console.error('Error fetching locations:', error);
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

            getFavorites: async () => {
                const store = getStore();
                if (!store.token) return;
            
                try {
                  //  console.log('Fetching favorites from backend...');
                    const response = await fetch(process.env.BACKEND_URL + '/api/favorites/characters', {
                        headers: {
                            'Authorization': `Bearer ${store.token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                     //   console.log('Favorites data:', data);
                        setStore({ favorites: data });
                    } else {
                        const errorData = await response.json();
                      //  console.error('Error response:', errorData);
                        setStore({ favorites: [] });
                    }
                } catch (error) {
                   // console.error('Error fetching favorites:', error);
                    setStore({ favorites: [] });
                }
            },
            

            addFavorite: async (character) => {
                const store = getStore();
                if (!store.token) return;
            
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/favorites/characters', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${store.token}`
                        },
                        body: JSON.stringify({
                            character_id: character.id,
                            name: character.name,
                            image: character.image
                        })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        // Asegúrate de que `favorites` es un array antes de hacer el spread
                        setStore({ favorites: [...(store.favorites || []), data] });
                    } else {
                        const errorData = await response.json();
                       // console.error('Error response:', errorData);
                    }
                } catch (error) {
                   // console.error('Error adding favorite:', error);
                }
            },
            


            removeFavorite: async (characterId) => {
                const store = getStore();
                if (!store.token) return;
        
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/favorites/characters/${characterId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${store.token}`
                        }
                    });
        
                    if (response.ok) {
                        // Actualiza los favoritos
                      //  await actions.getCharacters(); // Llama a getCharacters para actualizar la lista de personajes
                    } else {
                        const errorData = await response.json();
                       // console.error('Error response:', errorData);
                    }
                } catch (error) {
                 //   console.error('Error removing favorite:', error);
                }
            },
            


            removeAllFavorites: async () => {
                const store = getStore();
                if (!store.token) return;

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/favorites/characters`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${store.token}`
                        }
                    });
                    if (response.ok) {
                        setStore({ favorites: [] });
                    } else {
                        const errorData = await response.json();
                      //  console.error('Error removing all favorites:', errorData);
                    }
                } catch (error) {
                  //  console.error('Error removing all favorites:', error);
                }
            },

            
            getProfile: async () => {
                const store = getStore();
                if (!store.token) return;
        
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/users/profile`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${store.token}`
                        }
                    });
        
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ user: data });
                    } else {
                        // Manejo de errores si la respuesta no es OK
                        const errorData = await response.json();
                        console.error('Error fetching profile:', errorData);
                        // Opcional: Mostrar un mensaje de error al usuario
                    }
                } catch (error) {
                  //  console.error('Error fetching profile:', error);
                    // Opcional: Mostrar un mensaje de error al usuario
                }
            },
        
            updateProfile: async (userId, formData) => {
                const store = getStore();
                if (!store.token) return;
        
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/users/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${store.token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
        
                    if (response.ok) {
                        const updatedUser = await response.json();
                        setStore({ user: updatedUser });
                    } else {
                        // Manejo de errores si la respuesta no es OK
                        const errorData = await response.json();
                      //  console.error('Error updating profile:', errorData);
                        // Opcional: Mostrar un mensaje de error al usuario
                    }
                } catch (error) {
                //    console.error('Error updating profile:', error);
                    // Opcional: Mostrar un mensaje de error al usuario
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
