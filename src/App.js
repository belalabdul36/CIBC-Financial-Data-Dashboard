import React, { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CIBC_RED = "#CE0E2D";
const CIBC_DARK = "#8B0000";
const CIBC_LIGHT = "#F8D7DA";
const WHITE = "#FFFFFF";
const NEAR_WHITE = "#FAFAFA";
const LIGHT_GRAY = "#F0F0F0";
const MED_GRAY = "#B0B0B0";
const DARK = "#1A1A2E";
const ACCENT_GOLD = "#D4A853";

const pages = [
  "Executive Summary",
  "Income & Revenue",
  "Balance Sheet",
  "Loans & Credit",
  "Segments & Geography",
  "Capital & Ratios",
];

// ── DATA ──
const revenueData = [
  { year: "2024", "Net Interest Income": 13695, "Non-Interest Income": 11911 },
  { year: "2025", "Net Interest Income": 15769, "Non-Interest Income": 13364 },
];

const incomeBreakdown = [
  { name: "Interest - Loans", value: 32074 },
  { name: "Interest - Securities", value: 9045 },
  { name: "Interest - Sec Borrowed", value: 5260 },
  { name: "Interest - Deposits & Other", value: 2382 },
];

const nonInterestIncome = [
  { name: "Inv Mgmt & Custodial", v2025: 2241, v2024: 1980 },
  { name: "Mutual Fund Fees", v2025: 2019, v2024: 1796 },
  { name: "Credit Fees", v2025: 1015, v2024: 1218 },
  { name: "Deposit & Payment", v2025: 996, v2024: 958 },
  { name: "Underwriting & Advisory", v2025: 915, v2024: 707 },
  { name: "Commissions", v2025: 554, v2024: 431 },
];

const expenseData = [
  { name: "Employee Comp", v2025: 9266, v2024: 8261 },
  { name: "Computer & Software", v2025: 2946, v2024: 2719 },
  { name: "Other", v2025: 1592, v2024: 1538 },
  { name: "Occupancy", v2025: 847, v2024: 830 },
  { name: "Communications", v2025: 395, v2024: 362 },
  { name: "Advertising", v2025: 398, v2024: 344 },
];

const bsAssets = [
  { name: "Loans (net)", value: 589504 },
  { name: "Securities", value: 283235 },
  { name: "Other Assets", value: 91804 },
  { name: "Sec Under Resale", value: 86695 },
  { name: "Deposits w/ Banks", value: 44003 },
  { name: "Cash Coll. Borrowed", value: 21697 },
];

const loanPortfolio = [
  {
    type: "Residential Mortgages",
    gross: 287033,
    stage1: 272458,
    stage2: 13260,
    stage3: 1315,
    acl: 574,
  },
  {
    type: "Business & Govt",
    gross: 237416,
    stage1: 221790,
    stage2: 13595,
    stage3: 2031,
    acl: 1720,
  },
  {
    type: "Personal",
    gross: 47866,
    stage1: 41554,
    stage2: 6022,
    stage3: 290,
    acl: 1156,
  },
  {
    type: "Credit Card",
    gross: 21581,
    stage1: 19485,
    stage2: 2096,
    stage3: 0,
    acl: 942,
  },
];

const segmentRevenue2025 = [
  { name: "Canadian PBB", value: 12031, ni: 3107, color: CIBC_RED },
  { name: "Canadian CBW", value: 6902, ni: 2341, color: CIBC_DARK },
  { name: "Capital Markets", value: 6148, ni: 2273, color: "#E85D75" },
  { name: "U.S. CBW", value: 3216, ni: 958, color: ACCENT_GOLD },
  { name: "Corporate & Other", value: 836, ni: -225, color: MED_GRAY },
];

const segCompare = [
  {
    name: "Can PBB",
    rev2025: 12031,
    rev2024: 10942,
    ni2025: 3107,
    ni2024: 2905,
  },
  { name: "Can CBW", rev2025: 6902, rev2024: 6018, ni2025: 2341, ni2024: 2063 },
  { name: "Cap Mkt", rev2025: 6148, rev2024: 4800, ni2025: 2273, ni2024: 1629 },
  { name: "U.S. CBW", rev2025: 3216, rev2024: 2820, ni2025: 958, ni2024: 500 },
  { name: "Corp", rev2025: 836, rev2024: 1026, ni2025: -225, ni2024: 57 },
];

const geoData = [
  { region: "Canada", revenue: 19273, ni: 3946, assets: 835506 },
  { region: "U.S.", revenue: 5932, ni: 2216, assets: 189079 },
  { region: "Caribbean", revenue: 2726, ni: 1784, assets: 55069 },
  { region: "Other", revenue: 1202, ni: 508, assets: 24631 },
];

const capitalGauges = [
  { name: "CET1", value: 13.3, min: 11.5, fill: CIBC_RED },
  { name: "Tier 1", value: 15.1, min: 13.0, fill: CIBC_DARK },
  { name: "Total Cap", value: 17.4, min: 15.0, fill: "#E85D75" },
  { name: "Leverage", value: 4.3, min: 3.5, fill: ACCENT_GOLD },
];

const depositMix = [
  { name: "Personal", value: 258139 },
  { name: "Business & Govt", value: 457284 },
  { name: "Bank", value: 26723 },
  { name: "Secured Borrowings", value: 65978 },
];

const COLORS = [
  CIBC_RED,
  CIBC_DARK,
  "#E85D75",
  ACCENT_GOLD,
  MED_GRAY,
  "#6B4C3B",
];

const fmtNum = (n) => {
  if (n === undefined || n === null) return "-";
  return n.toLocaleString();
};

const pctChange = (curr, prev) => {
  if (!prev) return "-";
  const c = (((curr - prev) / prev) * 100).toFixed(1);
  return Number(c) > 0 ? `+${c}%` : `${c}%`;
};

// ── KPI CARD ──
function KPI({ label, value, sub, trend, small }) {
  const isPos = trend && !trend.startsWith("-");
  return (
    <div
      style={{
        background: WHITE,
        borderRadius: 10,
        padding: small ? "14px 16px" : "20px 24px",
        border: `1px solid ${LIGHT_GRAY}`,
        borderTop: `3px solid ${CIBC_RED}`,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minWidth: small ? 120 : 160,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: MED_GRAY,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.8,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: small ? 22 : 28,
          fontWeight: 800,
          color: DARK,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {value}
      </span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {sub && <span style={{ fontSize: 11, color: MED_GRAY }}>{sub}</span>}
        {trend && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: isPos ? "#2E7D32" : CIBC_RED,
              background: isPos ? "#E8F5E9" : CIBC_LIGHT,
              padding: "1px 8px",
              borderRadius: 20,
            }}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

// ── CARD WRAPPER ──
function Card({ title, children, span }) {
  return (
    <div
      style={{
        background: WHITE,
        borderRadius: 12,
        padding: "20px 24px",
        border: `1px solid ${LIGHT_GRAY}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        gridColumn: span ? `span ${span}` : undefined,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {title && (
        <h3
          style={{
            margin: "0 0 16px 0",
            fontSize: 14,
            fontWeight: 700,
            color: DARK,
            fontFamily: "'DM Sans', sans-serif",
            borderBottom: `2px solid ${CIBC_RED}`,
            paddingBottom: 8,
            display: "inline-block",
          }}
        >
          {title}
        </h3>
      )}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

// ── GAUGE COMPONENT ──
function Gauge({ name, value, min, fill = CIBC_RED }) {
  const pct = Math.min((value / 25) * 100, 100);
  const circumference = 264;

  return (
    <div style={{ textAlign: "center", flex: 1 }}>
      <div
        style={{
          position: "relative",
          width: 100,
          height: 100,
          margin: "0 auto",
        }}
      >
        <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={LIGHT_GRAY}
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={fill}
            strokeWidth="8"
            strokeDasharray={`${pct * 2.64} ${circumference - pct * 2.64}`}
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: DARK }}>
            {value}%
          </span>
        </div>
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: DARK, marginTop: 6 }}>
        {name}
      </div>
      <div style={{ fontSize: 10, color: MED_GRAY }}>Min: {min}%</div>
    </div>
  );
}

// ── CUSTOM TOOLTIP ──
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        background: DARK,
        borderRadius: 8,
        padding: "10px 14px",
        border: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <p style={{ color: WHITE, margin: 0, fontSize: 12, fontWeight: 700 }}>
        {label}
      </p>
      {payload.map((p, i) => (
        <p
          key={i}
          style={{
            color: p.color || CIBC_RED,
            margin: "4px 0 0",
            fontSize: 11,
          }}
        >
          {p.name}: ${fmtNum(p.value)}M
        </p>
      ))}
    </div>
  );
}

// ── MINI TABLE ──
function MiniTable({ data, columns }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}
      >
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th
                key={i}
                style={{
                  padding: "8px 10px",
                  background: CIBC_RED,
                  color: WHITE,
                  fontWeight: 700,
                  textAlign: i === 0 ? "left" : "right",
                  fontSize: 11,
                }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, ri) => (
            <tr
              key={ri}
              style={{ background: ri % 2 === 0 ? WHITE : NEAR_WHITE }}
            >
              {columns.map((c, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: "7px 10px",
                    textAlign: ci === 0 ? "left" : "right",
                    borderBottom: `1px solid ${LIGHT_GRAY}`,
                    color: DARK,
                    fontWeight: ci === 0 ? 600 : 400,
                  }}
                >
                  {c.format ? c.format(row[c.key]) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PAGE COMPONENTS
// ═══════════════════════════════════════════════

function ExecutiveSummary() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 14,
        }}
      >
        <KPI label="Total Revenue" value="$29.1B" trend="+13.8%" sub="FY2025" />
        <KPI label="Net Income" value="$8.5B" trend="+18.2%" sub="FY2025" />
        <KPI label="Diluted EPS" value="$8.57" trend="+17.7%" sub="FY2025" />
        <KPI
          label="Total Assets"
          value="$1.12T"
          trend="+7.2%"
          sub="Oct 31, 2025"
        />
        <KPI label="CET1 Ratio" value="13.3%" trend="0.0%" sub="Basel III" />
        <KPI label="DPS" value="$3.88" trend="+7.8%" sub="FY2025" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <Card title="Revenue Composition (FY2025 vs FY2024)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={LIGHT_GRAY} />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar
                dataKey="Net Interest Income"
                fill={CIBC_RED}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="Non-Interest Income"
                fill={ACCENT_GOLD}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Interest Income Sources">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={incomeBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                dataKey="value"
                paddingAngle={2}
                stroke="none"
              >
                {incomeBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${fmtNum(v)}M`} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Net Income Attributable to Equity Shareholders">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "20px 0",
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: CIBC_RED,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              $8.4B
            </div>
            <div>
              <div style={{ fontSize: 14, color: "#2E7D32", fontWeight: 700 }}>
                +18.5% YoY
              </div>
              <div style={{ fontSize: 12, color: MED_GRAY, marginTop: 4 }}>
                FY2024: $7.1B
              </div>
              <div style={{ fontSize: 12, color: MED_GRAY }}>
                Common shareholders: $8.1B
              </div>
            </div>
          </div>
        </Card>

        <Card title="Efficiency Ratio">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "20px 0",
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: DARK,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              54.4%
            </div>
            <div>
              <div style={{ fontSize: 14, color: "#2E7D32", fontWeight: 700 }}>
                Improved from 56.4%
              </div>
              <div style={{ fontSize: 12, color: MED_GRAY, marginTop: 4 }}>
                NIE: $15.9B / Revenue: $29.1B
              </div>
              <div style={{ fontSize: 12, color: MED_GRAY }}>
                Positive operating leverage
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function IncomeRevenue() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 14,
        }}
      >
        <KPI label="NII" value="$15.8B" trend="+15.1%" small />
        <KPI label="Non-Int. Income" value="$13.4B" trend="+12.2%" small />
        <KPI label="Total NIE" value="$15.9B" trend="+9.8%" small />
        <KPI label="Inc. Before Tax" value="$10.9B" trend="+19.3%" small />
        <KPI label="Eff. Tax Rate" value="22.7%" trend="+0.8pp" small />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Non-Interest Income by Category">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={nonInterestIncome} layout="vertical" barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke={LIGHT_GRAY} />
              <XAxis
                type="number"
                tick={{ fontSize: 10 }}
                tickFormatter={(v) => `$${v}M`}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 10 }}
                width={120}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar
                dataKey="v2025"
                name="2025"
                fill={CIBC_RED}
                radius={[0, 4, 4, 0]}
                barSize={14}
              />
              <Bar
                dataKey="v2024"
                name="2024"
                fill={ACCENT_GOLD}
                radius={[0, 4, 4, 0]}
                barSize={14}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Non-Interest Expenses Breakdown">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={expenseData} layout="vertical" barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke={LIGHT_GRAY} />
              <XAxis
                type="number"
                tick={{ fontSize: 10 }}
                tickFormatter={(v) => `$${v}M`}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 10 }}
                width={110}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar
                dataKey="v2025"
                name="2025"
                fill={CIBC_RED}
                radius={[0, 4, 4, 0]}
                barSize={14}
              />
              <Bar
                dataKey="v2024"
                name="2024"
                fill={MED_GRAY}
                radius={[0, 4, 4, 0]}
                barSize={14}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Income Statement Summary ($M)">
        <MiniTable
          data={[
            {
              item: "Total Interest Income",
              v2025: 48761,
              v2024: 52185,
              chg: pctChange(48761, 52185),
            },
            {
              item: "Total Interest Expense",
              v2025: 32992,
              v2024: 38490,
              chg: pctChange(32992, 38490),
            },
            {
              item: "Net Interest Income",
              v2025: 15769,
              v2024: 13695,
              chg: pctChange(15769, 13695),
            },
            {
              item: "Total Non-Interest Income",
              v2025: 13364,
              v2024: 11911,
              chg: pctChange(13364, 11911),
            },
            {
              item: "Total Revenue",
              v2025: 29133,
              v2024: 25606,
              chg: pctChange(29133, 25606),
            },
            {
              item: "Provision for Credit Losses",
              v2025: 2342,
              v2024: 2001,
              chg: pctChange(2342, 2001),
            },
            {
              item: "Total Non-Interest Expenses",
              v2025: 15852,
              v2024: 14439,
              chg: pctChange(15852, 14439),
            },
            {
              item: "Net Income",
              v2025: 8454,
              v2024: 7154,
              chg: pctChange(8454, 7154),
            },
          ]}
          columns={[
            { header: "Line Item", key: "item" },
            { header: "2025", key: "v2025", format: (v) => `$${fmtNum(v)}` },
            { header: "2024", key: "v2024", format: (v) => `$${fmtNum(v)}` },
            { header: "YoY", key: "chg" },
          ]}
        />
      </Card>
    </div>
  );
}

function BalanceSheetPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 14,
        }}
      >
        <KPI label="Total Assets" value="$1.12T" trend="+7.2%" />
        <KPI label="Total Deposits" value="$808B" trend="+5.7%" />
        <KPI label="Net Loans" value="$590B" trend="+5.6%" />
        <KPI label="Total Equity" value="$64.4B" trend="+9.2%" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Asset Composition ($M)">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={bsAssets}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={100}
                dataKey="value"
                paddingAngle={1}
                stroke="none"
              >
                {bsAssets.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${fmtNum(v)}M`} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Deposit Mix ($M)">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={depositMix}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={100}
                dataKey="value"
                paddingAngle={1}
                stroke="none"
              >
                {depositMix.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${fmtNum(v)}M`} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Balance Sheet Summary ($M)">
        <MiniTable
          data={[
            {
              item: "Cash & Deposits with Banks",
              v2025: 44003,
              v2024: 48064,
              chg: pctChange(44003, 48064),
            },
            {
              item: "Securities",
              v2025: 283235,
              v2024: 254345,
              chg: pctChange(283235, 254345),
            },
            {
              item: "Net Loans",
              v2025: 589504,
              v2024: 558292,
              chg: pctChange(589504, 558292),
            },
            {
              item: "Derivative Instruments (Assets)",
              v2025: 38352,
              v2024: 36435,
              chg: pctChange(38352, 36435),
            },
            {
              item: "Goodwill & Intangibles",
              v2025: 8369,
              v2024: 8273,
              chg: pctChange(8369, 8273),
            },
            {
              item: "Total Assets",
              v2025: 1116938,
              v2024: 1041985,
              chg: pctChange(1116938, 1041985),
            },
            {
              item: "Total Deposits",
              v2025: 808124,
              v2024: 764857,
              chg: pctChange(808124, 764857),
            },
            {
              item: "Total Liabilities",
              v2025: 1052525,
              v2024: 982978,
              chg: pctChange(1052525, 982978),
            },
            {
              item: "Total Equity",
              v2025: 64413,
              v2024: 59007,
              chg: pctChange(64413, 59007),
            },
          ]}
          columns={[
            { header: "Line Item", key: "item" },
            { header: "2025", key: "v2025", format: (v) => `$${fmtNum(v)}` },
            { header: "2024", key: "v2024", format: (v) => `$${fmtNum(v)}` },
            { header: "YoY", key: "chg" },
          ]}
        />
      </Card>
    </div>
  );
}

