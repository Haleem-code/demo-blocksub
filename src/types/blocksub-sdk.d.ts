// src/types.d.ts
declare module 'blocksub-sdk' {
    export class BlockSubSDK {
      constructor(publicKey: string, endpoint: string, key: string);
      subscribe(publicKey: string, plan: string, amount: number, duration: number): Promise<void>;
      checkSubscriptionStatus(publicKey: string): Promise<boolean>;
    }
  }
  