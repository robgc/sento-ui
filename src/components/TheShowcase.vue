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
            @click="cleanTrendSelection"
          >
            <md-icon>arrow_back</md-icon>
          </md-button>
          <h3
            v-if="isTimeLineData"
            class="md-title"
            style="flex: 1"
          >
            Ranking para {{ trendName }}
          </h3>
          <h3
            v-if="!isTimeLineData"
            class="md-title"
            style="flex: 1"
          >
            Tendencias en {{ placeData.properties.name }}
          </h3>
        </div>
      </md-toolbar>
      <md-content class="md-layout md-scrollbar" id="showcase-analysis-section">
        <md-content class="md-layout-item">
          <transition name="md-empty-state" mode="out-in">
            <component
              :is="getShowcaseAnalysisComponent"
              v-bind="getPropsForDynamic"
            />
          </transition>
        </md-content>
      </md-content>
      <md-divider />
      <md-content class="md-layout md-scrollbar" id="showcase-table-section">
        <!-- <md-content class="md-layout-item md-scrollbar">
          <md-steppers
            class="md-scrollbar"
            md-vertical
          >
            <md-step
              id="first"
              md-label="First"
            >
              <md-table
                v-model="items"
                md-fixed-header
                @md-selected="onRowSelection"
              >
                <md-table-row
                  slot="md-table-row"
                  slot-scope="{ item }"
                  md-selectable="single"
                >
                  <md-table-cell
                    v-if="!isTimeLineData"
                    md-label="Tendencia"
                  >
                    {{ item.trendName }}
                  </md-table-cell>
                  <md-table-cell
                    v-if="isTimeLineData"
                    md-label="Lugar"
                  >
                    {{ item.place }}
                  </md-table-cell>
                  <md-table-cell
                    md-label="Posición"
                    md-numeric
                  >
                    {{ item.position }}
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-step>
            <md-step
              id="second"
              md-label="Second"
            >
              <md-table
                v-model="items"
                md-fixed-header
                @md-selected="onRowSelection"
              >
                <md-table-row
                  slot="md-table-row"
                  slot-scope="{ item }"
                  md-selectable="single"
                >
                  <md-table-cell
                    v-if="!isTimeLineData"
                    md-label="Tendencia"
                  >
                    {{ item.trendName }}
                  </md-table-cell>
                  <md-table-cell
                    v-if="isTimeLineData"
                    md-label="Lugar"
                  >
                    {{ item.place }}
                  </md-table-cell>
                  <md-table-cell
                    md-label="Posición"
                    md-numeric
                  >
                    {{ item.position }}
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-step>
            <md-step
              id="third"
              md-label="Third"
            >
              <md-table
                v-model="items"
                md-fixed-header
                @md-selected="onRowSelection"
              >
                <md-table-row
                  slot="md-table-row"
                  slot-scope="{ item }"
                  md-selectable="single"
                >
                  <md-table-cell
                    v-if="!isTimeLineData"
                    md-label="Tendencia"
                  >
                    {{ item.trendName }}
                  </md-table-cell>
                  <md-table-cell
                    v-if="isTimeLineData"
                    md-label="Lugar"
                  >
                    {{ item.place }}
                  </md-table-cell>
                  <md-table-cell
                    md-label="Posición"
                    md-numeric
                  >
                    {{ item.position }}
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </md-step>
          </md-steppers>
        </md-content> -->
        <md-content class="md-layout-item">
          <md-table
            v-model="items"
            md-fixed-header
            @md-selected="onRowSelection"
          >
            <md-table-row
              slot="md-table-row"
              slot-scope="{ item }"
              md-selectable="single"
            >
              <md-table-cell v-if="!isTimeLineData" md-label="Tendencia">
                {{ item.topic_id }}
              </md-table-cell>
              <!-- <md-table-cell v-if="isTimeLineData" md-label="Lugar">
                {{ item.place }}
              </md-table-cell> -->
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
import axios from 'axios';
import TheEmptyState from './TheEmptyState.vue';
import TheAnalysisContainer from './TheAnalysisContainer.vue';

