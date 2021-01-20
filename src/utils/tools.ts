/**
 * @description set cookie key-value
 * @param name 
 * @param value 
 * @param time 
 */
export const setCookie = (name: string, value: string, time: number): void => {
  const expDate = new Date();
  expDate.setTime(expDate.getTime() + time);
  document.cookie = `${name}=${escape(value)};expires=${expDate.toUTCString()}`;
  return;
};

/**
 * @description get cookie value by name
 * @param name 
 */
export const getCookie = (name: string): string | null => {
  if (!name) { return null; }
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
};

/**
 * @description remove cookie value by name
 * @param name 
 */
export const removeCookie = (name: string): void => {
  const expDate = new Date();
  expDate.setTime(expDate.getTime() - 1);
  var cval= getCookie(name);
  if(cval!=null) {
    document.cookie= name + "="+cval+";expires="+expDate.toUTCString();
  }
  return;
}