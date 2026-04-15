import { Router, Request, Response } from 'express';
import { rcsClient } from './lib/rcsClient';
import { agent } from './lib/agent';
import { sendTypingIndicator } from './lib/typing';


interface TriggerPayload {
  action: string;
  params?: Record<string, unknown>;
}

const jfkRouter = Router();

jfkRouter.post('/', async (req: Request, res: Response) => {
  try {
    const messageEvent = await rcsClient.messages.process(req);
    if (messageEvent.type !== 'MESSAGE.RECEIVED') {
      console.error('[Ascend 2028]: User event received', messageEvent);
      return res.status(200).json({ message: 'User event received' });
    }
    const message = messageEvent.message;
    const from = messageEvent.conversation.from;

    // Handle button actions
    if (
      message.type === 'RCS_BUTTON_DATA' &&
      typeof message.button.raw === 'object' &&
      message.button.raw.type == 'trigger'
    ) {
      sendTypingIndicator(from);
      const payload: TriggerPayload = JSON.parse(message.button.raw.payload);

      // Clear pending custom donation when user presses any button (except customDonation)
      if (payload.action !== 'customDonation' && agent.hasPendingCustomDonation(from)) {
        agent.clearPendingCustomDonation(from);
      }

      switch (payload.action) {
        case 'mainMenu':
        case 'showMainMenu':
          await agent.showMainMenu(from);
          return res.status(200).json({ message: 'Main menu sent' });

        case 'viewEvents':
          await agent.viewEvents(from);
          return res.status(200).json({ message: 'Events sent' });

        case 'rsvpEvent':
          if (payload.params?.eventId) {
            await agent.rsvpEvent(from, payload.params.eventId as string);
            return res.status(200).json({ message: 'RSVP processed' });
          }
          console.error('[Ascend 2028]: Invalid trigger payload - missing eventId', payload);
          return res.status(400).json({
            error: 'Invalid Trigger Payload',
            received: message,
          });

        case 'viewPolicies':
          await agent.viewPolicies(from);
          return res.status(200).json({ message: 'Policies sent' });

        case 'donate':
          await agent.donate(from);
          return res.status(200).json({ message: 'Donation options sent' });

        case 'processDonation':
          if (payload.params?.amount && payload.params?.tierId) {
            await agent.processDonation(
              from,
              payload.params.amount as number,
              payload.params.tierId as string,
            );
            return res.status(200).json({ message: 'Donation processed' });
          }
          console.error('[Ascend 2028]: Invalid trigger payload - missing amount/tierId', payload);
          return res.status(400).json({
            error: 'Invalid Trigger Payload',
            received: message,
          });

        case 'customDonation':
          await agent.customDonation(from);
          return res.status(200).json({ message: 'Custom donation options sent' });

        case 'volunteer':
          await agent.volunteer(from);
          return res.status(200).json({ message: 'Volunteer opportunities sent' });

        case 'signUpVolunteer':
          if (payload.params?.opportunityId) {
            await agent.signUpVolunteer(from, payload.params.opportunityId as string);
            return res.status(200).json({ message: 'Volunteer signup processed' });
          }
          console.error('[Ascend 2028]: Invalid trigger payload - missing opportunityId', payload);
          return res.status(400).json({
            error: 'Invalid Trigger Payload',
            received: message,
          });

        case 'votingInfo':
          await agent.votingInfo(from);
          return res.status(200).json({ message: 'Voting info sent' });

        case 'checkRegistration':
          await agent.checkRegistration(from);
          return res.status(200).json({ message: 'Registration check sent' });

        default:
          console.error('[Ascend 2028]: Invalid trigger payload', payload);
          return res.status(400).json({
            error: 'Invalid Trigger Payload',
            received: message,
          });
      }
    }

    // Handle location messages
    if (message.type === 'RCS_LOCATION_DATA') {
      sendTypingIndicator(from);
      agent.clearPendingCustomDonation(from); // Clear any pending donation state
      await agent.sendPollingLocations(from);
      return res.status(200).json({ message: 'Polling locations sent' });
    }

    // Handle text messages
    if (message.type === 'RCS_TEXT') {
      sendTypingIndicator(from);
      const text = message.text.trim();
      if (text === 'MENU' || text === 'START' || text === 'SUBSCRIBE') {
        agent.clearPendingCustomDonation(from); // Clear any pending donation state
        await agent.showMainMenu(from);
        return res.status(200).json({ message: 'Main menu sent' });
      }

      // Check if user has pending custom donation
      if (!agent.hasPendingCustomDonation(from)) {
        // User sent text but isn't in custom donation mode - notify them
        await agent.sendStrictFormatMessage(
          from,
          'Text input is only accepted when making a custom donation.\n\nPlease use the buttons to interact with the Ascend campaign.',
        );
        return res.status(200).json({
          message: 'Text message outside donation context, sent notice to user.',
        });
      }

      // User is in custom donation mode - check if text is a number
      const amount = parseInt(text);
      if (!isNaN(amount) && amount > 0) {
        agent.clearPendingCustomDonation(from); // Clear state after processing
        await agent.processDonation(from, amount, 'custom');
        return res.status(200).json({ message: 'Custom donation processed' });
      }

      // Non-numeric text input while in donation mode - send strict format message
      await agent.sendStrictFormatMessage(
        from,
        'To make a custom donation, please enter a numeric amount (e.g., "50" for $50).\n\nOr use the buttons to select from preset donation amounts.',
        true, // Include donation amount buttons
      );
      return res.status(200).json({ message: 'Invalid donation format, sent notice to user.' });
    }

    // Unknown message type
    console.error('[Ascend 2028]: Unhandled message type');
    return res.status(400).json({
      error: 'Unhandled message type',
    });
  } catch (error) {
    console.error('[Ascend 2028]: Internal server error', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default jfkRouter;
