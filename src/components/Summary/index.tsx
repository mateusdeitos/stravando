import { Spinner, VStack, Flex, Icon, Heading, Text, Stack } from "@chakra-ui/react";
import React from "react"
import { FaBiking, FaRunning, FaSwimmer } from "react-icons/fa";
import { DistanceData } from "../../pages";
import { formatNumber } from "../../utils/format";

type Props = {
	isLoading: boolean;
} & DistanceData;

export const Summary = ({ bike, running, swimming, isLoading }: Props) => {
	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<Stack direction={["column", "row"]}>
				<SummaryCard type="bike" biggest={bike.biggest} total={bike.total} />
				<SummaryCard type="running" biggest={running.biggest} total={running.total} />
				<SummaryCard type="swimming" biggest={swimming.biggest} total={swimming.total} />
			</Stack>
		</>
	)
}

interface CardProps {
	biggest: number;
	total: number;
	type: 'running' | 'bike' | 'swimming';
}

const SummaryCard = ({ biggest = 0, total = 0, type }: CardProps) => {
	const CardIcon = {
		bike: FaBiking,
		swimming: FaSwimmer,
		running: FaRunning,
	}[type];
	
	return (
		<Flex p="1rem" bg="brand.300" borderRadius="md" direction="row" w="100%" alignItems="center">
			<Icon as={CardIcon} boxSize="20" />
			<VStack ml="1rem">
				<Flex direction="column" width="100%">
					<Text>Maior distância percorrida</Text>
					<Heading>{formatNumber(biggest)} km</Heading>
				</Flex>
				<Flex direction="column" width="100%">
					<Text>Distância total</Text>
					<Heading>{formatNumber(total)} km</Heading>
				</Flex>
			</VStack>
		</Flex>
	)
}