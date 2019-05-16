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
  <div class="md-layout analysis-container">
    <md-card class="analysis-container-card">
      <md-card-header>
        <div class="md-title">
          Evolución en el ranking
        </div>
      </md-card-header>
      <md-card-content class="md-scrollbar" id="ranking-chart-card-content">
        <the-line-chart
          class="md-layout-item chart-container"
          :style="{'overflow-x': 'auto', width: this.rankingData.length * 5 + 'vw'}"
          id="ranking-chart-wrapper"
          :chart-data="rankingChartData"
        />
      </md-card-content>
    </md-card>
    <md-card class="analysis-container-card">
      <md-card-header>
        <div class="md-title">
          Análisis de sentimiento
        </div>
      </md-card-header>
      <md-card-content>
        <the-doughnut-chart
          class="md-layout-item chart-container"
          :chart-data="sentimentChartData"
        />
      </md-card-content>
    </md-card>
    <md-divider />
    <div class="md-layout md-layout-item">
      <div class="md-layout-item">
        <md-button class="md-raised md-primary" :md-ripple="true">
          Estudiar tendencia
        </md-button>
      </div>
      <div class="md-layout-item">
        <md-button class="md-raised md-primary">
          Ver tendencia en Twitter
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';
import TheDoughnutChart from './charts/TheDoughnutChart.vue';
import TheLineChart from './charts/TheLineChart.vue';


export default {
  name: 'TheAnalysisContainer',
  components: {
    TheDoughnutChart,
    TheLineChart,
  },
  props: {
    sentimentData: { type: Object, required: true },
    rankingData: { type: Array, required: true },
  },
  computed: {
    sentimentChartData() {
      return {
        datasets: [{
          data: [
            this.sentimentData.positiveCount,
            this.sentimentData.negativeCount,
            this.sentimentData.neutralCount,
          ],
          backgroundColor: [
            '#21d35c',
            '#cf360f',
            '#5d5f5f',
          ],
        }],
        labels: [
          'Positivo',
          'Negativo',
          'Neutro',
        ],
      };
    },
    rankingChartData() {
      const dateLabels = [];
      const dateValues = [];

      _.forEach(this.rankingData, (rankingItem) => {
        dateLabels.push(new Date(rankingItem.timestamp));
        dateValues.push(rankingItem.number);
      });

      return {
        datasets: [{
          fill: false,
          data: dateValues,
          borderColor: '#448aff',
          backgroundColor: '#448aff',
        }],
        labels: dateLabels,
      };
    },
  },
};
</script>

<style>
.analysis-container {
  flex-direction: column;
}

#ranking-chart-card-content {
  padding-left: 0;
  margin-left: 16px;
  overflow-x: auto;
}

#ranking-chart-wrapper {
  overflow-x: auto;
  width: 100vw;
}

.analysis-container-card {
  margin-top: 5px;
  margin-bottom: 5px;
}

@media (max-width: 601px) {
  #ranking-chart-card-content {
    max-width: 75vw;
  }
  .chart-container {
    height: 35vh;
    max-height: 35vh;
  }
}

@media (min-width: 601px) {
  #ranking-chart-card-content {
    max-width: 90vw;
  }
  .chart-container {
    height: 30vh;
    max-height: 30vh;
  }
}

@media (min-width: 961px) {
  #ranking-chart-card-content {
    max-width: 25vw;
  }
  .chart-container {
    height: 25vh;
    max-height: 25vh;
  }
}
</style>
