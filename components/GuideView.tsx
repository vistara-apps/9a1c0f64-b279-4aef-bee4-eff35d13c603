'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { type RightsCard, type RightsSection, type Script } from '@/lib/types';
import { Shield, MessageCircle, XCircle, Languages, Share2, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuideViewProps {
  rightsCard: RightsCard;
  onMintCard?: () => void;
  onShareCard?: () => void;
  variant?: 'default' | 'compactScript';
}

const iconMap = {
  shield: Shield,
  'message-circle': MessageCircle,
  'x-circle': XCircle,
};

export function GuideView({ 
  rightsCard, 
  onMintCard, 
  onShareCard, 
  variant = 'default' 
}: GuideViewProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es'>('en');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const renderSection = (section: RightsSection) => {
    const IconComponent = iconMap[section.icon as keyof typeof iconMap] || Shield;
    const isExpanded = expandedSection === section.id;

    return (
      <div
        key={section.id}
        className={cn(
          'border border-border rounded-lg transition-all duration-200',
          isExpanded ? 'bg-surface/60' : 'bg-surface/30 hover:bg-surface/50'
        )}
      >
        <button
          onClick={() => toggleSection(section.id)}
          className="w-full p-4 text-left flex items-center gap-3"
        >
          <IconComponent className="h-5 w-5 text-accent flex-shrink-0" />
          <span className="font-medium text-foreground">{section.title}</span>
        </button>
        
        {isExpanded && (
          <div className="px-4 pb-4 animate-slide-up">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {section.content}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderScripts = () => {
    const scripts = rightsCard.content.scripts.filter(
      script => script.language === selectedLanguage
    );

    return (
      <div className="space-y-3">
        {scripts.map((script) => (
          <div
            key={script.id}
            className="p-4 bg-surface/40 rounded-lg border border-border"
          >
            <h4 className="font-medium text-foreground mb-2">{script.scenario}</h4>
            <p className="text-sm text-muted-foreground italic">
              "{script.text}"
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-accent" />
              <span>{rightsCard.content.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedLanguage(selectedLanguage === 'en' ? 'es' : 'en')}
              >
                <Languages className="h-4 w-4 mr-1" />
                {selectedLanguage.toUpperCase()}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            State: <span className="font-medium text-foreground">{rightsCard.state}</span>
            {' • '}
            Last Updated: <span className="font-medium text-foreground">
              {new Date(rightsCard.content.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {variant === 'default' && (
        <Card>
          <CardHeader>
            <CardTitle>What Pages & Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rightsCard.content.sections.map(renderSection)}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Ready-to-Use Scripts</CardTitle>
        </CardHeader>
        <CardContent>
          {renderScripts()}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        {onMintCard && (
          <Button onClick={onMintCard} className="flex-1">
            <Coins className="h-4 w-4 mr-2" />
            Mint Rights Card
          </Button>
        )}
        
        {onShareCard && (
          <Button variant="outline" onClick={onShareCard} className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Share Card
          </Button>
        )}
      </div>
    </div>
  );
}
