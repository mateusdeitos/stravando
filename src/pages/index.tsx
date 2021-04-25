import { Button, Avatar, Heading, VStack, StackProps, Spinner, Icon, Divider } from "@chakra-ui/react"
import { signIn, useSession, } from 'next-auth/client'
import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { FaChartLine, FaMap, FaMapPin } from 'react-icons/fa'
import Head from "next/head"
import { Summary } from "../components/Summary"
import { Header } from "../components/Header"
import { api, DataProps } from "../../services/api"

interface DistanceProps {
	biggest: string;
	total: string;
}
export interface DistanceData {
	running: DistanceProps;
	bike: DistanceProps;
	swimming: DistanceProps;
}

export default function Home() {
	const [session, loading] = useSession();
	const [data, setData] = useState<DistanceData>({} as DistanceData);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const loadData = async () => {
			try {
				api.defaults.headers.authorization = `Bearer ${session.account.accessToken}`;
				const { data } = await api.get<DataProps>(`/athletes/${session.account.id}/stats`);
				setData({
					bike: {
						biggest: new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format((data.biggest_ride_distance || 0) / 1000),
						total: new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format((data.all_ride_totals.distance || 0) / 1000),
					},
					running: {
						biggest: new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format((data.biggest_run_distance || 0) / 1000),
						total: new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format((data.all_run_totals.distance || 0) / 1000),
					},
					swimming: {
						biggest: new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format((data.biggest_swim_distance || 0) / 1000),
						total: new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format((data.all_swim_totals.distance || 0) / 1000),
					},
				});
				setIsLoading(false);
			} catch (error) {
				console.log(error.response);
				if (error.response.status === 401) {
					signIn('strava');
				}
			}
		}
		if (session && isLoading) {
			loadData();
		}
	}, [session])

	if (loading) {
		return (
			<Wrapper>
				<Spinner size="xl" />
			</Wrapper>
		)
	}

	return session ? (
		<Wrapper direction="column" spacing="6">
			<Avatar showBorder borderColor="brand.500" size="2xl" src={session.user.image} name={session.user.name} />
			<Heading>Olá {session.account.athlete.firstname} {session.account.athlete.lastname}</Heading>
			<Link href="/stats">
				<Button as="a" cursor="pointer" leftIcon={<Icon as={FaMap} />} mt="6" minH="3rem" colorScheme="brand" >Ver o quão longe já fui</Button>
			</Link>
			<Divider />
			<Heading fontSize="1.5rem">Veja um pequeno resumo seu:</Heading>
			<Summary isLoading={isLoading} bike={data.bike} swimming={data.swimming} running={data.running} />
		</Wrapper >
	) : (
		<Wrapper>
			<Link href="/stats?demo">
				<Button as="a" cursor="pointer" leftIcon={<Icon as={FaChartLine} />} mt="6" minH="3rem" colorScheme="orange">Ver demonstração</Button>
			</Link>
		</Wrapper>

	)
}

const Wrapper: React.FC<StackProps> = ({ children, ...rest }) => {
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

