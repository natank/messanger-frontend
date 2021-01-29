import React, {useState} from 'react'
import { Route, Switch } from 'react-router-dom'
import { MoviesManagementContextProvider } from '../Context/movies-management-context';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid } from '@material-ui/core'
import AllMovies from '../components/Movies/AllMovies';
import AddMovie from '../components/Movies/AddMovie';
import EditMovie from '../components/Movies/EditMovie'
import MovieUrlWrapper from '../components/Movies/MovieUrlWrapper'
import PrivateRoute from '../components/Auth/PrivateRoute'

const useStyles = makeStyles({
  mainContainer : {
    width: "100%",
    margin: 0
  }
})


export default function MoviesManagement({ match }) {
  var classes = useStyles()
  var [navIndex, setNavIndex] = useState(0);

  return (
    <MoviesManagementContextProvider match={match}>
      <Grid container direction="column" 
      className={classes.mainContainer}
      alignItems="center"
      spacing= {4}
      id="moviesContainer"
      >
        <Grid item>
          <Typography component="h2" variant="h2" align="center">Movies</Typography>
        </Grid>
        <Grid
				container
				direction='column'
				className={classes.mainContainer}
				alignItems='center'
				spacing={4}
				id='moviesContainer'>
          <Switch>
            <Route path={`${match.url}/add`}>
              <PrivateRoute component={AddMovie} match={match} navIndex={navIndex} setNavIndex={setNavIndex}/>
            </Route>

            <Route exact path={`${match.url}`}>
              <PrivateRoute component= {AllMovies} match={match} navIndex={navIndex} setNavIndex={setNavIndex}/>
            </Route>
            <Route path={`${match.url}/edit/:id`}>
              <PrivateRoute component={EditMovie} match={match} navIndex={navIndex} setNavIndex={setNavIndex}/>
            </Route>
            <Route path={`${match.url}/:id`} component={MovieUrlWrapper} />
          </Switch>
        </Grid>
      </Grid>
    </MoviesManagementContextProvider>
  )
}
