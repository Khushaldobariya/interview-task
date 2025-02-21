
"use client";
import { ADVERTISEMENT, SPECIALTY } from "@/constant";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import React, { useState, ChangeEvent } from "react";
import CandidateTable from "./candidateTable";

interface FormData {
  advertisement: string;
  selectInterview: string;
  candidateId: string;
  candidateName: string;
  email: string;
  phoneNumber: string;
  specialty: string;
}

interface SearchCriteria {
  candidateName: string;
  email: string;
  candidateId: string;
  phoneNumber: string;
  specialty: string;
}

const AssignInterview = () => {
  const [formData, setFormData] = useState<FormData>({
    advertisement: "",
    candidateId: "",
    candidateName: "",
    email: "",
    phoneNumber: "",
    selectInterview: "",
    specialty: "",
  });

  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    candidateName: "",
    email: "",
    candidateId: "",
    phoneNumber: "",
    specialty: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSearch = () => {
    setSearchCriteria({
      candidateName: formData.candidateName,
      email: formData.email,
      candidateId: formData.candidateId,
      phoneNumber: formData.phoneNumber,
      specialty: formData.specialty,
    });
  };

  const resetAll = () => {
    setSearchCriteria({    candidateName: "",
      email: "",
      candidateId: "",
      phoneNumber: "",
      specialty: ""});
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 capitalize">
          Assign Interview
        </h1>

        {/* Form Section */}
        <form className="space-y-6">
          {/* Advertisement Select Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Advertisement<span className="text-red-500">*</span>
            </label>
            <Select
              className="w-full max-w-xl"
              label="Select Advertisement"
              name="advertisement"
              value={formData.advertisement}
              onChange={handleChange}
            >
              {ADVERTISEMENT.map((advertisement) => (
                <SelectItem key={advertisement.id}>
                  {advertisement.title}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Interview Select Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Interview<span className="text-red-500">*</span>
            </label>
            <Select
              className="w-full max-w-xl"
              label="Select Interview"
              name="selectInterview"
              value={formData.selectInterview}
              onChange={handleChange}
            >
              <SelectItem>Interview 1</SelectItem>
              <SelectItem>Interview 2</SelectItem>
              <SelectItem>Interview 3</SelectItem>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Input
              label="Candidate ID"
              type="text"
              name="candidateId"
              value={formData.candidateId}
              onChange={handleChange}
              className="w-full"
            />
            <Input
              label="Candidate Name"
              type="text"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleChange}
              className="w-full"
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full"
            />
            <Input
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Specialty<span className="text-red-500">*</span>
            </label>
            <Select
              className="w-full max-w-xl"
              label="Specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
            >
              {SPECIALTY.map((specialty) => (
                <SelectItem key={specialty.id}>
                  {specialty.title}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="button"
              onClick={handleSearch}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Search
            </button>

            <button
              type="button"
              onClick={resetAll}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>
        </form>

        {/* Candidate Table */}
        <div>
          <CandidateTable searchCriteria={searchCriteria} />
        </div>
      </div>
    </div>
  );
};

export default AssignInterview;