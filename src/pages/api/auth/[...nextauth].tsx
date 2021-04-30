import NextAuth from 'next-auth';
import Providers from 'next-auth/providers'

const providers = [
	Providers.Strava({
		clientId: process.env.STRAVA_CLIENT_ID,
		clientSecret: process.env.STRAVA_CLIENT_SECRET,
		scope: 'read',
	}),
]

const callbacks = {
	signIn: async function signIn(user, account) {
		Object.assign(user, { account });
		return true;
	},
	jwt: async function jwt(token, user) {
		return { ...token, ...user }
	},
	session: async function session(session, token) {
		return { ...session, ...token }
	}
}

const options = {
	providers,
	callbacks
}

export default (req, res) => NextAuth(req, res, options)

