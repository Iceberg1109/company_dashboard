import { NextResponse } from 'next/server';
import { logos} from '@/app/constant/company_logos';
import type { Company } from '@/types/company';

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

  for (let i = 1; i < 100; i ++) {
    companies.push({
      id: i.toString(),
      name: `Company ${i}`,
      email: `company_${i}@minimi.com`,
    });
  }

  return NextResponse.json(companies);
}