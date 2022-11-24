<template>
  <div class="l-b-list">
    <a-button v-if="isInquire" class="add-list" size="small" type="primary" @click="create">添加</a-button>
    <div class="input-text">
      <a-textarea v-model:value.trim="inputValue" placeholder="输入聊天框内容，看看哪个坑过你！" :rows="3" />
    </div>
    <div v-if="result.state" class="result">
      <p>本对局中</p>
      <p v-for="resultItem in result.name" :key="resultItem"><span style="font-size:20px;font-weight:bold; color:black">{{resultItem}}</span></p>
      <p>之前坑过你！！！</p>
      <p style="font-weight:bold; color:black">建议：{{result.suggest}}</p>
    </div>
    <div v-if="!isInquire" class="reason">
      <p>添加拉黑原因(至多4项)：</p>
      <a-select v-model:value="reasonValue" mode="multiple" style="width: 100%" placeholder="选择坑你的原因" :max-tag-count="4"
        :options="options"></a-select>
    </div>
    <div class="operation">
      <a-button class="add-list" size="small" type="primary" block @click="submit">{{ isInquire ? '查询' : '确定' }}
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { reasonList } from '../../../constans/index'
interface Istate {
  state: boolean,
  name: Array<string>,
  suggest: string
}
export default defineComponent({
  name: 'lolBackList',
  setup() {
    const inputValue = ref<string>('')
    const reasonValue = ref<string>()
    const result = reactive<Istate>({
      state: false,
      name: [],
      suggest: ''
    })
    // 是否查询
    const isInquire = ref<boolean>(true)
    const options = ref(reasonList)
    const create = (): void => {
      inputValue.value = ''
      isInquire.value = false
      result.state = false
    }
    const submit = (): void => {
      isInquire.value = true
      const filterNames = inputValue.value.replace(/加入了队伍聊天/g, '').split('\n')
      const params = {
        name: filterNames
      }
      console.log(params)
      result.state = true
      result.name = params.name
      result.suggest = '打洗他'
    }
    return {
      inputValue,
      reasonValue,
      isInquire,
      options,
      result,
      create,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
.l-b-list {
  width: 100%;

  .input-text {
    margin: 30px 30px;
  }
  .result {
    margin: 30px 30px;
    text-align: center;
  }
  .reason {
    margin: 30px 30px;
  }
  .operation {
    margin: 0 40%;
  }
}
</style>