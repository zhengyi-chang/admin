export function isEmpty(str: string) {
  if (typeof str == 'undefined' || str == null || str == '') {
    return true;
  } else {
    return false;
  }
}
