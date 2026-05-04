import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// অ্যাডমিন রুট প্রটেকশন
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // ১. ইউজার যদি অ্যাডমিন রুটে যেতে চায়
  if (isAdminRoute(req)) {
    const session = await auth();

    // ২. রোল চেক করা (এখন TypeScript আর এরর দিবে না)
    const userRole = session.sessionClaims?.metadata?.role;

    if (userRole !== 'admin') {
      // অ্যাডমিন না হলে হোম পেজে রিডাইরেক্ট
      const url = new URL('/', req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // স্ট্যাটিক ফাইল বাদ দিয়ে বাকি সব রুটে চলবে
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};