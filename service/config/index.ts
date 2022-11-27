
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
    '/v1/user/login',
    '/v1/user/register',
    '/v1/record/detail'
  ]
}
export default config