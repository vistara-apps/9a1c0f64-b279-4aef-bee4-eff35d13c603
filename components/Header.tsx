'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { Shield, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-xl font-bold text-foreground">KnowYourRights</h1>
                <p className="text-xs text-muted-foreground">Cards</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Smart Jury
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Smart Phone
            </a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-3">
            <Wallet>
              <ConnectWallet>
                <Name />
              </ConnectWallet>
            </Wallet>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Smart Jury
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Smart Phone
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
