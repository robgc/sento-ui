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
  <md-app-toolbar class="md-primary">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <md-button
          class="md-icon-button"
          @click="$emit('on-menu-click', !menuVisible)"
        >
          <md-icon>menu</md-icon>
        </md-button>
      </div>

      <md-dialog id="autocomplete-dialog" :md-active.sync="showSearchDialog" :md-fullscreen="false">
        <md-autocomplete
          class="search"
          v-model="searchQuery"
          :md-options="trends"
          @md-opened="getTopTrends"
          @md-selected="onTrendSelected"
          md-layout="box"
        >
          <label>Buscar una tendencia...</label>
          <template
            slot="md-autocomplete-item"
            slot-scope="{ item }"
          >
            {{ item.trend ? item.trend : item }}
          </template>
        </md-autocomplete>
      </md-dialog>

      <md-autocomplete
        class="search"
        v-show="!isMobileDisplay"
        v-model="searchQuery"
        :md-options="trends"
        @md-opened="getTopTrends"
        @md-selected="onTrendSelected"
        md-layout="box"
      >
        <label>Buscar una tendencia...</label>
        <template
          slot="md-autocomplete-item"
          slot-scope="{ item }"
        >
          {{ item.trend ? item.trend : item }}
        </template>
      </md-autocomplete>

      <div class="md-toolbar-section-end">
        <md-button
          class="md-icon-button"
          v-show="isMobileDisplay"
          @click="showSearchDialog = true"
        >
          <md-icon>search</md-icon>
        </md-button>
      </div>
    </div>
  </md-app-toolbar>
</template>

<script>
import * as _ from 'lodash';
import RepositoryFactory from '../repositories/RepositoryFactory';

const TrendsRepository = RepositoryFactory.get('trends');

export default {
  name: 'TheToolbar',
  data() {
    return {
      searchQuery: '',
      selectedTrend: null,
      trends: [],
      showSearchDialog: false,
    };
  },
  props: {
    menuVisible: { type: Boolean, required: true },
    isMobileDisplay: { type: Boolean, required: true },
    clearSearchContent: { type: Number, required: true },
  },
  watch: {
    searchQuery(newQuery, oldQuery) {
      if (oldQuery !== null && newQuery !== null && oldQuery.length > 0 && newQuery.length === 0) {
        this.getTopTrends();
      } else {
        this.debouncedSearchTrends();
      }
    },
    clearSearchContent() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
  },
  created() {
    this.debouncedSearchTrends = _.debounce(this.searchTrends, 500);
  },
  methods: {
    getTopTrends() {
      this.trends = new Promise((resolve) => {
        window.setTimeout(() => {
          resolve(TrendsRepository.getTopTrends());
        }, 500);
      });
    },
    searchTrends() {
      this.trends = new Promise((resolve) => {
        window.setTimeout(() => {
          resolve(TrendsRepository.searchTrend(this.searchQuery));
        }, 100);
      });
    },
    onTrendSelected(selectedTrend) {
      const trendName = selectedTrend.trend ? selectedTrend.trend : selectedTrend;
      this.selectedTrend = trendName;
      this.showSearchDialog = false;
      this.$emit('on-trend-selected', trendName);
    },
  },
};
</script>

<style scoped>
.search {
  max-width: 500px;
}

#autocomplete-dialog {
  z-index: 8;
}
</style>
