'use client'

import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import CompanyCard from './CompanyCard';
import type { Company } from '@/types/company';

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // Fetch data from the API
    const fetchCompanies = async () => {
      const response = await fetch(`/api/company`);
      const data = await response.json();
      setCompanies(data);
    };

    fetchCompanies();
  }, [currentPage]);

  const handleSelectCompany = (id: number) => {
    setSelectedCompanies((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {companies.map((company) => <CompanyCard {...company} />)}
      
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />

    </div>
  )
}

export default Companies;
