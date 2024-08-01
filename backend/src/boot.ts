import * as dotenv from "dotenv";
import { Application } from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import { swaggerDocumentation } from "./documentation/swagger.js";
import DynamicRouter from "./routes/dynamicRoutes.js";

dotenv.config();

export async function boot(app: Application) {
	registerRoutes(app);
	await connectDatabase();
}

function registerRoutes(app: Application) {
	app.use("/route", DynamicRouter);
	app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));
}

async function connectDatabase() {
	try {
		await mongoose.connect(process.env.MONGO_URI as string);
		console.log("[✓] Connected to MongoDB");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}
function swaggerJsDoc(options: {
	swaggerDefinition: {
		info: { title: string; description: string; version: string };
		host: string;
		basePath: string;
	};
	apis: string[];
}) {
	throw new Error("Function not implemented.");
}
