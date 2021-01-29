import React, { useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid } from '@material-ui/core'

import { UsersManagementContextProvider } from '../Context/users-management-context';

import AllUsers from '../components/Users/AllUsers';
import AddUser from '../components/Users/AddUser';
import EditUser from '../components/Users/EditUser'

const useStyles = makeStyles({
  mainContainer : {
    width: "100%",
    margin: 0
  }
})


export default function UsersManagement() {
  var match = useRouteMatch();
  var classes = useStyles()
  var [navIndex, setNavIndex] = useState(0);
  return (
    <UsersManagementContextProvider match={match}>
      <Grid container direction="column" 
        className={classes.mainContainer}
        alignItems="center"
        spacing= {4}
        id="moviesContainer"
        >
          <Grid item>
            <Typography component="h2" variant="h2" align="center">Users</Typography>

          </Grid>
          <Route path={`${match.url}/add`}>
            <AddUser navIndex= {navIndex} setNavIndex= {setNavIndex}/>
          </Route>
          <Route exact path={`${match.url}`} component={AllUsers} />
          <Route path={`${match.url}/edit/:id`} component={EditUser} />

      </Grid>
    </UsersManagementContextProvider>
  )
}
