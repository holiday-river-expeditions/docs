// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightObsidian, { obsidianSidebarGroup } from 'starlight-obsidian';

export default defineConfig({
	integrations: [
		starlight({
			title: 'HRE Project Docs',
			favicon: '/favicon-32x32.png',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/holiday-river-expeditions',
				},
			],
			sidebar: [obsidianSidebarGroup],
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'meta',
					attrs: { name: 'robots', content: 'noindex, nofollow' },
				},
				// Same favicon set as the website (copied from website/public/).
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						href: '/favicon-48x48.png',
						sizes: '48x48',
						type: 'image/png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'apple-touch-icon',
						href: '/apple-touch-icon.png',
						sizes: '180x180',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'mask-icon',
						href: '/safari-pinned-tab.svg',
						color: '#D00A0B',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.googleapis.com',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.gstatic.com',
						crossorigin: '',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Oswald:wght@500;600;700&display=swap',
					},
				},
				{
					// Brand display face (ATF Alternate Gothic). If this host
					// isn't in the Typekit kit's allowed domains the fonts
					// simply don't load and Oswald takes over — same fallback
					// chain the website uses.
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://use.typekit.net/guz5fen.css',
					},
				},
			],
			plugins: [
				starlightObsidian({
					vault: '../',
					ignore: ['CLAUDE.md', 'README.md', 'docs-site/**', 'progress/**', 'templates/**'],
					sidebar: {
						label: 'Documentation',
						collapsed: false,
						collapsedFolders: true,
					},
				}),
			],
		}),
	],
});
