import { createHash } from 'crypto';
const memoizee = require('memoizee');

// ============================================================
// Phase 1.2: Type Definitions
// ============================================================

interface ElevenLabsOptions {
  voiceId?: string;
  stability?: number;
  similarityBoost?: number;
}

interface TTSResult {
  buffer: Buffer;
  cached: boolean;
  contentType: string;
}

// Default French female voice (Léa - native French speaker)
const DEFAULT_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';

// ============================================================
// Phase 1.3: Environment Validation
// ============================================================

function getApiKey(): string {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    throw new Error('ELEVENLABS_API_KEY not configured');
  }
  return key;
}

// ============================================================
// Phase 1.4: Raw Fetch Implementation
// ============================================================

async function fetchFromElevenLabs(
  text: string,
  voiceId: string
): Promise<Buffer> {
  const apiKey = getApiKey();
  
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[elevenlabs] API error:', response.status, errorText);
    throw new Error(`ElevenLabs API error ${response.status}: ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// ============================================================
// Phase 1.5: Memoization Cache Layer
// ============================================================

const cachedFetch = memoizee(fetchFromElevenLabs, {
  promise: true,
  max: 100,           // Max 100 cached phrases (~50MB)
  maxAge: 86400000,   // 24 hour TTL
  normalizer: (args: [string, string]) => {
    // Cache key = hash of text + voiceId
    const [text, voiceId] = args;
    return createHash('sha256')
      .update(`${text}:${voiceId}`)
      .digest('hex');
  },
});

// ============================================================
// Phase 1.6: Public Export Function
// ============================================================

export async function getFrenchAudio(
  text: string,
  options?: Partial<ElevenLabsOptions>
): Promise<TTSResult> {
  const voiceId = options?.voiceId || DEFAULT_VOICE_ID;
  
  try {
    console.log('[elevenlabs] Fetching audio for:', text.substring(0, 50));
    const buffer = await cachedFetch(text, voiceId);
    console.log('[elevenlabs] Audio fetched, size:', buffer.length, 'bytes');
    
    return {
      buffer,
      cached: false, // memoizee handles caching internally
      contentType: 'audio/mpeg',
    };
  } catch (error) {
    console.error('[elevenlabs] TTS error:', error);
    throw error;
  }
}
