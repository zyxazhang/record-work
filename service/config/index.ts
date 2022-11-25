
interface IJwt {
  jwtSecretKey:string,
  expiresIn: string,
  algorithms: any
  path: Array<string>
}
const config: IJwt = {
  jwtSecretKey: 'recordWork',
  expiresIn: '10h',
  algorithms: ["HS256"],
  path:[
    '/v1/record/dsetail/:id'
  ]
}
export default config