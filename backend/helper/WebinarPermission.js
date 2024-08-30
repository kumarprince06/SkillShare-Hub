const UserModel = require("../model/UserModel")

const uploadWebinarPermission = async(userId) =>{
  const user =await UserModel.findById(userId)
  if(user?.role === 'ADMIN' || user?.role === 'USER'){
    return true
  }

  return false
}

module.exports = uploadWebinarPermission