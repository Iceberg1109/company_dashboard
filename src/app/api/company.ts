// pages/api/companies.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Company } from '@/types/company';

const companies: Company[] = [];
for (let i = 0; i < 100; i ++) {
  companies.push({
    id: i.toString(),
    name: `Company i${i}`,
    email: `company_${i}@minimi.com`,
    logoUrl: logos[i % logos.length],
  });
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(companies);
};