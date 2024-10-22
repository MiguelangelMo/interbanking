import React from 'react'
import './Card.scss'
import { ArrCards } from '../../interface/App';
import Button from '../Button/Button';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function Card({ arrCards, setState }: { arrCards: ArrCards[], setState: Function }) {
    const onDelete = (idx: number) => {
        const arrElemento: ArrCards[] = arrCards.filter((item: ArrCards) => item.id !== idx);
        setState([...arrElemento])
    }

    return (
        <div className='row mt-1'>
            {arrCards.map((cards: ArrCards) => (
                <div className='col-md-5 pl-0 mt-1 h-13' key={cards.id}>
                    <div className="card text-center h-100" >
                        <div className="card-header d-flex justify-content-space">
                            <p>
                                {cards.title}
                            </p>
                            <Button title='Eliminar' styles='btn btn-danger btn-sm' onClick={() => onDelete(cards.id)} />
                        </div>
                        <div className="card-body">
                            <p className="card-text">{cards.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
