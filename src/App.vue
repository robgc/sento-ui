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
  <div class="page-container" id="app">
    <md-app>
      <the-toolbar
        slot="md-app-toolbar"
        :menuVisible="menuVisible"
        :isMobileDisplay="isMobileDisplay"
        @on-menu-click="updateMenuVisibility"
        @on-trend-selected="displayTrendInformation"
      />
      <md-app-drawer :md-active.sync="menuVisible" />
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
          @on-back-clicked="removeShowcase"
        />
        <the-tabs-bar
          v-if="isMobileDisplay"
          :current-tab="currentTab"
          :is-data-tab-disabled="isDataTabDisabled"
          @on-tab-change="handleTabChange"
        />
        <!-- <timeline /> -->
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import TheMap from './components/TheMap.vue';
import TheToolbar from './components/TheToolbar.vue';
import TheTabsBar from './components/TheTabsBar.vue';
import TheShowcase from './components/TheShowcase.vue';

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
  },
  data() {
    return {
      menuVisible: false,
      isPlaceShowcaseActive: false,
      selectedPlaceData: undefined,
      searchedTrend: undefined,
      isMobileDisplay: false,
      currentTab: tabsCatalog['tab-map'],
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

    async removeShowcase() {
      const mapComponent = this.$refs.map;
      this.isPlaceShowcaseActive = false;
      this.currentTab = tabsCatalog['tab-map'];
      await this.$nextTick();
      mapComponent.resizeMap();
      await this.$nextTick();
      mapComponent.deselectCurrentFeature();
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

#app {
  min-width: 320px;
  min-height: 100vh;
  overflow-x: hidden;
}

.app-showcase {
  margin-left: 0;
  margin-right: 0;
}
</style>
