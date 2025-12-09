# JFK for President - Political Campaign Chatbot

An interactive RCS (Rich Communication Services) chatbot for a political campaign, powered by Pinnacle's RCS messaging platform. This chatbot demonstrates how political campaigns can engage voters through rich, interactive messaging experiences.

## Features

### Campaign Events
- View upcoming campaign rallies, town halls, and fundraisers
- RSVP for events directly through the chatbot
- Get directions to event locations with interactive maps
- Real-time event capacity tracking

### Policy Positions
- Browse detailed policy positions on key issues:
  - Civil Rights
  - Space Exploration
  - Healthcare for Seniors
  - Education
  - Peace Corps
  - Economic Growth
- Each policy includes quotes, key points, and comprehensive descriptions

### Donations
- Three donation tiers: Supporter ($25), Advocate ($50), Champion ($100)
- Custom donation amounts with text input
- Tier-based perks and benefits
- Automated donation confirmation with unique tracking numbers

### Volunteer Opportunities
- Sign up for various volunteer roles:
  - Door-to-door canvassing
  - Phone banking
  - Event staffing
  - Voter registration drives
- Time commitment and location details for each opportunity
- Direct connection to volunteer coordinators

### Voting Information
- Voter registration deadlines and requirements
- Early voting and election day information
- Polling location finder with location sharing
- Registration status checking

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **RCS SDK**: rcs-js (Pinnacle SDK) v2.0.4
- **Type Safety**: Full TypeScript support with strict mode
- **Environment**: dotenv for configuration management

## Project Structure

```
Political Campaign/
├── lib/
│   ├── shared/
│   │   ├── types.ts          # TypeScript interfaces
│   │   ├── rcsClient.ts      # Pinnacle client configuration
│   │   └── baseAgent.ts      # Base agent class
│   ├── agent.ts              # JFK campaign agent logic
│   └── data.ts               # Campaign data (events, policies, etc.)
├── router.ts                 # Express route handlers
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

## Setup

### Prerequisites
- Node.js 18+
- A Pinnacle API account
- RCS agent configured in Pinnacle

### Installation

1. Clone the repository and navigate to the project:
```bash
cd "Political Campaign"
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PINNACLE_API_KEY=your_api_key_here
PINNACLE_AGENT_NAME=your_agent_name_here
TEST_MODE=true
DONATION_SUPPORTER_IMAGE=your_image_url_here
DONATION_ADVOCATE_IMAGE=your_image_url_here
DONATION_CHAMPION_IMAGE=your_image_url_here
```

### Running the Application

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Build TypeScript:
```bash
npm run build
```

Type checking:
```bash
npm run type-check
```

## Usage

### Supported Message Types

**Button Actions**: Users interact primarily through rich buttons with predefined actions
- Main menu navigation
- Event RSVPs
- Donation processing
- Volunteer signups

**Text Messages**: Limited to specific contexts
- Custom donation amounts (numeric input only)
- Keyword triggers: `MENU`, `START`, `SUBSCRIBE`

**Location Sharing**: Used for polling location finder

### Button Payload Structure

All button actions use a standardized payload format:
```typescript
{
  action: string,
  params?: {
    [key: string]: string | number
  }
}
```

Example:
```json
{
  "action": "processDonation",
  "params": {
    "amount": 50,
    "tierId": "advocate"
  }
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PINNACLE_API_KEY` | Your Pinnacle API key | Yes |
| `PINNACLE_AGENT_NAME` | Your RCS agent name | Yes |
| `TEST_MODE` | Enable test mode (true/false) | No (default: false) |
| `DONATION_SUPPORTER_IMAGE` | Image URL for $25 donation tier | Yes |
| `DONATION_ADVOCATE_IMAGE` | Image URL for $50 donation tier | Yes |
| `DONATION_CHAMPION_IMAGE` | Image URL for $100 donation tier | Yes |

## Customization

### Adding New Events
Edit `lib/data.ts` and add to the `upcomingEvents` array:
```typescript
{
  id: 'unique-event-id',
  name: 'Event Name',
  date: 'Date',
  time: 'Time',
  location: 'Venue Name',
  description: 'Event description',
  address: 'Full address',
  lat: 37.7749,
  lng: -122.4194,
  capacity: 500,
  registered: 0,
  media: 'image_url'
}
```

### Adding New Policy Positions
Edit `lib/data.ts` and add to the `policyPositions` array with title, quote, description, key points, and media.

### Modifying Donation Tiers
Update the `donationTiers` array in `lib/data.ts` with custom amounts, titles, descriptions, and perks.

## License

MIT

## Support

For issues related to:
- **Pinnacle SDK**: Visit [Pinnacle Documentation](https://docs.trypinnacle.app)
- **RCS Messaging**: Check RCS Business Messaging guidelines
- **This Project**: Open an issue in the repository
