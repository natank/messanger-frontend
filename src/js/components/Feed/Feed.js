import { Container } from '@material-ui/core';
import React, {useContext} from 'react'
import {MainContext} from '../../Context/main-context';
import FeedBody from './FeedBody';
import FeedHeader from './FeedHeader';

export default function Feed() {
    let currentChatId = useContext(MainContext)
    return (
        <Container disableGutters>
            <FeedHeader />
            <FeedBody />
        </Container>
    )
}
