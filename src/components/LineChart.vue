<template>
  <div style="height: 400px">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
  import Chart from 'chart.js'

  export default {
    name: 'LineChart',
    props: {
      label: String,
      labels: Array,
      results: Array,
    },
    data() {
      return {
        chart: null,
      }
    },
    mounted() {
      this.createChart()
    },
    watch: {
      results(newVal) {
        // Update if minimum 2 results
        if (newVal.length > 1) {
          this.chart.update()
        }
      },
    },
    methods: {
      createChart() {
        this.chart = new Chart(this.$refs.chart, {
          type: 'line',
          data: {
            labels: this.labels,
            datasets: [{
              borderColor: "#3e95cd",
              fill: false,
              label: this.label,
              data: this.results,
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  precision: 0,
                },
              }],
            },
            legend: {
              display: true,
              position: 'bottom',
            },
            responsive: true,
            maintainAspectRatio: false,
          },
        })
      },
    },
  }
</script>
