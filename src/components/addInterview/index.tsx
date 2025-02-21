"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { ADVERTISEMENT } from "../../constant";

interface FormData {
  advertisement: string;
  name: string;
  startDate: string;
  startTime: string;
  endTime: string;
  scoreType: string;
  allowEdit: string;
  hasDocumentVerification: string;
}

interface FormErrors {
  advertisement?: string;
  name?: string;
  startDate?: string;
  startTime?: string;
  endTime?: string;
  scoreType?: string;
  allowEdit?: string;
  hasDocumentVerification?: string;
}

export default function AddInterviewForm() {
  const [formData, setFormData] = useState<FormData>({
    advertisement: "",
    name: "",
    startDate: "",
    startTime: "",
    endTime: "",
    scoreType: "",
    allowEdit: "",
    hasDocumentVerification: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  function validateForm(): boolean {
    let newErrors: FormErrors = {};

    // Advertisement validation
    if (!formData.advertisement) {
      newErrors.advertisement = "Please select an advertisement";
    }

    // Name validation
    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Start Date validation
    if (!formData.startDate) {
      newErrors.startDate = "Please select a start date";
    }

    // Start Time validation
    if (!formData.startTime) {
      newErrors.startTime = "Please select a start time";
    }

    // End Time validation
    if (!formData.endTime) {
      newErrors.endTime = "Please select an end time";
    } else if (formData.startTime && formData.endTime <= formData.startTime) {
      newErrors.endTime = "End time must be after start time";
    }

    // Score Type validation
    if (!formData.scoreType) {
      newErrors.scoreType = "Please select a score type";
    }

    // Allow Edit validation
    if (!formData.allowEdit) {
      newErrors.allowEdit = "Please select whether editing is allowed";
    }

    // Document Verification validation
    if (!formData.hasDocumentVerification) {
      newErrors.hasDocumentVerification =
        "Please select document verification status";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">ADD INTERVIEW</h1>
        <button className="inline-flex items-center gap-x-2 text-sm font-semibold text-gray-500 hover:text-blue-600">
          Go Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">
            Select Advertisement<span className="text-red-500">*</span>
          </label>
          <Select
            className="max-w-xs"
            label="Select"
            name="advertisement"
            value={formData.advertisement}
            onChange={handleChange}
          >
            {ADVERTISEMENT.map((advertisement) => (
              <SelectItem key={advertisement.id} >
                {advertisement.title}
              </SelectItem>
            ))}
          </Select>
          {errors.advertisement && (
            <p className="text-sm text-red-600">{errors.advertisement}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">
            Name<span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter name"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium">
              Starting Date<span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.startDate && (
              <p className="text-sm text-red-600">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Starting Time<span className="text-red-500">*</span>
            </label>
            <Input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.startTime && (
              <p className="text-sm text-red-600">{errors.startTime}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Ending Time<span className="text-red-500">*</span>
            </label>
            <Input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.endTime && (
              <p className="text-sm text-red-600">{errors.endTime}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium">
              Score Type<span className="text-red-500">*</span>
            </label>
            <Select
              className="max-w-xs"
              label="Score Type"
              name="scoreType"
              value={formData.scoreType}
              onChange={handleChange}
            >
              <SelectItem>Grade</SelectItem>
              <SelectItem >Marks</SelectItem>
            </Select>
            {errors.scoreType && (
              <p className="text-sm text-red-600">{errors.scoreType}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Allow edit Yes/No<span className="text-red-500">*</span>
            </label>
            <Select
              className="max-w-xs"
              label="Allow edit Yes/No"
              name="allowEdit"
              value={formData.allowEdit}
              onChange={handleChange}
            >
              <SelectItem>Yes</SelectItem>
              <SelectItem >No</SelectItem>
            </Select>
            {errors.allowEdit && (
              <p className="text-sm text-red-600">{errors.allowEdit}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Has document verification<span className="text-red-500">*</span>
            </label>
            <Select
              className="max-w-xs"
              label="Has document verification"
              name="hasDocumentVerification"
              value={formData.hasDocumentVerification}
              onChange={handleChange}
            >
              <SelectItem>Yes</SelectItem>
              <SelectItem >No</SelectItem>
            </Select>
            {errors.hasDocumentVerification && (
              <p className="text-sm text-red-600">
                {errors.hasDocumentVerification}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Interview
          </Button>
        </div>
      </form>
    </div>
  );
}