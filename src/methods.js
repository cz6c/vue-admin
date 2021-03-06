//把数组中每个对象的某个key属性的1 0属性值转换为布尔型
export function toBoolean(arr, key) {
    return arr.forEach((item) => {
        if (item[key] == 1) {
            item[key] = true;
        } else if (item[key] == 0) {
            item[key] = false;
        }
    });
}

// 防抖函数： 定时器期间，有新操作时，清空旧定时器，重设新定时器
export function debounce(fn, wait) {
    let timer, timeStamp = 0;
    let context, args;

    //定义定时器
    let run = () => {
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    }
    let clean = () => {
        clearTimeout(timer);
    }

    return function() {
        //传进来fn函数的this，和实参
        context = this;
        args = arguments;
        let now = (new Date()).getTime();

        //判断经过时间是否超过设定的时间
        if (now - timeStamp < wait) {
            clean(); //清除上一个定时器
            run(); // 从当前时间开启新定时器
        } else {
            run(); // 这里返回第一次和最后一个开启的定时器，最后一个定时器被执行
        }
        timeStamp = now;
    }
}