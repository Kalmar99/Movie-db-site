const users = new Map()

function createUser(username,password) {
    
    const user = {
        id: username,
        password: password
    }
    
    users.set(username,user)
}

function getUser(username) {
    return users.get(username)
}

function verifyUser(username,password) {
    
    const user = getUser(username)
    if(!user) {
        return false;
    } else {
        return user.password === password
    }
}

module.exports = {createUser,getUser,verifyUser}