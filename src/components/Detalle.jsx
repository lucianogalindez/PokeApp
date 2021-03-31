import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pokeDetailAccion } from '../redux/pokeDucks'

const Detalle = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchData = () => {
            dispatch(pokeDetailAccion())
        }

        fetchData()

    }, [dispatch])

    const pokemon = useSelector(state => state.pokemones.unPokemon)

    return pokemon ? (
        <div className='card '>
            <div className='card-body text-center'>
                <img src={pokemon.foto} className='img-fluid' alt=''/>
                <div className='card-title text-uppercase'>{pokemon.nombre}</div>
                <p className="card-text">Alto: {pokemon.alto} | Ancho: {pokemon.ancho}</p>
            </div>
        </div>
    ) : null
}

export default Detalle
