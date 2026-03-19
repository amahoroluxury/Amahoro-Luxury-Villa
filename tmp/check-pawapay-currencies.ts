import { pawapay } from '../src/lib/pawapay';

async function checkConfig() {
  const PAWAPAY_TOKEN = process.env.PAWAPAY_API_TOKEN;
  const baseUrl = process.env.PAWAPAY_ENVIRONMENT === 'live' 
    ? 'https://api.pawapay.io' 
    : 'https://api.sandbox.pawapay.io';

  try {
    const response = await fetch(`${baseUrl}/v1/active-conf`, {
      headers: { 'Authorization': `Bearer ${PAWAPAY_TOKEN}` },
    });
    const data = await response.json();
    
    console.log('--- PawaPay Currencies per Country ---');
    data.countries.forEach((c: any) => {
      console.log(`Country: ${c.country}`);
      c.correspondents.forEach((corr: any) => {
        console.log(`  - Correspondent: ${corr.correspondent}, Currency: ${corr.currency}`);
      });
    });

    const rwaConfig = data.countries.find((c: any) => c.country === 'RWA');
    console.log('\n--- Rwanda Configuration ---');
    console.log(JSON.stringify(rwaConfig, null, 2));
    
  } catch (error: any) {
    console.log('Error:', error.message);
  }
}

checkConfig();
