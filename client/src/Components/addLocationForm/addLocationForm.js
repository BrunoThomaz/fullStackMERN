import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import { createLogEntry } from '../../API';
import './addLocationForm.css';

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
            <label htmlFor="operadora">Operadora: </label>
            <input name="operadora" {...register("operadora")} required/>
            <label htmlFor="nivel">Nível do sinal: </label>
            <textarea name="nivel" rows={3} {...register("nivel")}></textarea>
            <label htmlFor="comentario">Comentario: </label>
            <textarea name="comentario" rows={3} {...register("comments")}></textarea>
            <label htmlFor="screenShot">ScreenShot: </label>
            <input name="screenShot" {...register("screenShot")}/>
            <button disabled = {loading} > {loading ? 'Carregando...' : 'Gravar'}</button>
        </form>
    )
}

export default LocationForm;