import { StackProps, VStack } from "@chakra-ui/react"
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
				maxW={1120}
				h="100vh"
				align="center"
				justify="start"
				m="0 auto"
				{...rest}
			>
				{children}
			</VStack >
		</>
	)
}