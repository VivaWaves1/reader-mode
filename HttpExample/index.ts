import { AzureFunction, Context, HttpRequest, HttpResponse } from "@azure/functions"
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import axios from "axios";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let url = req.query.q || (req.body && req.body.url);
    console.log(url);
    const response = await axios.get(url);
    const body = response.data;
    const doc = new JSDOM(body);
    let reader = new Readability(doc.window.document);
    let article = reader.parse();
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
    <title>Document</title>
</head>
<body>
    <h1>${article.title}</h1>
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