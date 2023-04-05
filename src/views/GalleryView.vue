<template>
    <v-container>

        <v-row class="mi-div">
          <v-col cols="auto">
            <v-checkbox v-model="financed" label="Financiado" @change="onCheckChange" />
          </v-col>
          <v-col cols="auto">
            <v-checkbox v-model="cash" label="Cash" @change="onCheckChange" />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(car, n) in cars"
            :key="n"
            cols="12"
            lg="4"
            md="4"
            sm="6"
            xs="12"
          >
            <v-card
              class="card-car"
              height="200" 
              :to="'/car/'+car.id"
            >
              <v-img class="align-self-end" :src="'http://inv.lea.mx/storage/app/public/files/'+car.files" cover>
                <div>
                  <v-tooltip>
                    <b>{{ car.financed == true ? 'Financiado' : 'Cash' }}</b>
                    <template v-slot:activator="{ props }">
                      <v-icon v-bind="props" class="ml-1" :icon="car.financed == true ? 'mdi-bank-check' : 'mdi-account-cash'" size="x-large" color="black"></v-icon>
                    </template>
                  </v-tooltip>
                </div>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
        <v-pagination
          class="mt-5"
          v-model="pagination.page"
          :length="pagination.lastPage"
          :total-visible="7"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
          @click.stop="onCheckChange"
        />
      </v-container>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
          cars: [],
          pagination: {
            total: 0,
            page: 1,
            lastPage: 0
          },
          loading: false,
          financed: true,
          cash: true
        }
    },
    watch: {
		$route(to) {
			if (to.query.key) {
				this.searchCars()
			} else {
				this.getCars()
			}
		}
	},
    mounted() {
      if (this.$route.query.key) {
        this.searchCars()
      } else {
        this.getCars()
      }
      this.$emit('historyLength', window.history.length)
    },
    methods: {
      getCars() {
        this.loading = true
        axios.get('http://inv.lea.mx/api/filter-cars', {
            headers: {
                PK: 'MTQ2DHmT5nLXW92BRjb7s9CjQ'
            },
            params: {
                page: this.pagination.page,
                financed: this.financed === true ? 1 : 0,
                cash: this.cash === true ? 1 : 0
            }
        }).then(response => {
            this.cars = response.data.data
            this.pagination.total = response.data.total
            this.pagination.lastPage = response.data.last_page
            this.loading = false
        })
      },
      searchCars() {
        this.loading = true
        axios.get('http://inv.lea.mx/api/filter-cars', {
          params: {
            page: this.pagination.page,
            financed: this.financed === true ? 1 : 0,
            cash: this.cash === true ? 1 : 0,
            text : this.$route.query.key
          },
          headers: {
            PK: 'MTQ2DHmT5nLXW92BRjb7s9CjQ'
          }
        }).then(response => {
          this.cars = response.data.data
          this.pagination.total = response.data.total
          this.pagination.lastPage = response.data.last_page
          this.loading = false
        })
      },
      onCheckChange() {
        if(this.$route.query.key){
          this.searchCars()
        } else {
          this.getCars()
        }
		  }
    }
  }
</script>

<style scoped>

.card-car {
  transition: transform 0.3s, box-shadow 0.3s;
}
.card-car:hover {
  transform: scale(1.02);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.mi-div {
  position: sticky;
  top: 50px;
  height: 65px;
  background-color: rgba(18, 18, 18, 0.884);
  z-index: 1;
  padding: 0;
  width: 280px;
  border-radius: 10px;
}
</style>