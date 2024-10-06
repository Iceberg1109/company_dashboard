'use client'

import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import CompanyCard from './CompanyCard';
import { pageSize } from '../constant/pagination';
import type { Company } from '@/types/company';

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalNumer, setTotalNumber] = useState<number>(0);

  useEffect(() => {
    // Fetch data from the API
    const fetchCompanies = async () => {
      const response = await fetch(`/api/company?page=${currentPage}`);
      const data = await response.json();
      setCompanies(data.companies);
      setTotalNumber(data.total);
    };

    fetchCompanies();
  }, [currentPage]);

  const handleSelectCompany = (id: string) => {
    setSelectedCompanies((prev) =>
      // if id is included the selected list, removes it. Otherwise, add it to the selected list
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {companies.map((company) => <CompanyCard
        key={company.id}
        {...company}
        isSelected={selectedCompanies.includes(company.id)}
        onSelect={handleSelectCompany}
      />)}
      
      {/* Pagination bar */}
      <Pagination
        currentPage={currentPage}
        total={totalNumer}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  )
}

export default Companies;
