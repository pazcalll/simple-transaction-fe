<template>
	<h2 class="mb-6">Produk</h2>
	<AddProductDialogue label="Tambah" color="green" :loadItems="loadItems"/>

	<v-text-field
			v-model="search"
			label="Search"
			prepend-inner-icon="mdi-magnify"
			single-line
			variant="outlined"
			hide-details
		></v-text-field>

	<v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="totalItems"
		:items="serverItems" :loading="loading" :search="search" item-value="name"
		@update:options="loadItems" @update:page="page = $event">
    <template v-slot:item.action="{ item }">
			<ProductDialogue label="Edit" :item="item" color="warning" :loadItems="loadItems"/>
			<ProductDialogue label="Delete" :item="item" color="error" :loadItems="loadItems"/>
    </template>
	</v-data-table-server>
</template>

<style scoped>
	.v-table{
		height: 80vh;
		width: 80vw;
	}
</style>

<script lang="ts">
import { baseApi } from '@/Consts';
import axios from 'axios'
import ProductDialogue from '@/components/dialogues/ProductDialogue.vue'
import AddProductDialogue from '@/components/dialogues/AddProductDialogue.vue'

export default {
	components: {
		ProductDialogue,
		AddProductDialogue
	},
	data: () => ({
		itemsPerPage: 5,
		headers: [
			{ title: 'Nama', key: 'name', align: 'start'},
			{ title: 'Harga', key: 'price', align: 'end' },
			{ title: 'Stock', key: 'stock', align: 'end' },
			{ title: 'Deskripsi', key: 'description', align: 'end' },
			{ title: 'Aksi', key: 'action', align: 'end'}
		],
		search: '',
		serverItems: [],
		loading: true,
		totalItems: 0,
		page:1
	}),
	methods: {
		async loadItems() {
			this.loading = true
			await axios(baseApi+'/api/products', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer '+localStorage.getItem('token')
				},
				params: {
					per_page: this.itemsPerPage,
					keyword: this.search,
					page: this.page
				}
			})
			.then((response) => {
				const res = response.data
				const data = res.data

				this.serverItems = data
				this.totalItems = res.total
				this.loading = false
			})
		},
		async searchByKeyword() {
			await this.loadItems()
		},
		editItem(item: any) {
			console.log('edit', item)
		},
		deleteItem(item: any) {
			console.log('delete', item)
		}
	},
}
</script>