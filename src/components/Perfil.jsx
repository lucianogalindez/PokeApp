import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actualizarUsuarioAccion, editarFotoAccion } from '../redux/usuarioDucks'

const Perfil = () => {

    const {user} = useSelector(state => state.usuario)
    const {loading} = useSelector(state => state.usuario)
    const dispatch = useDispatch()

    const [nombreUsuario, setNombreUsuario] = useState(user.displayName)
    const [activarFormulario, setActivarFormulario] = useState(false)
    const [error, setError] = useState(false)

    const actualizar = () => {

        if(!nombreUsuario.trim()) {
            console.log('Nombre Vacio')
            return false
        }

        dispatch(actualizarUsuarioAccion(nombreUsuario))

        setActivarFormulario(false)
    }

    const seleccionarArchivo = (e) => {
        //console.log(e.target.files[0])
        const imagenCliente = e.target.files[0]

        if(imagenCliente === undefined) {
            console.log('no se selecciono ninguna imagen')
        }

        if(imagenCliente.type === 'image/png' || imagenCliente.type === 'image/jpeg' || imagenCliente.type === 'image/jpg') {
            dispatch(editarFotoAccion(imagenCliente))

            setError(false)
        }else{
            setError(true)
        }

    }

    return (
        <div className='mt-5 text-center'>
            <div className='card'>
                
                <div className='card-body'>
                    <img src={user.photoURL} alt='' width='100px' className='img-fluid mb-3'/>
                    <h5 className='card-title'>Nombre: {user.displayName}</h5>
                    <p className='card-text'>Email: {user.email}</p>
                    <button className='btn btn-dark' onClick={() => setActivarFormulario(true)}>
                        Editar Nombre
                    </button>

                    {
                        error &&
                        <div className="alert alert-warning mt-2">
                            Solo archivos PNG, JPG o JPEG
                        </div>
                    }

                    <div className="input-group my-3 justify-content-center">
                        <input 
                            type="file" 
                            className="form-control" 
                            id="inputGroupFile02"
                            onChange={e => seleccionarArchivo(e)}
                            style={{display: 'none'}}
                            disabled={loading}
                        />
                        <label 
                            className={loading ? 'btn btn-dark disabled' : 'btn btn-dark'} 
                            htmlFor="inputGroupFile02"
                        >Actualizar Imagen</label>
                    </div>
                </div>
                

                {
                    loading &&
                    <div className='card-body'>
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>

                }

                {activarFormulario && (
                    <div className='card-body'>
                        <div className='row justify-content-center'>
                            <div className='col-md-5'>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        onChange={e => setNombreUsuario(e.target.value)}
                                        value={nombreUsuario}
                                    />
                                    <button 
                                        className="btn btn-dark" 
                                        type="button"
                                        onClick={() => actualizar()} 
                                    >
                                        Actualizar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Perfil
