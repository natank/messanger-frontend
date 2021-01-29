import Model from './Model'

var userPermissionsModel = new Model({
  collectionName: "usersPermissions",
  docName: "userPermissions"
})

export async function getUsersPermissions() {
  return userPermissionsModel.getCollectionDocs()
}

export async function updateUserPermissions(id, updatedUserPermissions) {
  return userPermissionsModel.updateDoc(id, updatedUserPermissions);
}

export async function deleteUserPermissions(id) {
  userPermissionsModel.deleteDoc(id)
}

export async function createUserPermissions(userPermissions, userId) {
  
  userPermissions.userPermissions = { ...userPermissions.userPermissions}
  var data = { ...userPermissions };
  data.userId = userId;
  
  return userPermissionsModel.createDoc(data)
}