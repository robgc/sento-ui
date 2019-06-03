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
  <md-content>
    <div class="showcase-base">
      <md-toolbar
        id="showcase-toolbar"
        md-elevation="0"
      >
        <div class="md-toolbar-section-start">
          <md-button
            class="md-icon-button"
            @click="cleanShowcase"
          >
            <md-icon>arrow_back</md-icon>
          </md-button>
          <h3
            v-if="trendName !== undefined"
            class="md-title"
            style="flex: 1"
          >
            Resumen de <i>{{ trendName }}</i>
          </h3>
          <h3
            v-if="trendName === undefined"
            class="md-title"
            style="flex: 1"
          >
            Tendencias en {{ placeData.properties.name }}
          </h3>
        </div>
      </md-toolbar>
      <md-content
        class="md-layout md-scrollbar"
        :class="{
          'showcase-element-half-height': trendName === undefined,
          'showcase-element-full-height': trendName !== undefined
        }"
        id="showcase-analysis-section"
      >
        <md-content class="md-layout-item">
          <transition name="md-empty-state" mode="out-in">
            <component
              :is="getShowcaseAnalysisComponent"
              v-bind="getPropsForAnalytics"
              @on-study-trend="onStudyTrend"
            />
          </transition>
        </md-content>
      </md-content>
      <md-divider v-show="trendName === undefined" />
      <md-content
        v-show="trendName === undefined"
        class="md-layout md-scrollbar showcase-element-half-height"
        id="showcase-table-section"
      >
        <md-content class="md-layout-item" id="showcase-table-wrapper">
          <md-table
            id="showcase-table"
            v-model="items"
            md-fixed-header
            @md-selected="onRowSelection"
          >
            <md-table-row
              slot="md-table-row"
              slot-scope="{ item }"
              md-selectable="single"
            >
              <md-table-cell md-label="Tendencia">
                {{ item.topic_id }}
              </md-table-cell>
              <md-table-cell md-label="Posición" md-numeric>
                {{ item.ranking_no }}
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-content>
      </md-content>
    </div>
  </md-content>
</template>

<script>
import TheEmptyState from './TheEmptyState.vue';
import TheAnalysisContainer from './TheAnalysisContainer.vue';
import RepositoryFactory from '../repositories/RepositoryFactory';

const TrendsRepository = RepositoryFactory.get('trends');
const ReportsRepository = RepositoryFactory.get('reports');

export default {
  name: 'TheShowcase',

  components: {
    TheAnalysisContainer,
    TheEmptyState,
  },

  props: {
    placeData: { type: Object, required: false },
    trendName: { type: String, required: false },
    isMobileDisplay: { type: Boolean, required: true },
  },

  data() {
    return {
      items: [],
      selectedItem: undefined,
      sentimentData: {
        positiveCount: 0,
        neutralCount: 0,
        negativeCount: 0,
        totalCount: 0,
      },
      rankingData: [],
      globalRankingData: [],
    };
  },

  computed: {
    getShowcaseAnalysisComponent() {
      if (this.selectedItem || (!this.selectedItem && this.trendName)) {
        return 'TheAnalysisContainer';
      }
      return 'TheEmptyState';
    },

    getPropsForAnalytics() {
      return {
        sentimentData: this.sentimentData,
        rankingData: this.rankingData,
        globalRankingData: this.globalRankingData,
        isMobileDisplay: this.isMobileDisplay,
        trendId: this.selectedItem ? this.selectedItem.topic_id : this.trendName,
      };
    },
  },

  watch: {
    async placeData(value) {
      if (!(value === undefined || value === null || value === '')) {
        try {
          const trends = await TrendsRepository.getTrendsInLocation(this.placeData.id);
          this.items = trends;
        } catch (error) {
          console.log(error);
        }
      }
    },

    async trendName(trendId) {
      if (!(trendId === undefined || trendId === null || trendId === '')) {
        Object.assign(this.$data, this.$options.data.apply(this));
        await this.getSentimentDataForTrend(trendId);
        await this.getRankingDataForAllPlaces();
      }
    },
  },

  async created() {
    if (this.placeData) {
      await this.getDataForTrendRanking();
    } else {
      await this.getSentimentDataForTrend();
      await this.getRankingDataForAllPlaces();
    }
  },

  methods: {
    cleanShowcase() {
      this.$emit('on-back-clicked', { wasTrendData: this.trendName !== undefined });
      Object.assign(this.$data, this.$options.data.apply(this));
    },

    async onRowSelection(item) {
      this.selectedItem = item;
      if (!(item === undefined || item === null || item === '')) {
        await this.getSentimentDataForTrendInPlace();
        await this.getRankingDataForPlace();
      }
    },

    onStudyTrend(trendId) {
      Object.assign(this.$data, this.$options.data.apply(this));
      this.$emit('on-study-trend', trendId);
    },

    async getDataForTrendRanking() {
      const trends = await TrendsRepository.getTrendsInLocation(this.placeData.id);
      this.items = trends;
    },

    async getSentimentDataForTrend() {
      const respData = await ReportsRepository.getGlobalSentimentReport(this.trendName);

      this.sentimentData = {
        positiveCount: respData.positive,
        negativeCount: respData.negative,
        neutralCount: respData.neutral,
        totalCount: respData.total,
      };
    },

    async getSentimentDataForTrendInPlace() {
      const respData = await ReportsRepository.getSentimentReport(
        this.selectedItem.topic_id, this.placeData.id,
      );

      this.sentimentData = {
        positiveCount: respData.positive,
        negativeCount: respData.negative,
        neutralCount: respData.neutral,
        totalCount: respData.total,
      };
    },

    async getRankingDataForPlace() {
      const rankingData = await TrendsRepository.getTrendEvolution(
        this.placeData.id, this.selectedItem.topic_id,
      );

      this.rankingData = rankingData;
    },

    async getRankingDataForAllPlaces() {
      const rankingData = await TrendsRepository.getTrendEvolutionInAllLocations(this.trendName);

      this.globalRankingData = rankingData;
    },

  },
};
</script>

