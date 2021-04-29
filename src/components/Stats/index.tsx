import { Box, Heading, SimpleGrid, Stack, Icon, Image, Divider, Spinner, Switch, FormControl, FormLabel, IconButton, useBreakpointValue, IconButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaBiking, FaRunning, FaShare, FaShareAlt, FaSwimmer } from "react-icons/fa";
import { IconType } from "react-icons";
import { DistanceData } from "../../pages";
import { formatNumber } from "../../utils/format";

export interface StatsProps {
	data: DistanceData;
	notFound?: boolean;
}

type Modes = Record<keyof DistanceData, boolean>;

export const StatsComponent = ({ data, notFound = false }: StatsProps) => {
	const router = useRouter();
	const [totalDistance, setTotalDistance] = useState(0);
	const [selectedModes, setSelectedModes] = useState<Modes>({ bike: true, running: true, swimming: true });

	useEffect(() => {
		if (notFound) {
			router.push("/");
		}

		if (data) {
			setTotalDistance(Object.entries(selectedModes).reduce((acc, [key, selected]) => {
				const val = selected ? (data[key].total || 0) : 0;
				return acc += val;
			}, 0));
		}

	}, [notFound, router, data, selectedModes])

	const selectedModesString = () => {
		const map = {
			bike: 'Bike',
			running: 'Correndo',
			swimming: 'Nadando'
		}
		return Object.keys(map).filter(mode => selectedModes[mode]).map(mode => map[mode]).join(" + ");
	}

	if (router.isFallback) {
		return (
			<Spinner />
		)
	}

	return (
		data ? (
			<>
				<Heading fontSize={["1.5rem", "3rem"]}>Meus stats...</Heading>
				<Stack direction={["column", "row"]} spacing={["0.5rem", "1rem"]} mt="1rem" w="100%" alignItems="center" justifyContent="center">
					<FilterBadge id="filter-badge-stats-bike" selected={selectedModes.bike} total={data?.bike?.total || 0} CustomIcon={FaBiking} onClick={() => setSelectedModes({ ...selectedModes, bike: !selectedModes.bike })} />
					<FilterBadge id="filter-badge-stats-running" selected={selectedModes.running} total={data?.running?.total || 0} CustomIcon={FaRunning} onClick={() => setSelectedModes({ ...selectedModes, running: !selectedModes.running })} />
					<FilterBadge id="filter-badge-stats-swimming" selected={selectedModes.swimming} total={data?.swimming?.total || 0} CustomIcon={FaSwimmer} onClick={() => setSelectedModes({ ...selectedModes, swimming: !selectedModes.swimming })} />
				</Stack>
				<Heading fontSize="0.75rem" fontWeight="normal" mt="0.5rem">Total</Heading>
				<Heading fontSize={["1.25rem", "2rem"]} textAlign="center" >{formatNumber(totalDistance)} km</Heading>
				<Heading fontSize="0.75rem" fontWeight="normal">{selectedModesString()}</Heading>
				<Divider mt="1rem" />
				<Heading fontSize={["1rem", "1.5rem"]} fontWeight="600" mt="1rem">Com essa distância você já fez:</Heading>
				<SimpleGrid w="100%" columns={[1, 2]} gap="1rem" mt="1rem">
					<ImageBlock image="/pool.svg" text="voltas em uma piscina olímpica" baseDistance={0.05} totalDistance={totalDistance} />
					<ImageBlock image="/track.svg" text="voltas em uma pista de corrida" baseDistance={0.4} totalDistance={totalDistance} />
					<ImageBlock image="/tour-france.svg" text="Tour de France finalizados" baseDistance={3470} totalDistance={totalDistance} />
					<ImageBlock image="/brasil.svg" text="vezes cruzando o Brasil de norte a sul" baseDistance={4320} totalDistance={totalDistance} />
					<ImageBlock image="/everest.svg" text="subidas no Monte Everest" baseDistance={8849} totalDistance={totalDistance} />
					<ImageBlock image="/earth.svg" text="voltas ao redor da Terra" baseDistance={40000} totalDistance={totalDistance} />
					<ImageBlock image="/moon.svg" text="viagens até a Lua" baseDistance={384400} totalDistance={totalDistance} />
				</SimpleGrid>
			</>
		) : (
			<Spinner />
		)

	)
}

