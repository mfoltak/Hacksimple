import React from 'react';
import { DollarSign, TrendingUp, Users, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const mockTrustFund = {
    totalValue: 1250000,
    assets: [
      { name: 'Stock Portfolio', value: 750000, growth: 12.5 },
      { name: 'Real Estate', value: 400000, growth: 5.2 },
      { name: 'Cash', value: 100000, growth: 0.5 },
    ],
    beneficiaries: [
      { name: 'John Smith', allocation: 50 },
      { name: 'Sarah Smith', allocation: 50 },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Trust Fund Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${mockTrustFund.totalValue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-gray-900" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Asset Growth (YTD)</p>
              <p className="text-2xl font-bold text-green-600">+8.7%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Beneficiaries</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockTrustFund.beneficiaries.length}
              </p>
            </div>
            <Users className="h-8 w-8 text-gray-900" />
          </div>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h2>
        <div className="space-y-4">
          {mockTrustFund.assets.map((asset, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{asset.name}</p>
                <p className="text-sm text-gray-600">
                  ${asset.value.toLocaleString()}
                </p>
              </div>
              <span className={`text-sm ${
                asset.growth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {asset.growth > 0 ? '+' : ''}{asset.growth}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Beneficiaries */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Beneficiaries</h2>
        <div className="space-y-4">
          {mockTrustFund.beneficiaries.map((beneficiary, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{beneficiary.name}</p>
                <p className="text-sm text-gray-600">
                  Allocation: {beneficiary.allocation}%
                </p>
              </div>
              <button className="text-gray-900 hover:text-gray-700 flex items-center gap-1">
                Manage <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;