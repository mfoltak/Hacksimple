import React, { useState } from 'react';
import { PlusCircle, MinusCircle, Download } from 'lucide-react';
import { TrustFundData } from '../types/trust';
import { generateTrustDocument } from '../utils/pdfGenerator';

const initialTrustData: TrustFundData = {
  settlor: {
    fullName: '',
    dateOfBirth: '',
    sin: '',
    address: '',
    phone: '',
    email: '',
  },
  trustee: {
    fullName: '',
    dateOfBirth: '',
    sin: '',
    address: '',
    phone: '',
    email: '',
  },
  beneficiaries: [{
    fullName: '',
    relationship: '',
    dateOfBirth: '',
    sin: '',
    address: '',
    phone: '',
    email: '',
    distributionInstructions: '',
  }],
  trustDetails: {
    name: '',
    type: 'inter-vivos',
    purpose: '',
    initialProperty: '',
  },
  additionalProvisions: {
    duration: '',
    trusteePowers: '',
    successorTrustee: '',
    distributionPlan: '',
    specialInstructions: '',
  },
  professionalAdvisors: {
    lawyer: {
      name: '',
      contact: '',
    },
    accountant: {
      name: '',
      contact: '',
    },
  },
};

const TrustFundSetup = () => {
  const [trustData, setTrustData] = useState<TrustFundData>(initialTrustData);

  const handleSettlorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrustData({
      ...trustData,
      settlor: {
        ...trustData.settlor,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleTrusteeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrustData({
      ...trustData,
      trustee: {
        ...trustData.trustee,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleBeneficiaryChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newBeneficiaries = [...trustData.beneficiaries];
    newBeneficiaries[index] = {
      ...newBeneficiaries[index],
      [e.target.name]: e.target.value,
    };
    setTrustData({
      ...trustData,
      beneficiaries: newBeneficiaries,
    });
  };

  const addBeneficiary = () => {
    setTrustData({
      ...trustData,
      beneficiaries: [
        ...trustData.beneficiaries,
        {
          fullName: '',
          relationship: '',
          dateOfBirth: '',
          sin: '',
          address: '',
          phone: '',
          email: '',
          distributionInstructions: '',
        },
      ],
    });
  };

  const removeBeneficiary = (index: number) => {
    setTrustData({
      ...trustData,
      beneficiaries: trustData.beneficiaries.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Trust Fund Data:', trustData);
    // Here you would typically save the data to your backend
  };

  const handleDownloadPDF = async () => {
    await generateTrustDocument(trustData);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trust Fund Setup</h1>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-700"
        >
          <Download className="h-4 w-4" />
          Download Trust Document
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Settlor Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Settlor Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input
                type="text"
                name="fullName"
                value={trustData.settlor.fullName}
                onChange={handleSettlorChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={trustData.settlor.dateOfBirth}
                onChange={handleSettlorChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Social Insurance Number</label>
              <input
                type="text"
                name="sin"
                value={trustData.settlor.sin}
                onChange={handleSettlorChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={trustData.settlor.address}
                onChange={handleSettlorChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={trustData.settlor.phone}
                onChange={handleSettlorChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={trustData.settlor.email}
                onChange={handleSettlorChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Trustee Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Trustee Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input
                type="text"
                name="fullName"
                value={trustData.trustee.fullName}
                onChange={handleTrusteeChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={trustData.trustee.dateOfBirth}
                onChange={handleTrusteeChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Social Insurance Number</label>
              <input
                type="text"
                name="sin"
                value={trustData.trustee.sin}
                onChange={handleTrusteeChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={trustData.trustee.address}
                onChange={handleTrusteeChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={trustData.trustee.phone}
                onChange={handleTrusteeChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={trustData.trustee.email}
                onChange={handleTrusteeChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Beneficiaries */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">3. Beneficiaries</h2>
            <button
              type="button"
              onClick={addBeneficiary}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <PlusCircle className="h-5 w-5" />
              Add Beneficiary
            </button>
          </div>

          {trustData.beneficiaries.map((beneficiary, index) => (
            <div key={index} className="border-b pb-6 last:border-b-0 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-gray-900">
                  Beneficiary {index + 1}
                </h3>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeBeneficiary(index)}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <MinusCircle className="h-5 w-5" />
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Legal Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={beneficiary.fullName}
                    onChange={(e) => handleBeneficiaryChange(index, e)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Relationship to Settlor</label>
                  <input
                    type="text"
                    name="relationship"
                    value={beneficiary.relationship}
                    onChange={(e) => handleBeneficiaryChange(index, e)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={beneficiary.dateOfBirth}
                    onChange={(e) => handleBeneficiaryChange(index, e)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Social Insurance Number</label>
                  <input
                    type="text"
                    name="sin"
                    value={beneficiary.sin}
                    onChange={(e) => handleBeneficiaryChange(index, e)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={beneficiary.address}
                    onChange={(e) => handleBeneficiaryChange(index, e)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Distribution Instructions</label>
                  <textarea
                    name="distributionInstructions"
                    value={beneficiary.distributionInstructions}
                    onChange={(e) => handleBeneficiaryChange(index, e)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 px-4 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Trust Fund
        </button>
      </form>
    </div>
  );
};

export default TrustFundSetup;