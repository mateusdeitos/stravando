import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { PageWrapper } from "../components/PageWrapper";

const Redirect = () => {
	return (
		<PageWrapper title="Too Many Requests | Stravando">
			<Flex flex="1" alignItems="center" justifyContent="center" direction="column">
				<Heading fontSize={["1.25rem", "2rem"]}>Putz! O Strava está sobrecarregado 😢, tente novamente mais tarde...</Heading>
			</Flex>
		</PageWrapper>
	)
}

export default Redirect;