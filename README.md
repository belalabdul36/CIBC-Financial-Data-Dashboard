# CIBC Financial Dashboard

> Interactive financial analytics dashboard built with React + Recharts, powered by real data from CIBC's FY2025 Consolidated Financial Statements (Annual Report ending October 31, 2025).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.x-FF6B6B)
![Excel](https://img.shields.io/badge/Excel-Data%20Model-217346?logo=microsoftexcel&logoColor=white)

---

## Overview

This project contains two deliverables:

1. **React Dashboard** (`src/App.jsx`) — A 6-page interactive financial report styled in CIBC's red and white brand colors, visualizing key metrics from the FY2025 consolidated financial statements.

2. **Excel Financial Model** (`data/CIBC_Financial_Model_PowerBI.xlsx`) — A 10-tab structured workbook with dynamic formulas, cross-sheet references, and flat Power BI-ready tables covering the balance sheet, income statement, cash flows, segments, geography, loan portfolio, deposits, capital adequacy, key ratios, and changes in equity.

---

## Dashboard Pages

| Page | Description |
|------|-------------|
| **Executive Summary** | KPI cards (revenue, net income, EPS, CET1), revenue composition, interest income sources |
| **Income & Revenue** | Non-interest income/expense breakdowns, full income statement table with YoY changes |
| **Balance Sheet** | Asset composition and deposit mix pie charts, detailed BS summary table |
| **Loans & Credit** | Loan portfolio by stage (1/2/3), ACL breakdown, credit quality metrics |
| **Segments & Geography** | Revenue and net income by SBU and geographic region |
| **Capital & Ratios** | Gauge charts for CET1/Tier1/Total/Leverage ratios vs. regulatory minimums |

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm or yarn
- Alternatively, you can run and explore the project directly in your browser using CodeSandbox:
https://codesandbox.io/

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/cibc-financial-dashboard.git
cd cibc-financial-dashboard

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`.

### Production Build

```bash
npm run build
```

---

## Project Structure

```
cibc-financial-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx              # Main dashboard component (6 pages)
│   └── index.js             # React entry point
├── data/
│   └── CIBC_Financial_Model_PowerBI.xlsx   # Excel financial model
├── .github/
│   └── FUNDING.yml
├── .gitignore
├── LICENSE
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── package.json
```

---

## Excel Model Details

The workbook (`data/CIBC_Financial_Model_PowerBI.xlsx`) contains 10 sheets:

| Sheet | Purpose | Format |
|-------|---------|--------|
| Balance Sheet | Consolidated BS with YoY % change formulas | Financial statement |
| Income Statement | Full P&L with YoY calculations | Financial statement |
| Cash Flows | Operating, financing, investing activities | Financial statement |
| Key Ratios | NIM, efficiency ratio, PCL/loans, tax rate | Computed KPIs |
| Segments | 5 SBUs x 2 years, flat table | Power BI ready |
| Geography | 4 regions x 2 years, flat table | Power BI ready |
| Loan Portfolio | Stage 1/2/3 by loan type, flat table | Power BI ready |
| Deposits | Demand/notice/fixed date breakdown | Power BI ready |
| Capital | CET1, Tier 1, TLAC vs. regulatory mins | Regulatory |
| Changes in Equity | Preferred, common, retained earnings | Financial statement |

### Color Coding Convention

- **Blue text** — Hardcoded inputs (raw data from the annual report)
- **Black text** — Formulas and calculations
- **Green text** — Cross-sheet linked references
- **Red headers** — CIBC brand color (section headers)

### Using with Power BI

1. Open Power BI Desktop
2. **Get Data > Excel Workbook** and select the `.xlsx` file
3. Import the flat tables: Segments, Geography, Loan Portfolio, Deposits, Capital
4. Use the `Year` column as a slicer for 2024 vs. 2025 comparisons
5. Apply CIBC red/white theme via **View > Themes > Customize**

---

## Data Source

All financial data is sourced from:

**Canadian Imperial Bank of Commerce — 2025 Annual Report**
- Consolidated Financial Statements (IFRS)
- Fiscal year ended October 31, 2025
- Audited by Ernst & Young LLP
- Filed with OSFI, SEC, and Canadian Securities Administrators

Key figures (CAD millions unless noted):

| Metric | FY2025 | FY2024 | YoY Change |
|--------|--------|--------|------------|
| Total Revenue | $29,133 | $25,606 | +13.8% |
| Net Income | $8,454 | $7,154 | +18.2% |
| Diluted EPS | $8.57 | $7.28 | +17.7% |
| Total Assets | $1,116,938 | $1,041,985 | +7.2% |
| CET1 Ratio | 13.3% | 13.3% | Stable |
| Dividends/Share | $3.88 | $3.60 | +7.8% |

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18+ | UI framework |
| Recharts | 2.x | Charts and data visualization |
| Tailwind CSS | 3.x | Utility classes (optional) |
| DM Sans | — | Primary font (Google Fonts) |
| openpyxl | 3.x | Excel model generation (Python) |

---

## Disclaimer

This project is for **educational and portfolio purposes only**. It is not affiliated with, endorsed by, or sponsored by Canadian Imperial Bank of Commerce (CIBC). All financial data is sourced from publicly available documents (CIBC 2025 Annual Report). This dashboard does not constitute financial advice, investment recommendations, or an offer to buy or sell securities.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Author

Built by **Belal** — Accounting student, aspiring CPA professional, and data enthusiast.
