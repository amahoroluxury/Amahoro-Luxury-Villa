/**
 * DPO Pay (formerly Direct Pay Online) API Utility
 * Documentation: https://dpogroup.com/api-and-technical-documentation/
 */

const DPO_API_URL = process.env.DPO_ENVIRONMENT === 'live'
  ? 'https://secure.3gdirectpay.com/API/v6/'
  : 'https://secure1.sandbox.directpayonline.com/API/v6/';

const COMPANY_TOKEN = process.env.DPO_COMPANY_TOKEN || 'YOUR_COMPANY_TOKEN';
const SERVICE_TYPE = process.env.DPO_SERVICE_TYPE || 'YOUR_SERVICE_TYPE';

export interface DPOInitiateRequest {
  amount: number;
  currency: string;
  bookingId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  serviceDescription: string;
}

export interface DPOInitiateResponse {
  success: boolean;
  transToken?: string;
  transRef?: string;
  error?: string;
  redirectUrl?: string;
}

export const dpo = {
  /**
   * Initiates a transaction and returns a payment token
   */
  async initiatePayment(data: DPOInitiateRequest): Promise<DPOInitiateResponse> {
    const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
    
    // Use lvh.me fallback for local testing as DPO might also validate return URLs
    let redirectUrl = `${siteUrl}/api/payment/verify`;
    if (redirectUrl.includes('localhost')) {
      redirectUrl = redirectUrl.replace('localhost', 'lvh.me');
    }

    const xml = `
      <?xml version="1.0" encoding="utf-8"?>
      <API3G>
        <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
        <Request>createToken</Request>
        <Transaction>
          <PaymentAmount>${data.amount.toFixed(2)}</PaymentAmount>
          <PaymentCurrency>${data.currency}</PaymentCurrency>
          <CompanyRef>${data.bookingId}</CompanyRef>
          <RedirectURL>${redirectUrl}</RedirectURL>
          <BackURL>${redirectUrl}</BackURL>
          <CustomerEmail>${data.email}</CustomerEmail>
          <CustomerFirstName>${data.firstName}</CustomerFirstName>
          <CustomerLastName>${data.lastName}</CustomerLastName>
          <CustomerPhone>${data.phone || ''}</CustomerPhone>
        </Transaction>
        <Services>
          <Service>
            <ServiceType>${SERVICE_TYPE}</ServiceType>
            <ServiceDescription>${data.serviceDescription}</ServiceDescription>
            <ServiceDate>${new Date().toISOString().split('T')[0].replace(/-/g, '/')}</ServiceDate>
          </Service>
        </Services>
      </API3G>
    `.trim();

    try {
      const response = await fetch(DPO_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/xml' },
        body: xml,
      });

      const resultText = await response.text();
      
      // Simple XML parsing using regex (avoiding heavy dependencies)
      const resultMatch = resultText.match(/<Result>(.*?)<\/Result>/);
      const tokenMatch = resultText.match(/<TransToken>(.*?)<\/TransToken>/);
      const refMatch = resultText.match(/<TransRef>(.*?)<\/TransRef>/);
      const errorMatch = resultText.match(/<ResultExplanation>(.*?)<\/ResultExplanation>/);

      const result = resultMatch ? resultMatch[1] : '';
      const transToken = tokenMatch ? tokenMatch[1] : '';
      const transRef = refMatch ? refMatch[1] : '';
      const errorExplanation = errorMatch ? errorMatch[1] : 'Unknown error';

      if (result === '000') {
        const paymentUrl = process.env.DPO_ENVIRONMENT === 'live'
          ? `https://secure.3gdirectpay.com/payv2.php?ID=${transToken}`
          : `https://secure1.sandbox.directpayonline.com/payv2.php?ID=${transToken}`;

        return {
          success: true,
          transToken,
          transRef,
          redirectUrl: paymentUrl,
        };
      }

      return {
        success: false,
        error: errorExplanation,
      };
    } catch (err: any) {
      console.error('DPO Initiation Error:', err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Verifies the status of a transaction
   */
  async verifyPayment(transToken: string): Promise<any> {
    const xml = `
      <?xml version="1.0" encoding="utf-8"?>
      <API3G>
        <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
        <Request>verifyToken</Request>
        <TransactionToken>${transToken}</TransactionToken>
      </API3G>
    `.trim();

    try {
      const response = await fetch(DPO_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/xml' },
        body: xml,
      });

      const resultText = await response.text();
      
      // Extract key fields
      const resultMatch = resultText.match(/<Result>(.*?)<\/Result>/);
      const explanationMatch = resultText.match(/<ResultExplanation>(.*?)<\/ResultExplanation>/);
      const statusMatch = resultText.match(/<TransactionApproval>(.*?)<\/TransactionApproval>/);
      
      return {
        result: resultMatch ? resultMatch[1] : '',
        explanation: explanationMatch ? explanationMatch[1] : '',
        status: statusMatch ? statusMatch[1] : '', // e.g., 'Authorized'
        raw: resultText
      };
    } catch (err: any) {
      console.error('DPO Verification Error:', err);
      return { result: 'Error', explanation: err.message };
    }
  }
};
