<template>
  <div class="min-h-screen flex justify-center flex-col bg-gray-400">
    <div class="container">
      <v-stage class="mx-auto bg-white" :config="configKonva">
        <v-layer>
          <v-group v-for="(group, index) in groups" :key="`groups-${index}`" :config="{ ...group.position }">
            <v-circle :config="group.circle">
            </v-circle>
            <v-text :config="{ text: index }"></v-text>
          </v-group>
        </v-layer>
      </v-stage>
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
      }
    };
  },
  methods: {
    generateCircles(amount) {
      for (let i = 0; i < amount; i++) {
        let count = 0;

        const radius = 50;
        const minDistance = 4 * radius * radius;

        let positionX
        let positionY
        let isColliding = false;

        do {
          count++;

          // 1280 -> radius <-
          positionX = this.getRandomInt(this.configKonva.width - radius * 3) + radius
          positionY = this.getRandomInt(this.configKonva.height - radius * 3) + radius

          console.group('CIRCLE ' + i);
          console.log('New Positions: ', positionX, positionY)

          for (let j = 0; j < this.groups.length; j++) {
            const group = this.groups[j];

            let distance = (group.position.x - positionX) ** 2 + (group.position.y - positionY) ** 2
            console.group('GROUP ' + j);
            console.log('current group positions of ' + j, group.position.x, group.position.y)
            console.log("distance", distance)
            console.log("minDistance", minDistance)

            if (distance < minDistance) {
              isColliding = true
              break
            } else {
              isColliding = false
            }
            console.log("isColliding", isColliding)
            console.groupEnd();
          }

          console.log("isColliding", isColliding)
          console.groupEnd();
        } while (isColliding)

        console.log('pass througs counted: ', count)

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
    }
  },
  created() {
    const amount = this.getRandomInt(10) + 1;
    this.generateCircles(amount);
    console.log('groups', this.groups);
  }
};

</script>

