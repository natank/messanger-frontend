import React from 'react'
import { Route } from 'react-router-dom'
import EditMember from './EditMember'

export default function Members({ match }) {

  return (
    <div>
      <h1>Members</h1>
      <Route path={`${match.url}/edit/:id`} component={EditMember} />

    </div>
  )
}