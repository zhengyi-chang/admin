// 随机生成上传的文件名
export function random_name() {
  // 当前时间加随机字符串
  return `${format_time()}_${random_string(6)}`;
}

// 格式化时间
function format_time() {
  const dt = new Date();
  const year = dt.getFullYear();
  const month = (dt.getMonth() + 1).toString().padStart(2, '0');
  const date = dt.getDate().toString().padStart(2, '0');
  const hour = dt.getHours().toString().padStart(2, '0');
  const minute = dt.getMinutes().toString().padStart(2, '0');
  const second = dt.getSeconds().toString().padStart(2, '0');
  return `${year}${month}${date}${hour}${minute}${second}`;
}

// 生成随机字符串
function random_string(len: number): string {
  const length = len || 32;
  const chars = 'abcdefghjkmnpqrstvwxyz';
  const maxPos = chars.length;
  let str = '';
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}
