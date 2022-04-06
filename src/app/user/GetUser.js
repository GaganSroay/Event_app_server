const admin = require("../../presistence/FirebaseAdmin");
const userRef = admin.firestore().collection("users");

const getUser = async (userId) => {
    if(!userId) return {error:"Please provide userId"}
    const userDoc = await userRef.doc(userId).get()

    if(!userDoc) return{error:"User not found"}
    return userDoc
}

module.exports = getUser