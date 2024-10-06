import { NextResponse } from 'next/server';
import { logos} from '@/app/constant/company_logos';
import { pageSize } from '@/app/constant/pagination';
import type { Company } from '@/types/company';

const generateCompanies = () => {
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

  return companies;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1; // Get page number from query params

  const companies = generateCompanies();
  // Get the start and end index
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginatedCompanies = companies.slice(start, end);

  // Return the paginated result along with metadata (optional)
  return NextResponse.json({
    companies: paginatedCompanies,
    total: companies.length,
    page,
  });
}