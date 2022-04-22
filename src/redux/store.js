import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import pokeReducer from './pokeDucks'
import userReducer, {readUserActiveAction} from './userDucks'

const rootReducer = combineReducers({
    pokemons: pokeReducer,
    user: userReducer
})

export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    readUserActiveAction()(store.dispatch)
    return store
}