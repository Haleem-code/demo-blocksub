BlockSub SDK Demo Application

Overview

This BlockSub SDK Demo Application demonstrates the integration of the BlockSub SDK into a simple web application. BlockSub is a subscription management solution that allows developers to manage user subscriptions effortlessly. This demo showcases how to use the SDK to handle user subscriptions, view subscription status, and interact with the BlockSub platform.

The demo application serves as a guide for developers integrating BlockSub into their own projects and provides example code for common use cases such as subscribing users, fetching subscription status, and managing subscriptions.

Key Features

User Authentication: Allows users to log in and out (not functional).

Subscription Management: Provides functionality to subscribe, a d approve transaction after connecting wallet.

BlockSub SDK Integration: Demonstrates how to set up and interact with the SDK.

Subscription Status: to check if a user has subscribed 

Error Handling: Handles common errors like failed connect wallet and subscription.


System Requirements

Frontend: Nextjs  and blocksub SDK 

BlockSub SDK: You must have an API key to interact with the BlockSub SDK. (WIP)


Demo Application Features

1. User Authentication:

User login using email and password or OAuth (Google, Facebook, etc.).

Secure user sessions using JWT or cookies.



2. Subscription Workflow:

Subscription function fetched from BlockSub SDK.

User can subscribe with just 2 clicks.

On successful subscription, the app displays the subscription details and renewal period.



3. Subscription Management:

Developers can view, update, or cancel their subscriptions directly from the app.

Display of active/inactive subscription status, next billing date, and plan details. (all in the platform dashboard (WIP) )



4. Error Handling:

Handling of various errors like failed subscription, RPC endpoint failure , invalid API responses.