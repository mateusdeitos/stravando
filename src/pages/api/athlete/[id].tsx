import { api, DataProps } from "../../../../services/api";
import { NextApiRequest, NextApiResponse } from "next";
import { CacheInMemory } from "../../../utils/CacheInMemory";

type Stat = {
	biggest: number;
	total: number;
};

type Stats = Record<"bike" | "run" | "swim", Stat>;

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const formatData = (data): Stats => {
		return {
			bike: {
				biggest: (data.biggest_ride_distance || 0) / 1000,
				total: (data.all_ride_totals.distance || 0) / 1000,
			},
			run: {
				biggest: (data.biggest_run_distance || 0) / 1000,
				total: (data.all_run_totals.distance || 0) / 1000,
			},
			swim: {
				biggest: (data.biggest_swim_distance || 0) / 1000,
				total: (data.all_swim_totals.distance || 0) / 1000,
			},
		};
	};
	try {
		const { id } = req.query;
		const accessToken = req.headers.authorization;

		const cache = CacheInMemory.getInstance();
		const key = `/athletes/${id}/stats`;
		let stats: Stats = cache.get<Stats>(key);
		if (!stats) {
			api.defaults.headers.authorization = accessToken;
			const { data } = await api.get<DataProps>(key);
			if (!data) {
				return res.status(404).send({ message: "Athlete not found" });
			}

			stats = formatData(data);
			cache.set(key, stats);
			console.log("retornou da api do strava");
		} else {
			console.log("achou no cache");
		}

		res.status(200).json(stats);
	} catch (error) {
		console.log(error);
		if (error?.isAxiosError) {
			res.status(error.response.status).send(error);
		} else {
			res.status(400).send(error);
		}
	}
};
