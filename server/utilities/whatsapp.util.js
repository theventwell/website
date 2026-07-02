const formatWhatsAppNumber = (countryCode = '', phoneNumber = '') => {
  const digits = `${countryCode}${phoneNumber}`.replace(/\D/g, '');
  return digits;
};

const sendWhatsAppOtp = async ({ countryCode, phoneNumber, otp }) => {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION || 'v21.0';
  const templateName = process.env.WHATSAPP_OTP_TEMPLATE_NAME || 'otp_verification';

  if (!accessToken || !phoneNumberId) {
    console.warn('[WhatsApp] Credentials not configured. OTP was not sent via WhatsApp.');
    if (process.env.NODE_ENV === 'development') {
      console.log(`[WhatsApp Dev] OTP for ${countryCode}${phoneNumber}: ${otp}`);
    }
    return { sent: false, reason: 'WhatsApp credentials not configured' };
  }

  const recipient = formatWhatsAppNumber(countryCode, phoneNumber);

  const response = await fetch(
    `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipient,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'en' },
          components: [
            {
              type: 'body',
              parameters: [{ type: 'text', text: otp }],
            },
          ],
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Failed to send WhatsApp OTP');
  }

  return { sent: true, data };
};

module.exports = { sendWhatsAppOtp, formatWhatsAppNumber };