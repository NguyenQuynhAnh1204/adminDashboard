

export const countOrder = (orders, status) => {
    return orders.filter(o => o.status === status).length;
}