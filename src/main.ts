import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

import tleRoute from "./routes/tle";

import index from "./pub/index.html";
import config from "./utils/config";
import log from "./utils/logger";

new Elysia()
	// Use HTML plugin for rendering the index page
	.use(html())
	.get("/", () => index) // Serve index page

	// Subroutes registers
	.use(tleRoute) // Import TLE routes

	.listen(config.port, () => {
		log.info(`Server is running on port ${config.port}`);
	});
