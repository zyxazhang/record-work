<template>
  <div class="editor">
    <a-modal v-model:visible="fromModalVisible" title="就差这步啦" :maskClosable="false" :destroyOnClose="true" ok-text="确认" cancel-text="取消"
      @ok="submitForm">
      <a-form ref="formRef" name="custom-validation" :model="fieldInfo" @finish="handleFinish"
        @finishFailed="handleFinishFailed">
        <a-form-item has-feedback label="标题" name="name" :rules="[{ required: true, message: '请输入标题!' }]">
          <a-input v-model:value="fieldInfo.name" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="标签" name="tag" :rules="[{ required: true, message: '请选择你得记录标签!' }]">
          <a-select v-model:value="fieldInfo.tag">
            <a-select-option v-for="tag in tags" :key="tag.name" :value="tag.value">{{ tag.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item has-feedback label="背景图" name="img" :rules="[{ required: true, message: '请选择你的封面图片!' }]">
          <a-select v-model:value="fieldInfo.img">
            <a-select-option class="tag" v-for="tag in tags" :key="tag.name" :value="tag.value"></a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-button class="submit" type="primary" :loading="submitLoading" @click="showFormModal">发布</a-button>
    <Editor ref="editor" :type="'edit'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue'
import Editor from '../../components/editor.vue'
import { tagList } from '../../constans/index'
import useMain from '../../store/index'

interface IFieldState {
  name: string,
  tag: string,
  img: string
}

export default defineComponent({
  name: 'example',
  components: {
    Editor
  },
  setup() {
    const store = useMain()
    const editor = ref()
    const fieldInfo = reactive<IFieldState>({
      name: '',
      tag: '',
      img: ''
    })
    const tags = ref<any>(tagList)
    // 表单 modal
    const fromModalVisible = ref<boolean>(false)
    const submitLoading = ref<boolean>(false)
    const showFormModal = () => {
      fieldInfo.name = ''
      fieldInfo.tag = ''
      fieldInfo.img = ''
      fromModalVisible.value = true
    }
    const submitForm = () => {
      const { name, tag, img } = fieldInfo
      const params = {
        content: editor.value.editValue,
        author: 'admin',
        name,
        tag,
        pictrue: img,
        desc: ''
      }
      console.log(params)
      store.createRecord(params).then(res => {
        console.log(res)
      }).catch(e => console.log(e)).finally(() => {
        fromModalVisible.value = false
      })
    }
    const handleFinish = (values: any) => {
      console.log(values)
    }
    const handleFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    onMounted(() => {
      console.log(editor)
    })
    return {
      editor,
      tags,
      fieldInfo,
      fromModalVisible,
      submitLoading,
      showFormModal,
      submitForm,
      handleFinish,
      handleFinishFailed
    }
  }
})

</script>

<style lang="scss" scoped>
.editor {
  width: 100%;

  .submit {
    margin: 10px;
    padding: 0 20px;
  }
}
</style>