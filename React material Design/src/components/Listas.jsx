import React from 'react'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core'
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import DeckIcon from '@material-ui/icons/Deck';

const Listas = () => {
    return (
        <div>
            <List component='nav'>

                <ListItem button>
                    <ListItemIcon>
                        <CloudQueueIcon />
                    </ListItemIcon>
                    <ListItemText primary='mi primer elemento' />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <DeckIcon />
                    </ListItemIcon>
                    <ListItemText primary='mi segundo element' />
                </ListItem>

                <Divider />

            </List>
        </div>
    )
}

export default Listas
