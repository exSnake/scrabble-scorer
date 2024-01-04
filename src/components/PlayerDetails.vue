<script setup>
import { TButton, TInput } from "@variantjs/vue";
import { computed, toRefs } from "vue";

const props = defineProps({
  player: Object,
});

const emit = defineEmits(["delete", "activate", "deleteWord"]);
const activate = () => {
  emit("activate");
};

const { player } = toRefs(props);

const handleDeleteWord = (id) => {
  emit("deleteWord", { id: id, player: player.value });
};

const points = computed(() => {
  return player.value.words.reduce(
    (prev, next) => prev + parseInt(next.points),
    0
  );
});
</script>

<template>
  <div
    :class="{
      'grid grid-cols-3 bg-gray-200 dark:bg-gray-600 p-2 rounded-lg': true,
      'border-green-300 dark:border-green-500 border-2': player.active,
    }"
    @click="activate"
  >
    <div
      class="flex col-span-3 justify-between rounded-lg px-2 py-2 font-semibold"
    >
      <div class="uppercase">{{ player.name }}</div>
      <div class="flex gap-4" @click="emit('delete')">
        <div>Points: {{ points }}</div>
        <div
          class="cursor-pointer bg-red-400 text-white dark:bg-red-900 px-2 rounded-lg"
        >
          X
        </div>
      </div>
    </div>
    <div
      class="col-span-3 grid grid-cols-3 mt-1 rounded-lg bg-gray-100 dark:bg-gray-700"
      v-for="word in player.words"
      :key="word.id"
    >
      <div class="self-center ml-2 uppercase">{{ word.text }}</div>
      <div class="py-2">
        <TInput class="text-right text-gray-800 h-10" v-model="word.points" />
      </div>
      <div class="mx-auto self-center py-2">
        <TButton
          class="rounded-lg bg-gray-300 px-4 py-2 dark:bg-gray-500"
          @click="handleDeleteWord(word.id, player)"
          >x</TButton
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
