import ItemsCollection from './ItemsCollection'


export function usersReducer(previousState, action) {
  var collection = new ItemsCollection(previousState)
  switch (action.type) {
    case "ADD_USER":
      return collection.addItem(action.payload.user)
    case "UPDATE_USER":
      return collection.updateItem(action.payload.user)
    case "LOAD":
      return collection.loadItems(action.payload.users)
    case "REMOVE_USER":
      return collection.removeItem(action.payload.userId)
    default:
      return previousState
  }
}

export function usersPermissionsReducer(previousState, action) {
  var collection = new ItemsCollection(previousState)
  switch (action.type) {
    case "ADD_USER":
      return collection.addItem(action.payload.userPermissions)
    case "UPDATE_USER":
      return collection.updateItem(action.payload.userPermissions)
    case "REMOVE_USER":
      return collection.removeItem(action.payload.userPermissionId)
    case "LOAD":
      return collection.loadItems(action.payload.usersPermissions)
    default:
      return previousState
  }
}


export function moviesReducer(previousState, action) {
  var collection = new ItemsCollection(previousState)
  switch (action.type) {
    case "ADD_MOVIE":
      return collection.addItem(action.payload.movie)
    case "REMOVE_MOVIE":
      return collection.removeItem(action.payload.movieId)
    case "UPDATE_MOVIE":
      return collection.updateItem(action.payload.movie)
    case "LOAD":
      return collection.loadItems(action.payload.movies)
    default:
      return previousState
  }
}

export function membersReducer(previousState, action) {
  var collection = new ItemsCollection(previousState)
  switch (action.type) {
    case "ADD_MEMBER":
      return collection.addItem(action.payload.member)
    case "REMOVE_MEMBER":
      return collection.removeItem(action.payload.memberId)
    case "UPDATE_MEMBER":
      return collection.updateItem(action.payload.member)
    case "LOAD":
      return collection.loadItems(action.payload.members)
    default:
      return previousState
  }
}

export function authUserReducer(previousState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return action.payload
    case "LOGOUT_USER":
      return null
    default:
      return previousState;
  }

}