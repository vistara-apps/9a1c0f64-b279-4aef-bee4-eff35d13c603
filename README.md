# KnowYourRights Cards - Base Mini App

A mobile-first application providing users with on-demand, state-specific legal rights and communication scripts during police encounters, accessible via Base Wallet MiniApps.

## Features

### 🛡️ State-Specific Rights Guides
- Select your state to access concise, one-page guides on your rights
- Optimized for mobile readability
- Accurate legal information tailored to state laws

### 📝 Actionable Scripts (EN/ES)
- Pre-written scripts for common police encounter scenarios
- Available in English and Spanish
- Ready-to-use phrases to protect your rights

### 📹 Quick Record & Share
- Discreet, one-tap recording of encounters
- Audio and video recording capabilities
- Secure sharing via unique links

### 📱 Offline Access
- Core rights information available without internet
- Essential for situations where connectivity is limited
- Cached content for immediate access

### 🚨 Emergency Contact Alert
- Quick location sharing with trusted contacts
- Pre-defined alert messages
- One-tap emergency notifications

### 🔗 Shareable Content Generation
- Generate shareable 'cards' with key rights information
- Community sharing capabilities
- Social media integration

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base L2 with OnchainKit integration
- **Wallet**: MiniKit provider for seamless Base Wallet integration
- **Styling**: Tailwind CSS with custom design system
- **AI**: OpenAI/Anthropic for content generation
- **Storage**: IPFS via Pinata for decentralized storage
- **NFTs**: Zora protocol for minting rights cards

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Base Wallet (for testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/knowyourrights-cards.git
cd knowyourrights-cards
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your API keys:
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PINATA_API_KEY=your_pinata_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Users

1. **Connect Wallet**: Connect your Base Wallet through the MiniApp
2. **Select State**: Choose your state for relevant legal information
3. **Access Rights**: View your constitutional and state-specific rights
4. **Use Scripts**: Access pre-written scripts for police encounters
5. **Record Encounters**: Use the discreet recording feature when needed
6. **Emergency Alerts**: Set up and use emergency contact notifications
7. **Mint NFTs**: Mint your state's rights card as an NFT (1 USDC)
8. **Share Information**: Generate and share rights cards with others

### For Developers

The app follows a modular component architecture:

- `components/StateSelector.tsx` - State selection interface
- `components/GuideView.tsx` - Rights information display
- `components/RecordButton.tsx` - Recording functionality
- `components/EmergencyAlert.tsx` - Emergency contact system
- `components/ShareCardButton.tsx` - Content sharing features

## Business Model

### Tokenized Approach
- Each state-specific 'Rights Card' can be minted as an NFT for 1 USDC
- Premium features available through additional token purchases
- Community governance through token ownership
- Leverages Base's low gas fees for micro-transactions

## Legal Disclaimer

This application provides general legal information and should not be considered legal advice. Users should consult with qualified attorneys for specific legal situations. The information provided is for educational purposes only.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@knowyourrights.cards or join our community discussions.

## Roadmap

- [ ] Multi-language support expansion
- [ ] Advanced recording encryption
- [ ] Community-driven content updates
- [ ] Integration with legal aid organizations
- [ ] Expanded state coverage
- [ ] Mobile app versions

---

Built with ❤️ for civil rights and powered by Base.
