async function main() {
  const r = await fetch('https://api.elevenlabs.io/v1/voices', {
    headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY! }
  });
  console.log('Status:', r.status);
  const text = await r.text();
  console.log('Response (first 2000 chars):', text.slice(0, 2000));
}
main().catch(console.error);
