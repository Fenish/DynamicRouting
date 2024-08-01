import { JsonObject } from "swagger-ui-express";

export const swaggerDocumentation: JsonObject = {
	swagger: "2.0",
	info: {
		version: "1.0.0",
		title: "Dynamic Routes API",
		description: "API documentation for Dynamic Routes",
	},
	paths: {
		"/route": {
			get: {
				summary: "Get all dynamic routes",
				responses: {
					200: {
						description: "Returns routes that have been created",
					},
				},
			},

			post: {
				summary: "Create a new dynamic route",
				consumes: ["application/json"],
				responses: {
					200: {
						description: "Route created",
					},
				},
				parameters: [
					{
						in: "body",
						name: "body",
						type: "object",
						required: true,
						properties: {
							endpoint: {
								type: "string",
							},
							component: {
								type: "string",
							},
						},
					},
				],
			},
		},

		"/route/{routeName}": {
			get: {
				summary: "Get a dynamic route",
				responses: {
					200: {
						description: "Returns a single route",
					},
				},
				parameters: [
					{
						name: "routeName",
						in: "path",
						required: true,
						type: "string",
					},
				],
			},
			delete: {
				summary: "Delete a dynamic route",
				responses: {
					200: {
						description: "Route deleted",
					},
				},
				parameters: [
					{
						name: "routeName",
						in: "path",
						required: true,
						type: "string",
					},
				],
			},
			put: {
				summary: "Update a dynamic route",
				consumes: ["application/json"],
				responses: {
					200: {
						description: "Route updated",
					},
				},
				parameters: [
					{
						name: "routeName",
						in: "path",
						required: true,
						type: "string",
					},
					{
						in: "body",
						name: "body",
						type: "object",
						required: true,
						properties: {
							endpoint: {
								type: "string",
							},
							component: {
								type: "string",
							},
						},
					},
				],
			},
		},
	},
};
