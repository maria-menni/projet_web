<template>
  <header class="flex items-center justify-between h-16 p-4 border-b">
    <NuxtLink to="/" class="flex items-center gap-1">
      <Icon name="uil:map" class="text-main" size="24"/> 
      <span class="font-bold text-main text-lg">Pathfinder</span>
    </NuxtLink>
    <div v-if="isDiscover" class="relative">
      <input v-model="search" v-bind="searchAttrs" type="text" :placeholder="$t('localisation_placeholder')" class="pl-8">
      <Icon name="uil:search" class="absolute left-2 top-1/2 transform -translate-y-1/2 text-grey" />
    </div>
    <NuxtLink to="/login" class="button flex items-center gap-2">
      <Icon name="uil:user" class="text-main"/>
      {{ $t("account") }}
    </NuxtLink>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const isDiscover = computed(() => route.path === '/discover');

const { defineField } = useForm();

const [search, searchAttrs] = defineField('search');
</script>