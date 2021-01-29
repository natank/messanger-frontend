import React, { createContext } from 'react'

export var MoviesManagementContext = createContext([{}, function () { }]);

export var MoviesManagementContextProvider = function (props) {

  var { match } = props;
  var moviesManagementUrl = match.url;
  return (
    <MoviesManagementContext.Provider value={{
      moviesManagementUrl
    }}>
      {props.children}
    </MoviesManagementContext.Provider>
  )
}

