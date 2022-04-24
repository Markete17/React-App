import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getPokeDetailAction, getPokemonsAction,nextPokemonsAction,previousPokemonsAction} from '../redux/pokeDucks'
import {auth} from '../firebase'
import Login from './Login'
import PokeDetail from './PokeDetail'
import GetAppIcon from '@mui/icons-material/GetApp';
import { Button } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InfoIcon from '@mui/icons-material/Info';

const Pokemons = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector(store => store.pokemons.results)
    const next = useSelector(store => store.pokemons.next)
    const previous = useSelector(store => store.pokemons.previous)

    const [user,setUser] = React.useState(null);

    const getUser = async() => {
        const u = await auth.currentUser;
        if(u){
            setUser(u);
        }
      }

    React.useEffect(() => {
        getUser();
      },[])

  return user != null ? (
    <div className='row mt-5'>
        <div className='col-md-6'>
            <h3 className='d-flex justify-content-center'>Pokemons List</h3>
            
            <ul className='list-group mt-4'>
                {
                    pokemons.map(item => (
                    <li className='list-group-item text-uppercase' key={item.name}>{item.name}
                        <Button color='info' size='small' variant='contained' startIcon={<InfoIcon/>}  className='float-end' onClick={() =>dispatch(getPokeDetailAction(item.url))}>Info</Button>
                    </li>))
                }
            </ul>
            
            
            <div className='d-flex justify-content-between mt-4 mb-4'>
                {
                    pokemons.length === 0 && <Button color='primary' variant='contained' startIcon={<GetAppIcon/>} className='btn btn-primary d-flex justify-content-center' onClick={() => dispatch(getPokemonsAction())}>Get Pokemons</Button>
                }

                {
                    next && <Button color='primary' variant='contained' startIcon={<NavigateNextIcon/>} onClick={() => dispatch(nextPokemonsAction())}>Next</Button>
                }

                {
                    previous && <Button color='primary' variant='contained' startIcon={<NavigateBeforeIcon/>} onClick={() => dispatch(previousPokemonsAction())}>Previous</Button>
                }
            </div>



            
        </div>
        <div className='col-md-6'>
            {pokemons.length!=0 && 
            <PokeDetail></PokeDetail>
            
            }
        </div>
    </div>
  ) : <Login></Login>
}

export default Pokemons