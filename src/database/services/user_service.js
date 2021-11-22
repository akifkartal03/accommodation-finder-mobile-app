import Firebase from "../firebase_config";
let db = Firebase.firestore().collection("users");

export async function getUsers() {
  const snapshot = await db.get();
  return snapshot.docs.map((doc) => doc.data());
}
export function addUser(tmpUser) {
  return db.add(tmpUser);
}
export function getUserByID(id) {
  return db.doc(id).get();
}
export function updateUser(id, value) {
  return db.doc(id).update(value);
}
export async function getHomeMate() {
  const snapshot = await db.where("isLookForHouseMate", "==", 1).get();
  return snapshot.docs.map((doc) => doc.data());
}
export function deleteUser(id) {
  return db.doc(id).delete();
}
