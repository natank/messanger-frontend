import React, { createContext } from 'react'
export var MembersManagementContext = createContext([{}, function () { }]);


export var MembersManagementContextProvider = function (props) {

  return (
    <MembersManagementContext.Provider>
      {props.children}
    </MembersManagementContext.Provider>
  )
}