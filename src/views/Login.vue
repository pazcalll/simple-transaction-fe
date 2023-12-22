<template>
	<v-card variant="outlined">
		<h2 class="mb-3">Login</h2>
		<v-sheet width="300" class="mx-auto">
			<v-form fast-fail @submit.prevent="submit">
				<v-text-field v-model="username" label="First name" :rules="usernameRules"></v-text-field>

				<v-text-field v-model="password" label="Password" :rules="passwordRules"></v-text-field>

				<v-btn type="submit" block class="mt-2 bg-blue text-white">Submit</v-btn>
				<v-btn type="button" block class="mt-2 bg-black text-white">Register</v-btn>
			</v-form>
		</v-sheet>
	</v-card>
</template>

<script lang="ts">
import { baseApi } from '@/Consts'
import axios from 'axios'
export default {
	data: () => ({
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

			await axios(baseApi+'/api/authenticate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					username: username,
					password: password,
				},
			})
			.then((response) => {
				const res = response.data
				const data = res.data

				localStorage.setItem('token', data.token)
				localStorage.setItem('user', JSON.stringify(data.user))

				window.location.href = '/produk'
			})
			.catch((err) => {
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