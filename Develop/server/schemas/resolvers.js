const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        isLoggedIn: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id })
                    .select('-__V -password')
                return user;
            }
            throw new AuthenticationError('Please Log In!');
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            let user = User.findOne({ email })
            if (!user) {
                throw new AuthenticationError('Invalid User')
            }
            let validPassword = user.isCorrectPassword(password)
            if (!password) {
                throw new AuthenticationError('Incorrect Password')
            }
            let signToken = signToken(user)
            return { token, user }
        },
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                let updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, {
                    $addToSet: { savedBook: book }
                }, { new: true })
                return updatedUser;
            }
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                let updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { bookId: bookId } }, { new: true })
            }
        }
    }
}

module.exports = resolvers;