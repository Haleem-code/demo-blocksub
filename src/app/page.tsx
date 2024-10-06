'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlockSubSDK } from 'blocksub-sdk';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from '@solana/wallet-adapter-react';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletModalProvider, WalletConnectButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function AuthPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sdk, setSdk] = useState<BlockSubSDK | null>(null);
  const router = useRouter();

  const wallets = [new SolflareWalletAdapter()];
  const { publicKey, connected } = useWallet();

  useEffect(() => {
    if (connected && publicKey) {
      const newSdk = new BlockSubSDK(
        publicKey.toString(),
        clusterApiUrl('devnet'),
        'BvuGGNocQNB8ybd6mYjy9HScPc3hf2bUWnQjVzbmDRCF'
      );
      setSdk(newSdk);
    }
  }, [connected, publicKey]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSignedIn(true);
    setUserName('John Doe');
    setIsLoading(false);
  };

  const handleSolanaSubscribe = async () => {
    setIsLoading(true);
    try {
      if (sdk && publicKey) {
        await sdk.subscribe(publicKey.toString(), 'premium_plan', 1000, 30);
        const subscriptionStatus = await sdk.checkSubscriptionStatus(publicKey.toString());
        console.log('Subscription status:', subscriptionStatus);
        setIsSubscribed(true);
      } else {
        console.error('Wallet not connected or SDK not initialized');
      }
    } catch (error) {
      console.error('Subscription failed:', error);
    }
    setIsLoading(false);
  };

  const checkSubscriptionStatus = async () => {
    if (sdk && publicKey) {
      const subscriptionStatus = await sdk.checkSubscriptionStatus(publicKey.toString());
      setIsSubscribed(subscriptionStatus);
      return subscriptionStatus;
    }
    return false;
  };

  const handleGoToArticles = async () => {
    const subscriptionStatus = await checkSubscriptionStatus();
    if (subscriptionStatus) {
      router.push('/articlepage');
    } else {
      alert('Please subscribe to access the content.');
    }
  };

  return (
    <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 flex flex-col items-center justify-center p-4">
            <header className="w-full max-w-4xl flex justify-between items-center mb-12">
              <Image src="/images/haleem.jpg" alt="Blog Logo" width={50} height={50} />
              {!isSignedIn && (
                <Button onClick={handleGoogleSignIn} disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in with Google'}
                </Button>
              )}
              <WalletConnectButton /> {/* This button directly connects to Solflare */}
            </header>

            <main className="w-full max-w-md">
              <Card className="p-8 space-y-6 bg-white/80 backdrop-blur-sm">
                <h1 className="text-2xl font-bold text-center">Welcome {userName || 'Guest'}</h1>
                <p className="text-center text-gray-600">
                  {isSignedIn ? 'You are signed in with Google!' : 'Please sign in with Google to continue.'}
                </p>

                {isSignedIn && (
                  <Button onClick={handleSolanaSubscribe} disabled={isLoading || isSubscribed}>
                    {isLoading ? 'Subscribing...' : isSubscribed ? 'Subscribed' : 'Subscribe with Solana'}
                  </Button>
                )}

                {isSubscribed && (
                  <Button onClick={handleGoToArticles}>
                    Go to Articles
                  </Button>
                )}
              </Card>
            </main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
