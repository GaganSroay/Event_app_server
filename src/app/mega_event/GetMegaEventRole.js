const admin = require("../../presistence/FirebaseAdmin");
const getMegaEvent = require("./GetMegaEvent");
const firestore = admin.firestore();
const megaEventRef = firestore.collection("mega_events");

const getMegaEventRole = async(eventId,authContext) => {
    if(!eventId) return{error:"PLease provide eventId"}

    const megaEventDoc = await getMegaEvent(eventId)
    if(megaEventDoc.error) return megaEventDoc

    const adminDoc = await megaEventRef.doc(megaEventDoc.id)
    .collection('admins')
    .where("user","==",authContext.user_id)
    .get()

    if(!adminDoc) return{error:"mega event not found"}
    if(!adminDoc.docs[0]) return{error:"mega event not found"}

    const admin = adminDoc.docs[0].data()
    return admin;
}

module.exports = getMegaEventRole