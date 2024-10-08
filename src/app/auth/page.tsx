 "use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlockSubSDK } from "blocksub-sdk";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  Connection,
  Keypair,
  Transaction,
  SystemProgram,
  clusterApiUrl,
} from "@solana/web3.js";

function AuthPageContent() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("Anon");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { publicKey, connected, sendTransaction } = useWallet();

  // Log when wallet is connected
  useEffect(() => {
    if (connected && publicKey) {
      console.log("Wallet connected with public key:", publicKey.toString());
    }
  }, [connected, publicKey]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
    setIsSignedIn(true);
    setUserName("Anon");
    setIsLoading(false);
  };

  const handleSolanaSubscribe = async () => {
    if (!publicKey) {
      console.error("Wallet not connected");
      return;
    }

    setIsLoading(true);
    console.log("PublicKey:", publicKey.toString());

    try {
      // Initialize the SDK
      const sdk = new BlockSubSDK(
        publicKey.toString(),
        clusterApiUrl("devnet"), // Changed to devnet
        "BvuGGNocQNB8ybd6mYjy9HScPc3hf2bUWnQjVzbmDRCF" // contract address
      );

      console.log("SDK Initialized. Subscribing...");

      // Subscribe to the service
      await sdk.subscribe(publicKey.toString(), "premium_plan", 1000, 30);
      console.log("Subscription request sent.");

      // Prepare the Solana transaction
      const connection = new Connection(clusterApiUrl("devnet")); // Changed to devnet
      const subscriptionAccount = Keypair.generate();

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: subscriptionAccount.publicKey,
          lamports: 1000, // 0.01 sol
        })
      );

      console.log("Sending transaction...");
      const signature = await sendTransaction(transaction, connection);
      console.log("Transaction signature:", signature);

      const confirmation = await connection.confirmTransaction(signature, "confirmed");
      console.log("Transaction confirmed:", confirmation);

      alert("Subscription successful!");
      setIsSubscribed(true);
    } catch (error) {
      console.error("Subscription failed:", error);
      alert("Subscription failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToArticles = () => {
    router.push("/articlepage");
  };

  // Render buttons based on sign-in, wallet connection, and subscription status
  const renderActionButton = () => {
    if (!isSignedIn) {
      return (
        <Button onClick={handleGoogleSignIn} disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </Button>
      );
    }

    if (!connected) {
      return <WalletMultiButton>Connect Wallet</WalletMultiButton>;
    }

    if (!isSubscribed) {
      return (
        <Button onClick={handleSolanaSubscribe} disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Subscribe with Solana"}
        </Button>
      );
    }

    return <Button onClick={handleGoToArticles}>Access my blog</Button>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <Image src="/images/haleem.jpg" alt="Blog Logo" width={50} height={50} />
        <WalletMultiButton className="btn-wallet-connect" />
      </header>

      <main className="w-full max-w-md">
        <Card className="p-8 space-y-6 bg-white/80 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-center">Welcome {userName}</h1>
          <p className="text-center text-gray-600">
            {isSignedIn ? "You are signed in!" : "Please sign in with Google to continue."}
          </p>

          {renderActionButton()}
        </Card>
      </main>
    </div>
  );
}

export default function AuthPage() {
  const wallets = [new SolflareWalletAdapter()];
  const endpoint = clusterApiUrl("devnet"); // Changed to devnet

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AuthPageContent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
