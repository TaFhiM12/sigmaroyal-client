// app/components/projects/FilterBar.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedSector: string;
  onSectorChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onReset: () => void;
  totalResults: number;
}

const sectors = [
  { value: 'all', label: 'All Sectors' },
  { value: 'OIL_GAS', label: 'Oil & Gas' },
  { value: 'POWER_SECTOR', label: 'Power' },
];

const statuses = [
  { value: 'all', label: 'All Status' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'ONGOING', label: 'Ongoing' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'year-desc', label: 'Year (Newest)' },
  { value: 'year-asc', label: 'Year (Oldest)' },
];

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedSector,
  onSectorChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  onReset,
  totalResults,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  
  const isFilterActive = searchQuery !== '' || 
    selectedSector !== 'all' || 
    selectedStatus !== 'all';

  return (
    <div className="mb-8">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="w-full md:w-96 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 md:flex-none items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {isFilterActive && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                !
              </Badge>
            )}
          </Button>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full md:w-45">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <div className="p-4 bg-white rounded-lg border shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sector Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Sector</label>
                  <Select value={selectedSector} onValueChange={onSectorChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map(sector => (
                        <SelectItem key={sector.value} value={sector.value}>
                          {sector.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Select value={selectedStatus} onValueChange={onStatusChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Found <span className="font-semibold">{totalResults}</span> projects
                </p>
                {isFilterActive && (
                  <Button variant="ghost" size="sm" onClick={onReset}>
                    Clear all filters
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      <AnimatePresence>
        {isFilterActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap gap-2 mt-4"
          >
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <button onClick={() => onSearchChange('')}>
                  <X className="h-3 w-3 ml-1" />
                </button>
              </Badge>
            )}
            {selectedSector !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Sector: {sectors.find(s => s.value === selectedSector)?.label}
                <button onClick={() => onSectorChange('all')}>
                  <X className="h-3 w-3 ml-1" />
                </button>
              </Badge>
            )}
            {selectedStatus !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Status: {statuses.find(s => s.value === selectedStatus)?.label}
                <button onClick={() => onStatusChange('all')}>
                  <X className="h-3 w-3 ml-1" />
                </button>
              </Badge>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}