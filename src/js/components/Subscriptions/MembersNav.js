import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import {Tabs, Tab} from '@material-ui/core'

import { MainContext } from '../../Context/main-context'
import { checkAccessToRoute } from '../../Utils/utils'

export default function MembersNav({navIndex, setNavIndex}) {
  var { store, membersManagementUrl } = useContext(MainContext)
  var [state, dispatch] = store;
  var {authUser} = state;

  var routes = [{
    url: `${membersManagementUrl}`,
    title: "All Members"
  },
  {
    url: `${membersManagementUrl}/add`,
    title: "Add Members"
  }]

  return (
    <Tabs value={navIndex}>
      {routes.map((route, index) => {
        var isAuthorized = checkAccessToRoute(`${membersManagementUrl}/add`, authUser);
        return (
          isAuthorized ?
            <Tab 
              component={Link} 
              to={`${route.url}`} 
              key={index}
              label = {`${route.title}`}
              onClick={()=>setNavIndex(index)}
            /> : null
        )
      })}
    </Tabs>
  )
}
