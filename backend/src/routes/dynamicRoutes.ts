import { Request, Response, Router } from "express";

import dynamicRoutes from "../models/dynamicRoutes.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
	const routes = await dynamicRoutes.find();
	const mappedRoutes = routes.map((r) => {
		return {
			endpoint: r.endpoint,
			component: r.component,
		};
	});
	return res.send({
		code: 200,
		data: mappedRoutes,
	});
});

router.post("/", async (req: Request, res: Response) => {
	if (!req.body || !req.body.endpoint || !req.body.component) {
		return res.status(400).send({
			code: 400,
			message: "Bad request, missing arguments",
		});
	}
	const { endpoint, component } = req.body;

	if (await checkEndpoint(endpoint)) {
		return res.status(409).send({
			code: 409,
			message: "Endpoint already exists",
		});
	}

	if (await checkComponent(component)) {
		return res.status(409).send({
			code: 409,
			message: "Component already exists",
		});
	}

	await dynamicRoutes.create({ endpoint, component });
	return res.send({
		code: 200,
		message: "Route created successfully",
	});
});

router.put("/", async (req: Request, res: Response) => {
	if (!req.body || !req.body.endpoint || !req.body.component) {
		return res.status(400).send({
			code: 400,
			message: "Bad request, missing arguments",
		});
	}
	const { endpoint, component } = req.body;

	if (!(await checkComponent(component))) {
		return res.status(409).send({
			code: 404,
			message: "Component not found",
		});
	}

	await dynamicRoutes.updateOne({ component }, { endpoint });
	return res.send({
		code: 200,
		message: "Route updated successfully",
	});
});

router.get("/:endpoint", async (req: Request, res: Response) => {
	const { endpoint } = req.params;

	if (!(await checkEndpoint(endpoint))) {
		return res.status(404).send({
			code: 404,
			message: "Endpoint not found",
		});
	}

	const data = await dynamicRoutes.findOne({ endpoint });
	return res.send({
		code: 200,
		data: {
			endpoint: data?.endpoint,
			component: data?.component,
		},
	});
});

router.delete("/:endpoint", async (req: Request, res: Response) => {
	const { endpoint } = req.params;

	if (!(await checkEndpoint(endpoint))) {
		return res.status(404).send({
			code: 404,
			message: "Endpoint not found",
		});
	}

	await dynamicRoutes.deleteOne({ endpoint });
	return res.send({
		code: 200,
		message: "Route deleted successfully",
	});
});

async function checkEndpoint(endpoint: string) {
	const data = await dynamicRoutes.findOne({
		endpoint: endpoint,
	});

	return !!data;
}

async function checkComponent(component: string) {
	const data = await dynamicRoutes.findOne({
		component: component,
	});

	return !!data;
}

export default router;
