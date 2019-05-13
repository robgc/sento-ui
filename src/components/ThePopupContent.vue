<!--
Copyright (C) 2019 Roberto García Calero (garcalrob@gmail.com)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<template>
  <div class="md-layout popup-content">
    <figure class="bar md-layout-item">
      <span class="block" :style="{width: positivePercentage + '%'}">
        <span class="value">
          {{ positivePercentage.toFixed(2) }}%
        </span>
        <md-tooltip md-direction="top">Positivo</md-tooltip>
      </span>
      <span class="block" :style="{width: neutralPercentage + '%'}">
        <span class="value">
          {{ neutralPercentage.toFixed(2) }}%
        </span>
        <md-tooltip md-direction="top">Neutro</md-tooltip>
      </span>
      <span class="block" :style="{width: negativePercentage + '%'}">
        <span class="value">
          {{ negativePercentage.toFixed(2) }}%
        </span>
        <md-tooltip md-direction="top">Negativo</md-tooltip>
      </span>
    </figure>
    <div class="md-layout md-layout-item">
      <div class="md-layout-item">
        <md-button :md-ripple="true" class="md-raised md-primary">Estudiar tendencia</md-button>
      </div>
      <div class="md-layout-item">
        <md-button class="md-raised md-primary">Ver tendencia en Twitter</md-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ThePopupContent',
  props: ['layerFeature'],
  computed: {
    positivePercentage() {
      return (this.layerFeature.positiveCount / this.layerFeature.totalCount) * 100;
    },
    neutralPercentage() {
      return (this.layerFeature.neutralCount / this.layerFeature.totalCount) * 100;
    },
    negativePercentage() {
      return (this.layerFeature.negativeCount / this.layerFeature.totalCount) * 100;
    },
  },
};
</script>

<style scoped>
.popup-content {
  flex-direction: column;
  min-width: 0;
}

.data {
  margin: initial;
}

.bar {
  flex: 1;
  margin-bottom: 1em;
}

@keyframes expand {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.bar {
  width: 0%;
  animation: expand 0.75s ease forwards;
  margin: initial;
}

.row + .row .bar {
  animation-delay: 0.2s;
}

.row + .row + .row .bar {
  animation-delay: 0.4s;
}

.block {
  display: block;
  height: 2.5em;
  color: #fff;
  font-size: 0.75em;
  float: left;
  background-color: #21d35c;
  position: relative;
  opacity: 1;
  transition: opacity, 0.3s ease;
}

.block:nth-of-type(2) {
  background-color: #5d5f5f;
}

.block:nth-of-type(3) {
  background-color: #cf360f;
}

.value {
  display: block;
  line-height: 1em;
  position: absolute;
  top: 50%;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%);
  font-weight: bold;
}
</style>
