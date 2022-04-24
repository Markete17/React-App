import { useFetch } from '../hooks/useFetch'
import Loading from './Loading'
import { Link,useSearchParams } from 'react-router-dom'

const Gallery = () => {

    const{data,error,loading} = useFetch('https://jsonplaceholder.typicode.com/photos')
    
    let [searchParams, setSearchParams] = useSearchParams()
    console.log(error)
    const change = (e)  => {
        let filter = e.target.value
        if(filter){
            setSearchParams({filter})
        } else {
            setSearchParams({})
        }
    }
    
    if(loading){
        return <Loading></Loading>
    }

    if(error !== ''){
        return <h2 className='text-center'>{error}</h2>
    }

  return (
    <div>
        <h1 className='text-center mt-4'>Gallery</h1>
        
        <input 
            type='text' 
            className='form-control mb-2'
            value={searchParams.get('filter') || ""}
            onChange={change} />
        
        
        <ul className='list-group mt-2'>

                {
                    data.filter(item => {
                        let filter = searchParams.get('filter')
                        if(!filter) return true
                        let title = item.title.toLowerCase()
                        return title.startsWith(filter.toLowerCase())
                    })
                    .map((item) => (
                    
                        <Link key={item.id} className='text-decoration-none mt-2' to={`/gallery/${item.id}`}>
                            <li className='list-group-item text-uppercase'>{item.id}. {item.title}</li>
                        </Link>
                        ))
                }
            </ul>
    </div>
  )
}

export default Gallery