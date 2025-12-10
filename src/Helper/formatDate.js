import dayjs from "dayjs";

export const formatted = dayjs().format("DD/MM/YYYY HH:mm");


export function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}