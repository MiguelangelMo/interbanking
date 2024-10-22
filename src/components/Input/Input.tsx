import React from 'react'
import { InputInterface } from './interface/Input'

export default function Input({ maxLength, minLength, type, placeholder, required, state, name, setState }: InputInterface) {

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    return (
        <input
            maxLength={maxLength}
            minLength={minLength}
            type={type}
            className="form-control"
            placeholder={placeholder}
            required={required}
            name={name}
            value={state[name]}
            onChange={onChange} />
    )
}
