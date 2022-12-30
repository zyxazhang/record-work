<template>
  <button class="botton small" @click="handleClick">
    <span v-if="loading" class="loading record-work icon-shijian1"></span>
    <span v-else class="text">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'customBotton',
  props: {
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: Boolean,
      default: 'middle'
    }
  },
  setup(props, { slots, attrs, emit }) {
    // text
    console.log(props);
    const { loading, title } = toRefs(props)
    const showSlot = slots.default?.();
    const text = ref<string>(showSlot?.[0].children as string || title.value)

    // 点击事件
    const handleClick = (e: Event) => {
      emit('onClick', e)
    }
    return {
      loading,
      text,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }

}
.botton {
  font-weight: bold;
  font-size: 20px;
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 8px;
  margin: 0 20px;
  cursor: pointer;
  line-height: 40px;
  overflow: hidden;
  &:hover {
    background: url("../assets/img/btnbg.png") no-repeat;
    cursor: pointer;
    color: #fff !important;
  }
}
.small {
  width: 100px;
  height: 30px;
  font-size: 10px;
  line-height: 30px;
}
.large {
  width: 200px;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
}

.loading {
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: #1e1e1e;
  font-size: 20px;
  display: inline-block;
  animation: rotate 2s infinite linear;
}
.text {
  padding: 0 10px;
  transition: all 0.5s;
}
</style>