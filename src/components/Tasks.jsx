import React from 'react'
import {db} from '../firebase';


const Tasks = () => {
    const [tarea,setTarea] = React.useState('');
    const [tareas,setTareas] = React.useState([]);
    const [modoEdicion,setModoEdicion] = React.useState(false);
    const [id,setId] = React.useState('');
    const [error,setError] = React.useState(null);
  
  
    const obtenerDatos = async () => {
  
      try{
        const data = await db.collection('tareas').get();
        const arrayData = await data.docs.map(doc =>({id:doc.id,...doc.data()}))
        setTareas(arrayData);
      } catch(error){
        console.log(error);
      }
    }
    
  
    React.useEffect(() => {
      obtenerDatos();
    },[])
  
    const agregarTarea = async(e) => {
      e.preventDefault();
      if(!tarea.trim()){
        setError('Escriba algo por favor...')
        return
      }
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }
      const data = await db.collection('tareas').add(nuevaTarea);
      setTareas([...tareas,{...nuevaTarea,id:data.id}]);
  
      setTarea('');
      setError(null);
    }
  
    const eliminarTarea = async(id) => {
  
      try{
        await db.collection('tareas').doc(id).delete();
  
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
          setError('Escriba algo por favor...')
          return
        }

        await db.collection('tareas').doc(id).update(
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
    return (
      <div className="container mt-5">
          <h1 className='text-center'>CRUD SIMPLE</h1>
          <hr/>
          <div className="row">
            <div className='col-8'>
              <h4 className="text center">Lista Tareas</h4>
              <ul className='list-group'>
                { 
                  tareas.length === 0 
                  ? (<li className='list-group-item'>No hay tareas</li>)
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
                {modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'}
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
                    ? (<button className='btn btn-warning col-12' type='submit'>Editar</button>)
                    : (<button className='btn btn-primary col-12' type='submit'>Agregar</button>)
                  }
                  
                </form>
            </div>
          </div>
      </div>
    );
}

export default Tasks