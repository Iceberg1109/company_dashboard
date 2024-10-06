'use client'

import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import CompanyCard from './CompanyCard';
import { pageSize } from '../constant/pagination';
import { useRouter } from 'next/navigation';
import type { Company } from '@/types/company';
import Spinner from './Spinner';
import Navbar from './Navbar';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalNumer, setTotalNumber] = useState<number>(0);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the API
    const fetchCompanies = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/company?page=${currentPage}`);

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCompanies(data.companies);
        setTotalNumber(data.total);
      } catch (error) {
        console.error("Error fetching companies:", error);
        router.push('/error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [currentPage]);

  const handleSelectCompany = (id: string) => {
    setSelectedCompanies((prev) =>
      // if id is included the selected list, removes it. Otherwise, add it to the selected list
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleRemove = () => {
    const confirmed = confirm(`Are you sure want to delete the ${selectedCompanies.length} companies you selected?`);
    if (confirmed) {
      setIsRemoving(true);
      // This should be replaced to the real logic to remove the companies selected
      setTimeout(() => {
        setIsRemoving(false);
        setSelectedCompanies([]);
      }, 500);
    }
  }

  return (
    <div>
      <Navbar isRemoving={isRemoving} isRemoveDisabled={selectedCompanies.length === 0} onRemove={handleRemove} />
      <main className="grid justify-items-center min-h-screen p-8 pb-20 sm:px-20 flex items-center sm:items-start">
        <div>
          {isLoading? (<Spinner />) : (<ul role="list" className="divide-y divide-gray-100">
            {companies.map((company) => <CompanyCard
              key={company.id}
              {...company}
              isSelected={selectedCompanies.includes(company.id)}
              onSelect={handleSelectCompany}
            />)}
          </ul>)}
          {/* Pagination bar */}
          <Pagination
            currentPage={currentPage}
            total={totalNumer}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
            className="pt-5"
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
