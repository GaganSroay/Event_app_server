
const c        = 'abcdefghijklmnopqrstuvwxyz1234567890@#$%&'
const ac       = 'abcdefghijklmnopqrstuvwxyz'
const nc       = '0123456789'

const getPhone = req => req.body.decodedToken.phone_number
const getUID = req => req.body.decodedToken.user_id

const makeid = () => ran(3,ac) + ran(2,nc)
const makeTicket = () => ran(40,c)

const ran = (length,character) =>{
    let res = '';
    for ( let i = 0; i < length; i++ ) 
      res += character.charAt(Math.floor(Math.random()*character.length))
   return res;
}

const ranChar = (length) =>{
    let res = '';
    for ( let i = 0; i < length; i++ ) 
      res += c.charAt(Math.floor(Math.random()*c.length))
   return res;
}


module.exports = {
    getPhone,
    makeid,
    makeTicket,
    getUID,
    ran,
    ranChar
}

