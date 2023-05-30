<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Placeholder', 
    },
    label: {
      type: String,
      default: 'Label', 
    },
    listVals: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    addValue() {
      this.$emit('add-value', this.inputValue);
      this.inputValue = '';
    },
    removeValue(value) {
      this.$emit('remove-value', value);
    }
  },
};
</script>

<template>
  <div class="form-control flex flex-col items-center max-w-lg">
    <label class="label">
      <span>{{ label }}</span>
      <div class="input-group">
        <input
          type="text"
          :placeholder="placeholder"
          class="input-bordered input"
          v-model="inputValue"
        />
        <button class="btn-square btn" @click="addValue">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor">
            <line x1="14" y1="0" x2="14" y2="28" stroke-linecap="rounded" stroke-width="2"/>
            <line x1="0" y1="14" x2="28" y2="14" stroke-linecap="rounded" stroke-width="2"/>
          </svg>              
        </button>
      </div>
    </label>
    <div v-if="listVals.length > 0" class="flex flex-wrap justify-center gap-2">
      <div v-for="value in listVals" :key="value" class="flex items-center p-2 bg-neutral rounded-lg text-gray-300">
        <span>{{ value }}</span>
        <button class="ml-2 p-1 bg-primary rounded" @click="removeValue(value)">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor">
            <line x1="0" y1="0" x2="15" y2="15" stroke-linecap="rounded" stroke-width="2"/>
            <line x1="0" y1="15" x2="15" y2="0" stroke-linecap="rounded" stroke-width="2"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
