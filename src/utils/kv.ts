import Keyv from "keyv";
import { KeyvFile } from "keyv-file";
import KeyvRedis from "@keyv/redis";

import log from "./logger";

let kv: Keyv<any>;

if (process.env.REDIS_URI) {
	log.info("Using Redis for key-value storage.");

	kv = new Keyv({
		store: new KeyvRedis(process.env.REDIS_URL),
	});

	kv.on("error", (err) => {
		log.error(`Keyv Redis error: ${err}`);
	});
} else {
	log.info("Using file-based storage for key-value storage.");

	kv = new Keyv({
		store: new KeyvFile({
			filename: process.env.KV_FILE || "./data/kv.json",
			writeDelay: 100,
		}),
	});

	kv.on("error", (err) => {
		log.error(`Keyv File error: ${err}`);
	});
}

export default kv;
