import { Elysia } from "elysia";

import tleGetter from "../utils/tleGetter";
import limiter from "../utils/ratelimiter";

const noradRoute = new Elysia({ prefix: "/norad" })
	.use(limiter)
	.get("/:id", async ({ params }) => {
		const noradId = parseInt(params.id, 10);
		const tleData = await tleGetter(noradId);
		return new Response(tleData, { headers: { "Content-Type": "text/plain", "Cache-Control": "max-age=3600" } });
	});

export default noradRoute;
