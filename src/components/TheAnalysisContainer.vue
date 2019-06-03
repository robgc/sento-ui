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
  <md-content class="md-layout analysis-container">
    <md-card class="analysis-container-card">
      <md-card-header>
        <div class="md-title">
          Evolución en el ranking
        </div>
      </md-card-header>
      <md-card-content class="md-scrollbar" id="ranking-chart-card-content">
        <component
          id="ranking-chart-wrapper"
          class="md-layout-item chart-container"
          :style="rankingComponentStyle"
          :is="rankingComponentType"
          v-bind="rankingComponentProps"
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
        <component
          :class="{
            'md-layout-item chart-container': this.sentimentData.totalCount !== 0
          }"
          :is="sentimentComponentType"
          v-bind="sentimentComponentProps"
        />
      </md-card-content>
    </md-card>
    <md-divider />
    <div class="md-layout md-layout-item">
      <div class="md-layout-item">
        <md-button
          v-show="this.rankingData.length"
          class="md-raised md-primary"
          @click="$emit('on-study-trend', trendId)"
        >
          Estudiar tendencia
        </md-button>
      </div>
      <div class="md-layout-item">
        <md-button class="md-raised md-primary" @click="openTwitterTab">
          Ver tendencia en Twitter
        </md-button>
      </div>
    </div>
  </md-content>
</template>

<script>
import * as _ from 'lodash';
import TheDoughnutChart from './charts/TheDoughnutChart.vue';
import TheLineChart from './charts/TheLineChart.vue';
import TheScatterChart from './charts/TheScatterChart.vue';
import NoData from './NoData.vue';
import COLOR_RAMP from '../constants';

export default {
  name: 'TheAnalysisContainer',

  components: {
    TheDoughnutChart,
    TheLineChart,
    TheScatterChart,
    NoData,
  },

  props: {
    sentimentData: { type: Object, required: true },
    rankingData: { type: Array, required: false },
    globalRankingData: { type: Array, required: false },
    trendId: { type: String, required: true },
    isMobileDisplay: { type: Boolean, required: true },
  },

  computed: {
    rankingComponentType() {
      if (this.rankingData.length) {
        return 'TheLineChart';
      }
      return 'TheScatterChart';
    },

    sentimentComponentType() {
      if (this.sentimentData.totalCount !== 0) {
        return 'TheDoughnutChart';
      }
      return 'NoData';
    },

    rankingComponentStyle() {
      const numberOfDataPoints = this.rankingData.length > 0
        ? this.rankingData.length : this.globalRankingChartData.labels.length;

      if (!this.isMobileDisplay) {
        if (numberOfDataPoints * 5 < 25) {
          return { width: '25vw' };
        }
        return { width: `${numberOfDataPoints * 5}vw` };
      }

      if (numberOfDataPoints * 15 < 95) {
        return { width: '95vw' };
      }
      return { width: `${numberOfDataPoints * 15}vw` };
    },

    rankingComponentProps() {
      if (this.rankingData.length) {
        return { chartData: this.rankingChartData };
      }
      return { chartData: this.globalRankingChartData };
    },

    sentimentComponentProps() {
      if (this.sentimentData.totalCount !== 0) {
        return { chartData: this.sentimentChartData };
      }
      return {};
    },

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

    globalRankingChartData() {
      const chartDatasets = [];
      const availableRamp = [...COLOR_RAMP];
      let rankingItemDates = [];

      _.forEach(this.globalRankingData, (rankingItem) => {
        const rankingItemColor = _.pullAt(availableRamp, 0)[0];
        const rankingItemPositions = [];

        _.forEach(rankingItem.evolution, (evolutionPoint) => {
          const evolutionTs = new Date(evolutionPoint.timestamp);

          if (!_.find(rankingItemDates, date => date.getTime() === evolutionTs.getTime())) {
            rankingItemDates.push(evolutionTs);
          }

          rankingItemPositions.push({
            x: evolutionTs,
            y: evolutionPoint.position,
          });
        });

        chartDatasets.push(
          {
            label: rankingItem.location,
            fill: false,
            data: rankingItemPositions,
            borderColor: rankingItemColor,
            backgroundColor: rankingItemColor,
          },
        );
      });

      rankingItemDates = _.sortBy(rankingItemDates);

      return {
        datasets: chartDatasets,
        labels: rankingItemDates,
      };
    },
  },

  methods: {
    openTwitterTab() {
      window.open(
        `https://twitter.com/search?q=${encodeURIComponent(this.trendId)}`, '_blank',
      );
    },
  },
};
</script>

<style>
.analysis-container {
  height: 100%;
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
  height: 35vh;
  margin-top: 5px;
  margin-bottom: 5px;
}

#showcase-analysis-section > div {
  max-height: 100%;
}

@media (max-width: 601px) {
  #ranking-chart-card-content {
    max-width: 75vw;
  }
  .chart-container {
    height: 60%;
    max-height: 60%;
  }
}

@media (min-width: 601px) {
  #ranking-chart-card-content {
    max-width: 90vw;
  }
  .chart-container {
    height: 65%;
    max-height: 65%;
  }
}

@media (min-width: 961px) {
  #ranking-chart-card-content {
    max-width: 25vw;
  }
  .chart-container {
    height: 65%;
    max-height: 65%;
  }
}
</style>
