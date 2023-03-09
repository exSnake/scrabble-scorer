<script setup>
const zeroPad = (num, places) => String(num).padStart(places, "0");

defineProps({
  timer: Object,
});

const emit = defineEmits(["restart", "pause"]);
</script>

<template>
  <div>
    <div class="flex items-center justify-between w-full" v-if="timer">
      <div>{{ zeroPad(timer.minutes, 2) }}:{{ zeroPad(timer.seconds, 2) }}</div>
      <div class="flex items-center justify-between">
        <v-icon
          v-if="timer.isRunning"
          name="md-pause-round"
          class="w-16 h-16 cursor-pointer fill-blue-600 hover:fill-blue-400"
          @click="emit('pause')"
        />
        <v-icon
          v-if="!timer.isRunning"
          name="md-playarrow-round"
          class="w-16 h-16 cursor-pointer fill-green-600 hover:fill-green-400"
          @click="emit('pause')"
        />
        <v-icon
          name="md-restartalt-round"
          class="w-14 h-14 fill-green-400 cursor-pointer hover:fill-green-600"
          @click="emit('restart')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
