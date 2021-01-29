import React, { createContext } from 'react'


export var UsersManagementContext = createContext([{}, function () { }]);

export var UsersManagementContextProvider = function (props) {

  var { match } = props;
  var usersManagementUrl = match.url;
  return (
    <UsersManagementContext.Provider value={{
      usersManagementUrl
    }}>
      {props.children}
    </UsersManagementContext.Provider>
  )
}

