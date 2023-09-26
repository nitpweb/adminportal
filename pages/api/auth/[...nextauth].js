import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import NextAuthDynamodb from 'next-auth-dynamodb'
import { db } from '../../../lib/db'
import { administrationList } from '@/lib/const'

var role = 0
var department = null
var administration = null

const options = {
    providers: [
        Providers.Google({
            clientId: process.env.NEXT_GOOGLE_ID,
            clientSecret: process.env.NEXT_GOOGLE_SECRET,
        }),
    ],
    // adapter: NextAuthDynamodb,
    session: {
        jwt: true,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        // A secret to use for key generation (you should set this explicitly)
        // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
        // Set to true to use encryption (default: false)
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        // signIn: '/auth/signin',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        async signIn(user, account, profile, session) {
            let data = await db
                .query(`SELECT * FROM users WHERE email="${profile.email}";`)
                .then((a) => {
                    const s = JSON.parse(JSON.stringify(a))
                    if (s.length == 0) {
                        return false
                    }
                    if (s.administration && (s.role != 1 || s.role != 2)) {
                        if (administrationList.has(s.administration)) s.role = 4
                    }
                    role = s.role
                    department = s.department
                    administration = s.administration
                    user.role = role
                    user.department = department
                    user.administration = s.administration
                    return true
                })
                .catch((e) => {
                    console.log(e)
                    return false
                })
            return data
        },
        // async redirect(url, baseUrl) { return baseUrl },
        async session(session, user, profile) {
            const data = user
            data.role = role
            data.department = department
            data.administration = administration
            session.user = data
            // console.log(`Session user: ${session.user.role}`);
            return session
        },
        async jwt(token, user, account, profile, isNewUser) {
            await db
                .query(`SELECT * FROM users WHERE email="${token.email}";`)
                .then((a) => {
                    const s = JSON.parse(JSON.stringify(a))[0]
                    if (!s) {
                        return token
                    }
                    role = s.role
                    department = s.department
                    administration = s.administration
                    token.department = s.department
                    token.administration = s.administration
                    token.role = role
                    // console.log(token);
                })
                .catch((e) => {
                    console.log(e)
                })
            token.role = role
            token.department = department
            token.administration = administration
            // console.log(token);
            return token
        },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: false,
}

export default (req, res) => NextAuth(req, res, options)
