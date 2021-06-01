import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import { createLogEntry } from './API';

const LocationForm = ({location, onClose}) => {
    const [loading, setLoading] = useState();
    const [error, setError] = useState('');
    const { register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
            console.log(created);
            onClose();

        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
        
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
            {error ? (<h3>{error.message}</h3>) : null}
            <label htmlFor="title">Title: </label>
            <input name="title" {...register("title")} required/>
            <label htmlFor="description">Desctiption: </label>
            <textarea name="description" rows={3} {...register("description")}></textarea>
            <label htmlFor="comments">Comments: </label>
            <textarea name="comments" rows={3} {...register("comments")}></textarea>
            <label htmlFor="image">Image: </label>
            <input name="image" {...register("image")}/>
            <button disabled = {loading} > {loading ? 'Loading...' : 'Create Log'}</button>
        </form>
    )
}

export default LocationForm;