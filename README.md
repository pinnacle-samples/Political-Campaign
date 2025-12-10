# JFK for President - Political Campaign Chatbot

An interactive RCS (Rich Communication Services) chatbot for a political campaign, powered by Pinnacle's RCS messaging platform. This chatbot demonstrates how political campaigns can engage voters through rich, interactive messaging experiences.


https://github.com/user-attachments/assets/39050218-d3bb-409c-bdcb-8a6b78f1efc8


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
- **RCS SDK**: rcs-js (Pinnacle SDK) v2.0.6
- **Type Safety**: Full TypeScript support with strict mode
- **Environment**: dotenv for configuration management

## Project Structure

```
Political-Campaign/
├── lib/
│   ├── agent.ts              # JFK campaign agent logic
│   ├── baseAgent.ts          # Base agent class
│   ├── data.ts               # Campaign data (events, policies, etc.)
│   └── rcsClient.ts          # Pinnacle client configuration
├── router.ts                 # Express route handlers
├── server.ts                 # Express server entry point
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

1. Clone the repository

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:

   - `PINNACLE_API_KEY`: Your Pinnacle API key
   - `PINNACLE_AGENT_ID`: Your RCS agent ID
   - `PINNACLE_SIGNING_SECRET`: Your webhook signing secret (found in the [Pinnacle Webhooks Dashboard](https://app.pinnacle.sh/dashboard/development/webhooks))
   - `TEST_MODE`: Set to `true` for testing
   - `DONATION_SUPPORTER_IMAGE`: Image URL for $25 donation tier
   - `DONATION_ADVOCATE_IMAGE`: Image URL for $50 donation tier
   - `DONATION_CHAMPION_IMAGE`: Image URL for $100 donation tier

5. Set up a public HTTPS URL for your webhook. For local development, you can use a tunneling service like [ngrok](https://ngrok.com):

   ```bash
   ngrok http 3000
   ```

   For production, deploy to your preferred hosting provider.

6. Connect your webhook to your RCS agent:

   - Go to the [Pinnacle Webhooks Dashboard](https://app.pinnacle.sh/dashboard/development/webhooks)
   - Add your public URL with the `/webhook` path (e.g., `https://your-domain.com/webhook`)
   - Select your RCS agent to receive messages at this endpoint
   - Copy the signing secret and add it to your `.env` file as `PINNACLE_SIGNING_SECRET`. The `process()` method automatically uses this environment variable to verify the request signature.

7. Text "MENU" to the bot to see the main menu.

## Usage

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

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

| Variable                   | Description                      | Required            |
| -------------------------- | -------------------------------- | ------------------- |
| `PINNACLE_API_KEY`         | Your Pinnacle API key            | Yes                 |
| `PINNACLE_AGENT_ID`        | Your RCS agent ID                | Yes                 |
| `PINNACLE_SIGNING_SECRET`  | Webhook signing secret           | Yes                 |
| `TEST_MODE`                | Enable test mode (true/false)    | No (default: false) |
| `DONATION_SUPPORTER_IMAGE` | Image URL for $25 donation tier  | Yes                 |
| `DONATION_ADVOCATE_IMAGE`  | Image URL for $50 donation tier  | Yes                 |
| `DONATION_CHAMPION_IMAGE`  | Image URL for $100 donation tier | Yes                 |

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

## Resources

- **Dashboard**: Visit [Pinnacle Dashboard](https://app.pinnacle.sh)
- **Documentation**: Visit [Pinnacle Documentation](https://docs.pinnacle.sh)
- **Support**: Email [founders@trypinnacle.app](mailto:founders@trypinnacle.app)
