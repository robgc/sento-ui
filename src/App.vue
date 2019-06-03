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
  <div class="page-container" id="app-container">
    <md-app>
      <the-toolbar
        slot="md-app-toolbar"
        :menuVisible="menuVisible"
        :isMobileDisplay="isMobileDisplay"
        :clearSearchContent="clearSearchContent"
        @on-menu-click="updateMenuVisibility"
        @on-trend-selected="displayTrendInformation"
      />
      <md-app-drawer :md-active.sync="menuVisible">
        <the-help/>
      </md-app-drawer>
      <md-app-content class="md-layout" id="app-content">
        <the-map
          v-show="currentTab === 'tab-map'"
          class="md-layout-item"
          :class="{
            'md-size-100': !isPlaceShowcaseActive || (isMobileDisplay && currentTab === 'tab-map'),
            'md-size-70': !isMobileDisplay && isPlaceShowcaseActive
          }"
          :searchedTrend="searchedTrend"
          id="map"
          ref="map"
          @on-layer-clicked="displayPlaceShowcase"
        />
        <the-showcase
          v-show="(!isMobileDisplay && isPlaceShowcaseActive)
            || (isMobileDisplay && currentTab === 'tab-data')
          "
          class="md-layout-item app-showcase"
          :class="{
            'md-size-100': isMobileDisplay && currentTab === 'tab-data',
            'md-size-30': !isMobileDisplay && isPlaceShowcaseActive,
          }"
          v-if="selectedPlaceData || searchedTrend"
          :trendName="searchedTrend"
          :placeData="selectedPlaceData"
          :isMobileDisplay="isMobileDisplay"
          @on-back-clicked="removeShowcase"
          @on-study-trend="displayTrendInformation"
        />
        <the-tabs-bar
          v-show="isMobileDisplay"
          :current-tab="currentTab"
          :is-data-tab-disabled="isDataTabDisabled"
          @on-tab-change="handleTabChange"
        />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import TheMap from './components/TheMap.vue';
import TheToolbar from './components/TheToolbar.vue';
import TheTabsBar from './components/TheTabsBar.vue';
import TheShowcase from './components/TheShowcase.vue';
import TheHelp from './components/TheHelp.vue';

const tabsCatalog = {
  'tab-map': 'tab-map',
  'tab-data': 'tab-data',
};

export default {
  name: 'app',
  components: {
    TheToolbar,
    TheMap,
    TheTabsBar,
    TheShowcase,
    TheHelp,
  },
  data() {
    return {
      menuVisible: false,
      isPlaceShowcaseActive: false,
      selectedPlaceData: undefined,
      searchedTrend: undefined,
      isMobileDisplay: false,
      currentTab: tabsCatalog['tab-map'],
      clearSearchContent: 0,
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    updateMenuVisibility(value) {
      this.menuVisible = value;
    },

    async displayPlaceShowcase(featureData) {
      const mapComponent = this.$refs.map;
      this.selectedPlaceData = featureData;
      this.isPlaceShowcaseActive = true;
      await this.$nextTick();
      mapComponent.resizeMap();
      await this.$nextTick();
      if (this.isMobileDisplay) {
        this.currentTab = tabsCatalog['tab-data'];
      }
      await mapComponent.flyToCurrentPlace();
    },

    async displayTrendInformation(trendName) {
      const mapComponent = this.$refs.map;
      this.searchedTrend = trendName;
      this.isPlaceShowcaseActive = true;
      await this.$nextTick();
      mapComponent.resizeMap();
      await this.$nextTick();
      if (this.isMobileDisplay) {
        this.currentTab = tabsCatalog['tab-data'];
      }
    },

    handleResize() {
      this.isMobileDisplay = window.innerWidth <= 960;
      if (!this.isMobileDisplay) {
        this.currentTab = tabsCatalog['tab-map'];
      }
    },

    handleTabChange(destinationTabId) {
      this.currentTab = tabsCatalog[destinationTabId];
    },

    async removeShowcase(showcaseContext) {
      const mapComponent = this.$refs.map;
      // Hide showcase
      this.isPlaceShowcaseActive = false;
      this.currentTab = tabsCatalog['tab-map'];

      // Remove values from data keys that are props of the showcase
      this.searchedTrend = undefined;
      this.selectedPlaceData = undefined;

      // Refresh map information
      await this.$nextTick();
      if (showcaseContext.wasTrendData) {
        await mapComponent.getLocationsWithTrendsSource();
        this.clearSearchContent += 1;
      } else {
        mapComponent.deselectCurrentFeature();
      }
      mapComponent.resizeMap();
      await this.$nextTick();
    },
  },
  computed: {
    isDataTabDisabled() {
      return !this.isPlaceShowcaseActive;
    },
  },
};
</script>

<style scoped>
#app-content {
  padding: 0;
  border: 0;
}

#app-container {
  min-width: 320px;
  min-height: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app-container >>> .md-app,
#app-container >>> .md-app-container {
  min-height: 100%;
  height: 100%;
  max-height: 100%;
}

.app-showcase {
  margin-left: 0;
  margin-right: 0;
}

@media (max-width: 601px) {
  #app-container >>> .md-app-scroller {
    min-height: calc(100% - 56px);
    max-height: calc(100% - 56px);
    height: calc(100% - 56px);
  }
}

@media (min-width: 601px) {
  #app-container >>> .md-app-scroller {
    min-height: calc(100% - 48px);
    max-height: calc(100% - 48px);
    height: calc(100% - 48px);
  }
}

@media (max-width: 961px) {
  .app-showcase,
  #map {
    min-height: calc(100% - 48px);
    max-height: calc(100% - 48px);
    height: calc(100% - 48px);
  }
}

@media (min-width: 961px) {
  #app-container >>> .md-app-scroller {
    min-height: calc(100% - 64px);
    max-height: calc(100% - 64px);
    height: calc(100% - 64px);
  }

  .app-showcase,
  #map {
    min-height: 100%;
    max-height: 100%;
    height: 100%;
  }
}
</style>
