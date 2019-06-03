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
    <md-toolbar class="md-primary">
      <div class="md-toolbar-row"><h2>Sento</h2></div>
    </md-toolbar>
    <md-list>
      <md-list-item @click="displayHelpDialog">
        <md-icon>help</md-icon>
        <span class="md-list-item-text">Ayuda</span>
      </md-list-item>
      <md-list-item
        @click="openCodeTab">
        <md-icon>code</md-icon>
        <span class="md-list-item-text">Código fuente</span>
      </md-list-item>
    </md-list>
    <md-dialog id="help-dialog" :md-active.sync="isDialogOpen" :md-fullscreen="false">
      <md-card>
        <md-card-content>
          <h2>¿Qué es Sento?</h2>
          <p>
            Sento (<i>sentimiento</i> en esperanto) es una aplicación
            que extrae información en tiempo real de Twitter y aplica técnicas
            de análisis de sentimiento para extraer la percepción
            de los usuarios sobre las diferentes tendencias que surgen en
            distintos lugares.
          </p>
          <h2>¿Cómo puedo utilizarlo?</h2>
          <p>
            Puedes ver información de las últimas tendencias en un lugar
            haciendo clic o pulsando en cualquiera de las zonas resaltadas
            en el mapa. También puedes buscar una tendencia que haya sido capturada
            por Sento pulsando en la barra de búsqueda o en el icono de la lupa.
            Al hacer una búsqueda verás un resumen sobre la tendencia y verás en
            el mapa las zonas en las que dicha tendencia ha tenido actividad.
          </p>
        </md-card-content>
      </md-card>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'TheHelp',

  data() {
    return {
      isDialogOpen: false,
    };
  },

  methods: {
    displayHelpDialog() {
      this.isDialogOpen = true;
    },

    openCodeTab() {
      window.open('https://github.com/search?q=user%3Arobgc+sento', '_blank');
    },
  },
};
</script>

<style>

</style>
