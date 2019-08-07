import fa from "./fa";
import PromoteModel from "@/model/promote";
import storage from "@/services/storage";
const promoteModel = new PromoteModel()

export default class Inviter {
    static bind() {
        const inviter_user_id = fa.cache.get('inviter_user_id')
        const existUserInfo = storage.getUserInfo()

        if (inviter_user_id > 0 && existUserInfo) {
            promoteModel.inviteCustomer({
                inviter_user_id
            })
        }
    }
}
