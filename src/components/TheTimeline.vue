<template>
  <div class="timeline">
    <div class="info">Trend name goes here</div>
    <div class="player-area">
      <div class="player-button"/>
      <div
        class="player-date"
        ref="playerDate">
          {{ rankingElements[activeStep].timestamp.toLocaleString() }}
      </div>
    </div>
    <div class="progress-area">
      <div
        v-for="(rankElement, index) in rankingElements"
        @click="activeStep = index"
        @mouseover="previewDate(index)"
        @mouseleave="removePreviewDate()"
        :key="index"
        :class="{'progress-step': true, 'is-active': activeStep == index,
                 'is-complete': index < activeStep}"
        :id="'step-' + index"
      />
    </div>
    <div class="ranking-area">
      <div
        class="ranking-row"
        v-for="(place, index) in rankingElements[activeStep].places"
        :key="index"
      >
        <div class="ranking-place">{{place.name}}</div>
        <div class="ranking-pos">{{place.position}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheTimeline',
  data() {
    return {
      activeStep: 0,
      rankingElements: [
        {
          timestamp: new Date('2019-01-01T12:15:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 2, name: 'Barcelona' },
            { position: 2, name: 'Canarias' },
            { position: 2, name: 'Bilbao' },
            { position: 2, name: 'Soria' },
            { position: 2, name: 'Badajoz' },
            { position: 2, name: 'Salamanca' },
            { position: 2, name: 'Barcelona' },
            { position: 2, name: 'Barcelona' },
            { position: 2, name: 'Barcelona' },
            { position: 2, name: 'Barcelona' },
            { position: 2, name: 'Barcelona' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
        {
          timestamp: new Date('2019-01-01T12:30:00Z'),
          places: [
            { position: 1, name: 'Madrid' },
            { position: 1, name: 'Sevilla' },
          ],
        },
      ],
    };
  },
  methods: {
    previewDate(index) {
      if (index !== this.activeStep) {
        const elm = this.$refs.playerDate;
        elm.style.cursor = 'pointer';
        elm.innerHTML = 'Ir a '.concat(this.rankingElements[index].timestamp.toLocaleString());
      }
    },
    removePreviewDate() {
      const elm = this.$refs.playerDate;
      elm.style.cursor = '';
      elm.innerHTML = this.rankingElements[this.activeStep].timestamp.toLocaleString();
    },
  },
};
</script>

<style scoped>
.timeline {
  left: 3%;
  top: 15%;
  z-index: 1;
  width: 20%;
  max-height: 80%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  background: #dee8e8;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  font-size: 1.5em;
  text-align: center;
}

.info {
  flex-basis: 100%;
  border-bottom: 1px solid #c2c8ca;
}

.player-area {
  flex-basis: 100%;
  border-bottom: 1px solid #c2c8ca;
}

.progress-area {
  flex-basis: 20%;
  max-height: 25em;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.progress-area::-webkit-scrollbar {
  width: 0;
  height: 0;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(33, 131, 221, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(33, 131, 221, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(33, 131, 221, 0);
  }
}

@keyframes nextStep {
  0% {
    height: 0%;
  }
  100% {
    height: 100%;
  }
}

.progress-step {
  width: 1.2em;
  height: 1.2em;
  display: block;
  margin: 20% auto;
  background: #fff;
  border: 4px solid #aec3d7;
  border-radius: 100%;
  color: #fff;
}

.progress-step:last-child::after {
  display: none;
}

.progress-step::after {
  content: "";
  display: block;
  height: 200%;
  margin: 100% auto;
  transition: height 1s ease-in;
  width: 0.5em;
  background: #aec3d7;
  z-index: 0;
}

.progress-step.is-active {
  border: 4px solid #aec3d7;
  background: #afe9f5;
  animation: pulse 2s infinite;
}

.progress-step.is-complete {
  color: #fff;
  background: #7b9dd5;
  border: 4px solid transparent;
}

.progress-step.is-complete::after {
  background: #7b9dd5;
  /* animation: nextStep 1s;
  animation-fill-mode: forwards; */
}

.ranking-area {
  flex-basis: 80%;
  max-height: 25em;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.ranking-area::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.ranking-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2%;
  padding: 2%;
  background: #e9ebec;
  border-radius: 2px;
  box-shadow: 0px 3px 8px rgba(0,0,0,0.19);
}

.ranking-row:first-child {
  margin-top: 5%;
}

.ranking-row:last-child {
  margin-bottom: 10%;
}

.ranking-place {
  display: inline-block;
}

.ranking-pos {
  display: inline-block;
}

.ranking-place {
  font-weight: bold
}
</style>
