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
  <div>
    <md-progress-spinner
      class="map-loading"
      :md-diameter="100"
      :md-stroke="10"
      md-mode="indeterminate"
      v-if="!isMapLoaded"
    />
    <mgl-map
      :mapStyle="mapStyle"
      :attributionControl="false"
      @load="onMapLoaded"
      ref="baseMap"
      class="{ mgl-map-wrapper: isMapLoaded }"
    >
      <mgl-attribution-control position="bottom-right" />

      <mgl-geojson-layer
        sourceId="sentoLocationsSource"
        :source="geoJsonSource"
        layerId="locationsLayer"
        :layer="geoJsonLayer"
        @click="onLayerClicked"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      />
      <mgl-popup
        :coordinates="coordinates"
        :closeButton="true"
        :closeOnClick="true"
        :anchor="'bottom'"
        :offset="5"
        ref="clickPopup"
      >
        <the-popup-content :layerFeature="layerFeature" />
      </mgl-popup>

    </mgl-map>
  </div>
</template>

<script>
import { Mapbox } from 'mapbox-gl';
import {
  MglMap, MglAttributionControl, MglGeojsonLayer, MglPopup,
} from 'vue-mapbox';
import ThePopupContent from './ThePopupContent.vue';

export default {
  name: 'TheMap',
  components: {
    MglMap,
    MglAttributionControl,
    MglGeojsonLayer,
    MglPopup,
    ThePopupContent,
  },
  data() {
    return {
      mapStyle: 'https://omt.robser.duckdns.org/styles/positron/style.json',
      geoJsonSource: { data: 'http://localhost:8000/locations.json' },
      geoJsonLayer: {
        id: 'locationsLayer',
        source: 'sentoLocationsSource',
        type: 'fill',
        paint: {
          'fill-color': '#61a1f3',
        },
      },
      coordinates: undefined,
      layerFeature: { id: undefined, name: undefined },
      isMapLoaded: false,
    };
  },

  created() {
    this.mapbox = Mapbox;
  },

  methods: {
    async onMapLoaded(event) {
      const asyncActions = event.component.actions;
      this.isMapLoaded = true;
      await asyncActions.flyTo({
        center: [-5.70, 36.12],
        zoom: 5,
        speed: 1,
      });
    },
    async onLayerClicked(event) {
      const { lngLat, features } = event.mapboxEvent;
      this.coordinates = [lngLat.lng, lngLat.lat];

      this.$emit('on-layer-clicked', features[0].properties);

      // this.layerFeature = features[0].properties;
      // this.$refs.clickPopup.$_addPopup();
    },
    onMouseEnter(event) {
      // eslint-disable-next-line no-param-reassign
      event.map.getCanvas().style.cursor = 'pointer';
    },
    onMouseLeave(event) {
      // eslint-disable-next-line no-param-reassign
      event.map.getCanvas().style.cursor = '';
    },
    resizeMap() {
      this.$refs.baseMap.map.resize();
    },
    async flyToCurrentPlace() {
      const asyncActions = this.$refs.baseMap.actions;
      await asyncActions.flyTo({ center: this.coordinates });
    },
  },
};
</script>

<style scoped>
@media (max-width: 601px) {
  .mgl-map-wrapper,
  .mapboxgl-map,
  .mapboxgl-canvas {
    /* Remove toolbar's and tab bar's height */
    max-width: 100%;
    min-height: calc(100vh - 56px - 48px);
  }
}

@media (min-width: 601px) {
  .mgl-map-wrapper,
  .mapboxgl-map,
  .mapboxgl-canvas {
    max-width: 100%;
    /* Remove toolbar's and tab bar's height */
    min-height: calc(100vh - 48px - 48px);
  }
}

@media (min-width: 961px) {
  .mgl-map-wrapper,
  .mapboxgl-map,
  .mapboxgl-canvas {
    max-width: 100%;
    /* Remove the toolbar's height */
    min-height: calc(100vh - 64px);
  }
}

.map-loading {
  position: absolute;
  z-index: 10;
  top: 40%;
  left: 0;
  right: 0;
  margin: auto;
  width: 25%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
