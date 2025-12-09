import { Pinnacle } from 'rcs-js';
import { rcsClient } from './rcsClient';
import 'dotenv/config';

if (!process.env.PINNACLE_AGENT_NAME) {
  throw new Error('PINNACLE_AGENT_NAME environment variable is required');
}

export class BaseAgent {
  protected client: Pinnacle;
  protected agentName: string;
  protected TEST_MODE: boolean;

  constructor() {
    this.client = rcsClient;
    this.agentName = process.env.PINNACLE_AGENT_NAME!;
    this.TEST_MODE = process.env.TEST_MODE === 'true';
  }

  async sendStrictFormatMessage(to: string, formatInstructions: string) {
    return await this.client.messages.rcs.send({
      from: this.agentName,
      to,
      text: formatInstructions,
      quickReplies: [
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }
}
