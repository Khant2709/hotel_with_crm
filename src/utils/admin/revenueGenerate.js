export const revenueGenerate = (booking, type) => {
  return booking.reduce((acc, booking) => {
    const id = booking[type];
    acc[id] = (acc[id] || 0) + booking.total_price;
    return acc;
  }, {});
};