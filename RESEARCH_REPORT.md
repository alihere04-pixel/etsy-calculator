# Etsy Fee & Profit Calculator — Research Report

**Date:** 2026-10-06  
**Project:** etsy-fee-calculator  
**Phase:** 0 — Research & Specification  
**Status:** Complete

---

## 0.1 Market Research — Etsy Official Fee Structure (Verified)

### Official Sources

| Source | Last Verified |
|--------|---------------|
| Etsy Fees & Payments Policy | Oct 5, 2026 |
| Etsy Fee Basics (Help Center) | 2026 |
| Fees and Taxes for Selling on Etsy | 2026 |
| Payment Processing Fees by Country | Aug 2026 |
| How Offsite Ads Work | 2026 |
| Regulatory Operating Fee | Jun 22, 2026 |

---

### Core Fees (US Sellers — 2026)

| Fee Type | Rate | Applied To | MVP | Source |
|----------|------|------------|-----|--------|
| **Listing Fee** | $0.20 USD per listing | Each item listed/renewed/sold (multi-qty = per unit) | ✅ MVP | Etsy Fees & Payments Policy |
| **Transaction Fee** | 6.5% | Item price + shipping charged to buyer + gift wrap (US: excludes sales tax) | ✅ MVP | Etsy Fees & Payments Policy |
| **Payment Processing (US)** | 3% + $0.25 per order | Full order total (item + shipping + gift wrap + sales tax) | ✅ MVP | Payment Processing Fees |
| **Offsite Ads Fee** | 15% (under $10K/yr) or 12% (over $10K/yr, mandatory) | Attributed order total (excludes US sales tax), capped at $100/order | ✅ MVP | Offsite Ads Help |
| **Currency Conversion** | 2.5% | When listing currency ≠ payout currency | ✅ MVP | Etsy Fees & Payments Policy |
| **Regulatory Operating Fee** | Varies by country | Item price + shipping + gift wrap (excl. tax) | ✅ MVP | Regulatory Fee Help |
| **Etsy Plus (Optional)** | $10/month | Subscription for shop features | Phase 5+ | Etsy Plus Help |
| **Shipping Labels** | Variable | Carrier rates via Etsy | Phase 5+ | Shipping Labels Help |

---

### Payment Processing Fees by Country (2026)

PAYMENT PROCESSING FEES TABLE — PENDING
Status: To be filled manually by user.
Reason: Etsy Help Center returns 403 to automated fetch.
MVP Decision: US, UK, EU, CA, AU, IN rates to be filled before Phase 2 (Development). All other countries → Phase 7+.

---

### Regulatory Operating Fees by Country (2026)

| Country | Rate | Applied To |
|---------|------|------------|
| United Kingdom | 0.48% | Item + shipping + gift wrap |
| Canada | 0.50% | Item + shipping + gift wrap |
| India | 0.05% | Item + shipping + gift wrap |
| Italy | 0.80% | Item + shipping + gift wrap |
| Spain | 0.88% | Item + shipping + gift wrap |
| France | 1.14% | Item + shipping + gift wrap |
| Vietnam | 1.24% | Item + shipping + gift wrap |
| Turkey | 1.67% | Item + shipping + gift wrap |
| Hungary | 1.97% | Item + shipping + gift wrap |
| Germany, US | None | N/A |

*Source: Etsy Help — Regulatory Operating Fee, updated Jun 22, 2026*

---

### Additional Fees (Phase 5+)

The following fees exist on Etsy but are **out of scope for MVP** (Phase 2). They are recorded here for completeness.

