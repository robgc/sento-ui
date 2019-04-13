<template>
  <div class="timeline">
    <div class="info">Trend name goes here</div>
    <div class="progress-area">
      <div
        v-for="(rankElement, index) in rankingElements"
        @click="activeStep = index"
        :key="index"
        :class="{'progress-step': true, 'is-active': activeStep == index,
                 'is-complete': index < activeStep}"
        :id="'step-' + index"
      >
      </div>
    </div>
    <div class="ranking-area">Ranking chart goes here</div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  data() {
    return {
      activeStep: 0,
      rankingElements: [
        'a',
        'b',
        'a',
        'a',
        'a',
        'a',
        'a',
        'b',
        'b',
        'b',
        'b',
        'b',
      ],
    };
  },
};
</script>

<style scoped>
.timeline {
  position: absolute;
  left: 3%;
  top: 15%;
  z-index: 1;
  width: 20%;
  height: 80%;
  overflow: hidden;
  max-height: 80%;
}

.info {
  height: 5%;
  border: 0.5em;
  background-color: #61a1f3;
}

.progress-area {
  position: inherit;
  width: 20%;
  height: 100%;
  border: 1em;
  /* background-color: #2a82f2; */
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
  position: relative;
  width: 100%;
  height: 10%;
}

.progress-step:last-child::after {
  display: none;
}

.progress-step::before {
  content: "";
  width: 1.2em;
  height: 1.2em;
  display: block;
  margin: 10% auto;
  background: #fff;
  border: 4px solid #dfe3e4;
  border-radius: 100%;
  color: #fff;
  cursor: pointer;
}

.progress-step::after {
  content: "";
  display: block;
  height: 100%;
  margin: -15% auto;
  transition: height 1s ease-in;
  width: 0.5em;
  background: #dfe3e4;
  z-index: 0;
}

.progress-step.is-active {
  color: #2183dd;
}

.progress-step.is-active::before {
  border: 4px solid #dfe3e4;
  background: #2183dd;
  animation: pulse 2s infinite;
}

.progress-step.is-complete {
  color: #2183dd;
}

.progress-step.is-complete::before {
  color: #fff;
  background: #2183dd;
  border: 4px solid transparent;
}

.progress-step.is-complete::after {
  background: #2183dd;
  /* animation: nextStep 1s;
  animation-fill-mode: forwards; */
}

.ranking-area {
  width: 80%;
  border: 1em;
  background-color: #9dc4f6;
  float: right;
}
</style>
