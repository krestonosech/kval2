<template>
  <div class="class-class">
    <div>
      {{ userName }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const userName = localStorage.getItem('userName');
</script>

<style scoped>

.class-class {
  display: flex;
  height: 70px;
  justify-content: right;
  margin-right: 30px;
  align-items: center;
}
</style>
