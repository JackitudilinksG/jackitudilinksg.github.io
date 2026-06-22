import { dbSaveChallenge } from '@/lib/repositories/auth.repo';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const options = await generateRegistrationOptions({
    rpName:  'Deric Jojo CMS',
    rpID:    'dericjojo.vercel.app',
    userID:  new Uint8Array([1]),
    userName: 'deric',
    attestationType: 'none',
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'required', // forces password/biometric check
    },
  });

  // Store challenge temporarily
  await dbSaveChallenge(options.challenge);
  
  return NextResponse.json(options);
}