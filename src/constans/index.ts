// 常量字典

// 记录标签
const tagList = [
  { name: "HTML", value: "html" },
  { name: "CSS", value: "vue" },
  { name: "JAVASCRIPT", value: "js" },
  { name: "Vue", value: "vue" },
  { name: "MINI", value: "mini" },
];
// 工具列表

const toolList = [
  {
    name: "LOL黑名单",
    key: "lolBackList",
    desc: "",
    time: "2023-01-05 21:25:54",
  },
  {
    name: "图片上传",
    key: "imageUpload",
    desc: "",
    time: "2023-01-05 21:25:54",
  },
  {
    name: "红包",
    key: "locky",
    desc: "",
    time: "2023-01-05 21:25:54",
  },
];


const reasonList = [
    {
        label: '挂机',
        value: 'on-hook'
    },
    {
        label: '送人头',
        value: 'feed'
    },
    {
        label: '摆烂',
        value: 'bad'
    },
    {
        label: '演你',
        value: 'actor'
    },
]

// 月份 number -> ^en
const monthMap: any = {
  1: 'JAN',
  2: 'FEB',
  3: 'MAR',
  4: 'APR',
  5: 'MAY',
  6: 'JUN',
  7: 'JUL',
  8: 'AUG',
  9: 'SEPT',
  10: 'OCT',
  11: 'NOV',
  12: 'DEC'
}

const userMata: any = [
  {
    name: '个人资料',
    key: 'useInfo',
    meta: {
      icon: '',
      btns: [
        {
          name: '查看',
          key: 'view',
          color: '#afa5ae'
        },
        {
          name: '修改',
          key: 'edit',
          color: '#afa5ae'
        }
      ]
    }
  },
  {
    name: '登出',
    key: 'logout',
    meta: {
      icon: '',
      btns: [
        {
          name: '退出登录',
          key: 'quit',
          color: '#afa5ae'
        },
        {
          name: '注销账号',
          key: 'logout',
          color: '#ee8683'
        }
      ]
    }
  }
]

export {
  monthMap,
  userMata,
  toolList,
  reasonList,
  tagList
}
