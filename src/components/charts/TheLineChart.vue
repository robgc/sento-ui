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

<script>
import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  name: 'TheDoughnutChart',
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'DD/MM/YYYY HH:mm:ss',
              tooltipFormat: 'll HH:mm:ss',
            },
            scaleLabel: {
              display: true,
              labelString: 'Fecha',
            },
          }],
          yAxes: [{
            ticks: {
              reverse: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'Posición',
            },
          }],
        },
        legend: {
          display: false,
          position: 'bottom',
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    };
  },
  props: {
    chartData: { type: Object, default: null, required: true },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
