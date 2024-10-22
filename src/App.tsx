import React, { useState } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import store from './store'
import Card from './components/Card/Card'
import Form from './components/Form/Form'
import { ArrCards } from './interface/App'

export default function App() {
    const [arr, setArr] = useState<ArrCards[]>([])
    return (
        <Provider store={store}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <Form state={arr} setState={setArr} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <Card arrCards={arr} setState={setArr} />
                    </div>
                </div>
            </div>
        </Provider>
    )
}
