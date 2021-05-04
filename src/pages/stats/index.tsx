import { transition } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DistanceData } from "..";
import { PageWrapper } from "../../components/PageWrapper";
import { StatsComponent } from "../../components/Stats";

const Stats = () => {
	const router = useRouter();
	const [session] = useSession();
	const [data, setData] = useState<DistanceData>(null)
	useEffect(() => {
		if (session) {
			axios.get<DistanceData>(`${process.env.NEXT_PUBLIC_APP_URL}/api/athlete/${session.account.id}`, 
				{
					headers: {
						authorization: `Bearer ${session.account.accessToken}`
					}
				})
				.then(({ data }) => setData(data))
				.catch(error => {
					console.log('deu erro', {error})
					let destination = "/";
					if (error?.isAxiosError && error.response.status === 401) {
						destination = "/redirect";
					}

					if (error?.isAxiosError && error.response.status === 429) {
						destination = "/too-many-requests";
					}
					router.push(destination);

				})
		}
	}, [session])

	if (data) {
		return (
			<PageWrapper title="Home | Stravando">
				<StatsComponent data={data} />
			</PageWrapper>
		)
	}

	return (
		<PageWrapper title="Home | Stravando">
			<Spinner />
		</PageWrapper>
	)
}
export default Stats;