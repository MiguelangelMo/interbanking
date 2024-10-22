import React from 'react'
import './Alert.scss'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function Alert({ message, setState }: { message: string, setState: Function }) {
    return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Uffs</strong> {message}
            <button type="button" className="close" onClick={() => setState('')} data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}
