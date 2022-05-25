import { nanoid } from "nanoid";

//生成唯一订单号
export function stochasticOrder() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const randomId = nanoid();
    return `${year}${month}${day}${hours}${minutes}${randomId}`
}