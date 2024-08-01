<template>
	<div
		class="w-full flex gap-y-10 flex-col justify-center h-screen overflow-hidden items-center"
	>
		<div v-if="endpoints.length !== 0" class="flex flex-col gap-y-10">
			<h1 class="text-6xl font-extrabold">Endpoint Listesi</h1>
			<div
				class="flex gap-x-5 w-full items-center justify-center flex-wrap gap-y-5"
			>
				<div
					class="endpointsBtn"
					v-for="endpoint in endpoints"
					:key="endpoint"
					@click="navigateTo(endpoint.endpoint)"
				>
					<span class="text-xl select-none">{{
						endpoint.endpoint
					}}</span>
				</div>
			</div>
		</div>
		<div v-else>
			<span class="text-5xl font-extrabold">Yükleniyor...</span>
		</div>
	</div>
</template>

<script setup>
const config = useRuntimeConfig().public;

const endpoints = ref([]);
onNuxtReady(async () => {
	try {
		const response = await $fetch(config.API_URL + "/route", {});
		endpoints.value = response.data;
	} catch (error) {
		console.log(error);
	}
});
</script>

<style scoped>
.endpointsBtn {
	@apply bg-pink-600 min-w-24 flex items-center justify-center py-2 px-3 text-white rounded-md hover:bg-pink-500 cursor-pointer transition-colors duration-300;
}
</style>
