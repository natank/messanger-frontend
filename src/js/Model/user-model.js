import Model from './Model'
import { createUserLogin, deleteUserLogin } from './user-login-model'

var userModel = new Model({ collectionName: "users", docName: "user" })

export async function updateUser(id, userDetails) {
  var createdDate = Date.now();
  var user = {...userDetails, createdDate}
  return userModel.updateDoc(id, userDetails);
}

export async function createUser(newUser) {
  await createUserLogin({ userName: newUser.userName })
  return userModel.createDoc(newUser)
}

export async function deleteUser(userId) {
  await deleteUserLogin(userId)
  userModel.deleteDoc(userId)
}


export async function getUsers() {
  return userModel.getCollectionDocs()
}

