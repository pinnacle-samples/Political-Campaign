# Ascend 2028 — RCS Political Campaign Chatbot

A political campaign chatbot that runs entirely over RCS. Voters can RSVP to upcoming events, read policy positions, sign up to volunteer, donate at fixed or custom amounts, and check their voter registration — all from inside the messages app.

> **Live guide:** https://pinnacle.sh/samples/ascend-2028

https://github.com/user-attachments/assets/39050218-d3bb-409c-bdcb-8a6b78f1efc8

> Note: the visuals in this demo recording have since been refreshed with sharper brand assets. The conversation flow is identical to what you'll get from a fresh clone.

## What's inside

- Browse upcoming town halls and rallies with RSVP
- Policy positions across major issues, served as rich cards
- Volunteer signup with role selection
- Tiered donation flow with custom amount support
- Voter registration check inside the conversation

## Prerequisites

- Node.js 18+
- A Pinnacle account — [sign up](https://app.pinnacle.sh/auth/sign-up)
- An RCS [test agent](https://docs.pinnacle.sh/guides/branded-test-agents) for development
- A Pinnacle [API key](https://app.pinnacle.sh/dashboard/development/api-keys) and [webhook signing secret](https://app.pinnacle.sh/dashboard/development/webhooks)

## Quick start

```bash
git clone https://github.com/pinnacle-samples/Ascend-2028
cd Ascend-2028
npm install
cp .env.example .env
# fill in PINNACLE_API_KEY, PINNACLE_AGENT_ID, PINNACLE_SIGNING_SECRET
npm run dev
```

Expose your webhook with [ngrok](https://ngrok.com):

```bash
ngrok http 3000
```

Then in the [Pinnacle Webhooks dashboard](https://app.pinnacle.sh/dashboard/development/webhooks):

1. Add `https://<your-tunnel-domain>/webhook`
2. Attach it to your RCS agent
3. Copy the signing secret into `PINNACLE_SIGNING_SECRET`

Send `MENU` or `START` to your agent — you'll see the Ascend 2028 landing card with **Events**, **Policies**, **Donate**, **Volunteer**, and **Voting Info**.

## Environment variables

```env
PINNACLE_API_KEY=your_pinnacle_api_key_here
PINNACLE_AGENT_ID=your_agent_id_here
PINNACLE_SIGNING_SECRET=your_pinnacle_signing_secret_here
TEST_MODE=false
PORT=3000
```

## Project structure

```
Ascend-2028/
├── server.ts              # Express bootstrap
├── router.ts              # /webhook POST — verifies + dispatches
└── lib/
    ├── rcsClient.ts       # PinnacleClient instance
    ├── baseAgent.ts       # Shared send + typing helpers
    ├── typing.ts          # Fire-and-forget typing indicator
    ├── agent.ts           # AscendAgent — every action handler
    └── data.ts            # Events, policies, donation tiers, volunteer roles
```

## Action handlers

| Action | What it does |
| --- | --- |
| `mainMenu` / `showMainMenu` | Landing card with all entry points |
| `viewEvents` / `rsvpEvent` | Browse and RSVP to town halls and rallies |
| `viewPolicies` | Policy positions as a card carousel |
| `donate` / `processDonation` | Tiered donation flow with confirmation |
| `customDonation` | Free-form custom amount input |
| `volunteer` / `signUpVolunteer` | Volunteer role picker and signup |
| `votingInfo` / `checkRegistration` | Voter info + registration check |

## Customize the campaign

`lib/data.ts` is where everything lives. Drop in your own:

- `upcomingEvents` — town halls and rallies, with name, date, time, address, and capacity
- `policyPositions` — issues and stances, served as rich card carousels
- `volunteerOpportunities` — roles voters can sign up for
- `donationTiers` — preset amounts and tier names
- `votingInfo` — registration and voting deadlines for your district

## Custom donations

The agent has a `pendingCustomDonations` set for users in the middle of a custom donation flow — they tap "Other amount", the agent waits for a number, and then `processDonation` confirms. The `sendStrictFormatMessage` helper repeats donation buttons whenever a user sends free-form text outside of that flow, keeping the conversation on rails.

## Compliance note

Political messaging is heavily regulated. Make sure to:

- Honor STOP and HELP keywords (the SDK does this for you)
- Comply with TCPA opt-in/opt-out rules
- Add required disclosures to fundraising messages — your campaign's compliance lead will know what's required in your jurisdiction

## Going to production

- Set `TEST_MODE=false` and submit your agent for [carrier approval](https://docs.pinnacle.sh/guides/campaigns/rcs)
- Wire donations to your real payment processor (Stripe, ActBlue, WinRed)
- Replace the in-memory state with Postgres
- Use proactive RCS messages for GOTV reminders, debate alerts, and event RSVPs

## Resources

- **Live guide:** https://pinnacle.sh/samples/ascend-2028
- **Pinnacle docs:** https://docs.pinnacle.sh/documentation/introduction
- **Pinnacle dashboard:** https://app.pinnacle.sh
- **Support:** founders@trypinnacle.app
