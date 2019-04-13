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
  <MglMap :mapStyle="mapStyle" :attributionControl="false" @load="onMapLoaded" ref="baseMap">
    <MglAttributionControl position="bottom-right" />

    <MglGeojsonLayer
      sourceId="sentoLocationsSource"
      :source="geoJsonSource"
      layerId="locationsLayer"
      :layer="geoJsonLayer"
      @click="onLayerClicked"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    />
    <MglPopup
      :coordinates="coordinates"
      :closeButton="true"
      :closeOnClick="true"
      :anchor="'bottom'"
      :offset="5"
      ref="clickPopup"
    >
      <PopupContent :layerFeature="layerFeature" />
    </MglPopup>

  </MglMap>
</template>

<script>
import { Mapbox } from 'mapbox-gl';
import {
  MglMap, MglAttributionControl, MglGeojsonLayer, MglPopup,
} from 'vue-mapbox';
import PopupContent from './PopupContent.vue';

export default {
  name: 'Map',
  components: {
    MglMap,
    MglAttributionControl,
    MglGeojsonLayer,
    MglPopup,
    PopupContent,
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
    };
  },

  created() {
    this.mapbox = Mapbox;
  },

  methods: {
    async onMapLoaded(event) {
      const asyncActions = event.component.actions;
      await asyncActions.flyTo({
        center: [-5.70, 36.12],
        zoom: 5,
        speed: 1,
      });
    },
    async onLayerClicked(event) {
      const { lngLat, features } = event.mapboxEvent;
      const asyncActions = this.$refs.baseMap.actions;
      this.coordinates = [lngLat.lng, lngLat.lat];
      this.layerFeature = features[0].properties;
      await asyncActions.flyTo({ center: this.coordinates });
      this.$refs.clickPopup.$_addPopup();
    },
    onMouseEnter(event) {
      // eslint-disable-next-line no-param-reassign
      event.map.getCanvas().style.cursor = 'pointer';
    },
    onMouseLeave(event) {
      // eslint-disable-next-line no-param-reassign
      event.map.getCanvas().style.cursor = '';
    },
  },
};
</script>
