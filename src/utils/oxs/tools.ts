// 随机生成上传的文件名
export function random_name() {
  // 当前时间加随机字符串
  return `${format_time()}_${random_string(6)}`;
}

// 格式化时间
function format_time() {
  var dt = new Date();
  let year = dt.getFullYear();
  let month = (dt.getMonth() + 1).toString().padStart(2, '0');
  let date = dt.getDate().toString().padStart(2, '0');
  let hour = dt.getHours().toString().padStart(2, '0');
  let minute = dt.getMinutes().toString().padStart(2, '0');
  let second = dt.getSeconds().toString().padStart(2, '0');
  return `${year}${month}${date}${hour}${minute}${second}`;
}

// 生成随机字符串
function random_string(len) {
  len = len || 32;
  let chars = 'abcdefghjkmnpqrstvwxyz';
  let maxPos = chars.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}
