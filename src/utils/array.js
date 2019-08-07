import arrayToTree from "smart-arraytotree";

export default class Arr {
    /**
     *
     * @param value
     * @param {Array} arr
     * @returns {boolean}
     */
    static inArray(value, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (value === arr[i]) {
                return true;
            }
        }
        return false;
    }

    static toTree(list) {
        const result = arrayToTree(list, { id: "id", pid: "pid", firstPid: 0, children: "children" })
        return result ? result : [];
    }

    /**
     * 补全tree结构的children
     * 方便在需要必须每级都包含children的时候使用
     */
    static toTreeFillChildren(list) {
        list.map(function (item, index) {
            list[index]["childs"] = [];
        });
        const result = arrayToTree(list, { id: "id", pid: "pid", firstPid: 0, children: "childs" })
        return result ? result : [];
    }

    static objectToArray(object) {
        var arr = []
        for (let i in object) {
            arr.push(object[i]);
        }
        return arr
    }

    /**
     *
     * @param {Array} arr1
     * @param  {Array} arr2
     * @returns {Array}
     */
    static merge(arr1, arr2) {
        for (var i = 0; i < arr2.length; i++) {
            arr1.push(arr2[i]);
        }
        return arr1;
    }

    /**
     * 去重
     * @param {Array} arr
     * @returns {Array}
     */
    static unique(arr) {
        var hash = [];
        for (var i = 0; i < arr.length; i++) {
            if (hash.indexOf(arr[i]) === -1) {
                hash.push(arr[i]);
            }
        }
        return hash;
    }

}
