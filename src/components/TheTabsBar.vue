<template>
  <div id="tabs-bar" class="md-layout-item" :md-active-tab="currentTab">
    <md-tabs
      class="md-primary"
      md-alignment="centered"
      @md-changed="onTabChange"
    >
      <md-tab id="tab-map" md-label="Mapa" />
      <md-tab id="tab-data" md-label="Datos" :md-disabled="isDataTabDisabled" />
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: 'TheTabsBar',
  methods: {
    onTabChange(tabId) {
      this.$emit('on-tab-change', tabId);
    },
  },
  props: {
    currentTab: { type: String, required: true },
    isDataTabDisabled: { type: Boolean, required: true },
  },
};
</script>

<style scoped>
@media (min-width: 960px) {
  #tabs-bar {
    display: none;
  }
}
</style>
