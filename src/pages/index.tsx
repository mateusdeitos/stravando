import { Button, Avatar, Heading, Spinner, Icon, Divider } from "@chakra-ui/react"
import { signIn, useSession, } from 'next-auth/client'
import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { FaChartLine, FaMap } from 'react-icons/fa'
import { Summary } from "../components/Summary"
import { api, DataProps } from "../../services/api"
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
	if (loading) {
		return (
			<PageWrapper>
				<Spinner size="xl" />
			</PageWrapper>
		)
	}

	return session ? (
		<PageWrapper direction="column" spacing="6">
			<Avatar showBorder borderColor="brand.500" size="2xl" src={session.user.image} name={session.user.name} />
			<Heading fontSize={["1.25rem", "2rem"]}>Olá {session.account.athlete.firstname} {session.account.athlete.lastname}</Heading>
			<Link href="/stats">
				<Button as="a" cursor="pointer" leftIcon={<Icon as={FaMap} />} mt="6" minH="3rem" colorScheme="orange" >Ver o quão longe já fui</Button>
			</Link>
			<Divider />
			<Heading fontSize={["1rem", "1.5rem"]}>Veja um pequeno resumo seu:</Heading>
			<Summary isLoading={isLoading} bike={stats.bike} swimming={stats.swimming} running={stats.running} />
		</PageWrapper >
	) : (
		<PageWrapper>	
			<Link href="/stats/demo">
				<Button as="a" cursor="pointer" leftIcon={<Icon as={FaChartLine} />} mt="6" minH="3rem" colorScheme="orange">Ver demonstração</Button>
			</Link>
		</PageWrapper>

	)
}


