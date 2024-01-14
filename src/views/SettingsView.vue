<script setup>
import { TInput, TSelect } from "@variantjs/vue";
import { useGameStore } from "@/stores/GameStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const game = useGameStore();
const { bonus, language, maxWordLength, settings, seconds } = storeToRefs(game);

const bonusComputed = computed({
  get: () => bonus.value,
  set: (value) => setNumberValue(bonus, value),
});

const secondsComputed = computed({
  get: () => seconds.value,
  set: (value) => setNumberValue(seconds, value),
});

const maxWordLengthComputed = computed({
  get: () => maxWordLength.value,
  set: (value) => setNumberValue(maxWordLength, value),
});

const setNumberValue = (ref, value) => {
  ref.value = isNaN(parseInt(value)) ? 0 : value;
};

const handleNumberInputKeyPress = (event) => {
  if (event.key && !/\d/.test(event.key)) {
    event.preventDefault();
  }
};
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
        <TInput
          class="h-12 max-w-sm"
          v-model.number="secondsComputed"
          @keypress="handleNumberInputKeyPress"
        />
        <div class="flex flex-col">
          <div class="uppercase">Language</div>
          <div class="text-xs">(points)</div>
        </div>
        <TSelect
          v-if="settings"
          class="h-12 max-w-sm"
          v-model="language"
          :options="settings.languages"
        />
        <div class="flex flex-col">
          <div class="uppercase">Bonus</div>
          <div class="text-xs">(points)</div>
        </div>
        <input
          type="text"
          class="h-12 max-w-sm text-gray-900 rounded"
          v-model="bonusComputed"
          @keypress="handleNumberInputKeyPress"
        />
        <div class="flex flex-col">
          <div class="uppercase">Max Word Length</div>
          <div class="text-xs">(number)</div>
        </div>
        <TInput
          class="h-12 max-w-sm"
          v-model.number="maxWordLengthComputed"
          @keypress="handleNumberInputKeyPress"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
