import './App.css';
import Pokemones from './components/Pokemones';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Login from './components/Login';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import Perfil from './components/Perfil';


function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(() => {

    const getUser = () => {
      auth.onAuthStateChanged(authUser => {
        //console.log(authUser)
  
        if(authUser){
          setFirebaseUser(authUser)
        }else{
          setFirebaseUser(null)
        }
      })
    }

    getUser()
    
  }, [])

  const RutaPrivada = ({component, path, ...rest}) => {
    if(localStorage.getItem('usuario')){
      const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioGuardado.uid === firebaseUser.uid) {
        return <Route component={component} path={path} {...rest}/>
      }else{
        return <Redirect to='/login' {...rest} />
      }
    }else{
      return <Redirect to='/login' {...rest} />
    }
  }

  return firebaseUser !== false ? (
    <Router>
      <div className="container mt-3">

        <Navbar/>

        <Switch>
          <RutaPrivada component={Pokemones} path='/' exact></RutaPrivada>

          <RutaPrivada component={Perfil} path='/perfil' exact/>

          <Route component={Login} path='/login'></Route>

        </Switch>

      </div>
    </Router>
  ) : (
    <div>Cargando...</div>
  );
}

export default App;
