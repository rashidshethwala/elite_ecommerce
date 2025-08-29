import React from 'react';
import { ChevronDown } from 'lucide-react';
import { SortOption, FilterState } from '../types';

interface SortDropdownProps {
  value: FilterState['sortBy'];
  options: SortOption[];
  onChange: (value: FilterState['sortBy']) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, options, onChange }) => {
  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as FilterState['sortBy'])}
        className="appearance-none px-4 py-2 pr-8 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer hover:border-gray-400 transition-colors"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            Sort by: {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  );
};

export default SortDropdown;