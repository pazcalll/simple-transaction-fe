<template>
	<v-btn :color="color">
		{{ label }}

		<v-dialog v-model="dialog" activator="parent" width="auto">
			<v-form @submit.prevent>
				<v-card>
					<v-card-text>
						<v-sheet width="300" class="mx-auto">
							<v-text-field :disabled="color === 'error'" v-model="name" :rules="nameRules"
								label="Nama Produk"></v-text-field>
						</v-sheet>
						<v-sheet width="300" class="mx-auto">
							<v-text-field :disabled="color === 'error'" v-model="stock" :rules="stockRules"
								label="Stok Produk"></v-text-field>
						</v-sheet>
						<v-sheet width="300" class="mx-auto">
							<v-text-field :disabled="color === 'error'" v-model="price" :rules="priceRules"
								label="Harga Produk"></v-text-field>
						</v-sheet>
						<v-sheet width="300" class="mx-auto">
							<v-text-field :disabled="color === 'error'" v-model="description" :rules="descriptionRules"
								label="Deskripsi Produk"></v-text-field>
						</v-sheet>
					</v-card-text>
					<v-card-actions>
						<v-btn :color="color" block @click="color === 'error' ? deleteProduct() : updateProduct()">{{ label
						}}</v-btn>
					</v-card-actions>
					<v-card-actions>
						<v-btn color="primary" block @click="dialog = false">Tutup</v-btn>
					</v-card-actions>
				</v-card>
			</v-form>
		</v-dialog>
	</v-btn>
</template>

<script lang="ts">
import axios from 'axios'
import { baseApi } from '@/Consts'

export default {
	props: ['label', 'item', 'color', 'loadItems'],
	mounted() {
		this.name = this.item.name
		this.stock = this.item.stock
		this.price = this.item.price
		this.description = this.item.description
	},
	data() {
		return {
			dialog: false,
			name: '',
			nameRules: [
				value => {
					if (value?.length >= 3) return true

					return 'Nama minimal 3 karakter.'
				},
			],
			stock: '',
			stockRules: [
				value => {
					if (value >= 0) return true

					return 'Stok minimal 0.'
				},
			],
			description: '',
			descriptionRules: [
				value => {
					if (value?.length >= 6) {
						if (value <= 40) return true
					}

					return 'Deskripsi antara 6 - 40 karakter.'
				},
			],
			price: '',
			priceRules: [
				value => {
					if (value >= 100) return true

					return 'Harga minimal 100.'
				},
			],
		}
	},
	watch: {
		dialog(newVal) {
			if (newVal) {
				this.resetValues();
			}
		},
	},
	methods: {
		async updateProduct() {
			this.dialog = false
			await axios(baseApi + '/api/products/' + this.item.id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				},
				data: {
					name: this.name,
					stock: this.stock,
					price: this.price,
					description: this.description
				}
			})
				.then((response) => {
					this.loadItems()
				})
		},
		async deleteProduct() {
			this.dialog = false
			await axios(baseApi + '/api/products/' + this.item.id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			})
				.then((response) => {
					this.loadItems()
				})
		},
		resetValues() {
			this.name = this.item.name;
			this.stock = this.item.stock;
			this.price = this.item.price;
			this.description = this.item.description;
		},
	}
}
</script>