function LoansCredit() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 14,
        }}
      >
        <KPI label="Gross Loans" value="$593.9B" trend="+5.6%" />
        <KPI label="Total ACL" value="$4.4B" trend="+12.1%" />
        <KPI label="PCL" value="$2.3B" trend="+17.0%" />
        <KPI label="ACL / Gross Loans" value="0.74%" sub="stable" />
        <KPI label="Stage 3 Impaired" value="$3.6B" trend="+29.6%" />
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}
      >
        <Card title="Loan Portfolio by Type & Stage ($M)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loanPortfolio} barGap={1}>
              <CartesianGrid strokeDasharray="3 3" stroke={LIGHT_GRAY} />
              <XAxis dataKey="type" tick={{ fontSize: 10 }} />
              <YAxis
                tick={{ fontSize: 10 }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}B`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar
                dataKey="stage1"
                name="Stage 1"
                stackId="a"
                fill={CIBC_RED}
              />
              <Bar
                dataKey="stage2"
                name="Stage 2"
                stackId="a"
                fill={ACCENT_GOLD}
              />
              <Bar dataKey="stage3" name="Stage 3" stackId="a" fill={DARK} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Allowance for Credit Losses by Loan Type">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={loanPortfolio.map((l) => ({
                  name: l.type,
                  value: l.acl,
                }))}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={90}
                dataKey="value"
                paddingAngle={2}
                stroke="none"
              >
                {loanPortfolio.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${fmtNum(v)}M`} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Loan Portfolio Detail ($M)">
        <MiniTable
          data={loanPortfolio}
          columns={[
            { header: "Loan Type", key: "type" },
            { header: "Gross", key: "gross", format: (v) => `$${fmtNum(v)}` },
            {
              header: "Stage 1",
              key: "stage1",
              format: (v) => `$${fmtNum(v)}`,
            },
            {
              header: "Stage 2",
              key: "stage2",
              format: (v) => `$${fmtNum(v)}`,
            },
            { header: "Stage 3", key: "stage3", format: (v) => fmtNum(v) },
            { header: "ACL", key: "acl", format: (v) => `$${fmtNum(v)}` },
          ]}
        />
      </Card>
    </div>
  );
}

