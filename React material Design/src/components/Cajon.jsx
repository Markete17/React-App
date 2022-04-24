import React from 'react'
import Listas from './Listas'
import {
    makeStyles,
    Drawer,
    Divider
} from '@material-ui/core'

const estilos = makeStyles(theme => ({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    toolbar: theme.mixins.toolbar
}))

const Cajon = (props) => {

    const classes = estilos()

    return (
        <Drawer
            className={classes.drawer}  
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
            variant={props.variant}
            open={props.open}
            onClose={props.onClose ? props.onClose : null}
        >
            <div className={classes.toolbar}></div>
            <Divider />
            <Listas />
        </Drawer>
    )
}

export default Cajon
