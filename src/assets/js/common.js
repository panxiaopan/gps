//导出图片
export const saveImg = (canvas, fileName) => {
  if (canvas.msToBlob) {
    // IE 9+
    let blob = canvas.msToBlob();
    window.navigator.msToBlob(blob, fileName);
  } else {
    // firefox, chrome
    let save_link = document.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "a"
    );
    save_link.href = canvas.toDataURL("image/png");
    save_link.download = fileName;
    let event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
  }
};

// 选择日期  一天的时间默认一天的时间
export const SevenDay = (date) => {
  // console.log(date)

  let today = new Date(date);
  // console.log(today)
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  today = today.getTime();
  let oneday = 1000 * 60 * 60 * 24;
   
/* console.log("panpnapan")
 console.log(oneday)*/
  // console.log(today );
  // console.log(oneday)
  return today - oneday * 1;
 /*  return date >9 ?(date) : ("0"+date) */
}; 


// 格式化时间 年月日时分
export const timeFormatter = (value) => { 
  let date = new Date(value)
    var y =date.getFullYear();
    var MM =date.getMonth() + 1;
    MM =MM <10 ? ('0'+MM) : MM
    var d =date.getDate();
    d = d < 10 ? ('0'+d) : d
    var h =date.getHours();
    h = h <10 ? ('0' + h) :h
    var m = date.getMinutes()
    m = m>9 ? m : ('0' +m)
   var ss = date.getSeconds()
    ss = ss >9 ? ss : ('0' +ss)
    return y + '-'+MM+'-'+d + " "+h+":"+m +":"+ss

  /*return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() +':'+date.getSeconds();*/
}


///不带时分秒的
export const timeFormattershow = (value) => { 
  let date = new Date(value)
    var y =date.getFullYear();
    var MM =date.getMonth() + 1;
    MM =MM <10 ? ('0'+MM) : MM
    var d =date.getDate();
    d = d < 10 ? ('0'+d) : d
    var h =date.getHours();
    h = h <10 ? ('0' + h) :h
    var m = date.getMinutes()
    m = m>9 ? m : ('0' +m)
   var ss = date.getSeconds()
    ss = ss >9 ? ss : ('0' +ss)
    return y + '-'+MM+'-'+d 

  /*return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() +':'+date.getSeconds();*/
}
