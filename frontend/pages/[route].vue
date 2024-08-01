<template>
	<div v-if="success">
		<div class="w-full px-2 py-3 flex mb-5 absolute gap-x-5 items-center">
			<div
				@click="navigateTo('/')"
				class="bg-black text-white py-3 px-5 rounded-md hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
			>
				<span class="select-none">Ana Menü</span>
			</div>

			<input
				v-model="endpointName"
				class="outline-none ring-0 border px-3 py-2"
			/>

			<div class="renameBtn" @click="renameEndpoint">
				<span>Yeniden Adlandır</span>
			</div>
		</div>
		<component :is="componentName" />
	</div>
	<div>
		<span class="text-5xl font-extrabold">Yükleniyor...</span>
	</div>
</template>

<script setup>
const config = useRuntimeConfig().public;
const router = useRouter();

const targetRoute = router.currentRoute.value.params.route;
const oldRoute = targetRoute;

const success = ref(false);
const componentName = ref("");
const endpointName = ref();

onMounted(async () => {
	if (process.server) return;

	try {
		const response = await $fetch(
			config.API_URL + "/route/" + targetRoute,
			{
				method: "GET",
			}
		);

		componentName.value = response.data.component;
		endpointName.value = response.data.endpoint;
		success.value = true;
	} catch (error) {
		if (error.data.code === 404) {
			return router.push("/404");
		}
	}
});

async function renameEndpoint() {
	try {
		await $fetch(config.API_URL + "/route/" + oldRoute, {
			method: "PUT",
			body: {
				endpoint: endpointName.value,
				component: componentName.value,
			},
		});

		navigateTo(endpointName.value);
	} catch (error) {
		console.log(error.data);
	}
}
</script>

<style scoped>
.renameBtn {
	@apply bg-pink-600 min-w-24 flex items-center justify-center py-2 px-3 text-white rounded-md hover:bg-pink-500 cursor-pointer transition-colors duration-300;
}
</style>
