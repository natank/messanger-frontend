import Model from './Model'
import { firestore } from "../API/firebase";
import { collectIdsAndDocs } from './utils';

var userLoginModel = new Model({ collectionName: "usersLogin", docName: "userLogin" })

export async function updateUserLogin(id, userDetails) {
  return userLoginModel.updateDoc(id, userDetails);
}

export async function createUserLogin(newUser) {
  return userLoginModel.createDoc(newUser)
}

export async function deleteUserLogin(userId) {
  var userDoc = await firestore.collection("users").doc(userId).get()
  var user = userDoc.data()

  var userName = user.userName;
  var userLoginId = await getUserLoginByUsername(userName)

  userLoginModel.deleteDoc(userLoginId)
}

export async function getUserLoginByUsername(username) {
  var docref = await firestore.collection("usersLogin").where("userName", "==", username)
  var snapshot = await docref.get();
  if (!snapshot.empty) {
    var userLogin = collectIdsAndDocs(snapshot.docs[0])
    return userLogin.id
  }
}
