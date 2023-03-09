<script setup>
import { TButton, TInput } from "@variantjs/vue";

const props = defineProps({
  player: Object,
});
let emit = defineEmits(["delete", "activate", "deleteWord"]);
const activate = () => {
  emit("activate");
};

const removeWord = (id) => {
  emit("deleteWord", { id: id, player: props.player });
};
</script>

<template>
  <div
    :class="{
      'border-green-300 dark:border-green-500 border-2': props.player.active,
    }"
    @click="activate"
  >
    <div class="col-span-3 py-2">
      <div
        class="flex justify-between rounded-lg bg-gray-300 px-2 py-2 dark:bg-gray-500"
      >
        <div class="flex gap-2">
          <div>
            {{ props.player.name }} ({{
              props.player.words.reduce(
                (prev, next) => prev + parseInt(next.points),
                0
              )
            }})
          </div>
        </div>
        <div
          class="cursor-pointer bg-red-400 text-white dark:bg-red-900 px-2 rounded-lg"
          @click="emit('delete')"
        >
          X
        </div>
      </div>
    </div>
    <div
      class="col-span-3 mt-2 grid grid-cols-3 rounded-lg bg-gray-100 dark:bg-gray-700"
      v-for="word in props.player.words"
      :key="word.id"
    >
      <div class="self-center py-2">{{ word.text }}</div>
      <div class="py-2">
        <TInput class="text-right text-gray-800 h-10" v-model="word.points" />
      </div>
      <div class="mx-auto self-center py-2">
        <TButton
          class="rounded-lg bg-gray-300 px-4 py-2 dark:bg-gray-500"
          @click="removeWord(word.id)"
          >x</TButton
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
