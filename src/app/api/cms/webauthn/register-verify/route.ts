// api/cms/webauthn/register-verify/route.ts
import { verifyRegistrationResponse } from '@simplewebauthn/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const challenge = await db.challenge.get();

  const { verified, registrationInfo } = await verifyRegistrationResponse({
    response:             body,
    expectedChallenge:    challenge,
    expectedOrigin:       'https://yourdomain.com',
    expectedRPID:         'yourdomain.com',
    requireUserVerification: true,
  });

  if (verified && registrationInfo) {
    await db.credential.save({
      credentialID:        registrationInfo.credentialID,
      credentialPublicKey: registrationInfo.credentialPublicKey,
      counter:             registrationInfo.counter,
      deviceName:          body.deviceName ?? 'Unknown device',
    });
  }

  return NextResponse.json({ verified });
}