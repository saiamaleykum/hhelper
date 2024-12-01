import request from "../api/requests.ts";
import { tg } from '../App.js'


export const addUser = async () => {
    const data = {
        id: tg.initDataUnsafe.user.id,
        username: tg.initDataUnsafe.user.username || null,
        first_name: tg.initDataUnsafe.user.first_name,
        last_name: tg.initDataUnsafe.user.last_name || null,
    }
    await request("POST", "user", data);
}
