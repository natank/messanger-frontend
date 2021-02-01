import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React from 'react'


export default function HeaderContainer({color='#000', backgroundColor="transparent", children}) {
    
    let useStyles = makeStyles({
        root: {
            backgroundColor, color,
            height: '6.5rem',
        }
    })

    let classes = useStyles();
    return (
        <Container className={classes.root}>
            {children}
        </Container>
    )
}
