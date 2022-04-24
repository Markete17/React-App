import React from 'react'
import {db} from '../firebase';
import Login from './Login';
import moment from 'moment';
import { useSelector,useDispatch } from 'react-redux'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Tasks = (props) => {
    const [tarea,setTarea] = React.useState('');
    const [tareas,setTareas] = React.useState([]);
    const [modoEdicion,setModoEdicion] = React.useState(false);
    const [id,setId] = React.useState('');
    const [error,setError] = React.useState(null);
    const [last,setLast] = React.useState()
    const [isDesactive,setIsDesactive] = React.useState()
    const user = useSelector(store => store.user.user)
  
  
    const obtenerDatos = async () => {
  
      try{
        setIsDesactive(true)
        const data = await db.collection(user.uid)
          .limit(5)
          .orderBy('date','desc')
          .get();
        const arrayData = await data.docs.map(doc =>({id:doc.id,...doc.data()}))
        setLast(data.docs[data.docs.length-1])
        setTareas(arrayData);

        const query = await db.collection(props.user.uid)
        .limit(5)
        .orderBy('date','desc')
        .startAfter(data.docs[data.docs.length-1])
        .get();
  
        if(query.empty){
          setIsDesactive(true)
        } else {
          setIsDesactive(false)
        }
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
        setError('This field cannot be empty')
        return
      }
      const nuevaTarea = {
        name: tarea,
        date: Date.now()
      }
      const data = await db.collection(user.uid).add(nuevaTarea);
      setTareas([...tareas,{...nuevaTarea,id:data.id}]);
  
      setTarea('');
      setError(null);
    }
  
    const eliminarTarea = async(id) => {
  
      try{
        await db.collection(user.uid).doc(id).delete();
  
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
          
        await db.collection(user.uid).doc(id).update(
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

    const next = async(e) => {
      try {
        const data = await db.collection(props.user.uid)
          .limit(5)
          .orderBy('date','desc')
          .startAfter(last)
          .get();
      const arrayData = await data.docs.map(doc =>({id:doc.id,...doc.data()}))
      setTareas([...tareas,arrayData]);
      setLast(data.docs[data.docs.length-1])

      const query = await db.collection(props.user.uid)
      .limit(5)
      .orderBy('date','desc')
      .startAfter(data.docs[data.docs.length-1])
      .get();

      if(query.empty){
        setIsDesactive(true)
      } else {
        setIsDesactive(false)
      }

      } catch (error) {
        console.log(error)
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
                  : (tareas.map( (item,index) =>
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{index+1} - {item.name} {moment(item.date).format('LLL')}</span>
                      <Button color='error' variant='contained' size='small' startIcon={<DeleteIcon/>} className="float-end mx-1" onClick={() => eliminarTarea(item.id)}>Eliminar</Button>
                      <Button color='warning' variant='contained' size='small' startIcon={<EditIcon/>} className="float-end mx-1" onClick={() => editarTarea(item)}>Editar</Button>
                  </li>
                ))
                }
              </ul>
                <Button color='info'
                variant='contained'
                className="btn-block mt-2 btn-sm"
                onClick={() =>next()}
                disabled={isDesactive ? false : true}
                >Next</Button>
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
                    ? (<Button color='warning' startIcon={<EditIcon/>} variant='contained' className='col-12' type='submit'>Edit</Button>)
                    : (<Button color='primary' startIcon={<AddIcon/>} variant='contained' className='col-12' type='submit'>Add</Button>)
                  }
                  
                </form>
            </div>
          </div>
      </div>
    ) : <Login></Login>
}

export default Tasks