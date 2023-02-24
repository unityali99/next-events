import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { decode, encode } from "next-auth/jwt";
import { MongoClient } from "mongodb";
import { compare } from "bcrypt";

async function getUserByEmail(email) {
  const client = new MongoClient(process.env.uri, {
    useNewUrlParser: true,
  });
  const db = client.db(process.env.dbName);
  const usersCollection = db.collection("users");
  const user = usersCollection.findOne({ email });
  return user;
}

const options = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email);
        if (user && (await compare(credentials.password, user.password))) {
          return { email: user.email };
        }
        return null;
      },
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    encryption: true,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    encode: async ({ secret, token, maxAge }) => {
      const jwt = await encode({ secret, token, maxAge });
      return jwt;
    },
    decode: async ({ secret, token }) => {
      const jwt = await decode({ secret, token });
      return jwt;
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
};

export default (req, res) => NextAuth(req, res, options);
