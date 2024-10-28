// string to file init value
export const s2fv = (url?: string) => {
  if (!url) {
    return [];
  }
  return [{ response: [{ id: new Date().getDate() }], url, fakeFile: true }];
};

const checkIsFileForm = (v: any) => {
  const character = ['uid', 'name', 'response', 'status', 'lastModified'];
  const keys = Object.keys(v);
  return character.every((key: string) => keys.includes(key));
};

const checkIsFakeFile = (v: any) => {
  const character = ['uid', 'url', 'response', 'fakeFile'];
  const keys = Object.keys(v);
  return character.every((key: string) => keys.includes(key)) && v.fakeFile;
};

/**
 * file form to form data
 * @param form
 * @param k file response key default is path
 * @param c auto clean _ prefix column
 */
export const f2f = (form: any, k: string = 'path', c: boolean = true) => {
  let res: any = {};
  Object.keys(form).forEach((key) => {
    if (
      key.startsWith('_') &&
      Array.isArray(form[key]) &&
      form[key].length > 0 &&
      checkIsFileForm(form[key][0])
    ) {
      res[key.slice(1)] = form[key].map((item: any) => item.response?.[0]?.[k]).join(',');
    } else if (
      key.startsWith('_') &&
      Array.isArray(form[key]) &&
      form[key].length > 0 &&
      checkIsFakeFile(form[key][0])
    ) {
    } else if (key.startsWith('_') && c && (!form[key] || Object.keys(form[key]).length === 0)) {
    } else if (
      form[key] instanceof Array &&
      (form[key].length === 0 || !(form[key][0] instanceof Object))
    ) {
      res[key] = form[key];
    } else if (form[key] instanceof Object) {
      res[key] = f2f(form[key], k);
    } else {
      res[key] = form[key];
    }
  });
  return res;
};
