<template>
  <section class="funcs">
    <p class="funcs-text">开 发 常 用 功 能</p>
    <img class="funcs-img" src="../../assets/img/homebg.jpg" alt="">
    <div class="contanier">
      <div class="funcs-select">
        <a-select v-model:value="selectValue" show-search placeholder="Select a person" style="width: 400px"
          :options="options" :filter-option="filterOption" @change="handleChange"></a-select>
        <span class="select-tip">❕ 根据选择展示对应的功能需求</span>
      </div>
      <div class="funcs-content">
        <div v-if="funcsLoading" style="text-align: center; height: 500px; line-height: 500px;">
          <a-spin size="large" />
        </div>
        <div v-else class="content">
          <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel key="1" header="功能效果">
              <templateVue></templateVue>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="实现思路">
              <!-- <p style="text-align: center">{{ '请期待。。。' }}</p> -->
              <p>👁️ 黄金分割时间和官府</p>
              <p>👁️ 额阿萨大塞黄金分割时间和官府大卫他晚上然而我</p>
              <p>👁️ 达瓦让微软黄金分割时间和官府大微软福娃二</p>
              <p></p>
              <p></p>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="完整代码">
              <editor type="view" :content="content" :value="content"></editor>
              <template #extra>
                <div v-if="content" class="copy copyBoard" :value="content" @click.stop="copyCode">copy
                </div>
              </template>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import useMain from '../../store/index'
import editor from '../../components/editor.vue'
import templateVue from './components/template.vue'
import ClipBoard from 'clipboard'
import { IRecordField, IRecordType } from '../../types/index'

export default defineComponent({
  name: 'funcs',
  components: {
    editor,
    templateVue
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useMain()
    const funcsLoading = ref<boolean>(false)
    const selectValue = ref<string>('')
    const options = ref<any>([
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' },
      { value: 'tom', label: 'Tom' },
    ]);
    const handleChange = (value: string) => {
      selectValue.value = value
      funcsLoading.value = true
      new ClipBoard('.copyBoard')
      setTimeout(() => {
        getdetails()
        funcsLoading.value = false
      }, 1000);
    };
    const filterOption = (input: string, option: any) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const content = ref<string>('')
    const getdetails = async () => {
      const res = await store.getRecordDetails({ id: 55 })
      content.value = res.data.content
    }
    const activeKey = ref(['1', '2', '3']);
    const copyCode = () => {
      const el: any = document.querySelector('.copyBoard')
      const value = el.attributes.value.value
      if (!value) {
        message.info('复制内容为空');
        return
      }
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = true
      // 移除屏幕范围
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      textarea.value = value
      document.body.appendChild(textarea)
      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        message.success('复制成功');
      }
      document.body.removeChild(textarea)
    }
    onMounted(() => {
    })
    return {
      funcsLoading,
      selectValue,
      filterOption,
      handleChange,
      options,
      activeKey,
      content,
      copyCode
    }
  }
})
</script>
<style lang="scss">
.funcs .hljs {
  background: #fff !important;
}
.copy {
  background: #fff;
color: #a6a6a6;
font-weight: bold;
padding: 0 4px;
height: 22px;
line-height: 14px;
font-size: 16px;
position: relative;
}
#copyValue {
  position: absolute;
  top: 100px;
  background: #fff;
  color: #a6a6a6;
  font-weight: bold;
  padding: 0 4px;
  height: 22px;
  line-height: 14px;
  font-size: 16px;
}
</style>
<style lang="scss" scoped>
.funcs {
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  overflow: auto;

  .funcs-text {
    width: 100%;
    height: 20px;
    font-size: 20px;
    position: absolute;
    top: 100px;
    z-index: 101;
    color: #fff;
    text-align: center;
    color: transparent;
    font-size: 1.5em;
    -webkit-text-stroke: 1px #fff;
    font-weight: bold;
  }

  .funcs-img {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 320px;
    object-fit: cover;
  }

  .contanier {
    width: 1280px;
    margin: 0 auto;
    min-height: calc(100% - 320px);

    // background-color: #eee;
    .funcs-select {
      width: 100%;
      height: 60px;
      line-height: 60px;

      .select-tip {
        font-size: 12px;
        color: #65627d;
        font-weight: bold;
        margin-left: 20px;
      }
    }

    .funcs-content {
      width: 100%;
      min-height: 500px;
    }
  }
}
</style>