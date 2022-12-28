<template>
  <div class="user-info">
    <template v-if="btnInfo.key === 'view'">
      <a-descriptions bordered>
        <a-descriptions-item label="昵称">Cloud Database</a-descriptions-item>
        <a-descriptions-item label="年龄">18</a-descriptions-item>
        <a-descriptions-item label="性别">男</a-descriptions-item>
        <a-descriptions-item label="创建时间">2022-04-24 18:00:00</a-descriptions-item>
        <a-descriptions-item label="状态" :span="2"><a-badge status="success" />正常</a-descriptions-item>
        <a-descriptions-item label="积分" :span="3">80.00</a-descriptions-item>
        <a-descriptions-item label="头像" :span="3">
          <img src="../../assets/img/tag3.gif" alt="">
        </a-descriptions-item>
        <a-descriptions-item label="权限">
          创建文章
        </a-descriptions-item>
      </a-descriptions>
    </template>
    <div v-else>
      <a-form :model="formState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="昵称">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="年龄">
          <a-input-password v-model:value="formState.age" />
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group v-model:value="formState.gender">
            <a-radio :value="1"><span class="record-work icon-icmale"
                style="color: #1296db; font-size: 14px;"></span></a-radio>
            <a-radio :value="0"><span class="record-work icon-icfemale"
                style="color: #ec95bc; font-size: 14px;"></span></a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="头像">
          <div class="pictrue">
            <button class="file" v-if="!formState.picture">
              <input class="input-file" type="file" ref="uploadRef" @change="handleFile" />
              <p class="record-work icon-tianjia"></p>
              <p>上传</p>
            </button>
            <div v-else class="display">
              <img :src="formState.picture" alt="">
              <div class="close record-work icon-shezhi" @click="closeUpload"></div>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="权限">
          <a-select
              v-model:value="formState.auth_field"
              mode="multiple"
              style="width: 50%"
              placeholder="选择权限"
              :disabled="!formState.auth_switch"
              :options="formState.auth_option"
            ></a-select>
            <a-switch style="margin: 0 10px" v-model:checked="formState.auth_switch" size="small" />
            <span style="font-size: 12px; color: #8c8c8c; margin: 0 10px" class="record-work icon-shezhi">  已有权限，仅移除，添加联系管理员。</span>
        </a-form-item>
      </a-form>
      <div class="operate">
        <button class="btn" @click="submit">确定</button>
        <button class="btn" @click="close">取消</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue'
import useMain from '../../store/index'
export default defineComponent({
  name: 'UserInfo',
  props: {
    btnInfo: Object,
    userInfo: Object
  },
  emits: [
    'closeAdminModal'
  ],
  setup(props, {emit}) {
    const store = useMain()
    const { btnInfo, userInfo } = toRefs<any>(props)
    const uploadRef = ref<Element | null>(null)
    const formState = reactive<any>({
      username: '',
      age: '',
      gender: 0,
      picture: '',
      auth_field: [],
      auth_option: [],
      auth_switch: false
    })
    const handleFile = async (e: any) => {
      const maxSize = 1024 * 1024 //1MB
      if (e.target.files[0].size / maxSize > 1) {
        message.info('头像大小不能大于1M！')
        return
      }
      const filename = e.target.value.split('\\').slice(-1);
      const formdata = new FormData();
      formdata.append('file', e.target.files[0])
      const res = await store.upload(formdata)
      formState.picture = res.data.url
    }
    const closeUpload = () => {
      formState.picture = ''
    }

    const submit = () => {
      
    }
    const close = () => {
      emit('closeAdminModal')
    }
    onMounted(() => {
      const { auth_field, picture, sex, username } = userInfo.value
      formState.username = username
      formState.age = 18
      formState.gender = sex
      formState.picture = picture || 'http://localhost:3002/static/images/nilu1672246577343.jpg'
      formState.auth_option = [
        { label: '创建记录', value: 'record'},
        { label: '创建自定义功能', value: 'custom'},
        { label: '参与活动', value: 'lucky'}
      ]
      formState.auth_field = ['record', 'custom', 'lucky']
    })
    return {
      btnInfo,
      uploadRef,
      formState,
      handleFile,
      closeUpload,
      submit,
      close
    }
  }
})
</script>

<style lang="scss" scoped>
.pictrue {
  width: 150px;
  height: 150px;
  background-color: #fafafa;
  margin-bottom: 10px;
  .file {
    float: left;
    width: 100%;
    height: 100%;
    line-height: 30px;
    position: relative;
    cursor: pointer;
    border: 1px dashed #d9d9d9;
    color: #8c8c8c;
    border-radius: 8px;
    .input-file {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      opacity: 0;
      cursor: pointer;
    }
  }
  .display {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 150px;
      height: 150px;
      border-radius: 8px;
    }
    .close {
      position: absolute;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      text-align: center;
      font-size: 16px;
      line-height: 20px;
      border: 2px solid #fff;
      color: #fff;
      background-color: rgb(26, 150, 232);
      top: -10px;
      right: -10px;
      cursor: pointer;
    }
  }
}
.operate {
  text-align: center;
    .btn {
      font-weight: bold;
      font-size: 20px;
      width: 150px;
      height: 40px;
      border: none;
      border-radius: 8px;
      margin: 0 20px;
      cursor: pointer;
      &:hover {
        background: url("../../assets/img/btnbg.png") no-repeat;
        cursor: pointer;
        color: #fff !important;
      }
    }
  }
</style>