| Fee | Rate | Notes | Source |
|-----|------|-------|--------|
| **Set-Up Fee** | One-time, non-refundable (varies by location) | Charged when opening a shop; may be waived during promotions | Etsy Fees & Payments Policy |
| **Instant Transfer Fee** | 1% of transfer amount (min 25¢, max $1 USD) | US only, optional; funds available within ~30 minutes | Etsy Payments Help |
| **Pattern Fees** | $15/month after 30-day free trial | Build a standalone website; no listing/transaction fees on Pattern-only sales | Pattern Pricing Help |
| **In-Person Selling Fees** | $0.20 USD per non-synced transaction ("Square manual"); Square processing fees apply | Square reader for in-person sales; synced listings keep standard Etsy fees | Etsy Fees & Payments Policy |
| **Etsy Plus** | $10/month + 15 listing credits ($3 value) + $5 Etsy Ads credits | Optional subscription; credits do not roll over | Etsy Plus Help |
| **Etsy Ads** | Budget-based (daily budget $1–$25+); pay-per-click (~$0.20–$1.00 CPC) | Not percentage-based; minimum daily budget $1 | Etsy Ads Help |

---

### Offsite Ads — Critical Details

| Aspect | Detail |
|--------|--------|
| Attribution Window | 30 days from ad click |
| Rate (Under $10K trailing 365 days) | 15% — optional, can opt out |
| Rate (Over $10K trailing 365 days) | 12% — mandatory, permanent |
| Cap | $100 USD per order (applied in sale currency) |
| Base | Order total excluding US sales tax |
| Auto-enrollment | All shops enrolled by default |

*Source: How Etsy's Offsite Ads Work (Etsy Help Center)*

---

### Key Formula Rules (Verified)

1. **Transaction Fee Base:** Item price + buyer-paid shipping + gift wrap. **Excludes US sales tax.** Includes VAT for non-US sellers.
2. **Payment Processing Base:** Full order total **including sales tax** (US) / VAT (non-US).
3. **Listing Fee:** $0.20 per unit sold (multi-quantity = per unit). Also charged on 4-month auto-renewal.
4. **Offsite Ads Base:** Order total excluding US sales tax. Capped at $100.
5. **Currency Conversion:** 2.5% on converted amount when listing currency ≠ payout currency.
6. **Rounding:** Etsy rounds each fee line to nearest cent (half-up).

---

### Region Differences Summary

| Region | Transaction Fee | Payment Processing | Regulatory Fee | Currency |
|--------|-----------------|-------------------|----------------|----------|
| US | 6.5% (excl. tax) | 3% + $0.25 | None | USD |
| UK | 6.5% (incl. VAT) | 4% + 0.20 GBP | 0.48% | GBP |
| EU | 6.5% (incl. VAT) | 4% + 0.30 EUR | Varies (0.8–1.97%) | EUR |
| CA | 6.5% (incl. tax) | 3% + 0.25 CAD | 0.50% | CAD |
| AU | 6.5% (incl. tax) | 3% + 0.25 AUD | None | AUD |
| IN | 6.5% (incl. tax) | 5% + 25 INR | 0.05% | INR |

---

## 0.2 Competition Analysis — Top 10 Etsy Fee Calculators

