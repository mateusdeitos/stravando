import {
	Avatar,
	Button,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	Text,
	Tooltip,
	useBreakpointValue,
	VStack,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import React, { useState } from "react";
import { FaSignOutAlt, FaStrava } from "react-icons/fa";

export type UserHeader = {
	name: string;
	image: string;
};

export const handleSignIn = async () => {
	signIn("strava", { callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
};

export const Header = () => {
	const isWideVersion = useBreakpointValue({ base: false, lg: true });
	const [loadingSignIn, setLoadingSignIn] = useState(false);
	const [session] = useSession();
	const handleSignOut = async () => {
		signOut({ callbackUrl: "/" });
	};

	return (
		<Flex bg="brand.500" minH={["4rem", "7rem"]}>
			<Flex
				maxW={1120}
				px={["1rem"]}
				m="0 auto"
				flex="1"
				alignItems="center"
				justifyContent="space-between"
				py="1rem"
			>
				<Link href="/">
					<Heading cursor="pointer" as="a" fontSize={["1.5rem", "2.25rem"]}>
						stravando
					</Heading>
				</Link>
				<HStack h="100%" spacing="10">
					<VStack>
						{session && session.user && isWideVersion ? (
							<>
								<Avatar
									showBorder
									size="md"
									name={session.user.name}
									src={session.user.image}
								/>
								<Text fontWeight="600" fontSize={["0.75rem", "1rem"]}>
									{session.user.name}
								</Text>
							</>
						) : (
							!session &&
							(isWideVersion ? (
								<Button
									leftIcon={<Icon as={FaStrava} />}
									colorScheme="brand"
									borderColor="brand.800"
									borderWidth={1}
									isLoading={loadingSignIn}
									onClick={() => {
										setLoadingSignIn(true);
										handleSignIn();
									}}
									data-gtm="conectar-strava-header"
								>
									Conectar com Strava
								</Button>
							) : (
								<IconButton
									borderColor="brand.800"
									borderWidth={1}
									colorScheme="brand"
									icon={<Icon as={FaStrava} />}
									aria-label="Conectar com Strava"
									data-gtm="conectar-strava-header"
									isLoading={loadingSignIn}
									onClick={() => {
										setLoadingSignIn(true);
										handleSignIn();
									}}
								/>
							))
						)}
					</VStack>
					{!!session && (
						<Tooltip hasArrow placement="bottom" bg="brand.200" label="Sair">
							{isWideVersion ? (
								<IconButton
									borderColor="brand.800"
									borderWidth={1}
									colorScheme="brand"
									icon={<Icon as={FaSignOutAlt} />}
									aria-label="Logout"
									onClick={handleSignOut}
									data-gtm="desconectar-strava-header"
								/>
							) : (
								<Button
									borderColor="brand.800"
									borderWidth={1}
									colorScheme="brand"
									leftIcon={<Icon as={FaSignOutAlt} />}
									aria-label="Logout"
									onClick={handleSignOut}
									data-gtm="desconectar-strava-header"
									fontSize="0.75rem"
								>
									Sair
								</Button>
							)}
						</Tooltip>
					)}
				</HStack>
			</Flex>
		</Flex>
	);
};
