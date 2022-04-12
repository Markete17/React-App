import React from 'react'
import {db} from '../firebase';
import { auth } from '../firebase';
import Login from './Login';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';


const Tasks = (props) => {
    const [tarea,setTarea] = React.useState('');
    const [tareas,setTareas] = React.useState([]);
    const [modoEdicion,setModoEdicion] = React.useState(false);
    const [id,setId] = React.useState('');
    const [error,setError] = React.useState(null);
    const [user,setUser] = React.useState(null);
  
  
    const obtenerDatos = async () => {
  
      try{
        const data = await db.collection(props.user.uid).get();
        const arrayData = await data.docs.map(doc =>({id:doc.id,...doc.data()}))
        setTareas(arrayData);
      } catch(error){
        console.log(error);
      }
    }
    
    const getUser = async() => {
      const u = await auth.currentUser;
      if(u){
          setUser(u);
      }
    }
  
    React.useEffect(() => {
      getUser();
      if(user!=null){
        obtenerDatos();
      }
    },[])
  
    const agregarTarea = async(e) => {
      e.preventDefault();
      if(!tarea.trim()){
        setError('This field cannot be empty')
        return
      }
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }
      const data = await db.collection(props.user.uid).add(nuevaTarea);
      setTareas([...tareas,{...nuevaTarea,id:data.id}]);
  
      setTarea('');
      setError(null);
    }
  
    const eliminarTarea = async(id) => {
  
      try{
        await db.collection(props.user.uid).doc(id).delete();
  
        const arrayFiltrado = tareas.filter( item => item.id!==id);
        setTareas(arrayFiltrado);
  
      } catch(error){
        console.log(error);
      }
    }
  
    const editarTarea = (item) => {
      setModoEdicion(true);
      setTarea(item.name);
      setId(item.id);
      setError(null);
    }
    
    const editar = async(e) => {
      try{
        e.preventDefault();
        if(!tarea.trim()){
          setError('This field cannot be empty')
          return
        }
          
        await db.collection(props.user.uid).doc(id).update(
          {
            name:tarea
          }
        );
        const arrayEditado = tareas.map(item => item.id === id ? {id:id,name:tarea} : item)
        setTareas(arrayEditado)
        setModoEdicion(false);
        setTarea('');
        setId('');
      } catch(error){
        console.log(error);
      }
    }
    return user!=null ?(
      <div className="container mt-3">
          <h1 className='text-center'>MY TASKS</h1>
          <hr/>
          <div className="row">
            <div className='col-8'>
              <h4 className="text center">Tasks List</h4>
              <ul className='list-group'>
                { 
                  tareas.length === 0 
                  ? (<li className='list-group-item'>No tasks found</li>)
                  : (tareas.map( (item) =>
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{item.name}</span>
                      <button className="btn btn-danger btn sm float-end mx-2" onClick={() => eliminarTarea(item.id)}>Eliminar</button>
                      <button className="btn btn-warning btn sm float-end mx-2" onClick={() => editarTarea(item)}>Editar</button>
                  </li>
                ))
                }
              </ul>
  
            </div>
              
            <div className='col-4'>
              <h4 className="text center">
                {modoEdicion ? 'Edit Task' : 'Add Task'}
              </h4>
                <form onSubmit={modoEdicion ? editar : agregarTarea}>
                
                {
                  error ? <span className="text-danger">{error}</span> : null
                }
                
                <input 
                  type="text" 
                  className="form-control mb-2"
                  placeholder='Ingrese la tarea' 
                  onChange={e => setTarea(e.target.value)}
                  value={tarea}/>
                  {
                    modoEdicion 
                    ? (<button className='btn btn-warning col-12' type='submit'>Edit</button>)
                    : (<button className='btn btn-primary col-12' type='submit'>Add</button>)
                  }
                  
                </form>
            </div>
          </div>
      </div>
    ) : <Login></Login>
}

export default withRouter(Tasks)