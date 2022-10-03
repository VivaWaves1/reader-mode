import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import page from "./index.html"

const httpTrigger: AzureFunction = async function (
	context: Context,
	req: HttpRequest
): Promise<void> {
	// serve file
	context.res = {
		status: 200,
		body: page,
		headers: {
			"Content-Type": "text/html",
		},
	};
};

export default httpTrigger;
