<template>
  <div class="flex mb-2">
    <span class="pr-2 text-14 text-secondary">Stream:</span>
    <label class="relative inline-block w-10 h-6">
      <input class="opacity-0"
      type="checkbox"
      :checked="modelValue"
      @input="$emit('update:modelValue', (<HTMLInputElement>$event.target).checked)" />
      <span class="slider rounded-full absolute cursor-pointer round top-0 bottom-0 left-0 -right-1 bg-gray-80 outline outline-1 outline-gray-60 transition ease-in-out delay-250
      before:absolute
      before:w-4 
      before:h-4
      before:left-1
      before:bottom-1
      before:rounded-full     
      before:bg-gray-50
      before:transition
      before:ease-in-out
      before:delay-250
      before:content-['']
      ">
      </span>
    </label>
    <!-- {{ modelValue }} --> 
  </div>
    
</template>

<script setup lang="ts">

defineProps<{
  modelValue: boolean;
}>()

defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
}>()
</script>


<style>
input:checked + .slider {
  outline: 1px;
  outline-color: greenyellow;
  outline-style: solid; 
  background-color: rgb(57 57 57 / var(--tw-bg-opacity));
  /* tailwind styles> outline outline-1 outline-green-40 bg-gray-70 */
}

input:checked + .slider:before {
  background-color: greenyellow;
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
  /* tailwind styles> bg-green-40 translate-x-0*/
}

</style>