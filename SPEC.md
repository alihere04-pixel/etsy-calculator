# Etsy Fee & Profit Calculator — SPEC.md

**Date:** 2026-10-06
**Phase:** 1 — Specification
**Status:** Draft (awaiting user approval)

---

## 1. PROJECT OVERVIEW

- **Name:** Etsy Fee & Profit Calculator
- **Goal:** Accurate Etsy fee + profit calculator driving SEO traffic
- **MVP Regions:** US, UK, EU, CA, AU, IN
- **MVP Fees:** 6 core fees (Listing, Transaction, Payment Processing, Offsite Ads, Regulatory Operating Fee, Currency Conversion)
- **Auth:** No login
- **Database:** None (client-side calculation only)
- **Rates Data:** JSON file in `/lib/rates.json`, filled manually by user

---

## 2. TECH STACK (LOCK)

| Area | Choice |
|------|--------|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Repo | GitHub — alihere04-pixel |
| Rates Data | JSON file at `/lib/rates.json` |
| Analytics | GA4 + GSC |

---

## 3. USER FLOW (LOCK)

1. Land on homepage
2. Click "Calculate Fees" → calculator page
3. Enter inputs
4. Click Calculate
5. See results (fees, profit, margin, break-even)
6. Optional: share / copy result
7. Optional: read related blog post

---

## 4. INPUTS (EXACT LIST)

| Name | Type | Required | Default | Notes |
|------|------|----------|---------|-------|
| Product price | Number | Yes | — | Listing price in seller's currency |
| Shipping charged to buyer | Number | Yes | 0 | What buyer pays for shipping |
| COGS | Number | No | 0 | Cost of goods per unit |
| Shipping cost paid by seller | Number | No | 0 | Actual postage + packaging cost |
| Quantity | Number | Yes | 1 | Multi-quantity = listing fee × qty |
| Country | Select | Yes | US | US, UK, EU, CA, AU, IN |
| Offsite Ads | Select | No | Off | Off / 15% / 12% |
| Tax-inclusive toggle | Toggle | No | Off | For UK/EU (price includes VAT) |
| Gift wrap | Number | No | 0 | Optional charge to buyer, adds to fee base |

---

## 5. OUTPUTS (EXACT LIST)

| Name | Formula | Display |
|------|---------|---------|
| Listing fee | $0.20 × Quantity | Line item |
| Transaction fee | 6.5% × (Price + Shipping + Gift wrap) × Quantity | Line item |
| Payment processing fee | (rate% × orderTotal) × Quantity + fixed (fixed is PER ORDER, not × Quantity) | Line item |
| Offsite Ads fee | min(rate% × orderTotalExclTax, $100 cap) — cap is per order, NOT per unit | Line item (conditional) |
| Regulatory operating fee | rate% × (Price + Shipping + Gift wrap) × Quantity | Line item (by country) |
| Currency conversion fee | 2.5% × convertedAmount | Line item (conditional) |
| Total fees | Sum of all fee lines | **Highlighted** |
| Net revenue | (Price + Shipping) × Quantity − Total fees | **Highlighted** |
| Net profit | Net revenue − (COGS + Shipping cost) × Quantity | **Primary KPI** |
| Profit margin % | Net profit / Net revenue × 100 | **Primary KPI** |
| Break-even price | Price where Net profit = 0 | **Secondary KPI** |
| Effective fee rate % | Total fees / Gross revenue × 100 | Context |

---

## 6. FORMULAS (SOURCE-LINKED)

### 6.1 Listing Fee
- **Formula:** `listingFee = 0.20 × quantity`
- **Base:** Each item listed, auto-renewed, or sold (per unit)
- **Source:** Etsy Fees & Payments Policy

### 6.2 Transaction Fee
- **Formula:** `transactionFee = 0.065 × (itemPrice + shippingCharged + giftWrap) × quantity`
- **Base:** Item price + buyer-paid shipping + gift wrap. US: excludes sales tax. Non-US: includes VAT.
- **Source:** Etsy Fees & Payments Policy

### 6.3 Payment Processing Fee
- **Formula:** `processingFee = (processingPercent × orderTotal) × quantity + processingFixed` — `processingFixed` is charged ONCE per order, not per unit.
- **Base (INCLUDED):** item price + shipping charged + gift wrap + sales tax/VAT. **EXCLUDED:** nothing — this base always includes tax/VAT, for ALL countries.
- **Source:** Payment Processing Fees by Country (Etsy Help Center)
- **Note:** Rate is PENDING — user to fill `/lib/rates.json` in Phase 2

