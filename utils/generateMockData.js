import { faker } from '@faker-js/faker';

export const generateMockData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      value: parseFloat(faker.finance.amount({ min: 10, max: 1000, dec: 2 })),
      status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
      date: faker.date.recent({ days: 90 }).toISOString().split('T')[0],
    });
  }
  return data;
};