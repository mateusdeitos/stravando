import { Stat, StatLabel, StatNumber, Spinner, VStack } from "@chakra-ui/react";
import axios from "axios";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"

interface SummaryProps {
	fetchUrl: string;
}

interface DataProps {
	biggest_ride_distance: number;
	all_ride_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	all_run_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	all_swim_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	biggest_climb_elevation_gain: number | null;
	recent_ride_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	recent_run_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	recent_swim_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	ytd_ride_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	ytd_run_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
	ytd_swim_totals: { count: number; distance: number; moving_time: number; elapsed_time: number; elevation_gain: number; };
}

export const Summary = ({ fetchUrl }: SummaryProps) => {
	const router = useRouter();
	const [data, setData] = useState<DataProps>({} as DataProps);
	const [isLoading, setIsLoading] = useState(true);
	const [session] = useSession();
	useEffect(() => {
		const getUserStats = async () => {
			try {
				const response = await axios.get(`https://www.strava.com/${fetchUrl}`, {
					headers: {
						Authorization: `Bearer ${session.account.accessToken}`
					}
				})

				console.log(response.data);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				const { url } = await signOut({ callbackUrl: '/', redirect: false })
				router.replace(url);
			}
		}

		if (isLoading) {
			getUserStats();
		};

	}, [isLoading, fetchUrl, session.account.accessToken, router]);

	return (
		<>
			{!isLoading ? (
				<VStack d="flex" maxW={700} direction="column">
					<Stat flex="1" w="100%">
						<StatLabel>Maior distância percorrida de bike</StatLabel>
						<StatNumber>{data.biggest_ride_distance / 1000} km</StatNumber>
					</Stat>
					<Stat flex="1" w="100%">
						<StatLabel>Distância total de bike</StatLabel>
						<StatNumber>{data.all_ride_totals.distance / 1000} km</StatNumber>
					</Stat>
				</VStack>
			) : <Spinner />}
		</>
	)
}