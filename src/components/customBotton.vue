<template>
  <button :class="['botton', btnClass]" @click="handleClick">
    <div v-if="loading" class="loading"></div>
    <span v-else class="text" :title="text">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'customBotton',
  props: {
    theme: {
      type: String,
      default: 'default'
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots, attrs, emit }) {
    // text
    const { loading, title, theme } = toRefs(props)
    const showSlot = slots.default?.();
    const text = ref<string>(showSlot?.[0].children as string || title.value)
    // 样式
    const btnClass = computed(() => {
      return String(theme.value)
    })
    // 点击事件
    const handleClick = (e: Event) => {
      if (loading.value) return
      emit('onClick', e)
    }
    return {
      btnClass,
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
  display: block;
  font-weight: bold;
  font-size: 20px;
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 8px;
  margin: 0 20px;
  padding: 0;
  cursor: pointer;
  line-height: 40px;
  background-size: 100% 100%;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.default {
  background: #f0f0f0;
  color: #afa5ae;
  &:hover {
    background: url("../assets/img/btnbg.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
  }
}
.submit {
  background: url("../assets/img/btnbg.png") no-repeat;
  &:hover {
    background: url("../assets/img/3146286a61f9ebfd7ab004d86fe6d62c_7284917494626685902.gif") no-repeat;
    background-size: 100% 100%;
    color: #565d7b;
  }
}
.cancel {
  background: url("../assets/img/btnbg.png") no-repeat;
  &:hover {
    background: url("../assets/img/ea37ebc086567749ac170778144458e8_1284097030846140752.gif") no-repeat;
    background-size: 100% 100%;
    color: #565d7b;
  }
}


.loading {
  width: 100%;
  height: 100%;
  line-height: 20px;
  color: #1e1e1e;
  font-size: 20px;
  display: inline-block;
  background: url("../assets/img/d23bc1a8e7098c8b923e298f8bd4e28d_5246113135597935036.gif") no-repeat;
  background-size: 100% 100%;
  border-radius: 8px;
}

.text {
  padding: 0 20px;
  transition: all 0.5s;
}
</style>