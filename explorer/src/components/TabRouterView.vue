<template>
  <div>
    <nav class="flex items-center justify-stretch overflow-x-scroll">
      <slot></slot>
    </nav>
    <div class="py-6">
      <RouterView></RouterView>
    </div>
  </div>
</template>
