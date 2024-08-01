import cors, { CorsOptions } from "cors";
import express from "express";

import { boot } from "./boot.js";
import { lowercaseParamsMiddleware } from "./middleware/lowerCase.js";

console.clear();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions: CorsOptions = {
	origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(lowercaseParamsMiddleware);

app.get("/", (req, res) => {
	res.send("CORS is enabled for all origins!");
});

async function main() {
	await boot(app);

	app.listen(PORT, () => {
		console.log(`\nServer is running on port ${PORT}`);
	});
}

main();
