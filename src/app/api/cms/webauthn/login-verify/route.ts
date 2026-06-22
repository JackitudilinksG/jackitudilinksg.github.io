// api/cms/webauthn/login-verify/route.ts
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body      = await req.json();
  const challenge = await db.challenge.get();
  const cred      = await db.credential.get(body.id);

  const { verified, authenticationInfo } = await verifyAuthenticationResponse({
    response:             body,
    expectedChallenge:    challenge,
    expectedOrigin:       'https://yourdomain.com',
    expectedRPID:         'yourdomain.com',
    authenticator: {
      credentialID:        cred.credentialID,
      credentialPublicKey: cred.credentialPublicKey,
      counter:             cred.counter,
    },
    requireUserVerification: true,
  });

  if (verified) {
    // Update counter — prevents replay attacks
    await db.credential.updateCounter(
      body.id, 
      authenticationInfo.newCounter
    );

    // Set your session cookie (same as discussed earlier)
    const res = NextResponse.json({ verified: true });
    res.cookies.set('cms_session', await signSessionToken(), {
      httpOnly: true,
      secure:   true,
      sameSite: 'strict',
      maxAge:   60 * 60 * 24 * 7,
    });
    return res;
  }

  return NextResponse.json({ verified: false }, { status: 401 });
}