interface FilterBadgeProps {
	id: string;
	total: number;
	CustomIcon: IconType;
	onClick: () => void;
	selected: boolean;
}

const FilterBadge = ({ id, total, CustomIcon, onClick, selected }: FilterBadgeProps) => {
	const color = selected ? "brand.700" : "brand.300";
	const onHoverColor = selected ? "brand.300" : "brand.700";
	const formattedTotal = formatNumber(total);
	return (
		<Stack
			id={id}
			direction={["row", "column"]}
			spacing={["1rem"]}
			data-gtm={id}
			bg={color}
			borderColor={color}
			borderWidth={3}
			_hover={{ borderColor: `${onHoverColor}`, transition: 'all 0.2s' }}
			p={["0.5rem", "1rem"]}
			minW="4rem"
			borderRadius="md"
			w={["100%", "unset"]}
			alignItems="center"
			justifyContent="center"
		>
			<Icon as={CustomIcon} data-gtm={id} boxSize="10" />
			<Heading data-gtm={id} whiteSpace={["nowrap", "nowrap"]} fontSize={["0.75rem", "1rem"]}>{formattedTotal} km</Heading>
			<FormControl d="flex" flexDirection="row-reverse" alignItems="center" justifyContent="flex-start">
				<FormLabel cursor="pointer" htmlFor={`switch-${id}`} ml="0.5rem" mb="0" fontSize={["0.75rem", "1rem"]}>considerar?</FormLabel>
				<Switch id={`switch-${id}`} data-gtm={id} onChange={onClick} size="sm" colorScheme="gray" defaultChecked />
			</FormControl>
		</Stack>
	)
}
interface ImageBlockProps {
	image: string;
	text: string;
	baseDistance: number;
	totalDistance: number;
}

const ImageBlock = ({ image, text, totalDistance, baseDistance }: ImageBlockProps) => {
	const isWideVersion = useBreakpointValue({ base: false, lg: true });
	const distance = formatNumber(totalDistance / baseDistance);
	const formattedBaseDistance = baseDistance < 1 ? formatNumber(baseDistance * 1000) + 'm' : formatNumber(baseDistance) + 'km';

	return (
		<Box pos="relative" w="100%" bgColor="gray.700" borderRadius="xl">
			<Image src={image} alt={text} h="100%" w="100%" object-fit="cover" filter="brightness(50%)" />
			<Heading fontSize={["1.25rem", "1.25rem", "2.25rem"]} pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
				{distance} {text}
				<Heading as="p" fontSize="1rem" textAlign="center">({formattedBaseDistance})</Heading>
			</Heading>
			<ShareButton pos="absolute" bottom="0%" aria-label="Compartilhar" text={`${distance} ${text}`} />
		</Box>
	)
}

interface ShareButtonProps extends IconButtonProps {
	text: string;
	url?: string;
}

const ShareButton = ({ text, url = process.env.NEXT_PUBLIC_APP_URL, ...rest }: ShareButtonProps) => {
	const handleShare = () => {
		if (navigator.share) {
			navigator
				.share({
					title: "Meus stats no Stravando",
					text: `Olha que top, fiz ${text}!`,
					url,
				})
				.then(() => {
					console.log('Successfully shared');
				})
				.catch(error => {
					console.error('Something went wrong sharing the blog', error);
				});
		}
	}
	return (
		<IconButton
			{...rest}
			borderColor="brand.800"
			borderWidth={1}
			colorScheme="brand"
			icon={<Icon as={FaShareAlt} />}
			aria-label="Compartilhar"
			data-gtm="share-button"
			onClick={handleShare}
		/>
	);
}