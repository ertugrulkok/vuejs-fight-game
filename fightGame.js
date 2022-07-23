const app = Vue.createApp({
  data() {
    return {
      computerLeben: 100,
      spielerLeben: 100,
      spielrunde: 0,
      gewinner: null, // null = false -> "spieler", "computer", "untentschieden"
      logMessages: [],
      checked: false,
    };
  },
  methods: {
    // Allgemeine Funktionen
    neuesSpiel() {
      this.computerLeben = 100;
      this.spielerLeben = 100;
      this.logMessages = [];
      this.spielrunde = 0;
      this.gewinner = null;
    },
    aufgeben() {
      this.gewinner = "computer";
    },
    battleLog(wer, art, wert) {
      this.logMessages.unshift({
        aktionVon: wer,
        aktionArt: art,
        aktionWert: wert,
      });
      // console.log(this.logMessages);
    },
    // Spieler Funktionen
    specialAttack() {
      this.spielrunde++;
      const angriffWert = randomWert(17, 10);
      this.computerLeben -= angriffWert;
      this.battleLog("Spieler", "SpecialAttack", angriffWert);

      const randomDecide = randomWert(1, 0);

      if (randomDecide == 1) {
        this.computerGreiftSpielerAn();
      } else {
        this.specialAttackComputer();
      }
    },
    spielerGreiftComputerAn() {
      this.spielrunde++;
      // console.log("Derzeitige Runde: " + this.spielrunde);
      const angriffWert = randomWert(10, 7);
      this.computerLeben -= angriffWert;
      // console.log("Angriff Spieler: " + angriffWert);
      // console.log("Computerleben " + this.computerLeben);
      this.battleLog("Spieler", "Angriff", angriffWert);
      this.computerGreiftSpielerAn();
    },
    heileSpieler() {
      this.spielrunde++;
      const heilWert = randomWert(16, 8);
      if (this.spielerLeben + heilWert > 100) {
        this.spielerLeben = 100;
      } else {
        this.spielerLeben += heilWert;
      }
      this.battleLog("Spieler", "Heilung", heilWert);
      const randomDecide = randomWert(1, 0);
      if (randomDecide == 1) {
        this.computerGreiftSpielerAn();
      } else {
        this.heileComputer();
      }
    },
    // Computer Funktionen
    computerGreiftSpielerAn() {
      const angriffWert = randomWert(15, 7);
      this.spielerLeben -= angriffWert;
      this.battleLog("Computer", "Angriff", angriffWert);
    },
    heileComputer() {
      const heilWert = randomWert(15, 7);
      if (this.computerLeben + heilWert > 100) {
        this.computerLeben = 100;
      } else {
        this.computerLeben += heilWert;
      }
      console.log("Computer hat sich selbst geheilt");
      this.battleLog("Computer", "Heilung", heilWert);
    },
    specialAttackComputer() {
      const angriffWert = randomWert(18, 10);
      this.spielerLeben -= angriffWert;
      this.battleLog("Computer", "SpecialAttack", angriffWert);
    },
  },
  computed: {
    computerBar() {
      if (this.computerLeben < 0) {
        this.computerLeben = 0;
        return { width: this.computerLeben + "%" };
      } else {
        return { width: this.computerLeben + "%" };
      }
    },
    spielerBar() {
      if (this.spielerLeben < 0) {
        return { width: "0%" };
      }
      return { width: this.spielerLeben + "%" };
    },
    aktiviereSpecialAttack() {
      // console.log(this.spielrunde % 3 !== 0)
      return this.spielrunde % 3 !== 0;
    },
  },
  watch: {
    spielerLeben(value) {
      // value = this.spielerLeben
      if (value <= 0 && this.computerLeben <= 0) {
        this.gewinner = "draw";
      } else if (value <= 0) {
        this.gewinner = "computer";
      }
    },
    computerLeben(value) {
      console.log("Das ist mein derzeitger Value bei watch " + value);
      if (value <= 0 && this.spielerLeben <= 0) {
        this.gewinner = "draw";
      } else if (value <= 0) {
        this.gewinner = "spieler";
      }
    },
  },
});

function randomWert(max, min) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

app.mount("#game");

// Bespiel Checkbox JavaScript
// const checkbox = document.getElementById("flexSwitchCheckChecked");
// const logs = document.getElementById("logs");
// checkbox.addEventListener("click", () => {
//   if (checkbox.checked) {
//     logs.style.display = "block";
//   } else {
//     logs.style.display = "none";
//   }
// });
