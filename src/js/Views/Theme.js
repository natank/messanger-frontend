import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme(theme=>({
    tab: {
        ...theme.typography.tab,
        fontFamily: "Raleway",
        textTransform: "none",
        fontWeight: 700,
        fontSize: "1rem",
    },
    overrides: {
      drawerItem:{
        selected: {
            backgroundColor: "orange"
        }

    }
  }
}))