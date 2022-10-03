let page = `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>About this Site</title>
	<style>
		body {
			margin: 0;
            font-family: sans-serif;
		}

		.search {
			width: 100%;
			box-sizing: border-box;
			height: 50vh;
			background: rgb(16, 137, 107);
			background: linear-gradient(-45deg, rgba(16, 137, 107) 0%, rgba(100, 185, 176, 1) 50%, rgba(183, 232, 246, 1) 100%);
			display: flex;
			justify-content: center;
			align-items: center;
		}

		form {
			width: calc(100% - 10vw);
			height: 50px;
			border-radius: 10px;
			display: grid;
			grid-template-columns: 4fr 1fr;
			gap: 20px;
		}

		.sbox {
			width: 100%;
			border-radius: 10px;
			border: none;
			font-size: 1.2rem;
			outline: none;
			padding-left: 10px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
			transition: all 0.3s ease;
		}

		.sbox:hover {
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
		}

		.ssub {
			width: 100%;
			height: 100%;
			border-radius: 10px;
			border: none;
			background: rgb(16, 137, 107);
			color: white;
			font-size: 1.2rem;
			outline: none;
			cursor: pointer;
			font-weight: bold;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
			transition: all 0.3s ease;
		}

		.ssub:hover {
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
		}

		.content {
			width: 80%;
			margin: 0 auto;
		}

		a {
			color: rgb(16, 137, 107);
		}

		.links {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 20px 0;
		}

		.feather-github {
			height: 1em;
			width: auto;
		}

        ::selection {
            background: rgba(100, 185, 176);
            color: white;
        }
	</style>
</head>

<body>
	<div class="search">
		<form action="/">
			<input class="sbox" type="text" name="q" placeholder="Type an article URL here…" />
			<input class="ssub" type="submit" value="Read It!" />
		</form>
	</div>
	<div class="content">
		<h1>What is this?</h1>
		<p>Imagine this: You are browsing the internet and you see an interesting article. You click it, to see the
			details. You wait for a whole minute for this page to load. Once it finally loads, a box pops up, asking for
			your permission to accept cookies. You're concerned about your privacy, but you know that rejecting will
			just bring you to another menu, and you don't want to put in the mental effort. So you click accept, and
			start reading. The page lags as you scroll like you're dragging the scroll-bar across jaggged rocks. Ads jump out at you everywhere, covering half of your page.</p>
		<p>And then, the words fade away. You're out of free articles. You need an account to read more. At this point,
			you close the tab out of frustration, and go do <a title="Random XKCD Comic"
				href="https://c.xkcd.com/random/comic/">something else</a> with your time.</p>
		<p>But there's a better way. Just add <strong>read.jonot.me/?q=</strong> before the URL, and all that
			distracting stuff will go away.</p>
		<h1>Why am I Here?</h1>
		<p>There are multiple reasons that you could have been linked here:</p>
		<ul>
			<li>You typed the url wrong</li>
			<li>You didn't add a url to search</li>
			<li>Someone linked you here, in which case you probably aren't asking this.</li>
		</ul>
		<p>Anyways, make sure that you formatted the url as said above. Or just use the nifty form at the top of the page. It's big and green, pretty hard to miss</p>
	</div>
	<div class="links">
		<a href="https://github.com/jonot-cyber/reader-mode"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
		Get the source code</a>
	</div>
</body>

</html>`

export default page;