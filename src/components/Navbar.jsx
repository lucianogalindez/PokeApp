import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import { cerrarSesionAccion } from '../redux/usuarioDucks'

import {useHistory} from 'react-router-dom'


const Navbar = () => {

    const history = useHistory()

    const {user} = useSelector(state => state.usuario)
    const dispatch = useDispatch()

    const cerrarSesion = () => {
        dispatch(cerrarSesionAccion())
        history.push('/login')
    }

    return (
        <div className='navbar navbar-dark bg-dark px-3'>
            <Link className='navbar-brand' to='/'>APP POKE</Link>
            <div className='d-flex'>
                {
                    user ? (
                        <>
                        <NavLink className='btn btn-dark me-2' to='/' exact>Inicio</NavLink>
                        <NavLink className='btn btn-dark me-2' to='/perfil' exact>Perfil</NavLink>
                        <button className='btn btn-dark me-2' onClick={() => cerrarSesion()}>Salir</button>
                        </>
                    ) : (
                        <NavLink className='btn btn-dark me-2' to='/login'>Login</NavLink>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar