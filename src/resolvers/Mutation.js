const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    // 1 encrypt the password using bryptjs library
    const hashedPassword = await bcrypt.hash(args.password, 10)
    // 2 use prisma client to store user in db
    const {password, ...user} = await context.prisma.createUser({ ...args, password: hashedPassword })
    // 3 create a JWT ( json web token ) signed with APP_SECRET
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    // 4 return the token and user
    return {
      token,
      user,
    }
}
  
async function login(parent, args, context, info) {
    // 1 check if user with this email exists in prisma db
    const {password, ...user} = await context.prisma.user({ email: args.email })
    if (!user) {
      throw new Error('No such user found')
    }
    // 2 is user exists and password is valid
    const valid = await bcrypt.compare(args.password, password)
    if (!valid) {
      throw new Error('Invalid password')
    }
    //if user is valid - exists and password is correct, return its token
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    // 3 return token and user object
    return {
      token,
      user,
    }
}
function post(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.createLink({
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    })
}
  
module.exports = {
    signup,
    login,
    post,
}