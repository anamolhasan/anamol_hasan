// types/clerk.d.ts
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "user"; // আপনার প্রয়োজনীয় রোলগুলো এখানে দিন
    };
  }
}

export {};