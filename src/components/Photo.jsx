import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import NotFoundError from './NotFoundError'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Photo = () => {

    const {id} = useParams()
    const {data,error,loading} = useFetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    
  return (Object.keys(data).length !== 0) ?(
    <div className='mt-5 text-center'>
        <div className='card mt-2'>
            <div className='card-body'>
            <img src={data.url} alt='Profile Image' width='100px' height='70px' className='img-fluid'></img>
            <h5 className='card-text mt-2'>{data.title}</h5>
            </div>
        </div>
        <div className='mt-3'>
            <Link to="/gallery"><Button color='primary' variant='contained' startIcon={<ArrowBackIcon/>}>Back</Button></Link>
        </div>

    </div>
  ) : !loading && <NotFoundError></NotFoundError>
}

export default Photo