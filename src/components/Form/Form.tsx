import React, { useState } from 'react'
import './Form.scss'
import Input from '../Input/Input'
import { FormInterface, FormSearchInterface } from './interface/Form';
import Strings from './String';
import Button from '../Button/Button';
import { ArrCards } from '../../interface/App';
import Alert from '../Alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { HaveTest } from '../../redux/actions/OnTest';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function Form({ state, setState }: { state: ArrCards[], setState: Function }) {

    const [form, setForm] = useState<FormInterface>({
        title: '',
        description: ''
    });

    const [search, setSearch] = useState<FormSearchInterface>({
        search: ''
    });

    const [error, setError] = useState<string>('');
    const { test } = useSelector((state: { testRedux: { test: ArrCards[] } }) => state.testRedux);
    const dispatch = useDispatch()


    const onAdd = () => {
        if (!form.description.length || !form.title.length) {
            setError(Strings.required)
            return;
        }
        if (form.title.length < 4) {
            setError(Strings.limit_title_min_caracter)
            return;
        }
        if (form.title.length > 30) {
            setError(Strings.limit_title_max_caracter)
            return;
        }
        if (form.description.length < 10) {
            setError(Strings.limit_desc_min_caracter)
            return;
        }
        if (form.description.length > 155) {
            setError(Strings.limit_desc_max_caracter)
            return;
        }
        const arrElement: ArrCards[] = [...state]
        const newId = state.length ? state[state.length - 1].id + 1 : 1;
        arrElement.push({
            id: newId,
            title: form.title,
            description: form.description
        });
        setForm({
            title: '',
            description: ''
        })
        setState([...arrElement])
    }

    React.useEffect(() => {
        (() => {
            if (search.search.length > 2) {
                dispatch(HaveTest(state))
                const arrElement: ArrCards[] = state.filter((item: ArrCards) => item.description.toLocaleLowerCase().includes(search.search.toLocaleLowerCase()) || item.title.toLocaleLowerCase().includes(search.search.toLocaleLowerCase()))
                setState([...arrElement]);
            } else if (!search.search.length) {
                setState([...test]);
            }
        })()
    }, [search.search])

    return (
        <>
            {error ? <Alert message={error} setState={setError} /> : null}
            <div className='row mt-1'>
                <form className='w-100'>
                    <div className="row">
                        <div className="col-md-4">
                            <Input
                                maxLength={30}
                                minLength={4}
                                type="text"
                                placeholder={Strings.title}
                                required={true}
                                state={form}
                                name="title"
                                setState={setForm} />
                        </div>
                        <div className="col-md-4">
                            <Input
                                maxLength={155}
                                minLength={25}
                                type="text"
                                placeholder={Strings.desc}
                                required={true}
                                state={form}
                                name="description"
                                setState={setForm} />
                        </div>
                        <div className="col-md-3">
                            <Button title='Agregar' onClick={onAdd} />
                        </div>
                    </div>
                </form>
            </div>
            <div className='row mt-1'>
                <div className='col-md-6 pl-0'>
                    <Input
                        maxLength={10}
                        minLength={3}
                        name='search'
                        placeholder='Buscador...'
                        required={false}
                        type='search'
                        setState={setSearch}
                        state={search}
                    />
                </div>
            </div>
        </>
    )
}
