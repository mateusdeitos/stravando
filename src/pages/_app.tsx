import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { Provider as SessionProvider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<SessionProvider session={pageProps.session}>
				<Component {...pageProps} />
			</SessionProvider>
		</ChakraProvider>
	);
}

export default MyApp;
