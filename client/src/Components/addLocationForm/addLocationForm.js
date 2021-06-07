import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import { createLogEntry } from '../../API';
import './addLocationForm.css';

const LocationForm = ({location, onClose, profile}) => {
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
            <select name="operadora" {...register("operadora")} required>
                <option defaultValue value={null}></option>
                <option value="vivo">Vivo</option>
                <option value="claro">Claro</option>
                <option value="oi">Oi</option>
                <option value="tim">Tim</option>
            </select>
            <label htmlFor="nivel">Nível do sinal: </label>
            <select name="nivel" {...register("nivel")} required>
                <option defaultValue value={null}></option>
                <option value="Ruim">Ruim</option>
                <option value="2 G">2G</option>
                <option value="3 G">3G</option>
                <option value="4 G">4G</option>
            </select>
            <label htmlFor="comentario">Comentario: </label>
            <textarea name="comentario" rows={3} {...register("comments")}></textarea>
            <input value={profile.imageUrl} name="image" {...register("image")} className="hiddenInput"/>
            <input value={profile.googleId} name="googleId" {...register("googleId")} className="hiddenInput"/>

            <button disabled = {loading} > {loading ? 'Carregando...' : 'Gravar'}</button>
        </form>
    )
}

export default LocationForm;