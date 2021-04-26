import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { Provider as SessionProvider } from 'next-auth/client'
import { StatsProvider } from "../contexts/StatsContext"

function MyApp({ Component, pageProps }) {
	return <ChakraProvider resetCSS theme={theme}>
		<SessionProvider session={pageProps.session}>
			<StatsProvider>
				<Component {...pageProps} />
			</StatsProvider>
		</SessionProvider>
	</ChakraProvider>
}

export default MyApp
