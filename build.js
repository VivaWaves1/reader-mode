const esbuild = require('esbuild');

/** @type esbuild.BuildOptions */
const buildOptions = {
    bundle: true,
    platform: "node",
    target: "node16",
    sourcemap: "linked",
    loader: {
        ".html": "text"
    },
    external: ["./node_modules/*"]
}

esbuild.build({ ...buildOptions, entryPoints: ['AboutPage/index.ts'], outfile: 'dist/AboutPage/index.js' }).catch(() => process.exit(1))
esbuild.build({ ...buildOptions, entryPoints: ['HttpExample/index.ts'], outfile: 'dist/HttpExample/index.js' }).catch(() => process.exit(1))