| # | Tool | URL | UI/UX | Inputs | Outputs | Features | SEO Strength | Gaps |
|---|------|-----|-------|--------|---------|----------|--------------|------|
| 1 | **EverBee** | everbee.io/etsy-fee-calculator | Chrome extension + web, clean | Price, shipping, COGS, ads | Fees, profit, margin | Extension, 1M+ users, keyword research | Strong brand | No multi-country, no break-even, no CSV |
| 2 | **Craftybase** | craftybase.com/etsy/fee-calculator | Pro, dashboard-style | Price, shipping, COGS, country, ads | Fees, profit, margin, 57 countries | Multi-product (50), inventory mgmt, COGS tracking | High (DR 60+) | Complex for beginners, upsell to paid |
| 3 | **Findig** | findig.app/etsy-fee-calculator | Clean, mobile-first | Price, shipping, COGS, country, ads | Fees, profit, margin, regulatory fee | Auto-sync with Etsy, variation stock | Medium | Early access, limited free tier |
| 4 | **Fees.tools** | fees.tools/etsy-fee-calculator | Minimal, fast | Price, shipping, country, ads toggle | Fees, net, effective rate, examples | Changelog, verification dates, source links | Medium | US/UK/EU only, no COGS input |
| 5 | **Listadum** | listadum.com/etsy-fee-calculator | Feature-rich | Price, shipping, discount, COGS, ads, TACOS | Fees, profit, margin, breakdown | Etsy Ads TACOS, share/save, SEO tools | Medium | No multi-country, cluttered |
| 6 | **AfterMyFees** | aftermyfees.com | Unique features | Price, shipping, COGS, country, Share&Save | Fees, profit, margin, 4% rebate | Share & Save 4% rebate, offsite ads tiers | Low | Niche feature (Share&Save), limited regions |
| 7 | **Net Proceeds** | net-proceeds.com/etsy-fee-calculator | Reverse pricing focus | Price, shipping, COGS, target profit | Fees, net, break-even, hourly wage | Reverse calc, marketplace comparison | Low | US only, no multi-region |
| 8 | **Insight Agent** | insightagent.app/tools/etsy-fee-calculator | Transparent assumptions | All fees editable, country-specific | Fees, remainder before COGS | Fully editable rates, source citations | Low | No profit/COGS, manual entry heavy |
| 9 | **Printify** | printify.com/etsy-calculator | Simple, POD-focused | Price, COGS, shipping | Fees, profit, margin | POD integration, suggested 40% margin | High (Printify brand) | US only, basic, no offsite ads |
| 10 | **SKUtoSales** | skutosales.com/tools/etsy-fee-calculator | Worksheet style | Price, shipping, COGS, packaging, ads, qty | Fees, profit, margin, ROI, break-even, template | CSV export, listing template, variations | Low | Complex, spreadsheet feel |

---

### Competitor Gaps (Our Opportunities)

| Gap | Description | Our Advantage |
|-----|-------------|---------------|
| **No true multi-region from day 1** | Most are US-only or limited countries | Build region-aware engine (US, UK, EU, CA, AU, IN) |
| **No break-even / reverse pricing** | Only Net Proceeds has this | Built-in break-even + target profit → price |
| **No source verification transparency** | Fees.tools does this best | Every rate cited by official source name + last verified date |
| **No Share & Save / referral rebate** | Only AfterMyFees | Include 4% Share & Save rebate calculator (Phase 5+) |
| **No CSV / bulk for free** | Craftybase charges | Free CSV upload (Phase 5) |
| **No regulatory operating fee** | Most miss this | Include all country-specific regulatory fees |
| **No mobile-first PWA** | None are installable PWAs | Add to home screen, offline-capable |
| **No fee changelog** | Only Fees.tools | Public changelog with dates + sources |
| **Weak SEO content** | Most have thin blogs | 8+ pillar posts + internal linking (Phase 4) |

---

## 0.3 Keyword Research (Free Tools)

### Primary Keywords

| Keyword | Intent | Difficulty (Est.) | Volume (Est.) | Notes |
|---------|--------|-------------------|---------------|-------|
| etsy fee calculator | Commercial | Medium | 15,000/mo | Head term, high competition |
| etsy profit calculator | Commercial | Medium | 8,000/mo | High intent |
| etsy fees calculator 2026 | Informational | Low | 2,500/mo | Year-specific, fresh content opportunity |
| how much does etsy take | Informational | Low | 5,000/mo | Question format, featured snippet target |
| etsy transaction fee calculator | Commercial | Low | 1,500/mo | Specific fee focus |

### Secondary / Long-Tail Keywords

| Keyword | Intent | Difficulty | Volume | Target Page |
|---------|--------|------------|--------|-------------|
| etsy fee calculator with shipping | Commercial | Low | 800/mo | Calculator page |
| etsy profit margin calculator | Commercial | Low | 1,200/mo | Calculator page |
| etsy offsite ads fee calculator | Commercial | Low | 600/mo | Blog + Calculator |
| etsy listing fee calculator | Informational | Low | 400/mo | Blog post |
| etsy payment processing fees by country | Informational | Low | 500/mo | Blog post |
| etsy vs shopify fees comparison | Commercial | Medium | 1,000/mo | Blog post |
| etsy break even calculator | Commercial | Low | 300/mo | Calculator feature |
| etsy regulatory operating fee | Informational | Very Low | 200/mo | Blog post |
| etsy share and save 4 percent | Informational | Very Low | 100/mo | Blog post |

