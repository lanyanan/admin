
/* eslint-disable */

export const timeFormat = (start_time, end_time) => {
  const common_year = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const leap_year = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // 验证时间格式
  const reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
  const regExp = new RegExp(reg);
  if (!regExp.test(end_time) || !regExp.test(start_time)) {
    return false;
  }
  // 判断前后时间大小
  const timestamp_start_time = Date.parse(new Date(start_time));
  const timestamp_end_time = Date.parse(new Date(end_time));
  if (timestamp_end_time / 1000 - timestamp_start_time / 1000 < 0) {
    return false;
  }


  // 获取前四位
  const time_info_start = start_time.split(' ');
  const time_info_end = end_time.split(' ');


  // 获取年月日
  const year_month_day_start = time_info_start[0].split('-');
  const year_month_day_end = time_info_end[0].split('-');
  // 获取时间
  const hour_minute_second_start = time_info_start[1].split(':');
  const hour_minute_second_end = time_info_end[1].split(':');

  console.log(year_month_day_end, year_month_day_start)
  var beapart_year = parseInt(year_month_day_end[0]) - parseInt(year_month_day_start[0]);
  // 进行判断时间


  const time_info_1 = parseInt(hour_minute_second_start[2]) + parseInt(hour_minute_second_start[1]) * 60 + parseInt(hour_minute_second_start[0]) * 3600;
  const time_info_2 = parseInt(hour_minute_second_end[2]) + parseInt(hour_minute_second_end[1]) * 60 + parseInt(hour_minute_second_end[0]) * 3600;


  // let hour = 0;
  // let minute = 0;
  // let second = 0;
  // let beapart_time = time_info_2 - time_info_1;
  let beapart_day_last = 0;

  // 同一年
  if (beapart_year === 0) {
    let beapart_day = parseInt(year_month_day_end[2]) - parseInt(year_month_day_start[2]) + 1;
    let beapart_month = parseInt(year_month_day_end[1]) - parseInt(year_month_day_start[1]);
    if (beapart_day >= 0) {
      if (parseInt(year_month_day_end[0]) % 4 === 0) {
        if (beapart_day === parseInt(leap_year[parseInt(year_month_day_end[1])])) {
          beapart_month = beapart_month + 1;
          beapart_day = 0
        }
      } else {
        if (beapart_day === parseInt(common_year[parseInt(year_month_day_end[1])])) {
          beapart_month = beapart_month + 1;
          beapart_day = 0
        }
      }
      return [0, beapart_month, beapart_day];
    } else {
      if (parseInt(year_month_day_end[0]) % 4 === 0) {
        beapart_day = leap_year[parseInt(year_month_day_start[1])] - parseInt(year_month_day_start[2]) + parseInt(year_month_day_end[2])+1;
      } else {
        beapart_day = common_year[parseInt(year_month_day_start[1])] - parseInt(year_month_day_start[2]) + parseInt(year_month_day_end[2])+1;
      }
      if (time_info_2 - time_info_1 < 0) {
        // beapart_day -= 1;
      }
      return [0, beapart_month - 1, beapart_day];
    }
    // 非同一年
  } else {
    // 判断如果相差一年
    let beapart_day = parseInt(year_month_day_end[2]) - parseInt(year_month_day_start[2])+1;
    let beapart_month = parseInt(year_month_day_end[1]) - parseInt(year_month_day_start[1]);
    let beapart_year = parseInt(year_month_day_end[0]) - parseInt(year_month_day_start[0]);

    if (beapart_month < 0) {
      beapart_year -= 1;
      beapart_month = 12 + parseInt(year_month_day_end[1]) - parseInt(year_month_day_start[1]);
    }
    if (beapart_day >= 0) {
      if (parseInt(year_month_day_end[0]) % 4 === 0) {
        if (beapart_day === parseInt(leap_year[parseInt(year_month_day_end[1])])) {
          beapart_month = beapart_month + 1;
          beapart_day = 0
        }
      } else {
        if (beapart_day === parseInt(common_year[parseInt(year_month_day_end[1])])) {
          beapart_month = beapart_month + 1;
          beapart_day = 0
        }
      }
      if (beapart_month === 12) {
        beapart_month = 0;
        beapart_year = beapart_year + 1;
      }
      return [beapart_year, beapart_month, beapart_day - beapart_day_last];
    } else {
      if (parseInt(year_month_day_end[0]) % 4 === 0) {
        beapart_day = leap_year[parseInt(year_month_day_start[1])] - parseInt(year_month_day_start[2]) + parseInt(year_month_day_end[2])+1;
      } else {
        beapart_day = common_year[parseInt(year_month_day_start[1])] - parseInt(year_month_day_start[2]) + parseInt(year_month_day_end[2])+1;
      }
      if (beapart_month === 12) {
        beapart_month = 0;
        beapart_year = beapart_year + 1;
      }
      return [beapart_year, beapart_month - 1, beapart_day - beapart_day_last];
    }
  }
}
