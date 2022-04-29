<template>
  <div class="min-h-screen flex justify-center flex-col bg-gray-300">
    <div class="container">
      <div class="flex justify-center mx-auto">
        <div class="relative">
          <v-stage class="shadow-lg bg-white rounded-lg" :config="configKonva">
            <v-layer>
              <v-group v-if="showCircles" v-for="(group, index) in groups" :key="`groups-${index}`"
                :config="{ ...group.position }">
                <v-circle :config="group.circle">
                </v-circle>
              </v-group>
            </v-layer>
          </v-stage>
          <div v-show="showAnswers"
            class="absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-center p-16 bg-red-500 rounded-lg">
            <h1 v-if="!resultMessage" class="text-center text-4xl text-gray-50 mb-24">Wieviele Kreise konntest du
              zählen?</h1>
            <h1 v-if="resultMessage" class="text-center text-4xl text-gray-50 mb-24">{{ resultMessage }}</h1>
            <div class="flex justify-between">
              <button v-for="i in 10 " :key="`answer-${i}`" @click="selectAnswer(i)" :disabled="selectedAnswer"
                :class="{ 'bg-green-500 border-green-700 border-2 text-green-900': selectedAnswer && selectedAnswer === correctAnswer && i === correctAnswer, 'bg-yellow-500 border-yellow-700 border-2 text-yellow-900': selectedAnswer && selectedAnswer !== correctAnswer && i === correctAnswer }"
                class="bg-gray-200 py-2 px-4 relative h-16 w-16 text-2xl font-bold rounded">
                <span class="absolute inset-0 flex justify-center items-center">{{ i }}</span>
              </button>
            </div>
            <div class="flex justify-center items-center mt-24">
              <button @click="restart" class="flex items-center bg-gray-200 py-2 px-4 rounded font-bold">
                <i class="fa-solid fa-arrow-rotate-right mr-3"></i>
                Neustart
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      configKonva: {
        width: 1280,
        height: 720,
      },
      groups: [],
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4
      },
      showCircles: true,
      showAnswers: false,
      selectedAnswer: null,
      resultMessage: null
    };
  },
  methods: {
    generateCircles(amount) {
      for (let i = 0; i < amount; i++) {
        let count = 0;
        const radius = 50;
        const minDistance = 4 * radius * radius;
        let positionX;
        let positionY;
        let isColliding = false;
        do {
          count++;
          // 1280 -> radius <-
          let gap = radius + 10;
          positionX = this.getRandomInt(this.configKonva.width - gap * 3) + gap;
          positionY = this.getRandomInt(this.configKonva.height - gap * 3) + gap;
          for (let j = 0; j < this.groups.length; j++) {
            const group = this.groups[j];
            let distance = (group.position.x - positionX) ** 2 + (group.position.y - positionY) ** 2;
            if (distance < minDistance) {
              isColliding = true;
              break;
            }
            else {
              isColliding = false;
            }
          }
        } while (isColliding);
        this.groups.push({
          position: {
            x: positionX,
            y: positionY
          },
          circle: {
            radius: radius,
            fill: `hsl(0, 100%, 50%)`,
            stroke: `hsl(280, 100%, 50%)`,
            strokeWidth: 10
          }
        });
      }
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    startTest() {
      const amount = this.getRandomInt(10) + 1;
      this.generateCircles(amount);
      setTimeout(() => {
        this.showCircles = false;
        this.showAnswers = true;
      }, 1000);
    },
    selectAnswer(answer) {
      this.selectedAnswer = answer;
      this.getGameResult();
    },
    getGameResult() {
      const correctAnswer = this.groups.length;
      if (this.selectedAnswer === correctAnswer) {
        this.resultMessage = "Richtig, die Antwort war " + correctAnswer;
      }
      else {
        this.resultMessage = "Leider falsch, die Antwort war " + correctAnswer;
      }
    },
    restart() {
      this.showCircles = true;
      this.showAnswers = false;
      this.selectedAnswer = null;
      this.resultMessage = null;
      this.groups = [];
      this.startTest();
    }
  },
  created() {
    this.startTest();
  },
  computed: {
    correctAnswer() {
      return this.groups.length;
    }
  },
};

</script>

