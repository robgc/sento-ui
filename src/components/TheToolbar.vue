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
        <h3 class="md-title">Sento</h3>
      </div>
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

      <div class="md-toolbar-section-end">
      </div>
    </div>
  </md-app-toolbar>
</template>

<script>
import axios from 'axios';
import * as _ from 'lodash';

export default {
  name: 'TheToolbar',
  data() {
    return {
      searchQuery: null,
      selectedTrend: null,
      trends: [],
    };
  },
  props: {
    menuVisible: Boolean,
  },
  watch: {
    searchQuery(newQuery, oldQuery) {
      if (oldQuery !== null && newQuery !== null && oldQuery.length > 0 && newQuery.length === 0) {
        this.getTopTrends();
      } else {
        this.debouncedSearchTrends();
      }
    },
  },
  created() {
    this.debouncedSearchTrends = _.debounce(this.searchTrends, 500);
  },
  methods: {
    getTopTrends() {
      this.trends = new Promise((resolve) => {
        window.setTimeout(() => {
          resolve(
            axios
              .get(`${process.env.VUE_APP_SENTO_API_ADDRESS}/trends/top`)
              .then(response => response.data)
              .catch(error => console.error(error)),
          );
        }, 500);
      });
    },
    searchTrends() {
      this.trends = new Promise((resolve) => {
        window.setTimeout(() => {
          resolve(
            axios
              .get(`${process.env.VUE_APP_SENTO_API_ADDRESS}/trends/search/${encodeURIComponent(this.searchQuery)}`)
              .then(response => response.data)
              .catch(error => console.error(error)),
          );
        }, 100);
      });
    },
    onTrendSelected(selectedTrend) {
      const trendName = selectedTrend.trend ? selectedTrend.trend : selectedTrend;
      this.selectedTrend = trendName;
      this.$emit('on-trend-selected', trendName);
    },
  },
};
</script>

<style scoped>
.search {
  max-width: 500px;
}
</style>
