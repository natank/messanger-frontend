import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../API/firebase'
import { createAccount } from "../../Model/Auth-Model"
import useStyles from './styles'
import { Container, Grid, Typography, TextField, Button } from '@material-ui/core'
import AuthHeader from "./AuthHeader"

export default function CreateAccount(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  var history = useHistory();
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Grid container className={classes.contentContainer}>
          <Grid item container>
            <AuthHeader />
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
                value={username}
                onChange={e => setUsername(e.target.value)}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                type="password"
                value={password}
                label="Password"
                onChange={e => setPassword(e.target.value)}
              />
              <p>{errorMessage}</p>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Account
            </Button>
              <Typography component="p" variant="body1">Have Account ? :<Link to="/login">Login</Link></Typography>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>)
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createAccount({ username, password })
      history.push('/')
    } catch (err) {
      setErrorMessage(err)
    }
  }
}

