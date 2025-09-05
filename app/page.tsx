'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Header } from '@/components/Header';
import { StateSelector } from '@/components/StateSelector';
import { GuideView } from '@/components/GuideView';
import { RecordButton } from '@/components/RecordButton';
import { EmergencyAlert } from '@/components/EmergencyAlert';
import { ShareCardButton } from '@/components/ShareCardButton';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { type StateInfo, type RightsCard } from '@/lib/types';
import { DEFAULT_RIGHTS_CONTENT, STORAGE_KEYS } from '@/lib/constants';
import { generateCardId } from '@/lib/utils';
import { Shield, Smartphone, Users, Zap } from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [selectedState, setSelectedState] = useState<StateInfo | null>(null);
  const [currentCard, setCurrentCard] = useState<RightsCard | null>(null);
  const [activeTab, setActiveTab] = useState<'guide' | 'record' | 'emergency' | 'share'>('guide');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize MiniKit
  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEYS.selectedState);
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setSelectedState(state);
        generateRightsCard(state);
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);

  const generateRightsCard = async (state: StateInfo) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call the OpenAI API to generate state-specific content
      // For demo purposes, we'll use the default content with state customization
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const card: RightsCard = {
        cardId: generateCardId(),
        state: state.name,
        contentHash: `hash_${Date.now()}`,
        language: 'en',
        content: {
          ...DEFAULT_RIGHTS_CONTENT.en,
          title: `Your Rights in ${state.name}`,
          lastUpdated: new Date().toISOString(),
          scripts: [
            {
              id: 'traffic-stop',
              scenario: 'Traffic Stop',
              text: 'Officer, am I free to leave? I invoke my right to remain silent. I do not consent to any searches.',
              language: 'en',
            },
            {
              id: 'street-encounter',
              scenario: 'Street Encounter',
              text: 'I am exercising my right to remain silent. I do not consent to any searches. Am I being detained?',
              language: 'en',
            },
            {
              id: 'home-visit',
              scenario: 'Home Visit',
              text: 'I do not consent to you entering my home. Do you have a warrant? I am exercising my right to remain silent.',
              language: 'en',
            },
          ],
        },
      };
      
      setCurrentCard(card);
    } catch (error) {
      console.error('Failed to generate rights card:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStateSelect = (state: StateInfo) => {
    setSelectedState(state);
    generateRightsCard(state);
  };

  const handleMintCard = () => {
    if (!currentCard) return;
    
    // In a real app, this would integrate with Zora/Base to mint the NFT
    console.log('Minting card:', currentCard);
    alert('NFT minting would be implemented here with Zora integration');
  };

  const handleRecordingComplete = (recordingData: any) => {
    console.log('Recording completed:', recordingData);
    // In a real app, this would save to IPFS via Pinata
    alert('Recording saved! In a real app, this would be uploaded to IPFS.');
  };

  const handleEmergencyAlert = (contacts: any[]) => {
    console.log('Emergency alert sent to:', contacts);
  };

  if (!selectedState) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="h-12 w-12 text-accent" />
                <h1 className="text-4xl font-bold text-foreground">KnowYourRights Cards</h1>
              </div>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Choose how to take and store any free local order to 
                ensure that it fits the classic try any problem.
              </p>
              
              <div className="mb-8">
                <StateSelector onStateSelect={handleStateSelect} />
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Consulting</h3>
                  <p className="text-sm text-muted-foreground">
                    State-specific legal guidance
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Smartphone className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    Secure recording capabilities
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Collaboration</h3>
                  <p className="text-sm text-muted-foreground">
                    Emergency contact alerts
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Zap className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Streaming</h3>
                  <p className="text-sm text-muted-foreground">
                    Instant access offline
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Record Session
              </Button>
              <Button variant="outline" size="lg">
                Mint a Rights
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* State Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">{selectedState.flag}</span>
              <h1 className="text-3xl font-bold text-foreground">{selectedState.name}</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => setSelectedState(null)}
              className="mb-6"
            >
              Change State
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
              <p className="text-muted-foreground">Generating your rights card...</p>
            </div>
          )}

          {/* Main Content */}
          {currentCard && !isLoading && (
            <div className="space-y-8">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={activeTab === 'guide' ? 'primary' : 'outline'}
                  onClick={() => setActiveTab('guide')}
                >
                  Rights Guide
                </Button>
                <Button
                  variant={activeTab === 'record' ? 'primary' : 'outline'}
                  onClick={() => setActiveTab('record')}
                >
                  Record
                </Button>
                <Button
                  variant={activeTab === 'emergency' ? 'primary' : 'outline'}
                  onClick={() => setActiveTab('emergency')}
                >
                  Emergency
                </Button>
                <Button
                  variant={activeTab === 'share' ? 'primary' : 'outline'}
                  onClick={() => setActiveTab('share')}
                >
                  Share
                </Button>
              </div>

              {/* Tab Content */}
              <div className="animate-fade-in">
                {activeTab === 'guide' && (
                  <GuideView
                    rightsCard={currentCard}
                    onMintCard={handleMintCard}
                    onShareCard={() => setActiveTab('share')}
                  />
                )}
                
                {activeTab === 'record' && (
                  <RecordButton onRecordingComplete={handleRecordingComplete} />
                )}
                
                {activeTab === 'emergency' && (
                  <EmergencyAlert onAlertSent={handleEmergencyAlert} />
                )}
                
                {activeTab === 'share' && (
                  <ShareCardButton rightsCard={currentCard} />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
