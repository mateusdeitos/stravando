import { useSession } from "next-auth/client"
import React from "react";
import { Header, UserHeader } from "../../components/Header";

const Stats = () => {
	const [session] = useSession();

	if (session) {
		return (
			<Header  />
		)
	}

	return (
		<></>
	)
}


export default Stats;