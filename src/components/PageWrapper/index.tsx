import { PopoverBody, PopoverContent, PopoverHeader, Flex, StackProps, VStack, Text, Divider, Link as ChakraLink, Popover, PopoverTrigger, PopoverArrow, PopoverCloseButton, Avatar, Portal, Icon, Heading } from "@chakra-ui/react"
import Head from "next/head"
import React from "react"
import { FaEnvelope, FaGithub, FaInfoCircle, FaLinkedin } from "react-icons/fa"
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
				h={["calc(100vh - 4rem)", "calc(100vh - 7rem)"]}
				align="center"
				justify="start"
				m="0 auto"
				// pb={["15rem", "0"]}
				{...rest}
			>
				{children}
				<Flex w="100%" direction="column" alignItems="center">
					<Divider />
					<Flex alignItems="center" mb="2rem">
						<Text fontSize="1rem">Desenvolvido por&nbsp;</Text>
						<Popover trigger="click" placement="top">
							<PopoverTrigger>
								<Heading fontSize="1rem" fontWeight="600" color="brand.500" cursor="pointer" >Mateus Deitos</Heading>
							</PopoverTrigger>
							<PopoverContent bg="gray.800">
								<PopoverHeader>
									<Flex alignItems="center">
										<Avatar mr="1rem" size="md" showBorder src="https://avatars.githubusercontent.com/u/8628316?v=4" />
										<Heading fontSize="1rem">Mateus Deitos</Heading>
									</Flex>
								</PopoverHeader>
								<PopoverArrow bg="gray.800" />
								<PopoverCloseButton />
								<PopoverBody>
									<Flex alignItems="center">
										<Icon as={FaLinkedin} boxSize={5} />
										<ChakraLink ml=".5rem" href="https://www.linkedin.com/in/mateus-deitos/" cursor="pointer" isExternal fontWeight="600" color="blue.500" textDecoration="underline">Linkedin</ChakraLink>
									</Flex>
									<Flex alignItems="center">
										<Icon as={FaGithub} boxSize={5} />
										<ChakraLink ml=".5rem" href="https://www.github.com/mateusdeitos/" cursor="pointer" isExternal fontWeight="600" color="blue.500" textDecoration="underline">Github</ChakraLink>
									</Flex>
									<Flex alignItems="center">
										<Icon as={FaEnvelope} boxSize={5} />
										<ChakraLink ml=".5rem" href="mailto:mate.deitos@hotmail.com" cursor="pointer" isExternal fontWeight="600" color="blue.500" textDecoration="underline">mate.deitos@hotmail.com</ChakraLink>
									</Flex>
								</PopoverBody>
							</PopoverContent>
						</Popover>
					</Flex>
				</Flex>
			</VStack >
		</>
	)
}