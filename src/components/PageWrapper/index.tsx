import { Flex, StackProps, VStack } from "@chakra-ui/react"
import Head from "next/head"
import React from "react"
import { Header } from "../Header"

export const PageWrapper: React.FC<StackProps> = ({ children, ...rest }) => {
	return (
		<>
			<Head>
				<title>Home | Stravando</title>
			</Head>
			<Header />
			< VStack
				pt="1rem"
				px={["1rem", "0"]}
				maxW={1120}
				h="100vh"
				align="center"
				justify="start"
				m="0 auto"
				pb={["15rem", "0"]}
				{...rest}
			>
				{children}
				<Flex minH="5rem" bg="gray.300">

				</Flex>
			</VStack >
		</>
	)
}