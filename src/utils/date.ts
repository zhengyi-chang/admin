export function getTimeState() {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  let text = '';

  // 凌晨00: 00—5: 00、
  // 清晨5：00 - 6：00、
  // 早晨6：00 - 8：00、
  // 上午8: 00—11: 00、
  // 中午11: 00—13: 00、
  // 下午13: 00—17: 00、
  // 傍晚17: 00—18: 00、
  // 晚上18: 00—24: 00
  if (hours >= 0 && hours < 5) {
    text = '凌晨';
  } else if (hours >= 5 && hours < 6) {
    text = '清晨';
  } else if (hours >= 6 && hours < 8) {
    text = '早晨';
  } else if (hours >= 8 && hours < 11) {
    text = '上午';
  } else if (hours >= 11 && hours < 13) {
    text = '中午';
  } else if (hours >= 13 && hours < 17) {
    text = '下午';
  } else if (hours >= 17 && hours < 18) {
    text = '傍晚';
  } else if (hours >= 18 && hours < 24) {
    text = '晚上';
  } else {
    text = '';
  }
  return text;
}
