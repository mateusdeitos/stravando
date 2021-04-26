import { Box, Heading, SimpleGrid, Stack, Flex, Icon, Image, Divider } from "@chakra-ui/react";
import { useSession } from "next-auth/client"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaBiking, FaRunning, FaSwimmer } from "react-icons/fa";
import { DistanceData } from "..";
import { PageWrapper } from "../../components/PageWrapper";
import { formatNumber } from "../../utils/format";

type StatsProps = DistanceData & { isDemo: boolean; };
type Modes = Record<keyof DistanceData, boolean>;

export const Stats = (data: StatsProps) => {
	const router = useRouter();
	const [session] = useSession();
	const [totalDistance, setTotalDistance] = useState(0);
	const [selectedModes, setSelectedModes] = useState<Modes>({ bike: true, running: true, swimming: true });

	useEffect(() => {
		if (!session && !data.isDemo) {
			router.push("/");
		}

		setTotalDistance(Object.entries(selectedModes).reduce((acc, [key, selected]) => {
			const val = selected ? (data[key].total || 0) : 0;
			return acc += val;
		}, 0));

	}, [session, router, data, selectedModes])


	return (
		<PageWrapper>
			<Heading fontSize="3rem">Quão longe já fui...</Heading>
			<Heading fontSize="0.75rem" fontWeight="normal">Obs: Clique nos ícones para remover algum modo do cálculo</Heading>
			<Stack direction="row">
				<FilterBadge selected={selectedModes.bike} total={data.bike.total} CustomIcon={FaBiking} onClick={() => setSelectedModes({ ...selectedModes, bike: !selectedModes.bike })} />
				<FilterBadge selected={selectedModes.running} total={data.running.total} CustomIcon={FaRunning} onClick={() => setSelectedModes({ ...selectedModes, running: !selectedModes.running })} />
				<FilterBadge selected={selectedModes.swimming} total={data.swimming.total} CustomIcon={FaSwimmer} onClick={() => setSelectedModes({ ...selectedModes, swimming: !selectedModes.swimming })} />
			</Stack>
			<Heading fontSize="2rem">{formatNumber(totalDistance)} km</Heading>
			<Divider margin="2rem 0	" />
			<SimpleGrid w="100%" columns={[1, 2]} gap="1rem">
				<ImageBlock image="/pool.svg" text="voltas em uma piscina olímpica" baseDistance={0.05} totalDistance={totalDistance} />
				<ImageBlock image="/track.svg" text="voltas em uma pista de corrida" baseDistance={0.4} totalDistance={totalDistance} />
				<ImageBlock image="/earth.svg" text="Tour de France finalizados" baseDistance={3470} totalDistance={totalDistance} />
				<ImageBlock image="/brasil.svg" text="vezes cruzando o Brasil de norte a sul" baseDistance={4320} totalDistance={totalDistance} />
				<ImageBlock image="/everest.svg" text="subidas no Monte Everest" baseDistance={8849} totalDistance={totalDistance} />
				<ImageBlock image="/earth.svg" text="voltas ao redor da Terra" baseDistance={40000} totalDistance={totalDistance} />
				<ImageBlock image="/moon.svg" text="viagens até a Lua" baseDistance={384400} totalDistance={totalDistance} />
			</SimpleGrid>
		</PageWrapper>
	)
}

interface FilterBadgeProps {
	total: number;
	CustomIcon: IconType;
	onClick: () => void;
	selected: boolean;
}

const FilterBadge = ({ total, CustomIcon, onClick, selected }: FilterBadgeProps) => {
	const color = selected ? "brand.700" : "brand.300";
	const onHoverColor = selected ? "brand.300" : "brand.700";
	return (
		<Flex bg={color} borderColor={color} borderWidth={3} _hover={{ borderColor: `${onHoverColor}`, transition: 'all 0.2s' }} as="button" onClick={onClick} p="1rem" minW="4rem" borderRadius="md" direction="column" w="100%" alignItems="center" justifyContent="center">
			<Icon as={CustomIcon} boxSize="10" />
			<Heading whiteSpace="nowrap" fontSize="1rem" mt="0.5rem">{formatNumber(total)} km</Heading>
		</Flex>
	)
}

interface ImageBlockProps {
	image: string;
	text: string;
	baseDistance: number;
	totalDistance: number;
}
const ImageBlock = ({ image, text, totalDistance, baseDistance }: ImageBlockProps) => {
	const distance = formatNumber(totalDistance / baseDistance);
	const formattedBaseDistance = baseDistance < 1 ? formatNumber(baseDistance * 1000) + 'm' : formatNumber(baseDistance) + 'km';
	return (
		<Box pos="relative" w="100%" bgColor="gray.700" borderRadius="xl">
			<Image src={image} alt={text} h="100%" w="100%" object-fit="cover" filter="brightness(50%)" />
			<Heading pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
				{distance} {text}
				<Heading fontSize="1rem" textAlign="center">({formattedBaseDistance})</Heading>
			</Heading>
		</Box>
	)
}

export default Stats;