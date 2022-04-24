import React from 'react'
import Navbar from './Navbar'

import {
    makeStyles, Hidden
} from '@material-ui/core'
import Cajon from './Cajon'

const estilos = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}))

const Contenedor = () => {

    const classes = estilos()
    const [abrir, setAbrir] = React.useState(false)

    const accionAbrir = () => {
        setAbrir(!abrir)
    }

    return (
        <div className={classes.root}>
            <Navbar accionAbrir={accionAbrir} />
            <Hidden xsDown>
                <Cajon
                    variant="permanent"
                    open={true}
                />
            </Hidden>
            <Hidden smUp>
                <Cajon
                    variant="temporary"
                    open={abrir}
                    onClose={accionAbrir}
                />
            </Hidden>
            <div className={classes.content}>
                <div className={classes.toolbar}></div>
                contenido
            </div>
        </div>
    )
}

export default Contenedor
