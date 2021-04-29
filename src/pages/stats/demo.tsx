import { GetStaticProps } from "next";
import React from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { StatsComponent, StatsProps } from "../../components/Stats";

const Demo = ({ data, notFound = false }: StatsProps) => {
	return (
		<PageWrapper title="Demo | Stravando">
			<StatsComponent data={data} notFound={notFound} />
		</PageWrapper>
	)
}

export const getStaticProps: GetStaticProps<StatsProps> = async () => {
	return {
		props: {
			data: {
				bike: {
					biggest: 118.54,
					total: 1230123.55,
				},
				running: {
					biggest: 34.98,
					total: 35011.76
				},
				swimming: {
					biggest: 10.54,
					total: 501.31
				}
			}
		},
	}
}

export default Demo;