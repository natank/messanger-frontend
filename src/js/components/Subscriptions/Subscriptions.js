import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AllMembers from './AllMembers';
import AddMember from './AddMember';
import MemberSubscription from './MemberDetails'
import MembersNav from './MembersNav'
import Members from './Members'
export default function Subscriptions(props) {

  return (
    <div>
      <Switch>
        <Route exact path={`${match.url}/edit/:id`} component={Members} />
        <Route path={match.url} component={MembersNav}>
          <h1>Subscriptions</h1>
          <Route exact path={`${match.url}`} component={AllMembers} />
          <Switch>
            <Route exact path={`${match.url}/add`} component={AddMember} />
            <Route path={`${match.url}/:id`} component={MemberSubscription} />
          </Switch>
        </Route>
      </Switch>
    </div>
  )
}