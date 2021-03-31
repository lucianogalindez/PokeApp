import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ingresoUsuarioAccion } from '../redux/usuarioDucks'

import {useHistory} from 'react-router-dom'

const Login = () => {

    const history = useHistory()

    const dispatch = useDispatch()

    const {loading} = useSelector(state => state.usuario)
    const {active} = useSelector(state => state.usuario)

    useEffect(() => {

        if(active) {
            history.push('/')
        }

    }, [history, active])

    return (
        <div className='mt-5 text-center'>
            <h2>Ingreso con Google</h2>
            <hr/>
            <button 
                className='btn btn-dark'
                onClick={() => dispatch(ingresoUsuarioAccion())}
                disabled={loading}
            >Acceder</button>
        </div>
    )
}

export default Login
