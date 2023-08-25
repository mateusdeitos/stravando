import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	Image,
	Spacer,
	Spinner,
	useBreakpointValue,
	VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import React, { useState } from "react";
import { FaChartLine, FaDumbbell, FaStrava } from "react-icons/fa";
import { handleSignIn } from "../components/Header";
import { PageWrapper } from "../components/PageWrapper";

interface DistanceProps {
	biggest: number;
	total: number;
}
export interface DistanceData {
	running: DistanceProps;
	bike: DistanceProps;
	swimming: DistanceProps;
}

export default function Home() {
	const isWideVersion = useBreakpointValue({ base: false, lg: true });
	const [session, loading] = useSession();
	const [loadingSignIn, setLoadingSignIn] = useState(false);
	const pageTitle = "Home | Stravando";

	if (loading) {
		return (
			<PageWrapper title={pageTitle}>
				<Spinner size="xl" />
			</PageWrapper>
		);
	}

	return (
		<PageWrapper title={pageTitle} direction="column" spacing="6">
			<VStack
				display="flex"
				direction="column"
				flex="1"
				alignItems="center"
				w="100%"
			>
				<Box pos="relative" w="100%" flex="1" bgColor="gray.700">
					<Image
						src="/hero.svg"
						alt="Welcome"
						h="100%"
						w="100%"
						object-fit="cover"
						filter="brightness(20%)"
					/>
					<Flex
						direction="column"
						alignItems="center"
						pos="absolute"
						w="75%"
						h="85%"
						top="50%"
						left="50%"
						transform="translate(-50%, -50%)"
					>
						{session ? (
							<>
								<Avatar
									showBorder
									borderColor="brand.500"
									size="2xl"
									src={session.user.image}
									name={session.user.name}
								/>
								<Heading
									fontSize={["1.25rem", "2rem"]}
									w="100%"
									textAlign="center"
									mt="1rem"
								>
									Olá, {session.account.athlete.firstname}{" "}
									{session.account.athlete.lastname}
								</Heading>
								{!isWideVersion && <Spacer />}
								<Link href="/stats/">
									<Button
										as="a"
										cursor="pointer"
										leftIcon={<Icon as={FaDumbbell} />}
										mt="6"
										minH="3rem"
										colorScheme="orange"
										data-gtm="ver-meus-stats"
									>
										Ver meus stats
									</Button>
								</Link>
							</>
						) : (
							<>
								<Heading
									textAlign="left"
									w="100%"
									fontSize={["1.25rem", "1.25rem", "2.25rem"]}
								>
									Bem vindo(a) ao Stravando 😎
								</Heading>
								<Heading
									textAlign="left"
									w="100%"
									fontSize={["1.25rem", "1.25rem", "2.25rem"]}
								>
									Faça login em sua conta do Strava para visualizar seus stats
									de uma forma bem top 👌👌
								</Heading>
								{!isWideVersion && <Spacer />}
								<Link href="/stats/demo">
									<Button
										as="a"
										cursor="pointer"
										leftIcon={<Icon as={FaChartLine} />}
										mt="6"
										minW="20rem"
										minH="3rem"
										colorScheme="orange"
										data-gtm="ver-demo"
									>
										Ver uma demonstração
									</Button>
								</Link>
								{!isWideVersion && (
									<Button
										leftIcon={<Icon as={FaStrava} />}
										mt="1rem"
										minW="20rem"
										minH="3rem"
										colorScheme="orange"
										data-gtm="conectar-strava"
										isLoading={loadingSignIn}
										onClick={() => {
											setLoadingSignIn(true);
											handleSignIn();
										}}
									>
										Conectar no Strava
									</Button>
								)}
							</>
						)}
					</Flex>
				</Box>
			</VStack>
		</PageWrapper>
	);
}
