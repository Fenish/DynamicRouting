<template>
	<div
		class="w-full flex flex-col justify-center h-screen overflow-hidden items-center bg-zinc-900"
	>
		<h1 class="text-3xl text-white">Endpoint Listesi</h1>
		<div
			v-if="endpoints.length !== 0"
			class="flex gap-x-10 w-full items-center justify-center mt-5 flex-wrap gap-y-5"
		>
			<div
				class="py-5 min-w-52 px-5 flex items-center justify-center bg-green-400 border-2 border-green-500 rounded-sm group hover:bg-green-600 transition-colors duration-300 cursor-pointer"
				v-for="endpoint in endpoints"
				:key="endpoint"
				@click="navigateTo(endpoint.component)"
			>
				<span class="text-xl select-none">{{ endpoint.endpoint }}</span>
			</div>
		</div>

		<div v-else class="mt-5">
			<span class="text-white text-3xl">Yükleniyor...</span>
		</div>
	</div>
</template>

<script setup>
const config = useRuntimeConfig().public;

const endpoints = ref([]);
onNuxtReady(async () => {
	const { data } = await useFetch(`${config.API_URL}/route`, {});
	endpoints.value = data.value.data;
});
</script>
