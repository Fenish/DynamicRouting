// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss"],
	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL,
		},
	},
	components: [{ path: "~/customPages", pathPrefix: true, global: true }],
});
