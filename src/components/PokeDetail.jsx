import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getPokeDetailAction } from '../redux/pokeDucks'

const PokeDetail = () => {

    const dispatch = useDispatch()
    
    React.useEffect( () => {
        const fetchData = () => {
            dispatch(getPokeDetailAction())
        }
        fetchData()
    }, [dispatch])

    const pokemon = useSelector(store => store.pokemons.pokemon)

  return pokemon ? (
    <div className='card text-center'>
        <h3 className='d-flex justify-content-center mt-4'>Pokemon Detail</h3>
        <div className='card-body'>
            
            <div className='card-title text-uppercase'><b><u>{pokemon.name}</u></b></div>
            <img src={pokemon.photo} className='img-fluid'></img>
            <p className='card-text'><b>Height:</b> {pokemon.height} | <b>Weight:</b> {pokemon.weight} </p>
            <p className='card-title text-uppercase'><b>Abilities:</b></p>
            <ul className="list-group">
                {pokemon.abilities.map((item,index) => (
                    <li className="list-group-item" key={"item.ability.name"+index} >{index+1} - {item.ability.name}</li>
                ))
            }
  </ul>
        </div>

    </div>
  ) : null
}

export default PokeDetail