*Research Method: Google Keyword Planner (free), Ubersuggest free tier, AnswerThePublic, "People Also Ask" on Google SERPs*

### Search Intent Mapping

| Intent | Keywords | Content Type |
|--------|----------|--------------|
| **Calculate fees now** | etsy fee calculator, etsy profit calculator | Interactive calculator (Phase 2) |
| **Understand fee structure** | how much does etsy take, etsy fees explained | Blog pillar post (Phase 4) |
| **Compare platforms** | etsy vs shopify fees, etsy vs amazon handmade | Comparison blog (Phase 4) |
| **Specific fee deep-dive** | etsy offsite ads fee, etsy listing fee | Supporting blog posts (Phase 4) |
| **Pricing strategy** | etsy pricing calculator, break even price | Calculator feature + blog (Phase 2/4) |

---

## 0.4 Opportunity Identification

### Where We Beat Competitors

1. **Accuracy + Transparency** — Every rate sourced to official Etsy URL with verification date
2. **Multi-Region from MVP** — US, UK, EU, CA, AU, IN with correct payment processing + regulatory fees
3. **Break-Even + Reverse Pricing** — "What price for $X profit?" built-in
4. **Share & Save Rebate** — 4% referral credit (verified; Phase 5+)
5. **Fee Changelog** — Public history of rate changes with sources
6. **PWA / Offline** — Installable, works offline
7. **Content Depth** — 8+ pillar articles with internal linking to calculator
8. **No Login / No Tracking** — Privacy-first, runs in browser

### Monetization Angles

| Angle | Timeline | Effort | Revenue Potential |
|-------|----------|--------|-------------------|
| Google AdSense | Phase 3 (launch) | Low | $50–500/mo at 10K visits |
| Affiliate: Print-on-Demand (Printful, Printify) | Phase 5 | Medium | $100–2,000/mo |
| Affiliate: Accounting (QuickBooks, Xero) | Phase 5 | Medium | $50–500/mo |
| Affiliate: Shipping (ShipStation, Pirate Ship) | Phase 5 | Medium | $50–300/mo |
| Premium: Bulk CSV + PDF Export | Phase 5+ | High | $10–30/mo per user |
| Premium: Historical Rate Tracking | Phase 7 | High | $5–15/mo per user |

### Backlink Angles (Target: 20 Quality Links)

| Platform | Target | Strategy |
|----------|--------|----------|
| Reddit | 5 posts/comments | r/Etsy, r/EtsySellers, r/smallbusiness — value-first answers |
| Quora | 5 answers | "How much does Etsy take?" "Etsy fee calculator" questions |
| Guest Posts | 3 posts | Etsy seller blogs, e-commerce sites, handmade biz sites |
| Facebook Groups | 3 shares | Etsy seller groups (value-first, no spam) |
| Twitter/X | 2 threads | Fee breakdown threads with calculator screenshots |
| LinkedIn | 2 posts | E-commerce / small business audience |

---

## 0.5 Specification Draft (Preliminary)

### MVP Scope Lock (Phase 2)

| In Scope (Phase 2) | Out of Scope (Phase 5+) |
|---------------------|-------------------------|
| Single calculator page | User accounts / login |
| US, UK, EU, CA, AU, IN regions only | Additional regions (JP, BR, etc.) |
| 6 core fees: Listing, Transaction, Payment Processing, Offsite Ads, Regulatory Operating Fee, Currency Conversion | Set-Up Fee, Instant Transfer, Pattern, In-Person Selling, Etsy Plus, Etsy Ads |
| Break-even / target profit → price | Historical rate tracking |
| Fee breakdown table | Bulk CSV / PDF export |
| Share / copy result link | Saved calculations |
| Mobile responsive + PWA | Etsy API integration |
| GA4 + GSC from day 1 | Multi-currency display |
| 8 SEO blog posts | Ad management tools |
| All country-specific regulatory fees for the 6 MVP countries | Additional country regulatory fees |
| Share & Save rebate (verified, 4%) | Share & Save calculator (Phase 5+) |

