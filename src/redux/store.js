import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import pokeReducer from './pokeDucks'
import usuarioReducer, {leerUsuarioActivoAccion} from './usuarioDucks'

const reducer = combineReducers({
    pokemones: pokeReducer,
    usuario: usuarioReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose //para que pueda funcionar devtools

export default function generateStore(){
    const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))
    leerUsuarioActivoAccion()(store.dispatch)
    return store
}

