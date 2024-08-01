import { NextFunction, Request, Response } from "express";

export const lowercaseParamsMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.query = Object.fromEntries(
		Object.entries(req.query).map(([key, value]) => [
			key.toLowerCase(),
			String(value).toLowerCase(),
		])
	);

	req.params = Object.fromEntries(
		Object.entries(req.params).map(([key, value]) => [
			key.toLowerCase(),
			String(value).toLowerCase(),
		])
	);

	if (req.body && typeof req.body === "object") {
		req.body = Object.fromEntries(
			Object.entries(req.body).map(([key, value]) => [
				key.toLowerCase(),
				typeof value === "string" ? value.toLowerCase() : value,
			])
		);
	}

	next();
};