export default {
  name: 'TheShowcase',
  components: {
    TheAnalysisContainer,
    TheEmptyState,
  },
  props: {
    isTimeLineData: { type: Boolean, required: true },
    placeData: { type: Object, required: false },
    trendName: { type: String, required: false },
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
      rankingData: {},
    };
  },
  computed: {
    getShowcaseAnalysisComponent() {
      if (this.selectedItem) {
        return 'TheAnalysisContainer';
      }
      return 'TheEmptyState';
    },
    getPropsForDynamic() {
      return {
        sentimentData: this.sentimentData,
        rankingData: this.rankingData,
      };
    },
  },
  watch: {
    async placeData() {
      try {
        this.items = (await axios.get(
          `${process.env.VUE_APP_SENTO_API_ADDRESS}/trends/${this.placeData.id}`,
        )).data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    await this.getDataForTrendRanking();
  },
  methods: {
    cleanTrendSelection() {
      this.$emit('on-back-clicked', this.$event);
      this.selectedItem = undefined;
    },
    async onRowSelection(item) {
      this.selectedItem = item;
      await this.getSentimentDataForPlace();
      await this.getRankingDataForPlace();
    },
    async getDataForTrendRanking() {
      try {
        this.items = (await axios.get(
          `${process.env.VUE_APP_SENTO_API_ADDRESS}/trends/${this.placeData.id}`,
        )).data;
      } catch (error) {
        console.log(error);
      }
    },
    async getSentimentDataForPlace() {
      try {
        const respData = (await axios.get(
          `${process.env.VUE_APP_SENTO_API_ADDRESS}/reports/sentiment/${this.placeData.id}/${encodeURIComponent(this.selectedItem.topic_id)}`,
        )).data;
        this.sentimentData = {
          positiveCount: respData.positive,
          negativeCount: respData.negative,
          neutralCount: respData.neutral,
          totalCount: respData.total,
        };
      } catch (error) {
        console.log(error);
      }
    },
    async getRankingDataForPlace() {
      try {
        this.rankingData = (await axios.get(
          `${process.env.VUE_APP_SENTO_API_ADDRESS}/trends/evolution/${this.placeData.id}/${encodeURIComponent(this.selectedItem.topic_id)}`,
        )).data;
      } catch (error) {
        console.log(error);
      }
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

#showcase-analysis-section,
#showcase-table-section {
  overflow-y: auto;
}

#showcase-analysis-section,
#showcase-table-section,
#showcase-table-section >>> .md-table {
  min-width: 100%;
  max-width: 100%;
}

#showcase-toolbar >>> .md-toolbar-section-start {
  overflow-x: hidden;
}

#showcase-analysis-section >>> .md-layout-item {
  align-self: center;
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
md-toolbars: 56px or 48px (We always have 2 toolbars)
md-tabs-bar: 48px
md-divider: 1px
md-table's header: 58px
*/

@media (max-width: 601px) {
  #showcase-table-section,
  #showcase-analysis-section {
    --view-height-vp-max-600px: calc(
      calc(100vh - calc(calc(56px * 2) + 48px + 1px)) / 2
    );
    flex: 1 1 var(--view-height-vp-max-600px);
    max-height: var(--view-height-vp-max-600px);
  }

  #showcase-table-section >>> .md-table-content {
    --view-height-vp-max-600px: calc(
      calc(100vh - calc(calc(56px * 2) + 48px + 1px)) / 2
    );
    min-height: calc(var(--view-height-vp-max-600px) - 57px) !important;
    max-height: calc(var(--view-height-vp-max-600px) - 57px) !important;
    height: calc(var(--view-height-vp-max-600px) - 57px) !important;
  }
}

@media (min-width: 601px) {
  #showcase-table-section,
  #showcase-analysis-section {
    --view-height-vp-min-600px: calc(calc(100vh - calc(calc(48px * 3) + 1px)) / 2);
    flex: 1 1 var(--view-height-vp-min-600px);
    max-height: var(--view-height-vp-min-600px);
  }

  #showcase-table-section >>> .md-table-content {
    --view-height-vp-min-600px: calc(
      calc(100vh - calc(calc(56px * 2) + 48px + 1px)) / 2
    );
    min-height: calc(var(--view-height-vp-min-600px) - 57px) !important;
    max-height: calc(var(--view-height-vp-min-600px) - 57px) !important;
    height: calc(var(--view-height-vp-min-600px) - 57px) !important;
  }
}

@media (min-width: 961px) {
  #showcase-table-section,
  #showcase-analysis-section {
    --view-height-vp-min-960px: calc(calc(100vh - calc(calc(64px * 2) + 1px)) / 2);
    flex: 1 1 var(--view-height-vp-min-960px);
    max-height: var(--view-height-vp-min-960px);
  }

  #showcase-table-section >>> .md-table-content {
    --view-height-vp-min-960px: calc(calc(100vh - calc(calc(64px * 2) + 1px)) / 2);
    height: calc(var(--view-height-vp-min-960px) - 57px) !important;
    min-height: calc(var(--view-height-vp-min-960px) - 57px) !important;
    max-height: calc(var(--view-height-vp-min-960px) - 57px) !important;
  }
}
</style>
