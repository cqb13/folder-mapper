<script>
export default {
    props: {
      defaultChecked: {
        type: String,
        default: ""
      },
      label: {
        type: String,
        default: "Label"
      },
      tip: {
        type: String,
        default: ""
      }
    },
    data() {
        return {
          checked: this.defaultChecked === "checked",
        }
    },
    methods: {
      updateValue() {
        this.checked = !this.checked;
        this.$emit("update-value", this.checked);
      },
    }
};
</script>

<template>
  <div class="form-control">
    <label class="label flex cursor-pointer items-center justify-center gap-3">
      <span
        :class="{ 'tooltip tooltip-left': tip }"
        class="text-lg"
        :data-tip="tip"
        >{{ label }}</span
      >
      <input
        type="checkbox"
        :checked="defaultChecked"
        class="checkbox-primary checkbox"
        @change="updateValue()"
      />
    </label>
  </div>
</template>
