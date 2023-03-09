import { defineStore } from "pinia";
import { useTimer } from "vue-timer-hook";
import { useStorage } from "@vueuse/core";
export let useGameStore = defineStore("game", {
  //data
  state() {
    return {
      activePlayer: null,
      language: useStorage("language", "it"),
      settings: null,
      timer: null,
      seconds: useStorage("seconds", 90),
      bonus: useStorage("bonus", 50),
      players: useStorage("players", [], localStorage, { deep: true }),
    };
  },

  //methods
  actions: {
    async fill() {
      this.settings = await import("@/settings.json");

      this.$state = useStorage("state", null);
      const time = new Date();
      time.setSeconds(time.getSeconds() + this.seconds); // 10 minutes timer
      this.timer = useTimer(time);
      this.timer.pause();
    },

    restartTimer() {
      const time = new Date();
      time.setSeconds(time.getSeconds() + this.seconds);
      this.timer.restart(time);
    },

    pauseTimer() {
      if (this.timer.isRunning) {
        this.timer.pause();
      } else {
        this.timer.resume();
      }
    },

    isRunning() {
      return this.timer.isRunning;
    },

    getCharacterPoints(char) {
      return this.settings.letters[this.language][char] ?? 0;
    },

    addWord(word) {
      this.players[this.activePlayer.id - 1].words.push({
        id: this.activePlayer.words.length + 1,
        text: word.text,
        points: parseInt(word.points),
      });
      this.nextPlayer();
      this.restartTimer();
    },

    deleteWord(wordId, player) {
      console.log(player.words);
    },

    nextPlayer() {
      if (
        this.activePlayer == null ||
        this.activePlayer.id === this.players.length
      ) {
        this.activatePlayer(this.players[0]);
      } else {
        this.activatePlayer(this.players[this.activePlayer.id]);
      }
    },

    activatePlayer(player) {
      this.players.map((p) => (p.active = p === player));
      this.activePlayer = player;
    },

    deletePlayer(player) {
      const index = this.players.indexOf(player);
      if (index > -1) {
        // only splice array when item is found
        this.players.splice(index, 1); // 2nd parameter means remove one item only
      }
    },

    addPlayer(name) {
      this.players.push({
        id: this.players.length + 1,
        name: name,
        words: [],
        active: false,
      });
    },

    canAddPlayer() {
      return this.players.length < 4;
    },
  },
  //computed
  getters: {},
});
