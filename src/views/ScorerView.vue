<script setup>
import PlayerDetails from "@/components/PlayerDetails.vue";
import TimerTool from "@/components/icons/TimerTool.vue";
import { useGameStore } from "@/stores/GameStore";
import { TButton, TInput } from "@variantjs/vue";
import { ref } from "vue";
import ScorerAddWord from "@/components/ScorerAddWord.vue";

let newPlayerName = ref("");
let game = useGameStore();
game.fill();
</script>

<template>
  <div
    class="container mx-auto mt-4 rounded-lg bg-white p-4 px-4 dark:bg-gray-700"
  >
    <div class="flex flex-wrap lg:flex-nowrap gap-2">
      <!-- Add Word -->
      <div
        class="order-last flex w-full flex-col rounded-lg bg-gray-200 p-3 dark:bg-gray-600 lg:order-first lg:w-1/3"
      >
        <ScorerAddWord
          :enabled="game.activePlayer != null"
          @add="game.addWord"
        />
      </div>
      <!-- Timer -->
      <TimerTool
        class="flex w-full flex-col items-center rounded-lg bg-gray-100 px-6 py-4 text-7xl text-gray-600 dark:bg-gray-600 dark:text-white lg:w-1/3"
        :timer="game.timer"
        @restart="game.restartTimer()"
        @pause="game.pauseTimer()"
      />
      <!-- New Player -->
      <div
        class="flex w-full flex-col rounded-lg bg-gray-200 p-3 dark:bg-gray-600 lg:w-1/3"
        v-if="game.canAddPlayer()"
      >
        <div class="flex gap-4">
          <TInput
            placeholder="New player..."
            class="h-10 bg-gray-100 px-3 py-1 text-black dark:bg-white"
            type="text"
            v-model="newPlayerName"
          />
          <TButton
            class="h-10 cursor-pointer rounded-lg bg-blue-400 px-6 py-2 text-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-200"
            @click="game.addPlayer(newPlayerName)"
            :disabled="!game.canAddPlayer()"
          >
            Add
          </TButton>
        </div>
      </div>
    </div>
    <!-- Person -->
    <div class="mt-4 flex flex-wrap justify-between gap-2">
      <div class="flex w-full flex-wrap justify-start gap-2">
        <div v-for="player in game.players" :key="player.id">
          <PlayerDetails
            class="grid w-full sm:w-[300px] grid-cols-3 overflow-hidden rounded bg-gray-200 p-4 text-center shadow-lg dark:bg-gray-600 mt-4"
            :player="player"
            @deleteWord="game.deleteWord"
            @delete="game.deletePlayer(player)"
            @activate="game.activatePlayer(player)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
