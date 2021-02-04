import React from 'react'
import {
    Container,
	makeStyles,
} from '@material-ui/core';
import FeedMessage from './FeedMessage';

let useStyles = makeStyles({
    root: {
        backgroundColor: 'gray',
        color: '#fff'
    }
})
export default function FeedBody() {
    let classes = useStyles()
    return (
        <Container  className={classes.root}>
            <FeedMessage text="Hi there" authorName="Sagi"/>
        </Container>
    )
}
