import pino from "pino";

import config from "./config";

let transport: pino.DestinationStream;

if (config.lokiUri) {
	transport = pino.transport({
		target: "pino-loki",
		options: {
			host: config.lokiUri,
			basicAuth: config.lokiAuth,
			labels: { app: "retlector" },
			json: true,
		},
	});
} else {
	transport = pino.transport({
		target: "pino-pretty",
		options: {
			colorize: true,
			translateTime: "yyyy-mm-dd HH:MM:ss.l o",
			ignore: "pid,hostname",
		},
	});
}

const log = pino({ level: config.logLevel }, transport);

if (config.lokiUri) {
	log.info("Logging to Loki at " + config.lokiUri);
} else {
	log.info("Logging to console");
}

export default log;