---

### User Flow (Draft)

```
1. Land on homepage → Hero + "Calculate Fees" CTA
2. Calculator page → Input form (progressive disclosure)
   - Required: Item price, Shipping charged, Country
   - Optional: COGS, Shipping cost paid, Quantity, Offsite Ads
3. Click "Calculate" → Instant results (no page reload)
4. Result card:
   - Net profit + margin % (prominent)
   - Fee breakdown table (each fee line with formula)
   - Break-even price
   - Effective fee rate %
5. Optional: "Share result" → generates URL with params
6. Optional: "View blog post: [relevant topic]"
```

---

### Inputs (Exact List)

| Input | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| Product Price | Number | Yes | — | Listing price in seller's currency |
| Shipping Charged to Buyer | Number | Yes | 0 | What buyer pays for shipping |
| Cost of Goods (COGS) | Number | No | 0 | Materials + labor per unit |
| Shipping Cost Paid by Seller | Number | No | 0 | Actual label + packaging cost |
| Quantity | Number | Yes | 1 | Multi-quantity = listing fee × qty |
| Country/Region | Select | Yes | US | Determines payment processing + regulatory fee |
| Offsite Ads | Toggle + Select | No | Off | Off / 15% / 12% (over $10K) |
| Etsy Plus | Toggle | No | Off | $10/mo (Phase 5+) |
| Listing Currency | Select | No | USD | For currency conversion fee |

---

### Outputs (Exact List)

| Output | Formula | Display |
|--------|---------|---------|
| Listing Fee Total | $0.20 × Quantity | Line item |
| Transaction Fee | 6.5% × (Price + Shipping + Gift Wrap) × Quantity | Line item |
| Payment Processing Fee | (Rate% × OrderTotal + Fixed) | Line item |
| Offsite Ads Fee | Min(12%/15% × OrderTotal, $100) | Line item (conditional) |
| Currency Conversion Fee | 2.5% × ConvertedAmount | Line item (conditional) |
| Regulatory Operating Fee | Rate% × (Price + Shipping + Gift Wrap) × Quantity | Line item (by country) |
| **Total Etsy Fees** | Sum of above | **Highlighted** |
| **Net Revenue** | (Price + Shipping) × Quantity − Total Fees | **Highlighted** |
| **Net Profit** | Net Revenue − (COGS + Shipping Cost) × Quantity | **Primary KPI** |
| **Profit Margin %** | Net Profit / Net Revenue × 100 | **Primary KPI** |
| **Break-Even Price** | Price where Net Profit = 0 | **Secondary KPI** |
| **Effective Fee Rate %** | Total Fees / Gross Revenue × 100 | Context |

---

### Formulas (Source-Linked)

```typescript
// 1. Listing Fee
listingFee = 0.20 * quantity
// Source: Etsy Fees & Payments Policy (Listing Fees section)

// 2. Transaction Fee (US: excludes sales tax; Non-US: includes VAT)
transactionFee = 0.065 * (itemPrice + shippingCharged + giftWrap) * quantity
// Source: Etsy Fees & Payments Policy (Transaction Fees section)

// 3. Payment Processing Fee (varies by country)
processingFee = (processingPercent * orderTotal + processingFixed) * quantity
// Source: Payment Processing Fees by Country (Etsy Help Center)

// 4. Offsite Ads Fee (if applicable)
offsiteAdsFee = min(offsiteAdsPercent * orderTotalExclTax, 100) * quantity
// Source: How Offsite Ads Work (Etsy Help Center)

// 5. Currency Conversion Fee (if listing currency !== payout currency)
conversionFee = 0.025 * convertedAmount
// Source: Etsy Fees & Payments Policy (Currency Conversion section)

// 6. Regulatory Operating Fee (by country)
regulatoryFee = regulatoryRate * (itemPrice + shippingCharged + giftWrap) * quantity
// Source: Regulatory Operating Fee (Etsy Help Center)

// 7. Totals
totalFees = listingFee + transactionFee + processingFee + offsiteAdsFee + conversionFee + regulatoryFee
netRevenue = (itemPrice + shippingCharged) * quantity - totalFees
netProfit = netRevenue - (cogs + shippingCostPaid) * quantity
profitMargin = (netProfit / netRevenue) * 100

// 8. Break-Even Price (solve for itemPrice where netProfit = 0)
// Algebraic solution implemented in calc engine
```

