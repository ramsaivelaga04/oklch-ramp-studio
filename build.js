/* Generates the standalone index.html from the artifact source.
   The artifact host supplies a doctype/head skeleton at publish time;
   a plain web server does not, so we add the equivalent here. */
const fs = require('fs');
const body = fs.readFileSync('src/artifact-body.html', 'utf8');

const title = (body.match(/<title>([^<]*)<\/title>/) || [,'OKLCH Ramp Studio'])[1];
// the <title> and font <link>s belong in the head, not the body
const head = body.match(/^[\s\S]*?<style>/)[0].replace(/<style>$/, '');
const rest = body.slice(head.length);

const out = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Generate perceptual OKLCH colour ramps: any number of shades from 50 to 950, every step clamped to sRGB and contrast-checked, exportable as JSON.">
<meta name="color-scheme" content="light dark">
${head.trim()}
<style>
/* equivalents of the reset the artifact host injects */
body{margin:0}
img{max-width:100%}
</style>
${rest}
</html>
`;
fs.writeFileSync('index.html', out);
console.log('built index.html —', out.length, 'bytes, title:', title);
