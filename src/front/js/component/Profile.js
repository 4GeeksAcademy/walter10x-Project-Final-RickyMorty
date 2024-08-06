// src/component/Profile.js
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/Profile.css";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        first_name: store.user?.first_name || "",
        last_name: store.user?.last_name || "",
        email: store.user?.email || "",
        password: "" // Password should be handled carefully
    });

    useEffect(() => {
        // Fetch user profile when component mounts
        if (store.token) {
            actions.getProfile();
        }
    }, [actions, store.token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        // Assuming user ID is available in store
        await actions.updateProfile(store.user.id, formData);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditMode(false);
        // Optionally, reset formData to initial values
        setFormData({
            first_name: store.user?.first_name || "",
            last_name: store.user?.last_name || "",
            email: store.user?.email || "",
            password: ""
        });
    };

    return (
 

        <div className="profile">
           
            <h1>Profile</h1>
            {editMode ? (
                <div className="profile-form">
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div className="profile-info">
                    <p><strong>First Name:</strong> {store.user?.first_name}</p>
                    <p><strong>Last Name:</strong> {store.user?.last_name}</p>
                    <p><strong>Email:</strong> {store.user?.email}</p>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </div>
            )}
        </div>
    );
};
