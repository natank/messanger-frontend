import { makeStyles } from '@material-ui/core/styles';

export default function useStyles() {
  var s = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      display: "block",
      borderRadius: "2rem",
      margin: `${theme.spacing(1)}px auto`
    },
    contentContainer: {
      height: "100vh",
      flexDirection: "column",
      justifyContent: "center"
    }
  }))
  return s()
}