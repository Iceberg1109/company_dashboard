import { NextResponse } from 'next/server';
import { Company } from '@/types/company';
import { logos} from '@/app/constant/company_logos';

export async function GET() {
  const companies: Company[] = [
    {
      id: 'walmart',
      name: 'Walmart',
      email: 'contact@walmart.com',
      logoUrl: logos.walmart
    },
    {
      id: 'aws',
      name: 'AWS',
      email: 'contact@aws.com',
      logoUrl: logos.aws
    },
  ];

  for (let i = 0; i < 100; i ++) {
    companies.push({
      id: i.toString(),
      name: `Company i${i}`,
      email: `company_${i}@minimi.com`,
    });
  }

  return NextResponse.json(companies);
}