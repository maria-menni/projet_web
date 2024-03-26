<template>
  <div class="flex flex-col lg:flex-row items-start gap-4 w-full max-w-[1500px] mx-auto py-10">

    <!-- SearchResult -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:w-1/2 gap-4 w-full">
      <div v-for="establishment in establishments?.businesses" :key="establishment.id" class="card relative">
        <div class="relative overflow-hidden">
          <NuxtImg :src="establishment.image_url" :alt="establishment.name" class="w-full h-[150px] object-cover hover:scale-105 transition-all"/>
          <p v-if="establishment?.price" class="absolute bottom-0 right-0 bg-white bg-opacity-25 px-1 py-1 rounded-tl-md">{{ establishment.price.replace(/€/g, '💸') }}</p>
        </div>
        <div class="content">
          <p class="font-bold text-lg">{{ establishment.name }} <span class="font-normal text-grey text-sm" v-if="establishment.is_closed">{{$t('closed')}}</span></p>
          <p :class="getRatingClass(establishment.rating)">★ {{ establishment.rating }} <span>{{$t(getRatingText(establishment.rating))}}</span> <span class="font-normal text-grey">({{ establishment.review_count }})</span></p>
          <p class="text-grey">{{ (establishment.distance / 1000).toFixed(1) }} km</p>
        </div>
      </div>
    </section>

    <!-- Map -->
    <div class="w-full h-[300px] lg:h-[500px] card p-2 lg:p-4 lg:w-0 lg:flex-grow sticky bottom-0 lg:top-0">
      <LMap
        ref="map"
        :zoom=13
        :center="[establishments?.region?.center?.latitude, establishments?.region?.center?.longitude]"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; Epitech LIL_14"
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker :lat-lng="[establishments?.region?.center?.latitude, establishments?.region?.center?.longitude]"/>
        <LMarker v-for="establishment in establishments?.businesses" :key="establishment.id" :lat-lng="[establishment.coordinates.latitude, establishment.coordinates.longitude]"/>
      </LMap>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Establishments, Establishment, Region } from '../../pfndr-adonis/types/establishment.ts'
import { getRatingClass, getRatingText } from '../utils/displayStar';

const location = ref<string>('Lille')
const price = ref<string>('1')
const establishments = ref<{ businesses: Establishment[], region: Region }>({
  businesses: [],
  region: { center: { latitude: 0, longitude: 0 } }
});

//Fetch Data
const { data: eats } = await useFetch<Establishments>('/api/eat', {
  query: { location, price }
})

const { data: drinks } = await useFetch<Establishments>('/api/drink', {
  query: { location, price }
})

const { data: events } = await useFetch<Establishments>('/api/enjoy', {
  query: { location }
})

watchEffect(() => {
  if (eats.value && drinks.value) {
    establishments.value.businesses = [...eats.value.businesses, ...drinks.value.businesses];
    establishments.value.region = eats.value.region;
  }
});

console.log(events.value)
</script>
