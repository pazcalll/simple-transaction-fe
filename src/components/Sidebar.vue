<template>
	<v-navigation-drawer app>
		<v-list>
			<v-list-item v-for="link in links" :key="link.text" link>
				<div class="d-inline-flex" @click="navigateTo(link.route)">
					<v-list-item-icon>
						<v-icon>{{ link.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>{{ link.text }}</v-list-item-title>
					</v-list-item-content>
				</div>
			</v-list-item>
			<v-list-item link>
				<div class="d-inline-flex" @click="logout">
					<v-list-item-icon>
						<v-icon>mdi-door</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Logout</v-list-item-title>
					</v-list-item-content>
				</div>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
	<router-view></router-view>
</template>
  
<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { baseApi } from '@/Consts'
import router from '@/router'

export default {
	setup() {
		const drawer = ref(false)
		const router = useRouter()

		const navigateTo = (routeName: string) => {
			router.push({ name: routeName })
			drawer.value = false
		}

		const links = [
			{
				text: 'Produk',
				icon: 'mdi-package-variant-closed',
				route: 'Product'
			},
			{
				text: 'Transaksi',
				icon: 'mdi-cart',
				route: 'Transaction'
			}
		]

		return { drawer, navigateTo, links }
	},
	methods: {
		async logout() {
			await axios(baseApi+'/api/logout', {
				headers: {
					'Authorization': 'Bearer '+localStorage.getItem('token')
				},
				method: 'DELETE'
			})
			.then(() => {
				localStorage.removeItem('token')
				window.location.reload()
			})
		}
	}
}
</script>