import { Flex, Heading, HStack, VStack, Avatar, Tooltip, IconButton, Icon, Text, Skeleton, SkeletonCircle } from "@chakra-ui/react"
import { signOut } from "next-auth/client"
import { useRouter } from "next/router"
import React from "react"
import { FaSignOutAlt } from "react-icons/fa"
import Link from 'next/link'

export type UserHeader = {
	name: string;
	image: string;
}

interface HeaderProps {
	user: UserHeader;
}

export const Header = ({ user }: HeaderProps) => {
	const router = useRouter();
	const handleSignOut = async () => {
		const { url } = await signOut({ redirect: false, callbackUrl: '/' });
		router.push(url);
	}

	return (
		<Flex bg="brand.500" minH={["2rem", "4rem"]}>
			<Flex maxW={1120} m="0 auto" flex="1" alignItems="center" justifyContent="space-between">
				<Link href="/">
					<Heading cursor="pointer" as="a">Stravando</Heading>
				</Link>
				<HStack h="100%" spacing="10" >
					<VStack py="0.5rem">
						<Avatar showBorder size="md" name={user.name} src={user.image} />
						<Text fontWeight="600">{user.name}</Text>
					</VStack>
					<Tooltip hasArrow placement="bottom" bg="brand.200" label="Sair">
						<IconButton
							borderColor="brand.800"
							borderWidth={1}
							colorScheme="brand"
							icon={<Icon as={FaSignOutAlt} />}
							aria-label="Logout"
							onClick={handleSignOut}
						/>
					</Tooltip>
				</HStack>
			</Flex>
		</Flex>
	)
}