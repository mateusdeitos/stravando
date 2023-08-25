import { NextApiRequest, NextApiResponse } from "next";
import { CacheInMemory } from "./CacheInMemory";

export const cacheRoute = (
	callback: (
		cache: CacheInMemory,
		req: NextApiRequest,
		res: NextApiResponse
	) => Promise<void>
) => {
	const cache = CacheInMemory.getInstance();

	return async (req: NextApiRequest, res: NextApiResponse) => {
		return callback(cache, req, res);
	};
};
