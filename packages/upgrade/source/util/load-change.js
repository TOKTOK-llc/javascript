import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function createLoader({ version, baseUrl }) {
	return function load(sdk, slugs) {
		// Note: This could benefit perf-wise by being converted to async, but it would
		// make the code a decent amount more complex.
		return slugs.map(slug => {
			const sdkPath = path.join(__dirname, '../versions', `v${version}`, sdk, `${slug}.md`);
			const sharedPath = path.join(__dirname, '../versions', `v${version}`, 'shared', `${slug}.md`);

			const loadPath = fs.existsSync(sdkPath) ? sdkPath : sharedPath;
			const content = fs.readFileSync(loadPath, 'utf8');
			const parsed = matter(content);
			const fm = parsed.data;

			return {
				title: fm.title,
				matcher: new RegExp(fm.matcher, `g${fm.matcherFlags ? fm.matcherFlags : ''}`),
				replaceWithString: fm.replaceWithString,
				slug,
				sdk: sdk,
				content: parsed.content,
				link: `${baseUrl}#${slug}`,
			};
		});
	};
}
