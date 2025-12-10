# JFK for President - Political Campaign Chatbot

An interactive political campaign RCS chatbot that demonstrates how campaigns can engage voters through Rich Communication Services (RCS) messaging, featuring event management, policy information, donations, and volunteer coordination.

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

## Project Structure

```
Political-Campaign/
├── lib/
│   ├── rcsClient.ts          # Pinnacle RCS client configuration
│   ├── baseAgent.ts          # Base agent class with common functionality
│   ├── agent.ts              # Campaign agent implementation
│   └── data.ts               # Campaign data (events, policies, etc.)
├── server.ts                 # Main Express server
├── router.ts                 # Express router for webhook handling
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── .env.example              # Environment variables template
└── .gitignore                # Git ignore rules
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

```env
PINNACLE_API_KEY=your_api_key_here
PINNACLE_AGENT_ID=your_agent_id_here
PINNACLE_SIGNING_SECRET=your_signing_secret_here
TEST_MODE=false
PORT=3000
DONATION_SUPPORTER_IMAGE=your_supporter_image_url
DONATION_ADVOCATE_IMAGE=your_advocate_image_url
DONATION_CHAMPION_IMAGE=your_champion_image_url
```

5. Set up a public HTTPS URL for your webhook. For local development, you can use a tunneling service like [ngrok](https://ngrok.com):

   ```bash
   ngrok http 3000
   ```

   For production, deploy to your preferred hosting provider.

6. Connect your webhook to your RCS agent:

   - Go to the [Pinnacle Webhooks Dashboard](https://app.pinnacle.sh/dashboard/development/webhooks)
   - Add your public URL with the `/webhook` path (e.g., `https://your-domain.com/webhook`)
   - Select your RCS agent to receive messages at this endpoint
   - Copy the signing secret and add it to your `.env` file as `PINNACLE_SIGNING_SECRET`. The `process()` method uses this environment variable to verify the request signature.

7. Text "MENU" to the bot to see the main menu.

### Running the Application

Development mode with auto-reload:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Configuration

### Environment Variables

| Variable                   | Description                                                            | Required            |
| -------------------------- | ---------------------------------------------------------------------- | ------------------- |
| `PINNACLE_API_KEY`         | Your Pinnacle API key                                                  | Yes                 |
| `PINNACLE_AGENT_ID`        | Your RCS agent ID from Pinnacle Dashboard                              | Yes                 |
| `PINNACLE_SIGNING_SECRET`  | Webhook signing secret for verification                                | Yes                 |
| `TEST_MODE`                | Set to `true` for sending with a test RCS agent to whitelisted numbers | No (default: false) |
| `PORT`                     | Server port                                                            | No (default: 3000)  |
| `DONATION_SUPPORTER_IMAGE` | Image URL for $25 donation tier                                        | Yes                 |
| `DONATION_ADVOCATE_IMAGE`  | Image URL for $50 donation tier                                        | Yes                 |
| `DONATION_CHAMPION_IMAGE`  | Image URL for $100 donation tier                                       | Yes                 |

## Supported Actions

| Action             | Description                  |
| ------------------ | ---------------------------- |
| `showMainMenu`     | Display main menu            |
| `showEvents`       | View upcoming events         |
| `rsvpEvent`        | RSVP for an event            |
| `getDirections`    | Get directions to event      |
| `showPolicies`     | View policy positions        |
| `viewPolicy`       | View detailed policy info    |
| `showDonations`    | View donation options        |
| `processDonation`  | Process a donation           |
| `showVolunteer`    | View volunteer opportunities |
| `signUpVolunteer`  | Sign up to volunteer         |
| `showVotingInfo`   | View voting information      |
| `findPollingPlace` | Find polling location        |

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

## Technologies

- **TypeScript**: Type-safe development
- **Express**: Web framework for webhook handling
- **rcs-js**: Pinnacle RCS SDK v2.0.6+
- **tsx**: TypeScript execution and hot-reload

## Support

For issues related to:

- RCS functionality: Contact Pinnacle support
- Chatbot implementation: Refer to the code documentation
- Configuration: Check the `.env.example` file

## Resources

- **Dashboard**: Visit [Pinnacle Dashboard](https://app.pinnacle.sh)
- **Documentation**: Visit [Pinnacle Documentation](https://docs.pinnacle.sh)
- **Support**: Email [founders@trypinnacle.app](mailto:founders@trypinnacle.app)
