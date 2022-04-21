import axios from "axios";
// ctes
const initialData = {
    count : 0,
    next : null,
    previous : null,
    results: []
}

const GET_POKEMONS_SUCCESS = 'GET POKEMONS SUCESS'
const NEXT_POKEMONS_SUCCESS = 'NEXT POKEMONS SUCESS'
const GET_POKE_DETAIL_SUCCESS = 'GET POKE DETAIL SUCESS'

// reducer

export default function pokeReducer(state = initialData, action) {
    switch(action.type) {
        case GET_POKEMONS_SUCCESS : return {...state,...action.payload}
        case NEXT_POKEMONS_SUCCESS : return {...state,...action.payload}
        case GET_POKE_DETAIL_SUCCESS : return {...state,pokemon:action.payload}
        default: return state
    }
}

// actions
export const getPokemonsAction = () => async(dispath) => {
    
    if(localStorage.getItem('offset=0')){
        //JSON.parse hace lo contrario a stringlify
        dispath({
            type: GET_POKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
    } else {
        
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
            dispath({
                type: GET_POKEMONS_SUCCESS,
                payload: res.data
            })
            //LocalStorage hace que guarde la respuesta de la api en cache del navegador para optimizacion
            //Navegador-f12-aplicacion-almacenamiento local hay pares clave-valor(string)
    
            //JSON.stringify transforma objetos json en string
            localStorage.setItem('offset=0',JSON.stringify(res.data))
        } catch (error) {
            console.log(error)
        }

    }

}

export const nextPokemonsAction = () => async(dispatch,getState) => {
    
    const next = getState().pokemons.next
    if(localStorage.getItem(next)){
        //JSON.parse hace lo contrario a stringlify
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(next))
        })
    } else {
        try {
            
            const res = await axios.get(next)
            dispatch({
                type: NEXT_POKEMONS_SUCCESS,
                payload: res.data
            })
            localStorage.setItem(next,JSON.stringify(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const previousPokemonsAction = () => async(dispatch,getState) => {
    
    const previous = getState().pokemons.previous
    if(localStorage.getItem(previous)){
        //JSON.parse hace lo contrario a stringlify
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(previous))
        })
    } else {
        try {
            
            const res = await axios.get(previous)
            dispatch({
                type: NEXT_POKEMONS_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getPokeDetailAction = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async(dispatch) => {
    
    if(localStorage.getItem(url)){
        dispatch({
            type: GET_POKE_DETAIL_SUCCESS,
            payload: JSON.parse(localStorage.getItem(url))
        })
    } else {

        try {
            const res = await axios.get(url)
            dispatch({
                type: GET_POKE_DETAIL_SUCCESS,
                payload: {
                    name : res.data.name,
                    weight: res.data.weight,
                    height: res.data.height,
                    photo: res.data.sprites.front_default,
                    abilities : res.data.abilities
                }
            })
            localStorage.setItem(url,JSON.stringify({
                name : res.data.name,
                weight: res.data.weight,
                height: res.data.height,
                photo: res.data.sprites.front_default,
                abilities : res.data.abilities
            }))
        } catch (error) {
            console.log(error)
        }
    }
}