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
  <div id="app">
    <Map></Map>
  </div>
</template>

<script>
import Map from './components/Map.vue';

export default {
  name: 'app',
  components: {
    Map,
  },
};
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
}

#app {
  height: 100%;
}
</style>
