import React from 'react'
import './Button.scss'
import { ButtonInterface } from './interface/Button'

export default function Button({ title, onClick, styles }: ButtonInterface) {
    return (
        <button type="button" className={!styles ? "btn btn-success btn-lg" : styles} onClick={onClick}>{title}</button>
    )
}
