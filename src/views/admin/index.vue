<template>
  <div class="admin">
    <a-table :columns="columns" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag v-for="tag in record.tags" :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link">
              More actions
              <down-outlined />
            </a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import useMain from '../../store/index'
import { IRecordField, IRecordType } from '../../types/index'
const Columns: any = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Create_by',
    dataIndex: 'create_by',
    key: 'create_by'
  },
  {
    title: 'Create_time',
    dataIndex: 'create_time',
    key: 'create_time'
  },
  {
    title: 'Tag',
    key: 'tag',
    dataIndex: 'tag'
  },
  {
    title: 'Action',
    key: 'action'
  }
]
export default defineComponent({
  name: 'admin',
  setup() {
    const store = useMain()
    const data = ref<Array<IRecordField>>([])
    const columns = ref(Columns)
    const init = () => {
      getRecordList()
    }
    const getRecordList = async () => {
      const res = await store.getRecordList()
      data.value = res.data
    }
    onMounted(() => {
      init()
    })
    return {
      data,
      columns
    }
  }
})

</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  height: calc(100% - 50px);
  overflow: auto;
}
</style>