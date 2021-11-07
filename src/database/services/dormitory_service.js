import Firebase from "../firebase_config";
let db = Firebase.firestore().collection("dormitories");

export async function getDorms() {
  const snapshot = await db.get();
  return snapshot.docs.map((doc) => doc.data());
}
export function getAll() {
  return db;
}
export function addDorm(tmpDorm) {
  return db.add(tmpDorm);
}
export function getDormByID(id) {
  //fill here
  //return db.add(tmpDorm);
}
export function updateDorm(id, value) {
  return db.doc(id).update(value);
}
export function deleteDorm(id) {
  return db.doc(id).delete();
}
