import axios from 'axios';

const SENT_API_KEY = process.env.SENT_API_KEY;
const SENT_API_URL = 'https://api.sent.dm/v1/messages'; // Approximation of Sent API endpoint

export const SentUtil = {
  async sendMessage(to: string, text: string): Promise<void> {
    if (!SENT_API_KEY || SENT_API_KEY === 'your_sent_api_key_here') {
      console.warn('[Sent API] Missing valid SENT_API_KEY. Message to', to, 'skipped silently.');
      return;
    }

    try {
      await axios.post(
        SENT_API_URL,
        {
          to,
          text,
          channel: 'whatsapp', // Defaulting to WhatsApp per typical Sent DM usage, can be 'sms'
        },
        {
          headers: {
            'Authorization': `Bearer ${SENT_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        }
      );
      console.log(`[Sent API] Message successfully sent to ${to}`);
    } catch (error: any) {
      // Fail silently as requested
      console.warn(`[Sent API] Failed to send message to ${to}: ${error.message}. Error ignored.`);
    }
  }
};
