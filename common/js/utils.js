export const serverUrl = "http://124.221.253.187:5000";

export const sendRequest = (_data) => {
    let url = _data.url || ""; // 调用的api, 例如/post/get_all
    let method = _data.method || "GET"; // 传输方法, 例如POST
    let headers = _data.headers || {};  // 请求头, 例如{"Authorization": "xxx"}
    let requestDataType = _data.requestDataType || "";  // 请求数据传输的类型
    let data = _data.data || {}; // 要传输的数据
    let success = _data.success || function(res){}; // 请求成功后的回调函数
    let fail = _data.fail || function(res){}; // 请求失败后的回调函数
    let complete = _data.complete || function(res){}; // 请求完成后的回调函数
    let successCode = _data.successCode || 200; // 成功请求时的代码
		let failRequest = _data.failRequest || function(res){
			uni.showToast({
			    title: res.data.detail,
			    icon: 'none'
			})
		};
    let contentType = ""
    switch (requestDataType) {
        case "form":
            contentType = "application/x-www-form-urlencoded"
            break;
        case "json":
            contentType = "application/json"
            break;
        default:
            contentType = ""
    }
    const authorization = uni.getStorageSync('authorization');
    headers["Authorization"] = authorization;
    headers["content-type"] = contentType;
    uni.request({
        url: serverUrl + url,
        method: method,
        header: headers,
        data: data,
        success: (res) => {
            if (res.statusCode == 200) {
                success(res.data);
            }else{
                failRequest(res);
            }
        },
        fail: fail,
        complete: complete
    })
};

export const getTimeAgo = (dateTime) => {
    let dateTimeStamp = new Date(dateTime).getTime();
    let result = ""
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0)  return;
    var minC = diffValue / minute;
    var hourC = diffValue / hour;
    var dayC = diffValue / day;
    var weekC = diffValue / week;
    var monthC = diffValue / month;
    if (monthC >= 1 && monthC < 4) {
        result = " " + parseInt(monthC) + "月前"
    } else if (weekC >= 1 && weekC < 4) {
        result = " " + parseInt(weekC) + "周前"
    } else if (dayC >= 1 && dayC < 7) {
        result = " " + parseInt(dayC) + "天前"
    } else if (hourC >= 1 && hourC < 24) {
        result = " " + parseInt(hourC) + "小时前"
    } else if (minC >= 1 && minC < 60) {
        result = " " + parseInt(minC) + "分钟前"
    } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚"
    } else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        result = Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;
}

export default {
    serverUrl,  
    sendRequest,
    getTimeAgo
} 