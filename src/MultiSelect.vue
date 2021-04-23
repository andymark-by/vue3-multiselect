<template>
  <div v-click-outside="hide" class="relative">
    <button
      class="inline-flex w-full items-center font-medium pl-3 pr-5 py-1.5 bg-button rounded-lg"
      @click="open = !open"
    >
      <slot :selected="selected" :label="label">
        <img v-if="icon" class="mr-2" :src="icon" alt="" />
        <template v-if="multiple">

          <template v-if="!selected.length">
              {{ label }}
            </template>
          <template v-else>
            <span v-for="(item, idx) in selected" :key="idx">
              <template v-if="idx > 0">, </template>
              {{ item.label }}
            </span>
          </template>
        </template>
        <template v-else>
          {{ selected.label }}
        </template>
      </slot>
    </button>
    <div
      class="absolute z-10 min-w-max mt-2 right-0 left-0 border bg-white rounded-lg"
      :class="{ hidden: !open }"
    >
      <template v-if="multiple">
        <label
          v-for="(option, idx) in options"
          :key="idx"
          class="flex items-center cursor-pointer px-4 py-3 my-1 hover:underline"
          :for="option.value"
        >
          <input
            :id="option.value"
            type="checkbox"
            class="mr-2 h-5 w-5 rounded border-gray-300 text-blue-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
            @change="toggleOptions(option)"
          />
          {{ option.label }}
        </label>
      </template>
      <template v-else>
        <div
          v-for="(option, idx) in options"
          :key="idx"
          class="cursor-pointer px-4 py-3 hover:underline"
          @click="selectOption(option)"
        >
          <div>{{ option.label }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VMultiSelect',
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    options: {
      // Example: [{ label: 'some label', value: 'some value'}]
      type: Array,
      required: true,
    },
    modelValue: {
      // Example: { label: 'some label', value: 'some value'}
      type: Object,
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      selected: this.modelValue
        ? this.modelValue
        : this.options.length > 0
          ? this.options[0]
          : null,
      open: false,
    }
  },
  mounted() {
    this.$emit('update:modelValue', this.selected)
  },
  methods: {
    // Method for single mode
    selectOption(option) {
      this.selected = option
      this.open = false
      this.$emit('update:modelValue', option)
    },
    // Method for multiple mode
    toggleOptions(option) {
      if (this.selected.includes(option)) {
        this.selected = this.selected.filter(i => i !== option)
      } else {
        this.selected.push(option)
      }
      this.$emit('update:modelValue', this.selected)
    },
    hide() {
      this.open = false
    },
  },
}
</script>
