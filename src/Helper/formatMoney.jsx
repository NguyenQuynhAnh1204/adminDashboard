

export const formatVND = (value) => {
    if (typeof value !== "number") return "";
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
