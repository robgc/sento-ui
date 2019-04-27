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
    <md-toolbar md-elevation="0">
      <div class="md-toolbar-section-start">
        <md-button
          class="md-icon-button"
          @click="$emit('on-back-clicked', $event)"
        >
          <md-icon>arrow_back</md-icon>
        </md-button>
        <h3 v-if="isTimeLineData" class="md-title" style="flex: 1">
          Ranking para {{ trendName }}
        </h3>
        <h3 v-if="!isTimeLineData" class="md-title" style="flex: 1">
          Tendencias en {{ placeName }}
        </h3>
      </div>
    </md-toolbar>
    <md-content id="analysis-view">
      <md-empty-state
        id="empty-state-container"
        md-icon="donut_small"
        md-label="Selecciona un elemento de la lista"
        md-description="Visualiza un análisis para el elemento deseado."
        v-show="selectedItem === undefined"
      />
    </md-content>
    <md-divider />
    <md-content id="table-view">
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
            {{ item.trendName }}
          </md-table-cell>
          <md-table-cell v-if="isTimeLineData" md-label="Lugar">
            {{ item.place }}
          </md-table-cell>
          <md-table-cell md-label="Posición" md-numeric>
            {{ item.position }}
          </md-table-cell>
        </md-table-row>
      </md-table>
    </md-content>
  </md-content>
</template>

<script>
export default {
  name: 'TheShowcase',
  props: {
    isTimeLineData: { type: Boolean, required: true },
    placeName: { type: String, required: false },
    trendName: { type: String, required: false },
  },
  data() {
    return {
      items: undefined,
      selectedItem: undefined,
    };
  },
  created() {
    this.items = [
      { trendName: '#Trend1', position: 1 },
      { trendName: '#Trend2', position: 2 },
      { trendName: '#Trend3', position: 3 },
      { trendName: '#Trend3', position: 3 },
      { trendName: '#Trend3', position: 3 },
      { trendName: '#Trend3', position: 3 },
      { trendName: '#Trend3', position: 3 },
      { trendName: '#Trend3', position: 3 },
      { trendName: '#Trend3', position: 3 },
      { trendName: '#Trend3', position: 3 },
      { trendName: '#Trend3', position: 3 },
      { trendName: '#Trend3', position: 3 },
      { trendName: '#Trend3', position: 3 },
      { trendName: '#Trend3', position: 3 },
      { trendName: '#Trend3', position: 3 },
    ];
  },
  methods: {
    onRowSelection(item) {
      this.selectedItem = item;
    },
  },
};
</script>

<style scoped>
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

@media (max-width: 600px) {
  #analysis-view, #table-view, #empty-state-container, #table-view >>> .md-table {
    --view-height-vp-max-600px: calc(calc(100vh - calc(calc(56px * 2) + 48px + 1px)) / 2);
    min-height: var(--view-height-vp-max-600px);
    max-height: var(--view-height-vp-max-600px);
  }

  #table-view >>> .md-table-content {
    --view-height-vp-max-600px: calc(calc(100vh - calc(calc(56px * 2) + 48px + 1px)) / 2);
    min-height: calc(var(--view-height-vp-max-600px) - 57px) !important;
    max-height: calc(var(--view-height-vp-max-600px) - 57px) !important;
    height: calc(var(--view-height-vp-max-600px) - 57px) !important;
  }
}

@media (min-width: 600px) {
  #analysis-view, #table-view, #empty-state-container, #table-view >>> .md-table {
    --view-height-vp-min-600px: calc(calc(100vh - calc(calc(56px * 2) + 48px + 1px)) / 2);
    min-height: calc(calc(100vh - calc(calc(48px * 3) + 1px)) / 2);
    max-height: calc(calc(100vh - calc(calc(48px * 3) + 1px)) / 2);
  }

  #table-view >>> .md-table-content {
    --view-height-vp-min-600px: calc(calc(100vh - calc(calc(56px * 2) + 48px + 1px)) / 2);
    min-height: calc(var(--view-height-vp-min-600px) - 57px) !important;
    max-height: calc(var(--view-height-vp-min-600px) - 57px) !important;
    height: calc(var(--view-height-vp-min-600px) - 57px) !important;
  }
}

@media (min-width: 960px) {
  #analysis-view, #table-view, #empty-state-container, #table-view >>> .md-table {
    --view-height-vp-min-960px: calc(calc(100vh - calc(calc(56px * 2) + 48px + 1px)) / 2);
    min-height: calc(calc(100vh - calc(calc(64px * 2) + 1px)) / 2);
    max-height: calc(calc(100vh - calc(calc(64px * 2) + 1px)) / 2);
  }

  #table-view >>> .md-table-content {
    --view-height-vp-min-960px: calc(calc(100vh - calc(calc(56px * 2) + 48px + 1px)) / 2);
    min-height: calc(var(--view-height-vp-min-960px) - 57px) !important;
    max-height: calc(var(--view-height-vp-min-960px) - 57px) !important;
    height: calc(var(--view-height-vp-min-960px) - 57px) !important;
  }
}
</style>
