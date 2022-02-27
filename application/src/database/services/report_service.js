import Firebase from "../firebase_config";
let db = Firebase.firestore().collection("reports");

export async function getReports() {
  const snapshot = await db.get();
  return snapshot.docs.map((doc) => doc.data());
}
export function addReport(report) {
  return db.add(report);
}
export function getReportByID(id) {
  return db.doc(id).get();
}
export function updateReport(id, value) {
  return db.doc(id).update(value);
}
export function deleteReport(id) {
  return db.doc(id).delete();
}
export async function getUserReports(id) {
  const snapshot = await db.where("userId", "==", id).get();
  return snapshot.docs.map((doc) => doc.data());
}