<style scoped>
.showcase-base {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: stretch;
}

.showcase-base,
#showcase-table-wrapper,
#showcase-table {
  min-height: 100%;
  max-height: 100%;
  height: 100%;
}

#showcase-analysis-section,
#showcase-table-section {
  overflow-y: auto;
}

#showcase-analysis-section,
#showcase-table-section,
#showcase-table-section >>> .md-table {
  min-width: 100%;
  width: 100%;
  max-width: 100%;
}

#showcase-table >>> table {
  min-width: 100% !important;
  width: 100% !important;
  max-width: 100% !important;
}

#showcase-toolbar >>> .md-toolbar-section-start {
  overflow-x: hidden;
}

#showcase-analysis-section >>> .md-layout-item {
  align-self: center;
}

.showcase-element-half-height >>> .md-table-content {
  height: calc(100% - 60px) !important;
  min-height: calc(100% - 60px) !important;
  max-height: calc(100% - 60px) !important;
}

@media (max-width: 320px) {
  #empty-state-container >>> .md-empty-state-label {
    font-size: 18px;
  }

  #empty-state-container >>> .md-empty-state-description {
    margin: 0;
  }
}

@media (max-width: 360px) {
  #empty-state-container >>> .md-empty-state-label {
    font-size: 18px;
  }

  #empty-state-container {
    padding: 0 16px;
  }

  /* #empty-state-container >>> .md-empty-state-description {
    margin: 16px;
  } */
}

@media (min-width: 360px) {
  #empty-state-container {
    padding: 16px;
  }
}

@media (max-width: 425px) {
  #empty-state-container {
    padding: 16px;
  }

  #empty-state-container >>> .md-empty-state-icon {
    width: 80px;
    min-width: 80px;
    height: 80px;
    font-size: 80px !important;
  }
}

@media (min-width: 425px) {
  #empty-state-container >>> .md-empty-state-icon {
    width: 120px;
    min-width: 120px;
    height: 120px;
    font-size: 120px !important;
  }
}

/* Media queries to determine the heights of TheShowcase's elements */
/*
md-toolbar (title): (56px or 48px) + 1px (divider)
md-divider: 1px
md-table's header: 57px
*/

@media (max-width: 601px) {
  .showcase-element-half-height {
    --view-height-vp-max-600px: calc(calc(100% - 57px) / 2);
    flex: 1 1 var(--view-height-vp-max-600px);
    height: var(--view-height-vp-max-600px);
    max-height: var(--view-height-vp-max-600px);
  }

  .showcase-element-full-height {
    --view-height-vp-max-600px: calc(100% - 57px);
    flex: 1 1 var(--view-height-vp-max-600px);
    height: var(--view-height-vp-max-600px);
    max-height: var(--view-height-vp-max-600px);
  }
}

@media (min-width: 601px) {
  .showcase-element-half-height {
    --view-height-vp-min-600px: calc(calc(100% - 49px) / 2);
    flex: 1 1 var(--view-height-vp-min-600px);
    height: var(--view-height-vp-min-600px);
    max-height: var(--view-height-vp-min-600px);
  }

  .showcase-element-full-height {
    --view-height-vp-min-600px: calc(100% - 49px);
    flex: 1 1 var(--view-height-vp-min-600px);
    height: var(--view-height-vp-min-600px);
    max-height: var(--view-height-vp-min-600px);
  }
}

@media (min-width: 961px) {
  .showcase-element-half-height {
    --view-height-vp-min-960px: calc(calc(100% - 65px) / 2);
    flex: 1 1 var(--view-height-vp-min-960px);
    height: var(--view-height-vp-min-960px);
    max-height: var(--view-height-vp-min-960px);
  }

  .showcase-element-full-height {
    --view-height-vp-min-960px: calc(100% - 65px);
    flex: 1 1 var(--view-height-vp-min-960px);
    height: var(--view-height-vp-min-960px);
    max-height: var(--view-height-vp-min-960px);
  }
}
</style>
