import { AzureFunction, Context, HttpRequest, HttpResponse } from "@azure/functions"
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import axios from "axios";

import renderArticle from "./template";

// Get Host header from azure function
function getHost(req: HttpRequest): string {
	if (req.headers && req.headers["host"]) {
		return req.headers["host"];
	}
	return "";
}

// normalize url
function normalizeURL(url: string): string {
	if (!url.startsWith("http")) {
		url = "http://" + url;
	}
	return url;
}

function rerouteLinks(html: JSDOM, url: string, base: string, https: boolean): void {
	const links = html.window.document.querySelectorAll("a");
	for (const link of links) {
		// check if link is relative
		if (link.href.startsWith("/")) {
			// set link to absolute
			link.href = url + link.href;
		}
		
		if (https) {
			link.href = `https://${base}/?q=${link.href}`;
		} else {
			link.href = `http://${base}/?q=${link.href}`;
		}

	}
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
	let url = req.query.q;
	if (!url) {
		context.res = {
			status: 400,
			body: "Please pass a url on the query string or in the request body. Example: https://read.jonot.me/?q=https://www.nytimes.com/2020/05/29/us/politics/trump-coronavirus.html"
		};
		return;
	}
	const response = await axios.get(normalizeURL(url));
	const body = response.data;
	const doc = new JSDOM(body);
	rerouteLinks(doc, normalizeURL(url), getHost(req), req.headers["x-forwarded-proto"] === "https");
	let reader = new Readability(doc.window.document);
	let article = reader.parse();
	if (article === null) {
		context.res = {
			status: 400,
			body: "Could not parse article :("
		};
		return
	}

	let res: HttpResponse = {
		body: renderArticle(article, url),
		headers: {
			"Content-Type": "text/html"
		}
	}
	context.res = res;

};

export default httpTrigger;
