interface Article {
	title: string;
	byline: string;
	dir: string;
	content: string;
	textContent: string;
	length: number;
	excerpt: string;
	siteName: string;
}

// Put article into template
function renderArticle(article: Article, url: string): string {
	return `
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
}

export default renderArticle;