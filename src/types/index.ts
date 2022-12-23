export interface Iheadline {
  name: string,
  key: string,
  id: number,
  tag: string
}

export interface IRecordField {
  art_id: number,
  create_by: string,
  create_time: string,
  hot_count: number,
  id: number,
  message: string,
  name: string,
  pictrue: string,
  star_count: number,
  tag: string
}

export interface IRecordType {
  children: IRecordField,
  type: string
}

export interface IRecordDetail {
  author: string,
  content: string,
  create_time: string,
  desc: string,
  id: number,
  likes: number | string,
  name: string,
  pictrue: string,
  star: number,
  tag: string,
}

export interface IToolsList {
  name: string,
  key: string,
  time: string,
  desc: string,
}

export interface IToolState {
  toolList: Array<IToolsList>,
  curSeleted: IToolsList,
  curComponent: string
}
export interface IUserinfo {
  username: string,
  id: number | string,
  sex: number | string,
  desc?: string
}
// 登录
export interface TLogin {
  username: string | number,
  password: string | number
}

export interface IrecordDate {
  title: string,
  content: string,
  date: {
    mouth: string,
    day: string,
  },
  favorite: {
    is: boolean,
    nums: number
  }
}