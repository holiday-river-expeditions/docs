// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightObsidian, { obsidianSidebarGroup } from 'starlight-obsidian';

export default defineConfig({
	integrations: [
		starlight({
			title: 'HRE Project Docs',
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
						href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&family=Stardos+Stencil:wght@400;700&display=swap',
					},
				},
			],
			plugins: [
				starlightObsidian({
					vault: '../',
					ignore: ['CLAUDE.md', 'README.md', 'docs-site/**'],
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
