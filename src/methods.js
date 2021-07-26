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