function SegmentsGeo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Revenue by Segment ($M)">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={segmentRevenue2025}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={105}
                dataKey="value"
                paddingAngle={2}
                stroke="none"
              >
                {segmentRevenue2025.map((s, i) => (
                  <Cell key={i} fill={s.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${fmtNum(v)}M`} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Segment Revenue: 2025 vs 2024">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={segCompare} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke={LIGHT_GRAY} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis
                tick={{ fontSize: 10 }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar
                dataKey="rev2025"
                name="Revenue 2025"
                fill={CIBC_RED}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="rev2024"
                name="Revenue 2024"
                fill={MED_GRAY}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Net Income by Segment: 2025 vs 2024">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={segCompare} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke={LIGHT_GRAY} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${v}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar
                dataKey="ni2025"
                name="NI 2025"
                fill={CIBC_RED}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="ni2024"
                name="NI 2024"
                fill={ACCENT_GOLD}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Geographic Revenue Distribution ($M)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={geoData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={LIGHT_GRAY} />
              <XAxis
                type="number"
                tick={{ fontSize: 10 }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(1)}B`}
              />
              <YAxis
                dataKey="region"
                type="category"
                tick={{ fontSize: 11 }}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill={CIBC_RED}
                radius={[0, 6, 6, 0]}
                barSize={20}
              />
              <Bar
                dataKey="ni"
                name="Net Income"
                fill={ACCENT_GOLD}
                radius={[0, 6, 6, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function CapitalRatios() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card title="Capital Ratios vs. Regulatory Minimums">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "10px 0 20px",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {capitalGauges.map((g, i) => (
            <Gauge key={i} {...g} />
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Capital Composition ($M)">
          <MiniTable
            data={[
              {
                item: "CET1 Capital",
                v2025: 47718,
                v2024: 44516,
                chg: pctChange(47718, 44516),
              },
              {
                item: "Tier 1 Capital",
                v2025: 54105,
                v2024: 49481,
                chg: pctChange(54105, 49481),
              },
              {
                item: "Total Capital",
                v2025: 62287,
                v2024: 56809,
                chg: pctChange(62287, 56809),
              },
              {
                item: "Total RWA",
                v2025: 357803,
                v2024: 333502,
                chg: pctChange(357803, 333502),
              },
              {
                item: "TLAC Available",
                v2025: 114102,
                v2024: 101062,
                chg: pctChange(114102, 101062),
              },
            ]}
            columns={[
              { header: "Component", key: "item" },
              { header: "2025", key: "v2025", format: (v) => `$${fmtNum(v)}` },
              { header: "2024", key: "v2024", format: (v) => `$${fmtNum(v)}` },
              { header: "YoY", key: "chg" },
            ]}
          />
        </Card>

        <Card title="Regulatory Ratios">
          <MiniTable
            data={[
              {
                item: "CET1 Ratio",
                v2025: "13.3%",
                v2024: "13.3%",
                min: "11.5%",
                buffer: "+1.8pp",
              },
              {
                item: "Tier 1 Capital Ratio",
                v2025: "15.1%",
                v2024: "14.8%",
                min: "13.0%",
                buffer: "+2.1pp",
              },
              {
                item: "Total Capital Ratio",
                v2025: "17.4%",
                v2024: "17.0%",
                min: "15.0%",
                buffer: "+2.4pp",
              },
              {
                item: "Leverage Ratio",
                v2025: "4.3%",
                v2024: "4.3%",
                min: "3.5%",
                buffer: "+0.8pp",
              },
              {
                item: "TLAC Ratio",
                v2025: "31.9%",
                v2024: "30.3%",
                min: "25.0%",
                buffer: "+6.9pp",
              },
              {
                item: "TLAC Leverage Ratio",
                v2025: "9.0%",
                v2024: "8.7%",
                min: "7.25%",
                buffer: "+1.8pp",
              },
            ]}
            columns={[
              { header: "Ratio", key: "item" },
              { header: "2025", key: "v2025" },
              { header: "2024", key: "v2024" },
              { header: "Min", key: "min" },
              { header: "Buffer", key: "buffer" },
            ]}
          />
        </Card>
      </div>

      <Card title="Equity Summary ($M)">
        <MiniTable
          data={[
            {
              item: "Preferred Shares & Other Equity",
              v2025: 6369,
              v2024: 4946,
              chg: pctChange(6369, 4946),
            },
            {
              item: "Common Shares",
              v2025: 16845,
              v2024: 17011,
              chg: pctChange(16845, 17011),
            },
            {
              item: "Retained Earnings",
              v2025: 36471,
              v2024: 33471,
              chg: pctChange(36471, 33471),
            },
            {
              item: "AOCI",
              v2025: 4218,
              v2024: 3148,
              chg: pctChange(4218, 3148),
            },
            {
              item: "Total Shareholders' Equity",
              v2025: 64129,
              v2024: 58735,
              chg: pctChange(64129, 58735),
            },
            {
              item: "Non-controlling Interests",
              v2025: 284,
              v2024: 272,
              chg: pctChange(284, 272),
            },
            {
              item: "Total Equity",
              v2025: 64413,
              v2024: 59007,
              chg: pctChange(64413, 59007),
            },
          ]}
          columns={[
            { header: "Component", key: "item" },
            { header: "2025", key: "v2025", format: (v) => `$${fmtNum(v)}` },
            { header: "2024", key: "v2024", format: (v) => `$${fmtNum(v)}` },
            { header: "YoY", key: "chg" },
          ]}
        />
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function App() {
  const [activePage, setActivePage] = useState(0);

  const renderPage = () => {
    switch (activePage) {
      case 0:
        return <ExecutiveSummary />;
      case 1:
        return <IncomeRevenue />;
      case 2:
        return <BalanceSheetPage />;
      case 3:
        return <LoansCredit />;
      case 4:
        return <SegmentsGeo />;
      case 5:
        return <CapitalRatios />;
      default:
        return <ExecutiveSummary />;
    }
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: NEAR_WHITE,
        minHeight: "100vh",
        color: DARK,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          background: `linear-gradient(135deg, ${CIBC_RED} 0%, ${CIBC_DARK} 100%)`,
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 38,
              height: 38,
              background: WHITE,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              color: CIBC_RED,
              fontSize: 14,
              letterSpacing: 1,
            }}
          >
            CIBC
          </div>
          <div>
            <div
              style={{
                color: WHITE,
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 0.5,
              }}
            >
              CIBC Financial Dashboard
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
              Fiscal Year 2025 | Consolidated Financial Statements | IFRS
            </div>
          </div>
        </div>

        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>
          Source: CIBC 2025 Annual Report | As at October 31, 2025
        </div>
      </div>

      <div
        style={{
          background: WHITE,
          borderBottom: `2px solid ${LIGHT_GRAY}`,
          padding: "0 28px",
          display: "flex",
          gap: 0,
          overflowX: "auto",
        }}
      >
        {pages.map((p, i) => (
          <button
            key={i}
            onClick={() => setActivePage(i)}
            style={{
              padding: "12px 20px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: activePage === i ? 700 : 500,
              color: activePage === i ? CIBC_RED : MED_GRAY,
              borderBottom:
                activePage === i
                  ? `3px solid ${CIBC_RED}`
                  : "3px solid transparent",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 28px", maxWidth: 1200, margin: "0 auto" }}>
        {renderPage()}
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "20px 0 30px",
          color: MED_GRAY,
          fontSize: 10,
        }}
      >
        Canadian Imperial Bank of Commerce | FY2025 Consolidated Financial
        Statements | All amounts in CAD millions unless otherwise stated
      </div>
    </div>
  );
}