### 6.4 Offsite Ads Fee
- **Formula:** `offsiteAdsFee = min(offsiteAdsPercent × orderTotalExclTax, $100)` — the $100 cap applies to the TOTAL order, not per unit. Do NOT multiply by quantity.
- **Base:** Order total excluding US sales tax. 15% if shop under $10K/yr (optional), 12% if over (mandatory). Cap $100 per order.
- **Source:** How Offsite Ads Work (Etsy Help Center)

### 6.5 Regulatory Operating Fee
- **Formula:** `regulatoryFee = regulatoryRate × (itemPrice + shippingCharged + giftWrap) × quantity`
- **Base:** Item price + shipping + gift wrap (excl. tax). Rate varies by country.
- **Source:** Regulatory Operating Fee (Etsy Help Center)
- **Note:** Rate is PENDING — user to fill in Phase 2

### 6.6 Currency Conversion Fee
- **Formula:** `conversionFee = 0.025 × convertedAmount`
- **Base:** `convertedAmount` = the total order amount (item price + shipping + gift wrap + tax) in the listing currency that must be converted into the payout/payment-account currency. Applies ONLY when listing currency ≠ payout currency. If they match, fee = 0.
- **Source:** Etsy Fees & Payments Policy

### 6.7 Totals
- `totalFees = listingFee + transactionFee + processingFee + offsiteAdsFee + conversionFee + regulatoryFee`
- `netRevenue = (itemPrice + shippingCharged) × quantity − totalFees`
- `netProfit = netRevenue − (cogs + shippingCostPaid) × quantity`
- `profitMargin = (netProfit / netRevenue) × 100`

### Fee Base Composition (per order, before multiplication by quantity)

| Fee | Item price | Shipping charged | Gift wrap | Sales tax (US) | VAT (UK/EU) |
|-----|-----------|------------------|-----------|----------------|-------------|
| Listing fee | N/A (flat $0.20) | No | No | No | No |
| Transaction fee | ✅ Included | ✅ Included | ✅ Included | ❌ Excluded (US) | ✅ Included (UK/EU, tax-inclusive) |
| Payment processing fee | ✅ Included | ✅ Included | ✅ Included | ✅ Included | ✅ Included |
| Offsite Ads fee | ✅ Included | ✅ Included | ✅ Included | ❌ Excluded | ✅ Included |
| Regulatory operating fee | ✅ Included | ✅ Included | ✅ Included | ❌ Excluded | ❌ Excluded |
| Currency conversion fee | ✅ Applies to converted order total | ✅ | ✅ | ✅ | ✅ |

**Rule of thumb:** US sellers — transaction fee EXCLUDES sales tax; processing fee INCLUDES it. UK/EU sellers — all percentage fees INCLUDE VAT.

### Tax-Inclusive Toggle — How It Changes Formulas

The toggle only affects how the TRANSACTION FEE base is computed:

- **Toggle OFF (US / tax-exclusive):** `transactionFeeBase = itemPrice + shipping + giftWrap` (sales tax collected from buyer is NOT part of the base). Payment processing base = itemPrice + shipping + giftWrap + salesTax.
- **Toggle ON (UK/EU / tax-inclusive):** The listed price already includes VAT, so `transactionFeeBase = itemPrice + shipping + giftWrap` (which already contains VAT). Payment processing base = itemPrice + shipping + giftWrap (VAT already included in the listed price).

**Net revenue impact:** When toggle is ON, the VAT portion of the listed price is a liability, not revenue. `netRevenue = (itemPrice + shipping) × quantity − totalFees − VAT_collected`. When OFF, sales tax is passed through to the buyer and excluded from net revenue.

**Rule:**
- US (excl. tax): transaction base excludes tax; processing base includes tax.
- UK/EU (incl. VAT): transaction base includes VAT (embedded in price); processing base includes VAT (embedded in price).

---

## 7. RATE DATA SCHEMA (JSON)

Stored at `/lib/rates.json`. All rate values are `null` / `"PENDING"` until user fills them manually in Phase 2. **No invented rates.**

