'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { US_STATES, type StateInfo } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface StateSelectorProps {
  onStateSelect: (state: StateInfo) => void;
  selectedState?: StateInfo;
}

export function StateSelector({ onStateSelect, selectedState }: StateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStates, setFilteredStates] = useState(US_STATES);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  useEffect(() => {
    const filtered = US_STATES.filter(state =>
      state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStates(filtered);
  }, [searchTerm]);

  const handleStateSelect = (stateCode: string) => {
    const state = US_STATES.find(s => s.code === stateCode);
    if (state) {
      onStateSelect(state);
      localStorage.setItem(STORAGE_KEYS.selectedState, JSON.stringify(state));
    }
  };

  const detectLocation = async () => {
    setIsDetectingLocation(true);
    try {
      // In a real app, you would use a geolocation API to detect the state
      // For demo purposes, we'll simulate this
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate detecting California
      const detectedState = US_STATES.find(s => s.code === 'CA');
      if (detectedState) {
        onStateSelect(detectedState);
        localStorage.setItem(STORAGE_KEYS.selectedState, JSON.stringify(detectedState));
      }
    } catch (error) {
      console.error('Failed to detect location:', error);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-accent" />
          State Selector & Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          options={[
            { value: '', label: 'Select a state...' },
            ...filteredStates.map(state => ({
              value: state.code,
              label: `${state.flag} ${state.name}`,
            })),
          ]}
          value={selectedState?.code || ''}
          onChange={(e) => handleStateSelect(e.target.value)}
        />

        <div className="text-center">
          <Button
            variant="outline"
            onClick={detectLocation}
            disabled={isDetectingLocation}
            className="w-full"
          >
            {isDetectingLocation ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent mr-2" />
                Detecting Location...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Auto-Detect Location
              </>
            )}
          </Button>
        </div>

        {selectedState && (
          <div className="p-4 bg-surface/50 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{selectedState.flag}</span>
              <span className="font-medium text-foreground">{selectedState.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Rights information will be customized for {selectedState.name} state laws.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
