const setCookie = (cname: string, cvalue: any, exdays: number) => {
  const d: any = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
};
export default setCookie;
