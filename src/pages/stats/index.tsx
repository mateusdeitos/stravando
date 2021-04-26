import { Box, Heading, SimpleGrid, Stack, Flex, Icon, Image, Divider, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/client"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaBiking, FaRunning, FaSwimmer } from "react-icons/fa";
import { DistanceData } from "..";
import { PageWrapper } from "../../components/PageWrapper";
import { useStats } from "../../contexts/StatsContext";
import { formatNumber } from "../../utils/format";

type StatsProps = { isDemo: boolean; };
type Modes = Record<keyof DistanceData, boolean>;

export const Stats = ({ isDemo = false }: StatsProps) => {
	const router = useRouter();
	const [session] = useSession();
	const { isLoading, stats, getDemoData } = useStats();
	const [data] = useState(() => isDemo ? getDemoData() : stats);
	const [totalDistance, setTotalDistance] = useState(0);
	const [selectedModes, setSelectedModes] = useState<Modes>({ bike: true, running: true, swimming: true });

	useEffect(() => {
		if (!session && !isDemo) {
			router.push("/");
		}

		if (data) {
			setTotalDistance(Object.entries(selectedModes).reduce((acc, [key, selected]) => {
				const val = selected ? (data[key].total || 0) : 0;
				return acc += val;
			}, 0));
		}

	}, [session, router, isDemo, data, isLoading, selectedModes])

	const selectedModesString = () => {
		const map = {
			bike: 'Bike',
			running: 'Correndo',
			swimming: 'Nadando'
		}
		return Object.keys(map).filter(mode => selectedModes[mode]).map(mode => map[mode]).join(" + ");
	}

	return (
		<PageWrapper>
			<Heading fontSize={["1.5rem", "3rem"]}>Quão longe já fui...</Heading>
			<Stack direction="row" spacing={["1"]}>
				{data && (
					<>
						<FilterBadge selected={selectedModes.bike} total={data?.bike?.total || 0} CustomIcon={FaBiking} onClick={() => setSelectedModes({ ...selectedModes, bike: !selectedModes.bike })} />
						<FilterBadge selected={selectedModes.running} total={data?.running?.total || 0} CustomIcon={FaRunning} onClick={() => setSelectedModes({ ...selectedModes, running: !selectedModes.running })} />
						<FilterBadge selected={selectedModes.swimming} total={data?.swimming?.total || 0} CustomIcon={FaSwimmer} onClick={() => setSelectedModes({ ...selectedModes, swimming: !selectedModes.swimming })} />
					</>
				)}
			</Stack>
			<Heading fontSize={["1.5rem", "2rem"]} textAlign="center">{formatNumber(totalDistance)} km</Heading>
			<Heading fontSize="0.75rem" fontWeight="normal">{selectedModesString()}</Heading>
			<Divider margin="2rem 0	" />
			<Heading fontSize="1.5rem" fontWeight="600" mb="2rem">Com essa distância você já fez:</Heading>
			{isLoading ? (
				<Spinner />
			) : (
				<SimpleGrid w="100%" columns={[1, 2]} gap="1rem">
					<ImageBlock image="/pool.svg" text="voltas em uma piscina olímpica" baseDistance={0.05} totalDistance={totalDistance} />
					<ImageBlock image="/track.svg" text="voltas em uma pista de corrida" baseDistance={0.4} totalDistance={totalDistance} />
					<ImageBlock image="/earth.svg" text="Tour de France finalizados" baseDistance={3470} totalDistance={totalDistance} />
					<ImageBlock image="/brasil.svg" text="vezes cruzando o Brasil de norte a sul" baseDistance={4320} totalDistance={totalDistance} />
					<ImageBlock image="/everest.svg" text="subidas no Monte Everest" baseDistance={8849} totalDistance={totalDistance} />
					<ImageBlock image="/earth.svg" text="voltas ao redor da Terra" baseDistance={40000} totalDistance={totalDistance} />
					<ImageBlock image="/moon.svg" text="viagens até a Lua" baseDistance={384400} totalDistance={totalDistance} />
				</SimpleGrid>
			)}
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
	const { isLoading } = useStats();
	const color = selected ? "brand.700" : "brand.300";
	const onHoverColor = selected ? "brand.300" : "brand.700";
	const formattedTotal = formatNumber(total);
	return (
		<Flex bg={color} borderColor={color} borderWidth={3} _hover={{ borderColor: `${onHoverColor}`, transition: 'all 0.2s' }} as="button" onClick={onClick} p="1rem" minW="4rem" borderRadius="md" direction="column" w="100%" alignItems="center" justifyContent="center">
			<Icon as={CustomIcon} boxSize="10" />
			{isLoading ? <Spinner /> : <Heading whiteSpace={["normal", "nowrap"]} fontSize={["0.75rem", "1rem"]} mt="0.5rem">{formattedTotal} km</Heading>}
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
			<Heading fontSize={["1.25rem", "1.25rem", "2.25rem"]} pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
				{distance} {text}
				<Heading as="p" fontSize="1rem" textAlign="center">({formattedBaseDistance})</Heading>
			</Heading>
		</Box>
	)
}

export default Stats;