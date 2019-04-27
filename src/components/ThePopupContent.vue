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
  <div class="popup-content">
    <div class="data">
      {{ layerFeature }}
    </div>
    <figure class="bar">
      <span class="block" title="Positivo" :style="{width: positivePercentage + '%'}">
        <span class="value">
          {{ positivePercentage.toFixed(2) }}%
        </span>
      </span>
      <span class="block" title="Neutro" :style="{width: neutralPercentage + '%'}">
        <span class="value">
          {{ neutralPercentage.toFixed(2) }}%
        </span>
      </span>
      <span class="block" title="Negativo" :style="{width: negativePercentage + '%'}">
        <span class="value">
          {{ negativePercentage.toFixed(2) }}%
        </span>
      </span>
    </figure>
  </div>
</template>

<script>

export default {
  name: 'PopupContent',
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
.data {
  margin: initial;
  font-family: 'Open Sans', sans-serif;
}

.bar {
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
  overflow: hidden;
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
  overflow: hidden;
  opacity: 1;
  transition: opacity, 0.3s ease;
}

.block:nth-of-type(2) {
  background-color: #cf360f;
}

.block:nth-of-type(3) {
  background-color: #5d5f5f;
}

.block:hover {
  opacity: 0.65;
}

.value {
  display: block;
  line-height: 1em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  font-weight: bold;
}
</style>
