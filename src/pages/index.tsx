import { Button, Avatar, Heading, VStack, StackProps, Spinner, Icon } from "@chakra-ui/react"
import { useRouter } from 'next/router'
import { signIn, signOut, useSession, } from 'next-auth/client'
import React from "react"
import Link from 'next/link'
import { FaChartLine, FaSignOutAlt, FaStrava } from 'react-icons/fa'

export default function Home() {
	const router = useRouter();
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
				<Button as="a" cursor="pointer" leftIcon={<Icon as={FaChartLine} />} mt="6" colorScheme="whiteAlpha" >Ver minhas estatísticas</Button>
			</Link>
			<Button leftIcon={<Icon as={FaSignOutAlt} />} mt="6" colorScheme="orange" onClick={() => signOut()}>Sair</Button>
		</Wrapper >
	) : (
		<Wrapper>
			<Button leftIcon={<Icon as={FaStrava} />} mt="6" colorScheme="orange" onClick={() => signIn('strava')}>Conectar com Strava</Button>
		</Wrapper>

	)
}

const Wrapper: React.FC<StackProps> = ({ children, ...rest }) => (
	< VStack
		w="100vw"
		h="100vh"
		align="center"
		justify="center"
		{...rest}
	>
		{ children}
	</VStack >
)

