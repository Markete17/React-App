import React from 'react'
import {withWidth, Typography, Hidden, Button} from '@material-ui/core'

const Oculto = (props) => {
    return (
        <div>
            <Typography variant="h6" color="initial">
                Ancho: {props.width}
            </Typography>

            <Hidden xsDown>
                <Button variant="contained" color="primary">
                  xs
                </Button>
            </Hidden>
            <Hidden smDown>
                <Button variant="contained" color="primary">
                  sm
                </Button>
            </Hidden>
            <Hidden mdUp>
                <Button variant="contained" color="primary">
                  md
                </Button>
            </Hidden>
            <Hidden only={['lg', 'md']}>
                <Button variant="contained" color="primary">
                  lg
                </Button>
            </Hidden>
        </div>
    )
}

export default withWidth()(Oculto)
