import Head from "next/head"
import React from "react";
import { Stats } from ".";

const Demo = () => {
	return (
		<>
			<Head>
				<title>Demo | Stravando</title>
			</Head>
			<Stats isDemo />
		</>
	)
}

export default Demo;