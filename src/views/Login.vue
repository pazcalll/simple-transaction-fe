<template>
	<v-card variant="outlined">
		<h2 class="mb-3">Login</h2>
		<v-sheet width="300" class="mx-auto">
			<v-form fast-fail @submit.prevent="submit">
				<v-text-field v-model="username" label="Username" :rules="usernameRules"></v-text-field>

				<v-text-field type="password" v-model="password" label="Password" :rules="passwordRules"></v-text-field>

				<v-btn type="submit" block class="mt-2 bg-blue text-white">Submit</v-btn>
				<v-btn type="button" block class="mt-2 bg-black text-white" @click="navigateTo('Register')">Register</v-btn>
			</v-form>
		</v-sheet>
	</v-card>

	<v-snackbar
		v-model="status"
		multi-line
	>
		{{ wording }}

		<template v-slot:actions>
			<v-btn
				color="red"
				variant="text"
				@click="status = false"
			>
				Close
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { baseApi } from '@/Consts'
import axios from 'axios'

export default {
	setup() {
		const drawer = ref(false)
		const router = useRouter()

		const navigateTo = (routeName: string) => {
			router.push({ name: routeName })
			drawer.value = false
		}

		return {
			drawer,
			navigateTo,
		}
	},
	data: () => ({
		wording: '',
		status: false,
		username: '',
		usernameRules: [
			(value: string) => {
				if (value?.length >= 3) return true

				return 'username must be at least 3 characters.'
			},
		],
		password: '',
		passwordRules: [
			(value: string) => {
				if (value?.length >= 6) return true

				return 'password must be at least 6 characters.'
			},
		],
	}),
	methods: {
		async submit() {
			const { username, password } = this
			console.log(username, password)

			await axios.post(baseApi+'/api/authenticate', {
					username: username,
					password: password,
				}, {
				headers: {
					'Content-Type': 'application/json',
				}
			})
			.then((response) => {
				console.log(response)
				const res = response.data
				const data = res.data

				localStorage.setItem('token', data.token)
				localStorage.setItem('user', JSON.stringify(data.user))

				window.location.href = '/produk'
			})
			.catch((err) => {
				this.status = true
				this.wording = err.response.data.data.message
				console.log(err)
			})
		},
	},
}
</script>

<style scoped>
.v-card {
	padding: 5vw;
}
</style>