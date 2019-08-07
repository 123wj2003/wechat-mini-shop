import Exception from "./exception";

/**
 * 只要返回错误抛出异常
 * 不同模型多次实例化
 */
export default class Model {
    exception;

    getException() {
        return this.exception
    }

    setException(exception) {
        if (exception instanceof Exception) {
            this.exception = exception
        } else {
            console.log(this, exception, 'Model里继承实例化的Exception Class Error',)
            throw 'Exception Class Error'
        }
    }
}
