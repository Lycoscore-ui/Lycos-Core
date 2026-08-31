const https = require('https');

const urls = {
  Vector: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSTL8L4aRz-HMprZX7qyzcZyuZZzfUUKlzyNl3vvtFeIQCwVX5-Yj5IUOev0Udb1LbwRQ4KSnonizxv/pub?output=csv',
  Vanguard: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQf3bXOHEbaVYkX7SxO9L9kNbNVXnx1jP_CQHgxZfm0QDtOVhLE3G7ThcJfd7srjSwrMJ0jubeXZLMs/pub?output=csv',
  Synapse: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRwjq9LXnAHxZdJ6rZpqiGm57Tk7tGf76vEayfmVzWBqSLzknyW6gIYiS4OZYot7z7CCjrAG2MOv6EX/pub?output=csv',
  Aegis: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTH9q9hnK7LcJt7bHohjJk5UhQHtfpMVnkgdNZrz4aQjfFTks1DGyBo1JQktUBvvGDd2OL8y2csRiot/pub?output=csv',
  Sentinel: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRhMAtev7cGakweCR2bYKeDW3BJE-k0H4r_tYO-bK25Vl4bHL2PlAH6CrlDL-h8atdeIbUczjxMYAK7/pub?output=csv'
};

function fetchCsv(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchCsv(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  for (const [name, url] of Object.entries(urls)) {
    try {
      const csv = await fetchCsv(url);
      console.log(`=== ${name} CSV (${csv.trim().split('\n').length} lines) ===`);
      console.log(csv);
    } catch (err) {
      console.error(`Error fetching ${name}:`, err.message);
    }
  }
}

main();
