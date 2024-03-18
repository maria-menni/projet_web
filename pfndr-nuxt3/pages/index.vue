<template>
  <div class="flex flex-col lg:flex-row items-start gap-4 w-full max-w-[1500px] mx-auto">

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:w-1/2 gap-4">
      <div v-for="drink in drinks?.businesses" :key="drink.id" class="card relative">
        <div class="relative overflow-hidden">
          <img :src="drink.image_url" :alt="drink.name" class="w-full h-[150px] object-cover hover:scale-105 transition-all">
          <p class="absolute bottom-0 right-0 bg-white bg-opacity-25 px-1 py-1 rounded-tl-md">{{ drink.price.replace(/€/g, '💸') }}</p>
        </div>
        <div class="content">
          <p class="font-bold text-lg">{{ drink.name }} <span class="font-normal text-grey text-sm" v-if="drink.is_closed">{{$t('closed')}}</span></p>
          <p :class="getRatingClass(drink.rating)">{{ drink.rating }} <span>{{$t(getRatingText(drink.rating))}}</span> <span class="font-normal text-grey">({{ drink.review_count }})</span></p>
          <p class="text-grey">{{ (drink.distance / 1000).toFixed(1) }} km</p>
        </div>
      </div>
    </section>
    <div class="w-full h-[500px] card p-4 lg:w-0 lg:flex-grow sticky bottom-0 lg:top-0">
      <LMap
        ref="map"
        zoom="13"
        :center="[drinks?.region?.center?.latitude, drinks?.region?.center?.longitude]"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; Epitech LIL_14"
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker v-for="drink in drinks?.businesses" :key="drink.id" :lat-lng="[drink.coordinates.latitude, drink.coordinates.longitude]"/>
      </LMap>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Establishments } from '../../pfndr-adonis/types/establishment.ts'
import { getRatingClass, getRatingText } from '../utils/displayStar';

const location = ref<string>('lille')
const price = ref<string>('2')

// const { data: eats } = await useFetch<Establishments>('/api/eat', {
//   query: { location, price }
// })

const { data: drinks } = await useFetch<Establishments>('/api/drink', {
  query: { location, price }
})
</script>
