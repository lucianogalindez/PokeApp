import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { obtenerPokemonesAccion, siguientePokemon, anteriorPokemon, pokeDetailAccion } from '../redux/pokeDucks';
import Detalle from './Detalle';

const Pokemones = () => {

    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.results)

    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)

    useEffect(() => {

        const fetchData = () => {
            dispatch(obtenerPokemonesAccion())
        }

        fetchData()

    }, [dispatch])

    return (
        <div className='row'>
            <div className="col-md-6 mt-3">
            <h3>Lista de pokemones</h3>            

            <ul className='list-group mt-2'>
                {
                    pokemones.map(item => (
                        <li key={item.name} className='list-group-item text-uppercase d-flex justify-content-between'>
                            {item.name}
                            <button 
                                className='btn btn-dark btn-sm'
                                onClick={() => dispatch(pokeDetailAccion(item.url))}
                            >Info</button>
                        </li>
                    ))
                }
            </ul>

            <div className='d-flex justify-content-between mt-2'>
            {
                pokemones.length === 0 && 
                <button onClick={() => dispatch(obtenerPokemonesAccion())} className='btn btn-dark'>Obtener Pokemones</button>
            }

            {
                previous &&
                <button onClick={() => dispatch(anteriorPokemon())} className='btn btn-dark'>Anterior</button>         
            }

            {
                next &&
                <button onClick={() => dispatch(siguientePokemon())} className='btn btn-dark'>Siguiente</button>
            }
            
            </div>

            </div>
            <div className='col-md-6 mt-3'>
                <h3>Detalle Pokemon</h3>
                <Detalle/>
            </div>
        </div>
    )
}

export default Pokemones