```json
{
  "US": {
    "listing_fee": null,
    "transaction_fee_percent": null,
    "payment_processing_percent": null,
    "payment_processing_fixed": null,
    "currency": "USD",
    "offsite_ads_percent": null,
    "regulatory_fee_percent": null,
    "currency_conversion_percent": null,
    "last_updated": "PENDING",
    "source_name": "PENDING"
  },
  "UK": {
    "listing_fee": null,
    "transaction_fee_percent": null,
    "payment_processing_percent": null,
    "payment_processing_fixed": null,
    "currency": "GBP",
    "offsite_ads_percent": null,
    "regulatory_fee_percent": null,
    "currency_conversion_percent": null,
    "last_updated": "PENDING",
    "source_name": "PENDING"
  },
  "EU": {
    "listing_fee": null,
    "transaction_fee_percent": null,
    "payment_processing_percent": null,
    "payment_processing_fixed": null,
    "currency": "EUR",
    "offsite_ads_percent": null,
    "regulatory_fee_percent": null,
    "currency_conversion_percent": null,
    "last_updated": "PENDING",
    "source_name": "PENDING"
  },
  "CA": {
    "listing_fee": null,
    "transaction_fee_percent": null,
    "payment_processing_percent": null,
    "payment_processing_fixed": null,
    "currency": "CAD",
    "offsite_ads_percent": null,
    "regulatory_fee_percent": null,
    "currency_conversion_percent": null,
    "last_updated": "PENDING",
    "source_name": "PENDING"
  },
  "AU": {
    "listing_fee": null,
    "transaction_fee_percent": null,
    "payment_processing_percent": null,
    "payment_processing_fixed": null,
    "currency": "AUD",
    "offsite_ads_percent": null,
    "regulatory_fee_percent": null,
    "currency_conversion_percent": null,
    "last_updated": "PENDING",
    "source_name": "PENDING"
  },
  "IN": {
    "listing_fee": null,
    "transaction_fee_percent": null,
    "payment_processing_percent": null,
    "payment_processing_fixed": null,
    "currency": "INR",
    "offsite_ads_percent": null,
    "regulatory_fee_percent": null,
    "currency_conversion_percent": null,
    "last_updated": "PENDING",
    "source_name": "PENDING"
  }
}
```

**Fields:**
- `listing_fee` — flat USD/local amount per listing
- `transaction_fee_percent` — e.g. 6.5 (PENDING)
- `payment_processing_percent` — e.g. 3.0 (PENDING)
- `payment_processing_fixed` — flat per-order amount (PENDING)
- `currency` — ISO currency code
- `offsite_ads_percent` — 15 or 12 (PENDING)
- `regulatory_fee_percent` — country-specific (PENDING)
- `currency_conversion_percent` — 2.5 (PENDING)
- `last_updated` — date string (PENDING)
- `source_name` — plain-text source name (PENDING)

---

## 8. EDGE CASES (DETAILED)

| Case | Handling |
|------|----------|
| Zero price | Show warning; calculate fees on $0 (listing fee only) |
| Zero quantity | Default to 1; show validation message |
| Negative values | Block input; show inline error |
| Full refund | Listing fee NOT refunded; transaction + processing refunded |
| Partial refund | Pro-rata fee refund; show disclaimer |
| Multi-quantity orders | Listing fee × quantity; transaction/processing on total |
| Offsite Ads + Etsy Plus | Independent; Plus is subscription, Offsite Ads per-sale |
| Tax-inclusive vs tax-exclusive | Toggle: "Price includes VAT" (UK/EU) vs "Price excludes tax" (US) |
| Currency mismatch | Show conversion fee if listing currency ≠ payout currency |
| $100 Offsite Ads cap | Apply per order in sale currency (approximation outside USD) |
| Gift wrap | Optional input; adds to transaction + processing base |
| Break-even with zero margin | Break-even price equals net cost basis; show zero-margin warning |

---

## 9. BREAK-EVEN FORMULA (EXACT)

**Goal:** Solve for `itemPrice` (P) such that `netProfit = 0`, for ANY quantity Q. Per-unit derivation.

**Variables:**
- `P` = item price per unit (unknown)
- `S` = shipping charged to buyer (per order)
- `G` = gift wrap charged (per order)
- `Q` = quantity of units in the order
- `C` = COGS + shipping cost paid by seller (per unit)
- `f` = payment processing fixed fee (PER ORDER, not per unit)
- `L` = listing fee per unit ($0.20)
- `tp` = transaction fee rate
- `pp` = payment processing rate
- `oa` = offsite ads rate (0 if off)
- `rg` = regulatory fee rate
- `cv` = currency conversion rate (0 if listing currency = payout currency)

**Step 1 — Totals for the whole order:**

```
netRevenue = (P + S) × Q − totalFees
totalCosts = C × Q
totalFees  = L×Q + tp×(P+S+G)×Q + (pp×(P+S+G)×Q + f) + oa×(P+S+G)×Q + rg×(P+S+G)×Q
```
Note: `f` is added ONCE per order (not ×Q). Listing fee `L` applies per unit (×Q).

**Step 2 — Ignore conversion fee (cv = 0):**

