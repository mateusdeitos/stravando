import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import { DistanceData } from "..";
import { PageWrapper } from "../../components/PageWrapper";
import { StatsComponent, StatsProps } from "../../components/Stats";

const Stats = ({ data, notFound = false, error }: StatsProps) => {
	console.log(error);
	return (
		<PageWrapper title="Home | Stravando">
			<StatsComponent data={data} notFound={notFound} />
		</PageWrapper>
	)
}

export const getServerSideProps: GetServerSideProps<StatsProps> = async (context) => {
	const session = await getSession(context);

	try {
		const { data } = await axios.get<DistanceData>(`${process.env.NEXTAUTH_URL}/api/athlete?id=${session.account.id}&accessToken=${session.account.accessToken}&name=${session.user.name}`)
		if (!data) {
			return {
				props: { data: null },
				notFound: true,
			}
		}

		return {
			props: {
				data
			},
		}
	} catch (error) {
		console.log('deu erro', error.statusCode)
		let destination = "/";
		if (error.statusCode === 401) {
			destination = "/redirect";
		}

		if (error.statusCode === 429) {
			destination = "/too-many-requests";
		}

		return {
			props: { data: null, error },
			redirect: {
				destination,
				permanent: false,
			}
		}
	}
}

export default Stats;