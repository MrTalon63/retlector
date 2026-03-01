import Keyv from "keyv";
import { KeyvFile } from "keyv-file";
import KeyvRedis from "@keyv/redis";

import config from "./config";
import log from "./logger";

let kv: Keyv<any>;

if (config.redisUri) {
	log.info("Using Redis for key-value storage.");

	kv = new Keyv({
		store: new KeyvRedis(config.redisUri),
	});

	kv.on("error", (err) => {
		log.child(err).error("Keyv Redis error:");
	});
} else {
	log.info("Using file-based storage for key-value storage.");

	kv = new Keyv({
		store: new KeyvFile({
			filename: config.kvFile,
			writeDelay: 100,
		}),
	});

	kv.on("error", (err) => {
		log.child(err).error("Keyv File error:");
	});
}

export default kv;
