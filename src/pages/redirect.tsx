import { Button, Flex, Heading } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import { PageWrapper } from "../components/PageWrapper";

const Redirect = () => {
	const [session] = useSession();
	const [count, setCount] = useState(10);

	useEffect(() => {
		let myTimeOut: NodeJS.Timeout;
		myTimeOut = setTimeout(() => {
			if (count >= 0) {
				setCount((prev) => prev - 1);
			}
		}, 1000);

		if (count == 0) {
			signIn("strava", { callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
		}

		return () => clearTimeout(myTimeOut);
	}, [count, session]);

	return (
		<PageWrapper title="Redirecting | Stravando">
			<Flex
				flex="1"
				alignItems="center"
				justifyContent="center"
				direction="column"
			>
				<Heading fontSize={["1.25rem", "2rem"]}>
					Sua sessão com o Strava foi encerrada, você será redirecionado para a
					página de login em {count}
				</Heading>
				<Button
					mt="2rem"
					colorScheme="orange"
					onClick={() =>
						signIn("strava", { callbackUrl: process.env.NEXT_PUBLIC_APP_URL })
					}
				>
					Redirecionar agora
				</Button>
			</Flex>
		</PageWrapper>
	);
};

export default Redirect;
