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
        <md-button class="md-icon-button" @click="$emit('on-menu-click', !menuVisible)">
          <md-icon>menu</md-icon>
        </md-button>
        <h3 class="md-title">Sento</h3>
      </div>
      <md-autocomplete
        class="search"
        v-model="selectedTrend"
        :md-options="latestTrends"
        md-layout="box"
      >
        <label>Buscar una tendencia...</label>
      </md-autocomplete>

      <div class="md-toolbar-section-end">
      </div>
    </div>
  </md-app-toolbar>
</template>

<script>
export default {
  name: 'TheToolbar',
  data() {
    return {
      selectedTrend: null,
      latestTrends: [
        '#Trend1',
        '#Trend2',
        '#Trend3',
      ],

    };
  },
  props: {
    menuVisible: Boolean,
  },
};
</script>

<style scoped>
.search {
  max-width: 500px;
}
</style>
