import { Flex, Heading, HStack, VStack, Avatar, Tooltip, IconButton, Icon, Text, Skeleton, SkeletonCircle, Button } from "@chakra-ui/react"
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
	const [session] = useSession();
	const router = useRouter();
	const handleSignOut = async () => {
		const { url } = await signOut({ redirect: false, callbackUrl: '/' });
		router.push(url);
	}

	return (
		<Flex bg="brand.500" minH={["2rem", "4rem"]}>
			<Flex maxW={1120} m="0 auto" flex="1" alignItems="center" justifyContent="space-between" py="1rem">
				<Link href="/">
					<Heading cursor="pointer" as="a">stravando</Heading>
				</Link>
				<HStack h="100%" spacing="10" >
					<VStack>
						{session && session.user ? (
							<>
								<Avatar showBorder size="md" name={session.user.name} src={session.user.image } />
								<Text fontWeight="600">{session.user.name}</Text>
							</>
						) : (
							<Button leftIcon={<Icon as={FaStrava} />} colorScheme="orange" onClick={() => signIn('strava')}>Conectar com Strava</Button>
						)}
					</VStack>
					<Tooltip hasArrow placement="bottom" bg="brand.200" label="Sair">
						<IconButton
							borderColor="brand.800"
							borderWidth={1}
							colorScheme="brand"
							icon={<Icon as={FaSignOutAlt} />}
							aria-label="Logout"
							onClick={handleSignOut}
							hidden={!session}
						/>
					</Tooltip>
				</HStack>
			</Flex>
		</Flex>
	)
}