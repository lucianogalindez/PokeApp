import axios from 'axios'

// constantes

const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}

const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO' 
const SIGUIENTE_POKEMON_EXITO = 'SIGUIENTE_POKEMON_EXITO' 
const ANTERIOR_POKEMON_EXITO = 'ANTERIOR_POKEMON_EXITO' 
const POKE_INFO_EXITO = 'POKE_INFO_EXITO' 

// reducer

export default function pokeReducer(state = dataInicial, action) {
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {
                ...state,
                ...action.payload
            }

        case SIGUIENTE_POKEMON_EXITO:
            return {
                ...state,
                ...action.payload
            }

        case ANTERIOR_POKEMON_EXITO:
            return {
                ...state,
                ...action.payload
            }

        case POKE_INFO_EXITO:
            return {
                ...state,
                unPokemon: action.payload
            }

        default:
            return state

    }
}

// acciones

export const pokeDetailAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch, getState) => {

    try {

        if(localStorage.getItem(url)) {

            dispatch({
                type: POKE_INFO_EXITO,
                payload: JSON.parse(localStorage.getItem(url))
            })

            console.log('desde LS')

            return
        }

        const res = await axios.get(url)
        console.log(res.data)

        console.log('desde API')

        dispatch({
            type: POKE_INFO_EXITO,
            payload: {
                nombre: res.data.name,
                ancho: res.data.weight,
                alto: res.data.height,
                foto: res.data.sprites.front_default
            }
        })

        localStorage.setItem(url, JSON.stringify({
            nombre: res.data.name,
            ancho: res.data.weight,
            alto: res.data.height,
            foto: res.data.sprites.front_default
        }))

    }catch(error){
        console.log(error)
    }

}

export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    if(localStorage.getItem('offset=0')) {
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return false
    } //para que no entre a la api si es que estan los datos guardados en el LS


    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)

        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })

        localStorage.setItem('offset=0', JSON.stringify(res.data))

    }catch(error){
         console.log(error)
    }

}

export const siguientePokemon = () => async (dispatch, getState) => {

    const siguiente = getState().pokemones.next

    if(localStorage.getItem(siguiente)) {
        console.log('desde LS')
        dispatch({
            type: SIGUIENTE_POKEMON_EXITO,
            payload: JSON.parse(localStorage.getItem(siguiente))
        })
        return false
    }

    try{
        console.log('desde api')
        const res = await axios.get(siguiente)

        dispatch({
            type: SIGUIENTE_POKEMON_EXITO,
            payload: res.data,
        })

        localStorage.setItem(siguiente, JSON.stringify(res.data))

    }catch(error){
        console.log(error)
    }
}

export const anteriorPokemon = () => async (dispatch, getState) => {

    const {previous} = getState().pokemones

    if(localStorage.getItem(previous)) {
        console.log('desde LS')
        dispatch({
            type: SIGUIENTE_POKEMON_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return false
    }

    try {

        const res = await axios.get(previous)
        
        dispatch({
            type: ANTERIOR_POKEMON_EXITO,
            payload: res.data
        })

        localStorage.setItem(previous, JSON.stringify(res.data))

    }catch(error){
        console.log(error)
    }

}

//el primero parametro hace referencia a info que puede necesitar la funcion