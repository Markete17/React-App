
import './App.css';
import React from 'react';
import { nanoid } from 'nanoid';

function App() {

  const [tarea,setTarea] = React.useState('');
  const [tareas,setTareas] = React.useState([]);
  const [modoEdicion,setModoEdicion] = React.useState(false);
  const [id,setId] = React.useState('');
  const [error,setError] = React.useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();
    if(!tarea.trim()){
      setError('Escriba algo por favor...')
      return
    }

    setTareas([...tareas,{id:nanoid(10),nombre:tarea}])

    setTarea('');
    setError(null);
  }

  const eliminarTarea = (id) => {

    const arrayFiltrado = tareas.filter( item => item.id!==id);
    setTareas(arrayFiltrado);
    
  }

  const editarTarea = (item) => {
    setModoEdicion(true);
    setTarea(item.nombre);
    setId(item.id);
    setError(null);
  }
  
  const editar = (e) => {
    e.preventDefault();
    if(!tarea.trim()){
      setError('Escriba algo por favor...')
      return
    }

    const arrayEditado = tareas.map(item => item.id === id ? {id:id,nombre:tarea} : item)
    setTareas(arrayEditado)
    setModoEdicion(false);
    setTarea('');
    setId('');
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
                  <span className="lead">{item.nombre}</span>
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
                  : (<button className='btn btn-dark col-12' type='submit'>Agregar</button>)
                }
                
              </form>
          </div>
        </div>
    </div>
  );
}

export default App;