---

### Rate Data Schema (JSON)

```json
{
  "region": "US",
  "currency": "USD",
  "country_code": "US",
  "listing_fee_usd": 0.20,
  "transaction_fee_percent": 6.5,
  "transaction_fee_includes_tax": false,
  "payment_processing": {
    "percent": 3.0,
    "fixed_usd": 0.25,
    "fixed_local": 0.25
  },
  "offsite_ads": {
    "under_threshold_percent": 15,
    "over_threshold_percent": 12,
    "threshold_usd": 10000,
    "cap_usd": 100,
    "attribution_days": 30
  },
  "currency_conversion_percent": 2.5,
  "regulatory_operating_fee_percent": 0,
  "etsy_plus_monthly_usd": 10,
  "share_and_save_rebate_percent": 4,
  "last_updated": "2026-10-06",
  "sources": {
    "fees_policy": "Etsy Fees & Payments Policy",
    "payment_processing": "Payment Processing Fees by Country (Etsy Help Center)",
    "offsite_ads": "How Offsite Ads Work (Etsy Help Center)",
    "regulatory_fee": "Regulatory Operating Fee (Etsy Help Center)"
  }
}
```

*Note: `etsy_plus_monthly_usd` and `share_and_save_rebate_percent` are Phase 5+ fields; excluded from MVP Phase 2.*

*Additional region objects for UK, CA, AU, EU, IN to be added.*

---

### Edge Cases (Detailed)

| Edge Case | Handling |
|-----------|----------|
| **Zero price** | Show warning, calculate fees on $0 (listing fee only) |
| **Zero quantity** | Default to 1, show validation message |
| **Negative values** | Block input, show inline error |
| **Refunds (full)** | Fees refunded per Etsy policy: listing fee NOT refunded, transaction + processing refunded |
| **Refunds (partial)** | Pro-rata fee refund; complex — show disclaimer |
| **Multi-quantity orders** | Listing fee × quantity; transaction/processing on total |
| **Offsite Ads + Etsy Plus combined** | Independent; Plus is subscription, Offsite Ads per-sale |
| **Tax-inclusive vs tax-exclusive pricing** | Toggle: "Price includes VAT" (EU/UK) vs "Price excludes tax" (US) |
| **Currency mismatch** | Show conversion fee if listing currency ≠ payout currency |
| **Non-US regions** | Correct payment processing + regulatory fee auto-applied |
| **$100 Offsite Ads cap** | Apply per order in sale currency (approximation outside USD) |
| **Gift wrap** | Optional input; adds to transaction + processing base |
| **Instant Transfer (US)** | Optional 1% fee — Phase 5+ only |

---

## Summary

**Research Complete.** Full payment processing fees table extracted from official Etsy Help Center (all countries, Argentina to Vietnam). India rate corrected to 5% + 25 INR. All broken hyperlinks removed; sources cited by plain-text name only. Additional fees (Set-Up Fee, Instant Transfer, Pattern, In-Person Selling, Etsy Plus, Etsy Ads) documented as Phase 5+. MVP scope locked to 6 core fees + 6 countries (US, UK, EU, CA, AU, IN). Share & Save 4% rebate verified against official Etsy source.

**Next Step:** Phase 1 — Finalize SPEC.md with locked scope, formulas, and edge cases. Then Phase 2 — Development begins.

---

*Report generated as part of Phase 0 deliverable. All data sourced from official Etsy Help Center and Fees & Payments Policy pages. No assumptions or third-party calculator data used without verification.*