import Firebase from "../firebase_config";
let db = Firebase.firestore().collection("users");

export async function getUsers() {
  const snapshot = await db.get();
  return snapshot.docs.map((doc) => doc.data());
}
export function addUser(tmpUser) {
  return db.add(tmpUser);
}
export function updateUser(id, value) {
  return db.doc(id).update(value);
}
export function deleteUser(id) {
  return db.doc(id).delete();
}