```
totalFees = L×Q + f + (tp + pp + oa + rg) × (P + S + G) × Q
```

**Step 3 — Set netProfit = 0:**

```
(P + S)×Q − L×Q − f − r×(P + S + G)×Q − C×Q = 0
```

**Step 4 — Divide both sides by Q (per-unit):**

```
(P + S) − L − f/Q − r×(P + S + G) − C = 0
```

**Step 5 — Let r = tp + pp + oa + rg and rearrange:**

```
P + S − L − f/Q − r×P − r×S − r×G − C = 0
P×(1 − r) + S×(1 − r) = L + f/Q + C + r×G
(P + S)×(1 − r) = L + f/Q + C + r×G
```

**Step 6 — Solve for P:**

```
P_breakeven = (L + f/Q + C + r×G) / (1 − r) − S
```

where `r = transactionFeeRate + processingRate + offsiteAdsRate + regulatoryRate`, `L` is the listing fee per unit, `f` is the per-order processing fixed fee, and `Q` is the quantity. This formula works for any Q ≥ 1.

**Assumptions:**
- Sales tax excluded from fee bases (US model); VAT-inclusive model adjusts `C` accordingly.
- Currency conversion fee excluded (set cv = 0) unless listing currency ≠ payout currency.
- Offsite Ads $100 cap ignored in break-even approximation.
- Offsite Ads rate `oa` = 0 when toggle is Off.

---

## 10. FILE STRUCTURE (LOCK)

```
/app
  /page.tsx
  /calculator/page.tsx
  /blog/...
/components
  /Calculator
  /ResultCard
  /FeeBreakdown
/lib
  /calc.ts
  /rates.json
/content
  /blog/*.mdx
/public
```

---

## 11. TESTING PLAN

| Type | Tool | When |
|------|------|------|
| Unit tests (calc engine) | Vitest | Phase 2 |
| Manual edge cases | — | Phase 2 |
| E2E tests | Playwright | End of Phase 2 |
| Cross-browser + mobile | Manual + BrowserStack (if needed) | Phase 2 |

---

## 12. OPEN QUESTIONS

**Resolved (answered):**
- **Q2 — Digital vs physical:** Etsy charges the SAME fees for digital and physical goods. No difference.
- **Q3 — $10K Offsite Ads threshold:** Global, based on USD sales over prior 365 days.
- **Q4 — Regulatory fee rounding:** Nearest cent, same as other fees.
- **Q6 — USD equivalent display:** Native currency only for MVP.
- **Q7 — Etsy Plus toggle:** Deferred to Phase 5+.

**Still open (need user decision):**

1. **Rate values** — US, UK, EU, CA, AU, IN: listing fee, transaction %, payment processing % + fixed, regulatory %, offsite ads %, currency conversion %, last_updated, source_name. (PENDING in `/lib/rates.json`)
2. **Blog content** — Which 8 SEO topics? (Drafted in RESEARCH_REPORT.md §0.3.)

---

## 13. UNIT TEST CASES (Phase 2 Reference)

These are test cases, not code. All rate VALUES remain PENDING until user fills `/lib/rates.json`.

| # | Case | Setup | Expected checks |
|---|------|-------|-----------------|
| 1 | Simple US sale, Q=1 | US, price P, shipping 0, no ads, no gift wrap | Listing fee = $0.20; transaction base = P; processing base = P + tax; netProfit = P − fees − COGS |
| 2 | US sale with shipping, Q=1 | US, price P, shipping S charged, no ads | Transaction base = P + S; processing base = P + S + tax |
| 3 | US sale, Q=5 (multi-quantity) | US, price P, shipping S, quantity 5 | Listing fee = $0.20 × 5; processing fixed counted ONCE; transaction/processing on (P+S)×5 |
| 4 | UK sale with VAT-inclusive price | UK, price P (includes VAT), Q=1 | Transaction base includes VAT (embedded); processing base includes VAT |
| 5 | Offsite Ads triggered, under $100 cap | US, orderTotalExclTax × 15% < $100 | Offsite fee = 15% × orderTotalExclTax (or 12% if over $10K/yr) |
| 6 | Offsite Ads triggered, over $100 cap | US, orderTotalExclTax × 15% > $100 | Offsite fee = $100 cap (per order, NOT × quantity) |
| 7 | Break-even — each case | For each case 1–6 | P_breakeven = (L + f/Q + C + r×G) / (1 − r) − S; verify netProfit = 0 at that price |

---

*Sources cited by plain-text name only (no URLs). All rates PENDING until user fills `/lib/rates.json`.*
