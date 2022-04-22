import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getPokeDetailAction, getPokemonsAction,nextPokemonsAction,previousPokemonsAction} from '../redux/pokeDucks'
import {auth} from '../firebase'
import Login from './Login'
import PokeDetail from './PokeDetail'

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
                        <button className='btn btn-dark btn-sm float-end' onClick={() =>dispatch(getPokeDetailAction(item.url))}>Info</button>
                    </li>))
                }
            </ul>
            
            
            <div className='d-flex justify-content-between mt-4 mb-4'>
                {
                    pokemons.length === 0 && <button className='btn btn-primary d-flex justify-content-center' onClick={() => dispatch(getPokemonsAction())}>Get Pokemons</button>
                }

                {
                    next && <button className='btn btn-primary' onClick={() => dispatch(nextPokemonsAction())}>Next Pokemons</button>
                }

                {
                    previous && <button className='btn btn-primary' onClick={() => dispatch(previousPokemonsAction())}>Previous Pokemons</button>
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