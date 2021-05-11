import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import NextAuthDynamodb from "next-auth-dynamodb";
import { db } from "../../../lib/db";

var role = 0;
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
          const s = JSON.parse(JSON.stringify(a))[0];
          role = s.role;
          user.role = role;
          return true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // async redirect(url, baseUrl) { return baseUrl },
    async session(session, user, profile) {

      const data = user;
      data.role = role;
      session.user = data;
      // console.log(`Session user: ${session.user.role}`);
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      await db
        .query(`SELECT * FROM users WHERE email="${token.email}";`)
        .then((a) => {
          const s = JSON.parse(JSON.stringify(a))[0];
          role = s.role;
          token.role = role;
          // console.log(token);
        })
        .catch((e) => {
          console.log(e);
        });
      token.role = role;
      // console.log(token);
      return token
    }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
};

export default (req, res) =>
  NextAuth(req, res, options);
