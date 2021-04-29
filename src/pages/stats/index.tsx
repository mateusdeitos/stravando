import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import { api, DataProps } from "../../../services/api";
import { PageWrapper } from "../../components/PageWrapper";
import { StatsComponent, StatsProps } from "../../components/Stats";

const Stats = ({ data, notFound = false }: StatsProps) => {
	return (
		<PageWrapper title="Home | Stravando">
			<StatsComponent data={data} notFound={notFound} />
		</PageWrapper>
	)
}

export const getServerSideProps: GetServerSideProps<StatsProps> = async (context) => {
	const session = await getSession(context);

	api.defaults.headers.authorization = `Bearer ${session.account.accessToken}`;
	try {
		const { data } = await api.get<DataProps>(`/athletes/${session.account.id}/stats`);
		if (!data) {
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
	} catch (error) {
		let destination = "/";
		if (error.statusCode === 401) {
			destination = "/redirect";
		}

		if (error.statusCode === 429) {
			destination = "/too-many-requests";
		}

		return {
			props: { data: null },
			redirect: {
				destination,
				permanent: false,
			}
		}
	}
}

export default Stats;