import { Button, Avatar, Heading, VStack, StackProps, Spinner, Icon } from "@chakra-ui/react"
import { useRouter } from 'next/router'
import { signIn, signOut, useSession, } from 'next-auth/client'
import React from "react"
import Link from 'next/link'
import { FaChartLine, FaSignOutAlt, FaStrava } from 'react-icons/fa'
import Head from "next/head"
import { Summary } from "../components/Summary"
import { Header } from "../components/Header"

export default function Home() {
	const [session, loading] = useSession();

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
			<Heading>Olá {session.user.name}</Heading>
			<Link href="/stats">
				<>
					<Summary fetchUrl={`api/v3/athletes/${session.account.id}/stats`} />
					<Button as="a" cursor="pointer" leftIcon={<Icon as={FaChartLine} />} mt="6" colorScheme="whiteAlpha" >Ver minhas estatísticas</Button>
				</>
			</Link>
			<Button leftIcon={<Icon as={FaSignOutAlt} />} mt="6" colorScheme="orange" onClick={() => signOut()}>Sair</Button>
		</Wrapper >
	) : (
		<Wrapper>
			<Button leftIcon={<Icon as={FaStrava} />} mt="6" colorScheme="orange" onClick={() => signIn('strava')}>Conectar com Strava</Button>
		</Wrapper>

	)
}

const Wrapper: React.FC<StackProps> = ({ children, ...rest }) => {
	const [session, loading] = useSession();
	return (
		<>
			<Head>
				<title>Home | Stravando</title>
			</Head>
			<Header user={{ image: session?.user?.image, name: session?.user?.name }} />
			< VStack
				w="100vw"
				h="100vh"
				align="center"
				justify="center"
				{...rest}
			>
				{children}
			</VStack >
		</>
	)
}

