import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {Typography, Box, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import { MainContext } from '../../Context/main-context';
import UserForm from './UserForm';
import { updateUser } from '../../Model/user-model'
import { updateUserPermissions } from '../../Model/user-permissions-model'
import { UsersManagementContext } from '../../Context/users-management-context'
import { compareItemId } from '../../Utils/utils'

var useStyles = makeStyles(theme => ({
    title: {
        marginBottom: "1em"
    }
}))

export default function EditUser({ match }) {
    var { store } = useContext(MainContext);

    var [state, dispatch] = store;

    var userId = match.params.id;

    var { users, usersPermissions } = state
    var [componentState, setComponentState] = useState({
        redirect: false,
        updatedUserDetails: {},
        updatedUserPermissions: {}
    }
    );

    var editedUser = users.find(compareItemId(userId))
    var editedUserPermissions = usersPermissions.find(function compareUserPermissionsId(userPermissions) {
        var result = userPermissions.userId == userId
        return result
    })

    var { usersManagementUrl } = useContext(UsersManagementContext)
    var history = useHistory()
    useEffect(() => {
        if (componentState.redirect) dispatch({
            type: "UPDATE_USER",
            payload: { user: { ...componentState.updatedUserDetails }, userPermissions: { ...componentState.updatedUserPermissions } }
        })
    }, [componentState])

    useEffect(() => {
        componentState.redirect && history.push(usersManagementUrl)
    })
    var classes = useStyles();

    return (
        <Grid item>
            {editedUser && editedUserPermissions ?
                <Box>
                    <Typography 
                        variant="h4"
                        className={classes.title}>
                        Edit User: {`${editedUser.firstName} ${editedUser.lastName}`}
                    </Typography>
                    <UserForm userDetails={editedUser} editedUserPermissions={editedUserPermissions} actionText="Update" onSubmit={onUpdateUser} />
                </Box> : null
            }

        </Grid>
    )

    async function onUpdateUser(userDetails, userPermissions) {
        var updatedUserDetails = await updateUser(userId, userDetails)
        var updatedUserPermissions = await updateUserPermissions(editedUserPermissions.id, userPermissions)

        setComponentState({
            redirect: true,
            updatedUserDetails,
            updatedUserPermissions
        })

    }
}