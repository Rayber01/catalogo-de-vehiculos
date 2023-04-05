<template>
		<v-container>
				<v-row>
						<v-col cols="12">
							<h2>Descripción del vehículo</h2>
							<v-divider class="mt-1" />
						</v-col>
						<v-col 
						cols="auto"
						>
							<p class="description">
								{{ car.description }}
							</p>
						</v-col>
						<v-col cols="auto	">
							<strong>Forma de pago:</strong> {{ car.financed ? 'Financiamiento' : 'Efectivo' }}
							<br>
							<strong>Disponibilidad:</strong> {{ car.sold ? 'No' : 'Si' }}
						</v-col>
				</v-row>
				<v-row>
      <v-col cols="12">
        <h2>Galería de imagenes</h2>
      </v-col>
			<v-divider class="mb-1"/>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6" class="d-flex justify-center" >
        <v-img
					style="border-radius: 5px;"
					:src="'http://inv.lea.mx/storage/app/public/files/' + selectedImage"
				/>
      </v-col>
      <v-divider class="mt-2"/>
      <v-col cols="auto">
				<v-slide-group
					class="pa-4"
					show-arrows
				>
					<v-slide-group-item
						v-for="(image, n) in car.files" 
						:key="n"
					>
						<v-img
							:src="'http://inv.lea.mx/storage/app/public/files/'+image" 
							height="200" 
							width="200" 
							@click="selectedImage = image"
							class="mr-5 image-car"
						/>
					</v-slide-group-item>
				</v-slide-group>
      </v-col>
    </v-row>
		</v-container>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			car: [],
			id: this.$route.params.id,
			selectedImage: null
		}
	},
	computed: {
		dividerWidth() {
			switch (this.$vuetify.display.name) {
				case 'xs':
					return '100%'
				default:
					return '50%'
			}
		}
	},
	mounted() {
		this.getCar()
		
	},
	methods: {
		getCar() {
			axios.get(`http://inv.lea.mx/api/car-view/${this.$route.params.id}`, {
					headers: {
							PK: 'MTQ2DHmT5nLXW92BRjb7s9CjQ'
					}
			})
			.then(response => {
					this.car = response.data[0]
					this.selectedImage = response.data[0].files[0]
			})
			this.$emit('historyLength', window.history.length)
		}
	}
}
</script>

<style>
.description {
  white-space: pre-line;
}

.image-car{
  transition: transform 0.3s;
}
.image-car:hover {
  transform: scale(1.05);
}
</style>