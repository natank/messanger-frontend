import React from 'react'
import {makeStyles, Card} from '@material-ui/core'



export default function FeedMessage({color="#fff", messageText="hello", authorName= "Eyal"}) {
    let useStyles = makeStyles({
        root: {
            backgroundColor: color,
            color: "#fff",
            
        },
        headline: {
            color: "blue",
            display: "block"
        },
        body:{
            color: "#000"
        }

    })
    let classes = useStyles();

    return (
        <Card className={classes.root}>
            <typography className={classes.headline} variant="body1">{authorName}</typography>
            <typography className={classes.body} variant="body2">{messageText}</typography>
        </Card>
    )
}
