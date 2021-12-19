import Firebase from "../firebase_config";
let db = Firebase.firestore().collection("chatRooms");

export async function getRoomByID(id) {
  return await db.doc(id).get();
}

export async function getMessagesByID(id) {
  const snapshot = await db.doc(id).collection("messages").get();
  return snapshot.docs.map((doc) => doc.data());
}
export async function getHomeMate() {
  const snapshot = await db.where("isLookForHouseMate", "==", 1).get();
  return snapshot.docs.map((doc) => doc.data());
}
