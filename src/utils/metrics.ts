import prom from "prom-client";

import log from "./logger";

if (process.env.ENABLE_METRICS === "true") {
	log.info("Metrics collection enabled.");

	const collectDefaultMetrics = prom.collectDefaultMetrics;
	const register = new prom.Registry();
	collectDefaultMetrics({
		register,
	});
}

export default { prom, register: prom.register };
