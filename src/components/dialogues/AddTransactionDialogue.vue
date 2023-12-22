<template>
    <v-btn :color="color">
        + {{ label }}

        <v-dialog v-model="dialog" activator="parent" width="auto">
            <v-form @submit.prevent>
                <v-card>
                    <v-card-text>
                        <v-select label="Select" :items="items" v-model="product_id" :disabled="color === 'error'"
                            item-title="name" item-value="id"></v-select>
                        <v-sheet width="300" class="mx-auto">
                            <v-text-field :disabled="color === 'error'" v-model="quantity" :rules="quantityRules"
                                label="Jumlah Produk"></v-text-field>
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
import axios from 'axios'
import { baseApi } from '@/Consts';

export default {
    props: ['label', 'item', 'color', 'loadItems'],
    mounted() {
        this.quantity = null
        this.loadProducts()
    },
    data() {
        return {
            wording: '',
            status: false,
            items: [],
            product_id: null,
            dialog: false,
            quantity: '',
            quantityRules: [
                value => {
                    if (value > 0) return true

                    return 'Jumlah minimal 1.'
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
        product_id(newVal) {
            console.log(newVal)
        }
    },
    methods: {
        async updateProduct() {
            this.dialog = false
            await axios(baseApi + '/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    product_id: this.product_id,
                    quantity: this.quantity
                }
            })
                .then((response) => {
                    this.loadItems()
                })
                .catch((err) => {
                    this.wording = err.response.data.message,
                    this.status = true
                })
        },
        resetValues() {
            this.product_id = null
            this.quantity = null
        },
        async loadProducts() {
            await axios(baseApi + '/api/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const res = response.data
                    const data = res.data

                    this.items = data.map((item: any) => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    })
                    console.log(this.items)
                })
        }
    }
}
</script>