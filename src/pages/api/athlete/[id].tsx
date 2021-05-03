import dbConnect from "../../../utils/mongodb";
import Athlete from "../../../models/Athlete";
import { api, DataProps } from "../../../../services/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {

	const dataExpired = (timestamp: number) => {
		return (Date.now() - timestamp) / (1000 * 60 * 60) > 24 || !timestamp;
	}

	const formatData = (data) => {
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
		}
	}
	try {
		const { id } = req.query;
		const accessToken = req.headers.authorization;

		await dbConnect().then(() => console.log('conectou no db dentro da api routes'))
		const athlete = await Athlete.findOne({ idUser: id });
		if (!dataExpired(athlete?.updated_at)) {
			console.log('retornou dados do mongodb', athlete)
			return res.status(200).json({
				bike: {
					biggest: athlete?.bike_biggest || 0,
					total: athlete?.bike_total || 0,
				},
				running: {
					biggest: athlete?.run_biggest || 0,
					total: athlete?.run_total || 0,
				},
				swimming: {
					biggest: athlete?.swim_biggest || 0,
					total: athlete?.swim_total || 0,
				}
			});
		}

		api.defaults.headers.authorization = accessToken;
		const { data } = await api.get<DataProps>(`/athletes/${id}/stats`);
		if (!data) {
			return res.status(404).send({ message: "Athlete not found" });
		}

		const formattedData = formatData(data);

		await Athlete.updateOne({
			idUser: id
		}, {
			name,
			idUser: id,
			bike_total: formattedData.bike.total,
			bike_biggest: formattedData.bike.biggest,
			run_total: formattedData.run.total,
			run_biggest: formattedData.run.biggest,
			swim_total: formattedData.swim.total,
			swim_biggest: formattedData.swim.biggest,
			updated_at: Date.now()
		}, {
			upsert: true,
		})
		console.log('retornou da api do strava')
		res.status(200).json(formattedData);
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
}