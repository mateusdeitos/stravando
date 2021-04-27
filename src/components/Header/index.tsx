import { Flex, Heading, HStack, VStack, Avatar, Tooltip, IconButton, Icon, Text, Button, useBreakpointValue } from "@chakra-ui/react"
import { signIn, signOut, useSession } from "next-auth/client"
import { useRouter } from "next/router"
import React from "react"
import { FaSignOutAlt, FaStrava } from "react-icons/fa"
import Link from 'next/link'

export type UserHeader = {
	name: string;
	image: string;
}

export const Header = () => {
	const isWideVersion = useBreakpointValue({ base: false, lg: true });
	const [session] = useSession();
	const router = useRouter();
	const handleSignOut = async () => {
		signOut({ redirect: false, callbackUrl: '/' }).then(() => router.push("/"));
	}

	const handleSignIn = async () => {
		signIn('strava', { callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
	}

	return (
		<Flex bg="brand.500" minH={["4rem", "7rem"]}>
			<Flex maxW={1120} px={["1rem"]} m="0 auto" flex="1" alignItems="center" justifyContent="space-between" py="1rem">
				<Link href="/">
					<Heading cursor="pointer" as="a" fontSize={["1.5rem", "2.25rem"]}>stravando</Heading>
				</Link>
				<HStack h="100%" spacing="10" >
					<VStack>
						{session && session.user && isWideVersion ? (
							<>
								<Avatar showBorder size="md" name={session.user.name} src={session.user.image} />
								<Text fontWeight="600" fontSize={["0.75rem", "1rem"]}>{session.user.name}</Text>
							</>
						) : (
							!session && (
								isWideVersion ? (
									<Button leftIcon={<Icon as={FaStrava} />} colorScheme="brand" borderColor="brand.800"borderWidth={1} onClick={handleSignIn}>Conectar com Strava</Button>
								) : (
									<IconButton
										borderColor="brand.800"
										borderWidth={1}
										colorScheme="brand"
										icon={<Icon as={FaStrava} />}
										onClick={handleSignIn}
										aria-label="Conectar com Strava"
									/>
								)
							)
						)}
					</VStack>
					{!!session && (
						<Tooltip hasArrow={isWideVersion} placement="bottom" bg="brand.200" label="Sair" isOpen={!isWideVersion}>
							<IconButton
								borderColor="brand.800"
								borderWidth={1}
								colorScheme="brand"
								icon={<Icon as={FaSignOutAlt} />}
								aria-label="Logout"
								onClick={handleSignOut}
							/>
						</Tooltip>
					)}
				</HStack>
			</Flex>
		</Flex>
	)
}