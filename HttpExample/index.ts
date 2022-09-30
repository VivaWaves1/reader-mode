import { AzureFunction, Context, HttpRequest, HttpResponse } from "@azure/functions"
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import axios from "axios";

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

function rerouteLinks(html: JSDOM, url: string, base: string): void {
    const links = html.window.document.querySelectorAll("a");
    for (const link of links) {
        // check if link is relative
        if (link.href.startsWith("/")) {
            // set link to absolute
            link.href = url + link.href;
        }
        link.href = `http://${base}/?q=${link.href}`;

    }
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let url = req.query.q;
    if (!url) {
        context.res = {
            status: 400,
            body: "Please pass a url on the query string or in the request body. Example: http://read.jonot.me/?q=https://www.nytimes.com/2020/05/29/us/politics/trump-coronavirus.html"
        };
        return;
    }
    const response = await axios.get(normalizeURL(url));
    const body = response.data;
    const doc = new JSDOM(body);
    rerouteLinks(doc, normalizeURL(url), getHost(req));
    let reader = new Readability(doc.window.document);
    let article = reader.parse();
    if (article === null) {
        context.res = {
            status: 400,
            body: "Could not parse article :("
        };
        return
    }
    let template = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    body {
        max-width: 70ch;
        padding: 3em 1em;
        margin: auto;
        line-height: 1.75;
        font-size: 1.25em;
    }
    a {
        color: #08f;
    }
    img {
        width: 100%;
        height: auto;
    }
    @media (prefers-color-scheme: dark) {
        body {
            background-color: #222;
            color: #eee;
        }
        a {
            color: #9cf;
        }
    }
    </style>
    <title>${article.title || "Reader Mode"}</title>
    <base href="${url}"/>
</head>
<body>
    <h1>${article.title || ""}</h1>
    <h2>${article.byline || ""}</h2>
    ${article.content}
</body>
</html>`

    let res: HttpResponse = {
        body: template,
        headers: {
            "Content-Type": "text/html"
        }
    }
    context.res = res;

};

export default httpTrigger;
