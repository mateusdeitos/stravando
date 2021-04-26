import { GetStaticProps } from "next";
import React from "react";
import { Stats } from ".";
import { DistanceData } from "..";

const Demo = (data: DistanceData) => {
	return <Stats isDemo {...data} />
}

export const getStaticProps: GetStaticProps<DistanceData> = async (context) => {
	return {
		props: {
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
			},
			isDemo: true,
		}
	}
}

export default Demo;