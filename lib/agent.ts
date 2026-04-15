import { Pinnacle } from 'rcs-js';
import { BaseAgent } from './baseAgent';
import {
  upcomingEvents,
  policyPositions,
  volunteerOpportunities,
  donationTiers,
  votingInfo,
  pollingLocations,
} from './data';

export class AscendAgent extends BaseAgent {
  private pendingCustomDonations: Set<string> = new Set();

  // Override sendStrictFormatMessage to include Donate button
  async sendStrictFormatMessage(to: string, formatInstructions: string, includeDonationButtons = false) {
    const quickReplies: Pinnacle.RichButton[] = [
      {
        type: 'trigger',
        title: '🏠 Main Menu',
        payload: JSON.stringify({ action: 'mainMenu' }),
      },
      {
        type: 'trigger',
        title: '💰 Donate',
        payload: JSON.stringify({ action: 'donate' }),
      },
    ];

    // Add donation amount buttons if requested
    if (includeDonationButtons) {
      quickReplies.push(
        {
          type: 'trigger',
          title: '$25 Supporter',
          payload: JSON.stringify({
            action: 'processDonation',
            params: { amount: 25, tierId: 'supporter' },
          }),
        },
        {
          type: 'trigger',
          title: '$50 Advocate',
          payload: JSON.stringify({
            action: 'processDonation',
            params: { amount: 50, tierId: 'advocate' },
          }),
        },
        {
          type: 'trigger',
          title: '$100 Champion',
          payload: JSON.stringify({
            action: 'processDonation',
            params: { amount: 100, tierId: 'champion' },
          }),
        }
      );
    }

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      text: formatInstructions,
      quickReplies,
    });
  }

  // Welcome / Main Menu
  async showMainMenu(to: string) {
    return await this.client.messages.rcs.send({
      from: this.agentName,
      to: to,
      cards: [
        {
          title: 'Ascend 2028',
          subtitle: '"A movement upward." 🇺🇸',
          media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/logo.png',
          buttons: [],
        },
      ],
      quickReplies: [
        {
          type: 'trigger',
          title: '🗓️ Upcoming Events',
          payload: JSON.stringify({ action: 'viewEvents' }),
        },
        {
          type: 'trigger',
          title: '📋 Policy Positions',
          payload: JSON.stringify({ action: 'viewPolicies' }),
        },
        {
          type: 'trigger',
          title: '💰 Donate',
          payload: JSON.stringify({ action: 'donate' }),
        },
        {
          type: 'trigger',
          title: '🤝 Volunteer',
          payload: JSON.stringify({ action: 'volunteer' }),
        },
        {
          type: 'trigger',
          title: '🗳️ Voting Info',
          payload: JSON.stringify({ action: 'votingInfo' }),
        },
        {
          type: 'trigger',
          title: '🔚 End Demo',
          payload: 'END_DEMO',
        },
      ],
    });
  }

  // View Upcoming Events
  async viewEvents(to: string) {
    const eventCards: Pinnacle.RichCards.Cards.Item[] = upcomingEvents.map((event) => ({
      title: `${event.location}\n${event.date} • ${event.time}`,
      subtitle: event.description,
      media: event.media,
      buttons: [
        {
          type: 'trigger',
          title: '🎟️ RSVP',
          payload: JSON.stringify({
            action: 'rsvpEvent',
            params: { eventId: event.id },
          }),
        },
        {
          type: 'sendLocation',
          title: 'Get Directions',
          latLong: {
            lat: event.lat,
            lng: event.lng,
          },
        },
      ],
    }));

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to: to,
      cards: eventCards,
      quickReplies: [
        {
          type: 'trigger',
          title: '🤝 Volunteer',
          payload: JSON.stringify({ action: 'volunteer' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }

  // RSVP for Event
  async rsvpEvent(to: string, eventId: string) {
    const event = upcomingEvents.find((e) => e.id === eventId);

    if (!event) {
      return;
    }

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to: to,
      text: `🎟️ RSVP Submitted\n\n${event.name}\n\n📍 ${event.address}\n\n${event.date} at ${event.time}\n\nYour contact information has been sent to the event organizer for review. You'll receive a message if you're approved to attend.`,
      quickReplies: [
        {
          type: 'sendLocation',
          title: 'Get Directions',
          latLong: {
            lat: event.lat,
            lng: event.lng,
          },
        },
        {
          type: 'trigger',
          title: '🗓️ More Events',
          payload: JSON.stringify({ action: 'viewEvents' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }

  // View Policy Positions
  async viewPolicies(to: string) {
    const policyCards: Pinnacle.RichCards.Cards.Item[] = policyPositions.map((policy) => {
      const keyPointsText = policy.keyPoints.map((point) => `• ${point}`).join('\n');
      return {
        title: `${policy.icon} ${policy.title}`,
        subtitle: `"${policy.quote}"\n\nKey Points:\n${keyPointsText}\n\n${policy.description}`,
        media: policy.media,
        buttons: [],
      };
    });

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to: to,
      cards: policyCards,
      quickReplies: [
        {
          type: 'trigger',
          title: '💰 Support This Campaign',
          payload: JSON.stringify({ action: 'donate' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }

  // Donate
  async donate(to: string) {
    const donationCards: Pinnacle.RichCards.Cards.Item[] = donationTiers.map((tier) => {
      return {
        title: `$${tier.amount} - ${tier.title}`,
        subtitle: tier.description,
        media: tier.media,
        buttons: [
          {
            type: 'trigger',
            title: `💳 Donate $${tier.amount}`,
            payload: JSON.stringify({
              action: 'processDonation',
              params: { amount: tier.amount, tierId: tier.id },
            }),
          },
        ],
      };
    });

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to: to,
      cards: donationCards,
      quickReplies: [
        {
          type: 'trigger',
          title: '💵 Custom Amount',
          payload: JSON.stringify({ action: 'customDonation' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }

  // Process Donation
  async processDonation(to: string, amount: number, tierId: string) {
    let tier = donationTiers.find((t) => t.id === tierId);

    // For custom donations, determine tier based on amount
    if (!tier) {
      if (amount <= 25) {
        tier = donationTiers.find((t) => t.id === 'supporter');
      } else if (amount <= 50) {
        tier = donationTiers.find((t) => t.id === 'advocate');
      } else {
        tier = donationTiers.find((t) => t.id === 'champion');
      }
    }

    let message: string;

    if (tier) {
      const perksText = tier.perks.map((perk) => `✓ ${perk}`).join('\n');
      message = `🎉 Thank You for Your Support!\n\nYour $${amount} donation makes a real difference in this campaign. Together, we're building a better America.\n\nYour phone number has been registered as a campaign supporter. Your ${
        tier.title
      } benefit items will be shipped to your billing address after the donation is processed.\n\nYour ${
        tier.title
      } Benefits:\n${perksText}\n\nConfirmation #: ASC${Math.floor(
        Math.random() * 100000,
      )}\n\n"Together, we rise."`;
    } else {
      // Fallback if tier still not found
      message = `🎉 Thank You for Your Support!\n\nYour $${amount} donation makes a real difference in this campaign. Together, we're building a better America.\n\nYour phone number has been registered as a campaign supporter.\n\nConfirmation #: ASC${Math.floor(
        Math.random() * 100000,
      )}\n\n"Together, we rise."`;
    }

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to: to,
      text: message,
      quickReplies: [
        {
          type: 'trigger',
          title: '🤝 Volunteer',
          payload: JSON.stringify({ action: 'volunteer' }),
        },
        {
          type: 'trigger',
          title: '🗓️ Upcoming Events',
          payload: JSON.stringify({ action: 'viewEvents' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }

  // Custom Donation
  async customDonation(to: string) {
    // Set pending custom donation state
    this.pendingCustomDonations.add(to);

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to: to,
      text: `💵 Custom Donation Amount\n\nEvery dollar helps us reach more voters and build a stronger campaign.\n\nText back the amount you'd like to contribute (e.g., 1, 5, 10).`,
      quickReplies: [
        {
          type: 'trigger',
          title: '❌ Cancel',
          payload: JSON.stringify({ action: 'donate' }),
        },
      ],
    });
  }

  // Check if user has pending custom donation
  hasPendingCustomDonation(to: string): boolean {
    return this.pendingCustomDonations.has(to);
  }

  // Clear pending custom donation
  clearPendingCustomDonation(to: string): void {
    this.pendingCustomDonations.delete(to);
  }

  // Volunteer
  async volunteer(to: string) {
    const volunteerCards: Pinnacle.RichCards.Cards.Item[] = volunteerOpportunities.map((opp) => ({
      title: `${opp.icon} ${opp.title}`,
      subtitle: `${opp.category} • ${opp.timeCommitment}\n${opp.description}`,
      media: opp.media,
      buttons: [
        {
          type: 'trigger',
          title: '✋ Sign Me Up',
          payload: JSON.stringify({
            action: 'signUpVolunteer',
            params: { opportunityId: opp.id },
          }),
        },
      ],
    }));

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to: to,
      cards: volunteerCards,
      quickReplies: [
        {
          type: 'call',
          title: 'Talk to Coordinator',
          payload: '+18005551234',
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }

  // Sign Up to Volunteer
  async signUpVolunteer(to: string, opportunityId: string) {
    const opportunity = volunteerOpportunities.find((o) => o.id === opportunityId)!;

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to: to,
      text: `🙌 Thank you!\n\nYour volunteer application for ${opportunity.title} has been submitted.\n\nA volunteer coordinator will reach out within 24 hours with next steps and training information.\n\n"The energy, the faith, the devotion which we bring to this endeavor will light our country and all who serve it." 🇺🇸`,
      quickReplies: [
        {
          type: 'trigger',
          title: '🤝 Volunteer More',
          payload: JSON.stringify({ action: 'volunteer' }),
        },
        {
          type: 'trigger',
          title: '🗓️ Attend an Event',
          payload: JSON.stringify({ action: 'viewEvents' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }

  // Voting Information
  async votingInfo(to: string) {
    return await this.client.messages.rcs.send({
      from: this.agentName,
      to: to,
      cards: [
        {
          title: '🗳️ Voter Registration',
          subtitle: `Deadline: ${
            votingInfo.registrationDeadline
          }\n\nHow to Register:\n${votingInfo.howToRegister
            .map((item) => `• ${item}`)
            .join('\n')}\n\nWhat to Bring:\n${votingInfo.whatToBring
            .map((item) => `• ${item}`)
            .join('\n')}`,
          media:
            'https://mediarelations.gwu.edu/sites/g/files/zaxdzs5306/files/2024-09/adobestock_789130977.jpeg',
          buttons: [
            {
              type: 'trigger',
              title: '✅ Check Registration',
              payload: JSON.stringify({ action: 'checkRegistration' }),
            },
          ],
        },
        {
          title: '🗓️ Important Dates',
          subtitle: `Mark your calendar\n\nRegistration Deadline:\n${votingInfo.registrationDeadline}\n\nEarly Voting Starts:\n${votingInfo.earlyVotingStarts}\n\nElection Day:\n${votingInfo.electionDay}`,
          media:
            'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/calendar-important-dates.png',
          buttons: [
            {
              type: 'requestUserLocation',
              title: 'Find Polling Place',
            },
          ],
        },
      ],
      quickReplies: [
        {
          type: 'trigger',
          title: '🤝 Volunteer',
          payload: JSON.stringify({ action: 'volunteer' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }

  // Check Registration
  async checkRegistration(to: string) {
    return await this.client.messages.rcs.send({
      from: this.agentName,
      to: to,
      text: `Check Your Voter Registration\n\nVisit your state's election website to verify your registration status.\n\nYou'll need:\n• Full name\n• Date of birth\n• ZIP code\n\nNot registered yet? We can help! Visit any of our campaign events for assistance with voter registration.`,
      quickReplies: [
        {
          type: 'openUrl',
          title: 'Visit Website',
          payload: 'https://voterstatus.sos.ca.gov/',
          webviewMode: 'FULL',
        },
        {
          type: 'trigger',
          title: '⬅️ Back to Voting Info',
          payload: JSON.stringify({ action: 'votingInfo' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }

  // Send Polling Locations
  async sendPollingLocations(to: string) {
    const pollingCards: Pinnacle.RichCards.Cards.Item[] = pollingLocations.map((location) => ({
      title: location.name,
      subtitle: `${location.address}\n\n${location.hours}\n\n${location.accessibility}`,
      media: location.media,
      buttons: [
        {
          type: 'sendLocation',
          title: 'Get Directions',
          latLong: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      ],
    }));

    return await this.client.messages.rcs.send({
      from: this.agentName,
      to: to,
      cards: pollingCards,
      quickReplies: [
        {
          type: 'trigger',
          title: '✅ Check Registration',
          payload: JSON.stringify({ action: 'checkRegistration' }),
        },
        {
          type: 'trigger',
          title: '⬅️ Back to Voting Info',
          payload: JSON.stringify({ action: 'votingInfo' }),
        },
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
    });
  }
}

export const agent = new AscendAgent();
