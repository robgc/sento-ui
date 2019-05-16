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
        sourceId="locationsWithTrendsSource"
        v-if="!isTrendFocused"
        :source.sync="locationsWithTrends"
        layerId="locationsWithTrendsLayer"
        :layer="locationsWithTrendsLayer"
        @click="onLayerClicked"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      />

      <mgl-geojson-layer
        sourceId="selectedLocationSource"
        v-if="!isTrendFocused"
        :source.sync="getSelectedLocationSource"
        layerId="selectedLocationLayer"
        :layer="selectedLocationLayer"
        :before="'locationsWithTrendsLayer'"
        ref="selectedLocationLayerComponent"
      />

      <mgl-geojson-layer
        sourceId="locationsFromSearchedTrendSource"
        :source.sync="locationsFromSearchedTrend"
        layerId="locationsFromSearchedTrendLayer"
        :layer="locationsFromSearchedTrendLayer"
      />
    </mgl-map>
  </div>
</template>

<script>
import { Mapbox } from 'mapbox-gl';
import axios from 'axios';
import {
  MglMap, MglAttributionControl, MglGeojsonLayer,
} from 'vue-mapbox';

export default {
  name: 'TheMap',
  components: {
    MglMap,
    MglAttributionControl,
    MglGeojsonLayer,
  },
  data() {
    return {
      mapStyle: 'https://omt.robser.duckdns.org/styles/positron/style.json',

      locationsWithTrends: {
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      },

      selectedLocation: {
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      },

      locationsFromSearchedTrend: {
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      },

      locationsWithTrendsLayer: {
        id: 'locationsWithTrendsLayer',
        source: 'locationsWithTrendsSource',
        type: 'circle',
        paint: {
          'circle-color': '#448aff',
          'circle-opacity': 0.8,
          'circle-radius': 25,
        },
      },

      selectedLocationLayer: {
        id: 'selectedLocationLayer',
        source: 'selectedLocationSource',
        type: 'circle',
        paint: {
          'circle-color': '#78FFD6',
          'circle-opacity': 0.8,
          'circle-radius': 25,
        },
      },

      locationsFromSearchedTrendLayer: {
        id: 'locationsFromSearchedTrendLayer',
        source: 'locationsFromSearchedTrendSource',
        type: 'circle',
        paint: {
          'circle-color': '#448aff',
          'circle-opacity': 0.8,
          'circle-radius': 25,
        },
      },

      coordinates: undefined,
      layerFeature: { id: undefined, name: undefined },
      currentFeature: undefined,
      isMapLoaded: false,
      isTrendFocused: false,
    };
  },

  props: {
    searchedTrend: { type: String, required: false },
  },

  watch: {
    async searchedTrend(newValue) {
      this.isMapLoaded = false;
      this.isTrendFocused = true;

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_SENTO_API_ADDRESS}/map/${encodeURIComponent(newValue)}`,
        );

        if (response.data.features !== null) {
          this.locationsFromSearchedTrend.data = response.data;
        } else {
          this.locationsFromSearchedTrend.data = {
            type: 'FeatureCollection',
            features: [],
          };
        }
      } catch {
        console.error('Failed to retrieve locations with current trends');
      } finally {
        this.isMapLoaded = true;
      }
    },
  },

  async created() {
    this.mapbox = Mapbox;
    await this.getLocationsWithTrendsSource();
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

    // Interaction methods

    onLayerClicked(event) {
      const { lngLat, features } = event.mapboxEvent;
      this.coordinates = [lngLat.lng, lngLat.lat];

      // Deselect the current feature if another feature has been selected
      if (this.currentFeature) {
        this.deselectCurrentFeature();
      }

      // Keep the selected feature, this way we can pass it to different layer sources
      // eslint-disable-next-line prefer-destructuring
      this.currentFeature = features[0];

      // Remove the selected feature from the initially retrieved features
      this.locationsWithTrends.data.features = this.locationsWithTrends.data.features.filter(
        arrElement => arrElement.id !== this.currentFeature.id,
      );

      // Add the selected feature to the selection layer's source
      this.selectedLocation.data.features = [this.currentFeature];

      this.$emit('on-layer-clicked', { id: features[0].id, properties: features[0].properties });

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

    // Map visualization methods

    resizeMap() {
      this.$refs.baseMap.map.resize();
    },

    async flyToCurrentPlace() {
      const asyncActions = this.$refs.baseMap.actions;
      await asyncActions.flyTo({ center: this.coordinates });
    },

    deselectCurrentFeature() {
      // Remove the selected feature from the "selected" layer
      this.selectedLocation.features = [];

      // Return the selected feature to the initial layer
      this.locationsWithTrends.data.features.push(this.currentFeature);

      // Remove the reference to the selected feature
      this.currentFeature = undefined;
    },

    // Service consumption methods

    async getLocationsWithTrendsSource() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_SENTO_API_ADDRESS}/map/active`,
        );
        this.locationsWithTrends.data = response.data;
      } catch {
        console.error('Failed to retrieve locations with current trends');
      }
    },
  },

  computed: {
    getSelectedLocationSource() {
      return this.selectedLocation;
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
