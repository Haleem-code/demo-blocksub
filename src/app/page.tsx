'use client';

import { useState, useEffect, useCallback } from 'react';
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
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function AuthPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('Anon');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sdk, setSdk] = useState<BlockSubSDK | null>(null);
  const [buttonText, setButtonText] = useState('Sign in with Google');
  const router = useRouter();

  const wallets = [new SolflareWalletAdapter()];
  const { publicKey, connected } = useWallet();

  // Keep this checkSubscriptionStatus function using useCallback
  const checkSubscriptionStatus = useCallback(async () => {
    if (sdk && publicKey) {
      const subscriptionStatus = await sdk.checkSubscriptionStatus(publicKey.toString());
      setIsSubscribed(subscriptionStatus);
      setButtonText(subscriptionStatus ? 'Access the Blog' : 'Subscribe with Solana');
    }
  }, [sdk, publicKey]);

  useEffect(() => {
    if (connected && publicKey) {
      const newSdk = new BlockSubSDK(
        publicKey.toString(),
        clusterApiUrl('devnet'),
        'BvuGGNocQNB8ybd6mYjy9HScPc3hf2bUWnQjVzbmDRCF'
      );
      setSdk(newSdk);

      // Update button text based on subscription status
      checkSubscriptionStatus();
    }
  }, [connected, publicKey, checkSubscriptionStatus]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSignedIn(true);
    setUserName('Anon');
    setButtonText('Connect Wallet');
    setIsLoading(false);
  };

  const handleSolanaSubscribe = async () => {
    setIsLoading(true);
    try {
      if (sdk && publicKey) {
        await sdk.subscribe(publicKey.toString(), 'premium_plan', 1000, 30); // Approx 0.01 SOL
        const subscriptionStatus = await sdk.checkSubscriptionStatus(publicKey.toString());
        setIsSubscribed(subscriptionStatus);
        setButtonText('Access the Blog');
      } else {
        console.error('Wallet not connected or SDK not initialized');
      }
    } catch (error) {
      console.error('Subscription failed:', error);
    }
    setIsLoading(false);
  };

  const handleGoToArticles = async () => {
    if (!sdk || !publicKey) {
      alert('Wallet not connected or SDK not initialized.');
      return;
    }

    try {
      const subscriptionStatus = await sdk.checkSubscriptionStatus(publicKey.toString());
      if (subscriptionStatus) {
        router.push('/articlepage');
      } else {
        alert('Please subscribe to access the content.');
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
      alert('Failed to check subscription status.');
    }
  };

  return (
    <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 flex flex-col items-center justify-center p-4">
            <header className="w-full max-w-4xl flex justify-between items-center mb-12">
              <Image src="/images/haleem.jpg" alt="Blog Logo" width={50} height={50} />
              {!isSignedIn ? (
                <Button onClick={handleGoogleSignIn} disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in with Google'}
                </Button>
              ) : (
                <WalletMultiButton className="btn-wallet-connect" />
              )}
            </header>

            <main className="w-full max-w-md">
              <Card className="p-8 space-y-6 bg-white/80 backdrop-blur-sm">
                <h1 className="text-2xl font-bold text-center">Welcome {userName}</h1>
                <p className="text-center text-gray-600">
                  {isSignedIn ? 'You are signed in with Google!' : 'Please sign in with Google to continue.'}
                </p>

                {isSignedIn && !connected && (
                  <WalletMultiButton className="btn-wallet-connect">
                    {buttonText}
                  </WalletMultiButton>
                )}

                {connected && !isSubscribed && (
                  <Button onClick={handleSolanaSubscribe} disabled={isLoading}>
                    {isLoading ? 'Subscribing...' : buttonText}
                  </Button>
                )}

                {isSubscribed && (
                  <Button onClick={handleGoToArticles}>
                    {buttonText}
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
