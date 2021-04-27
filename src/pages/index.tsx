import { Button, Avatar, Heading, Spinner, Icon, Divider, VStack, Box, Image, Text } from "@chakra-ui/react"
import { useSession, } from 'next-auth/client'
import React from "react"
import Link from 'next/link'
import { FaChartLine, FaDumbbell } from 'react-icons/fa'
import { Summary } from "../components/Summary"
import { PageWrapper } from "../components/PageWrapper"
import { useStats } from "../contexts/StatsContext"

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
	const [session, loading] = useSession();
	const { isLoading, stats } = useStats();
	if (loading || (isLoading && !stats)) {
		return (
			<PageWrapper>
				<Spinner size="xl" />
			</PageWrapper>
		)
	}

	return session && stats ? (
		<PageWrapper direction="column" spacing="6">
			<VStack d="flex" direction="column" flex="1" alignItems="center">
				<Avatar showBorder borderColor="brand.500" size="2xl" src={session.user.image} name={session.user.name} />
				<Heading fontSize={["1.25rem", "2rem"]}>Olá {session.account.athlete.firstname} {session.account.athlete.lastname}</Heading>
				<Link href="/stats">
					<Button as="a" cursor="pointer" leftIcon={<Icon as={FaDumbbell} />} mt="6" minH="3rem" colorScheme="orange" >Ver meus stats</Button>
				</Link>
				<Divider />
				<Heading fontSize={["1rem", "1.5rem"]}>Veja um pequeno resumo seu:</Heading>
				<Summary isLoading={isLoading} bike={stats.bike} swimming={stats.swimming} running={stats.running} />
			</VStack>
		</PageWrapper >
	) : (
		<PageWrapper>
			<VStack d="flex" direction="column" flex="1" w="100%" alignItems="center">

				<Box pos="relative" w="100%" flex="1" bgColor="gray.700" borderRadius="xl">
					<Image src="/hero.svg" alt="Welcome" h="100%" w="100%" object-fit="cover" filter="brightness(30%)" />
					<Heading fontSize={["1.25rem", "1.25rem", "2.25rem"]} pos="absolute" w="75%" top="25%" left="50%" transform="translate(-50%, -50%)">
						Bem vindo(a) ao Stravando 😎
						<Heading as="p" fontSize={["1.25rem", "1.25rem", "2.25rem"]}>
							Faça login em sua conta do Strava para visualizar seus stats de uma forma bem top 👌👌</Heading>
						<Link href="/stats/demo">
							<Button as="a" cursor="pointer" leftIcon={<Icon as={FaChartLine} />} mt="6" minH="3rem" colorScheme="orange">Ver uma demonstração</Button>
						</Link>
					</Heading>
				</Box>

			</VStack>
		</PageWrapper>

	)
}


