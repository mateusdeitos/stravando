import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { api, DataProps } from "../../services/api";
import { DistanceData } from "../pages";

interface StatsContextData {
	isLoading: boolean;
	stats: DistanceData;
	getDemoData: () => DistanceData;
}

const StatsContext = createContext<StatsContextData>({} as StatsContextData);

export const StatsProvider: React.FC = ({ children }) => {
	const router = useRouter();
	const [stats, setStats] = useState<DistanceData>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [session] = useSession();

	const loadData = async () => {
		try {
			setIsLoading(true);
			api.defaults.headers.authorization = `Bearer ${session.account.accessToken}`;
			const { data } = await api.get<DataProps>(`/athletes/${session.account.id}/stats`);
			setStats({
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
			});
			setIsLoading(false);
		} catch (error) {
			console.log(error.response);
			if (error.response.status === 401) {
				router.push('/redirect');
			}
		}
	}

	const getDemoData = () => {
		return {
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
		}
	}

	useEffect(() => {
		if (session) {
			loadData();
		} else {
			setStats(null);
		}
	}, [session])


	return <StatsContext.Provider value={{ isLoading, stats, getDemoData }}>
		{children}
	</StatsContext.Provider>
}

export const useStats = () => {
	return useContext(StatsContext);
}