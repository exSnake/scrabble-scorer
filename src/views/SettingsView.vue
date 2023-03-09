<script setup>
import { TInput, TSelect } from "@variantjs/vue";
import { useGameStore } from "@/stores/GameStore";

let game = useGameStore();
game.fill();
</script>
<template>
  <div
    class="container mx-auto my-4 rounded-lg bg-white dark:bg-gray-700 min-h-screen"
  >
    <h1 class="text-4xl ml-4 uppercase">Settings</h1>
    <div class="border-gray-200 dark:border-gray-600 border-t-2 mx-4" />
    <div class="w-fit p-4">
      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col">
          <div class="uppercase">Timer</div>
          <div class="text-xs">(seconds)</div>
        </div>
        <TInput class="h-12 max-w-sm" v-model.number="game.seconds" />
        <div class="flex flex-col">
          <div class="uppercase">Language</div>
          <div class="text-xs">(points)</div>
        </div>
        <TSelect
          v-if="game.settings"
          class="h-12 max-w-sm"
          v-model="game.language"
          :options="game.settings.languages"
        />
        <div class="flex flex-col">
          <div class="uppercase">Bonus</div>
          <div class="text-xs">(points)</div>
        </div>
        <TInput class="h-12 max-w-sm" v-model.number="game.bonus" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
