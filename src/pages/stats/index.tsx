import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import { api, DataProps } from "../../../services/api";
import { StatsComponent, StatsProps } from "../../components/Stats";

const Stats = ({ data, notFound = false }: StatsProps) => {
	return (
		<>
			<StatsComponent data={data} notFound={notFound} />
		</>
	)
}

export const getServerSideProps: GetServerSideProps<StatsProps> = async (context) => {
	const session = await getSession(context);

	api.defaults.headers.authorization = `Bearer ${session.account.accessToken}`;
	const { data } = await api.get<DataProps>(`/athletes/${session.account.id}/stats`);
	if (!session && !data) {
		return {
			props: { data: null },
			notFound: true,
		}
	}

	return {
		props: {
			data: {
				bike: {
					biggest: (data.biggest_ride_distance || 0) / 1000,
					total: (data.all_ride_totals.distance || 0) / 1000,
				},
				running: {
					biggest: (data.biggest_run_distance || 0) / 1000,
					total: (data.all_run_totals.distance || 0) / 1000,
				},
				swimming: {
					biggest: (data.biggest_swim_distance || 0) / 1000,
					total: (data.all_swim_totals.distance || 0) / 1000,
				},
			}
		},
	}
}

export default Stats;