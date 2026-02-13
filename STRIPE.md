# PromptJoy Stripe Setup Guide

This guide covers how to set up Stripe for invoicing and subscriptions.

## Overview

For a consulting business like PromptJoy, you need two things:
1. **Recurring subscriptions** for Standard ($4,995/mo) and Pro ($7,995/mo) plans
2. **One-off invoices** for custom projects, add-ons, or special arrangements

Both can be done **entirely through the Stripe Dashboard** — no code required.

---

## Initial Setup

### 1. Create a Stripe Account
- Go to [stripe.com](https://stripe.com) and sign up
- Complete identity verification
- Add your bank account for payouts

### 2. Create Products in Stripe

Go to **Products** in the Stripe Dashboard and create:

**Product 1: Standard Plan**
- Name: `PromptJoy Standard`
- Description: `Unlimited AI consulting - one request at a time`
- Price: $4,995/month (recurring)

**Product 2: Pro Plan**
- Name: `PromptJoy Pro`  
- Description: `Unlimited AI consulting - two requests at a time`
- Price: $7,995/month (recurring)

**Product 3: Consulting (for custom invoices)**
- Name: `PromptJoy Consulting`
- Description: `AI consulting services`
- Price: Leave blank (you'll set custom amounts per invoice)

---

## Creating Payment Links (for website)

Payment Links let clients subscribe directly without you doing anything.

### Steps:
1. Go to **Payment Links** in Stripe Dashboard
2. Click **+ New**
3. Select your product (Standard or Pro)
4. Configure options:
   - ✅ Collect billing address
   - ✅ Allow promotion codes (optional)
   - ✅ Require phone number (optional)
5. Click **Create link**
6. Copy the link and update `pay.html`:

```html
<!-- Replace the # href with your actual payment link -->
<a href="https://buy.stripe.com/your-standard-link" class="btn btn-primary btn-block">Subscribe</a>
```

### Tips:
- Create separate links for Standard and Pro
- Payment Links handle everything: payment, subscription management, receipts
- Clients can manage their subscription via the Customer Portal (see below)

---

## Sending Invoices

For custom work, one-off projects, or clients who prefer invoices over self-serve:

### Steps:
1. Go to **Invoices** in Stripe Dashboard
2. Click **+ Create invoice**
3. Add or select a customer (by email)
4. Add line items:
   - Select existing product OR
   - Add custom line item with description and amount
5. Set payment terms (due on receipt, net 30, etc.)
6. Click **Send invoice**

The client receives an email with a secure payment link.

### Invoice Features:
- **Auto-reminders**: Stripe can send payment reminders automatically
- **Partial payments**: Allow clients to pay in installments
- **PDF download**: Clients can download PDF invoices
- **Tax handling**: Configure tax rates if needed

---

## Subscription Management

### Customer Portal
Enable the Customer Portal so clients can:
- Update payment method
- View invoices
- Cancel or pause subscription

**Setup:**
1. Go to **Settings > Billing > Customer portal**
2. Configure what customers can do
3. Enable the portal

Send clients to their portal via the link in their Stripe receipt, or create a portal session programmatically.

### Handling Pauses
PromptJoy offers pause functionality. In Stripe:
1. Go to **Customers** > find the customer
2. Click on their subscription
3. Use **Pause collection** to temporarily stop billing
4. Resume when they're ready

---

## Recommended Workflow

### New Client Signs Up:
1. Discovery call via Cal.com
2. If they want to proceed:
   - **Self-serve**: Send them to `/pay.html` or direct Payment Link
   - **Custom deal**: Create and send an invoice

### Ongoing Management:
- Subscriptions auto-renew monthly
- View all activity in Stripe Dashboard
- Stripe emails receipts automatically

### Custom Projects:
- Create invoice for the specific work
- Can be one-time or add-on to subscription

---

## Quick Reference

| Task | Where in Stripe |
|------|-----------------|
| Create subscription products | Products > + Add product |
| Create payment links | Payment Links > + New |
| Send invoice | Invoices > + Create invoice |
| View customers | Customers |
| Pause subscription | Customers > [Customer] > Subscription > Pause |
| Enable customer portal | Settings > Billing > Customer portal |
| View payouts | Balance > Payouts |

---

## Updating the Website

Once you have Payment Links, update `pay.html`:

```html
<!-- Standard Plan -->
<a href="https://buy.stripe.com/YOUR_STANDARD_LINK" class="btn btn-primary btn-block">Subscribe</a>

<!-- Pro Plan -->
<a href="https://buy.stripe.com/YOUR_PRO_LINK" class="btn btn-primary btn-block">Subscribe</a>
```

You can also update the main `index.html` "Get started" buttons to link directly to Stripe if you want to skip the call step for some clients.

---

## Questions?

Stripe has excellent documentation: [stripe.com/docs](https://stripe.com/docs)

For invoicing specifically: [stripe.com/docs/invoicing](https://stripe.com/docs/invoicing)
