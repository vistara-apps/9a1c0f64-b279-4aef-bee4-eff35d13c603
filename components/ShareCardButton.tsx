'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Share2, Copy, Link, Twitter, MessageSquare, Check } from 'lucide-react';
import { type RightsCard } from '@/lib/types';

interface ShareCardButtonProps {
  rightsCard: RightsCard;
  variant?: 'default';
}

export function ShareCardButton({ rightsCard, variant = 'default' }: ShareCardButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateShareableCard = async () => {
    setIsSharing(true);
    
    try {
      // In a real app, this would generate a shareable card via API
      // For demo purposes, we'll simulate this
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockShareUrl = `https://knowyourrights.cards/share/${rightsCard.cardId}`;
      setShareUrl(mockShareUrl);
    } catch (error) {
      console.error('Failed to generate shareable card:', error);
      alert('Failed to generate shareable card. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const shareToTwitter = () => {
    if (!shareUrl) return;
    
    const text = `Check out this KnowYourRights Card for ${rightsCard.state} - essential legal information for police encounters.`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareToFarcaster = () => {
    if (!shareUrl) return;
    
    const text = `KnowYourRights Card for ${rightsCard.state} 🛡️\n\nEssential legal information for police encounters.\n\n${shareUrl}`;
    // In a real app, this would integrate with Farcaster's sharing API
    console.log('Share to Farcaster:', text);
    alert('Farcaster sharing would be implemented here');
  };

  const shareNatively = async () => {
    if (!shareUrl || !navigator.share) return;
    
    try {
      await navigator.share({
        title: `KnowYourRights Card - ${rightsCard.state}`,
        text: 'Essential legal information for police encounters',
        url: shareUrl,
      });
    } catch (error) {
      console.error('Native sharing failed:', error);
    }
  };

  if (!shareUrl) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-accent" />
            Shareable Content Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Generate a shareable card with key rights information for {rightsCard.state}
            </p>
            
            <Button
              onClick={generateShareableCard}
              disabled={isSharing}
              className="w-full"
            >
              {isSharing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generating Card...
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-2" />
                  Generate Shareable Card
                </>
              )}
            </Button>
          </div>

          <div className="p-3 bg-surface/40 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground text-center">
              This will create a web link that others can access to view the rights information for your state.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-accent" />
          Share Your Rights Card
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-surface/40 rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Link className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Shareable Link</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs bg-background p-2 rounded border border-border text-muted-foreground">
              {shareUrl}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={shareToTwitter}
            className="flex items-center gap-2"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>
          
          <Button
            variant="outline"
            onClick={shareToFarcaster}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Farcaster
          </Button>
        </div>

        {navigator.share && (
          <Button
            variant="secondary"
            onClick={shareNatively}
            className="w-full"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share via Device
          </Button>
        )}

        <div className="p-3 bg-surface/40 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground text-center">
            Share this card to help others in your community know their rights during police encounters.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
