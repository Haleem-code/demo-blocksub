'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter} from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AuthPage() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    // Simulate Google Sign-In
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSignedIn(true)
    setUserName('John Doe') // This would be fetched from Google profile
    setIsLoading(false)
  }

  const handleSolanaSubscribe = async () => {
    setIsLoading(true)
    // Simulate Solana payment process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubscribed(true)
    setIsLoading(false)
  }
  const handleGoToArticles = () => {
    router.push('/articlepage') // Step 2: Use router.push() to navigate
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <Image src="/placeholder.svg" alt="Blog Logo" width={150} height={50} />
        {!isSignedIn && (
          <Button onClick={handleGoogleSignIn} disabled={isLoading}>
            Sign in with Google
          </Button>
        )}
      </header>

      <main className="w-full max-w-md">
        <Card className="p-8 space-y-6 bg-white/80 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-center text-gray-800">Welcome to MY BLOG</h1>
          <p className="text-center text-gray-600">
            Access premium content after a quick sign-in and subscription.
          </p>

          {!isSignedIn ? (
            <Button 
              onClick={handleGoogleSignIn} 
              className="w-full py-6 text-lg"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </Button>
          ) : !isSubscribed ? (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-center">Welcome, {userName}!</p>
              <p className="text-center">Unlock premium content with a Solana payment.</p>
              <Button 
                onClick={handleSolanaSubscribe} 
                className="w-full py-6 text-lg bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Subscribe with Solana'}
              </Button>
              {isLoading && <p className="text-center text-sm text-gray-500">Confirm your payment of 1 SOL to subscribe.</p>}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-lg font-semibold text-green-600">Subscription successful!</p>
              <p>You now have access to all premium content.</p>
              <Button onClick={handleGoToArticles} className="w-full py-6 text-lg">Go to Articles</Button>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}