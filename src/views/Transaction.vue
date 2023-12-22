<template>
	<h2 class="mb-6">Transaksi</h2>
	<AddTransactionDialogue label="Tambah" color="green" :loadItems="loadItems"/>

	<v-text-field
			v-model="search"
			label="Cari Nomor Referensi"
			prepend-inner-icon="mdi-magnify"
			single-line
			variant="outlined"
			hide-details
		></v-text-field>

	<v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="totalItems"
		:items="serverItems" :loading="loading" :search="search" item-value="name"
		@update:options="loadItems" @update:page="page = $event">
	</v-data-table-server>
</template>

<style scoped>
	.v-table{
		height: 70vh;
		width: 70vw;
	}
</style>

<script lang="ts">
import { baseApi } from '@/Consts';
import axios from 'axios'
import AddTransactionDialogue from '@/components/dialogues/AddTransactionDialogue.vue'

export default {
	components: {
		AddTransactionDialogue
	},
	data: () => ({
		itemsPerPage: 5,
		headers: [
			{ title: 'Reference', key: 'reference_no', align: 'start'},
            { title: 'Nama Produk', key: 'product.name', align: 'start'},
			{ title: 'Harga', key: 'price', align: 'end' },
			{ title: 'Total Harga', key: 'payment_amount', align: 'end' },
			{ title: 'Jumlah', key: 'quantity', align: 'end' }
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
			await axios(baseApi+'/api/transactions', {
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