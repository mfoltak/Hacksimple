import React, { useState, useEffect } from 'react';
import { PlusCircle, MinusCircle, Download, Calculator } from 'lucide-react';
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
  financialPlanning: {
    currentIncome: '',
    goalAmount: '',
    targetDate: '',
    financialGoal: '',
  },
};

const TrustFundSetup = () => {
  const [trustData, setTrustData] = useState<TrustFundData>(initialTrustData);
  const [currentStep, setCurrentStep] = useState(1);
  const [showCalculation, setShowCalculation] = useState(false);
  const [monthlyContribution, setMonthlyContribution] = useState<number | null>(null);

  useEffect(() => {
    calculateMonthlyContribution();
  }, [trustData.financialPlanning.goalAmount, trustData.financialPlanning.targetDate]);

  const calculateMonthlyContribution = () => {
    const { goalAmount, targetDate } = trustData.financialPlanning;
    
    if (!goalAmount || !targetDate) {
      setMonthlyContribution(null);
      return;
    }
    
    const goalAmountNum = parseFloat(goalAmount);
    const targetDateObj = new Date(targetDate);
    const currentDate = new Date();
    
    if (isNaN(goalAmountNum) || targetDateObj <= currentDate) {
      setMonthlyContribution(null);
      return;
    }
    
    const monthsDiff = (targetDateObj.getFullYear() - currentDate.getFullYear()) * 12 + 
                       (targetDateObj.getMonth() - currentDate.getMonth());
    
    if (monthsDiff <= 0) {
      setMonthlyContribution(null);
      return;
    }
    
    const contribution = goalAmountNum / monthsDiff;
    setMonthlyContribution(contribution);
  };

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

  const handleFinancialPlanningChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTrustData({
      ...trustData,
      financialPlanning: {
        ...trustData.financialPlanning,
        [e.target.name]: e.target.value,
      },
    });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
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
        <h1 className="text-2xl font-bold text-gray-900">Setup</h1>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-green-600 px-4 py-2 text-white rounded-md hover:bg-green-700"
        >
          <Download className="h-4 w-4" />
          Download Trust Document
        </button>
      </div>
      
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            <div className={`flex items-center ${currentStep === 1 ? 'text-gray-900' : 'text-gray-500'}`}>
              <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mr-2 
                ${currentStep === 1 ? 'border-gray-900 bg-gray-100' : 'border-gray-300'}`}>1</span>
              Basic Info
            </div>
            <div className={`flex items-center ${currentStep === 2 ? 'text-gray-900' : 'text-gray-500'}`}>
              <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mr-2
                ${currentStep === 2 ? 'border-gray-900 bg-gray-100' : 'border-gray-300'}`}>2</span>
              Beneficiaries
            </div>
            <div className={`flex items-center ${currentStep === 3 ? 'text-gray-900' : 'text-gray-500'}`}>
              <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mr-2
                ${currentStep === 3 ? 'border-gray-900 bg-gray-100' : 'border-gray-300'}`}>3</span>
              Financial Goals
            </div>
            <div className={`flex items-center ${currentStep === 4 ? 'text-gray-900' : 'text-gray-500'}`}>
              <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mr-2
                ${currentStep === 4 ? 'border-gray-900 bg-gray-100' : 'border-gray-300'}`}>4</span>
              Review
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">1. Settlor Information</h2>
                <button
                  type="button"
                  onClick={() => {
                    setTrustData({
                      ...trustData,
                      settlor: {
                        fullName: 'Mark Smith',
                        dateOfBirth: '1975-07-02',
                        sin: 'DEMO-123-456-789',
                        address: '123 Example Street, Sampletown, XY 12345',
                        phone: '(555) 123-4567',
                        email: 'mark.smith@wealthsimple.com',
                      }
                    });
                  }}
                  className="flex items-center gap-2 text-sm bg-green-50 text-green-700 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Import from Wealthsimple
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Legal Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={trustData.settlor.fullName}
                    onChange={handleSettlorChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={trustData.settlor.dateOfBirth}
                    onChange={handleSettlorChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Social Insurance Number</label>
                  <input
                    type="text"
                    name="sin"
                    value={trustData.settlor.sin}
                    onChange={handleSettlorChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={trustData.settlor.address}
                    onChange={handleSettlorChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={trustData.settlor.phone}
                    onChange={handleSettlorChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={trustData.settlor.email}
                    onChange={handleSettlorChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>

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
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={trustData.trustee.dateOfBirth}
                    onChange={handleTrusteeChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Social Insurance Number</label>
                  <input
                    type="text"
                    name="sin"
                    value={trustData.trustee.sin}
                    onChange={handleTrusteeChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={trustData.trustee.address}
                    onChange={handleTrusteeChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={trustData.trustee.phone}
                    onChange={handleTrusteeChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={trustData.trustee.email}
                    onChange={handleTrusteeChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="bg-gray-900 py-2 px-6 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Next: Beneficiaries
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">3. Beneficiaries</h2>
                <button
                  type="button"
                  onClick={addBeneficiary}
                  className="text-gray-900 hover:text-gray-700 flex items-center gap-1"
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
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Relationship to Settlor</label>
                      <input
                        type="text"
                        name="relationship"
                        value={beneficiary.relationship}
                        onChange={(e) => handleBeneficiaryChange(index, e)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={beneficiary.dateOfBirth}
                        onChange={(e) => handleBeneficiaryChange(index, e)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Social Insurance Number</label>
                      <input
                        type="text"
                        name="sin"
                        value={beneficiary.sin}
                        onChange={(e) => handleBeneficiaryChange(index, e)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={beneficiary.address}
                        onChange={(e) => handleBeneficiaryChange(index, e)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Distribution Instructions</label>
                      <textarea
                        name="distributionInstructions"
                        value={beneficiary.distributionInstructions}
                        onChange={(e) => handleBeneficiaryChange(index, e)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="border border-gray-300 py-2 px-6 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-gray-900 py-2 px-6 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Next: Financial Goals
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Plan My Future</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Annual Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="currentIncome"
                  value={trustData.financialPlanning.currentIncome}
                  onChange={handleFinancialPlanningChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Goal Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="goalAmount"
                  value={trustData.financialPlanning.goalAmount}
                  onChange={handleFinancialPlanningChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Achievement Date
              </label>
              <input
                type="date"
                name="targetDate"
                value={trustData.financialPlanning.targetDate}
                onChange={handleFinancialPlanningChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  calculateMonthlyContribution();
                  setShowCalculation(true);
                }}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Calculator className="h-4 w-4" />
                Calculate Monthly Contribution
              </button>
            </div>
            
            {showCalculation && monthlyContribution !== null && (
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-center mb-2">
                  <h3 className="font-medium text-gray-900">Monthly Contribution Needed</h3>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => setShowCalculation(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-gray-700">
                    To reach your goal of <span className="font-semibold">${parseFloat(trustData.financialPlanning.goalAmount).toLocaleString()}</span> by{' '}
                    <span className="font-semibold">{new Date(trustData.financialPlanning.targetDate).toLocaleDateString()}</span>,
                    you need to contribute:
                  </p>
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    ${monthlyContribution.toFixed(2)} per month
                  </p>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe Your Financial Goals
              </label>
              <textarea
                name="financialGoal"
                value={trustData.financialPlanning.financialGoal}
                onChange={handleFinancialPlanningChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                rows={4}
                placeholder="e.g., I want to create a college fund for my children..."
              />
            </div>
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="border border-gray-300 py-2 px-6 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-gray-900 py-2 px-6 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Next: Review
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Review Your Trust Fund Setup</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900">Settlor Information</h3>
                  <p className="text-gray-600">
                    {trustData.settlor.fullName || "Not provided"} • 
                    {trustData.settlor.email || "No email"}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Trustee Information</h3>
                  <p className="text-gray-600">
                    {trustData.trustee.fullName || "Not provided"} • 
                    {trustData.trustee.email || "No email"}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Beneficiaries</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {trustData.beneficiaries.map((beneficiary, index) => (
                      <li key={index}>
                        {beneficiary.fullName || `Beneficiary ${index + 1}`} ({beneficiary.relationship || "Relationship not specified"})
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Financial Goals</h3>
                  <p className="text-gray-600">
                    Target Amount: ${trustData.financialPlanning.goalAmount || "0"} • 
                    {monthlyContribution && `Recommended Monthly Contribution: $${monthlyContribution.toFixed(2)}`}
                  </p>
                  <p className="text-gray-600 mt-2">
                    {trustData.financialPlanning.financialGoal || "No specific goals provided"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="border border-gray-300 py-2 px-6 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-gray-900 py-2 px-6 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Create Trust Fund
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TrustFundSetup;