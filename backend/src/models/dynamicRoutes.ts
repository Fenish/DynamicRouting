import { model, Schema } from "mongoose";

const routesSchema = new Schema({
	endpoint: {
		type: String,
		required: true,
	},
	component: {
		type: String,
		required: true,
		unique: true,
	},
});

const schema = model("dynamicRoutes", routesSchema);
export default schema;
