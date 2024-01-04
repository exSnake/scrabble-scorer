import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useTimer } from "vue-timer-hook";
import { useStorage } from "@vueuse/core";
import { toast } from "vue3-toastify";
export const useGameStore = defineStore("game", () => {
  //#region State

  const activePlayer = ref(null);
  const bonus = ref(useStorage("bonus", 50));
  const language = ref(useStorage("language", "it"));
  const players = ref(useStorage("players", [], localStorage, { deep: true }));
  const seconds = ref(useStorage("seconds", 90));
  const settings = ref(null);
  const timer = ref(null);

  //#endregion State

  //#region Computed properties

  const canAddPlayer = computed(() => {
    return players.value.length < 4;
  });

  //#endregion Computed properties

  //#region Actions

  onMounted(() => {
    players.value.forEach((player) => {
      if (player.active) {
        activePlayer.value = player;
      }
    });
  });

  function activatePlayer(player) {
    players.value.forEach((p) => {
      p.active = p === player;
    });
    activePlayer.value = player;
  }

  function addPlayer(name) {
    // if it's empty, don't add it and show toast message
    if (!name) {
      toast.error("Insert a name");
      return;
    }

    players.value.push({
      id: players.value.length + 1,
      name: name,
      active: false,
      words: [],
    });
    // if it was the first player, activate it
    if (players.value.length === 1) {
      activatePlayer(players.value[0]);
    }
  }

  function addWord(word) {
    // if it's empty, don't add it and show toast message
    if (!word.text) {
      toast.error("Insert a non empty word");
      return;
    }

    players.value[activePlayer.value.id - 1].words.push({
      id: activePlayer.value.words.length + 1,
      text: word.text,
      points: parseInt(word.points),
    });
    nextPlayer();
    restartTimer();
  }

  function deletePlayer(player) {
    const index = players.value.indexOf(player);
    if (index > -1) {
      if (players.value.length === 1 || player.id === activePlayer.value.id) {
        activePlayer.value = null;
        timer.value.pause();
      }
      players.value.splice(index, 1);
    }
  }

  function deleteWord({ wordId, player }) {
    const index = player.words.findIndex((word) => word.id === wordId);
    if (index > -1) {
      player.words.splice(index, 1);
    }
  }

  async function fill() {
    settings.value = await import("@/settings.json");

    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds.value);
    timer.value = useTimer(time);
    timer.value.pause();
  }
  function getCharacterPoints(char) {
    return settings.value.letters[language.value][char] ?? 0;
  }

  function isRunning() {
    return timer.value.isRunning;
  }

  function nextPlayer() {
    if (!activePlayer.value || activePlayer.value.id === players.value.length) {
      activatePlayer(players.value[0]);
    } else {
      const nextPlayerId = activePlayer.value.id % players.value.length;
      activatePlayer(players.value[nextPlayerId]);
    }
  }

  function pauseTimer() {
    if (timer.value.isRunning) {
      timer.value.pause();
    } else {
      timer.value.resume();
    }
  }
  function restartTimer() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds.value);
    timer.value.restart(time);
    pauseTimer();
  }

  //#endregion Actions

  return {
    // State
    activePlayer,
    bonus,
    canAddPlayer,
    language,
    players,
    seconds,
    settings,
    timer,

    // Actions
    activatePlayer,
    addPlayer,
    addWord,
    deletePlayer,
    deleteWord,
    fill,
    getCharacterPoints,
    isRunning,
    nextPlayer,
    pauseTimer,
    restartTimer,
  };
});
