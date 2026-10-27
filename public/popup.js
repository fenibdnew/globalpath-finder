// GlobalPath Finder Chrome Extension Runtime Engine
// Timeline Anchor: Tuesday, October 27, 2026
// Created by the Visionary Developer, ARIFUZZAMAN, from East Bijoy Singh, Feni, Bangladesh

document.addEventListener('DOMContentLoaded', function () {
  const syncStatusEl = document.getElementById('sync-status');
  const liveDateEl = document.getElementById('live-timeline-date');
  const velocityTrendTagEl = document.getElementById('velocity-trend-tag');
  const btnRefreshEl = document.getElementById('btn-refresh-feed');

  // Route price elements
  const priceFraEl = document.getElementById('price-fra');
  const priceFcoEl = document.getElementById('price-fco');
  const priceMadEl = document.getElementById('price-mad');
  const badgeFraEl = document.getElementById('badge-fra');
  const badgeFcoEl = document.getElementById('badge-fco');
  const badgeMadEl = document.getElementById('badge-mad');

  // Employers & Visas containers
  const sessionalVisasContainer = document.getElementById('sessional-visas-container');
  const verifiedEmployersContainer = document.getElementById('verified-employers-container');

  // Simulated live automated backend stream
  const liveEngineData = {
    system_timestamp: "2026-10-27T17:07:00Z",
    current_date: "Tuesday, October 27, 2026",
    live_ticket_price_ticker: {
      headline: "LIVE AIRFARE VELOCITY INDEX",
      trends: {
        minute_by_minute_trend: "VOLATILE_UPWARD",
        hourly_projection: "Expected minor drop in next 2 hours",
        daily_recommendation: "HOLD_FOR_DROP"
      },
      routes: [
        { code: "DAC ⇄ FRA", carrier: "Qatar / Turkish", price: 720, change: -18, recommendation: "BUY_NOW" },
        { code: "DAC ⇄ FCO", carrier: "Emirates / Saudia", price: 860, change: 8, recommendation: "HOLD" },
        { code: "DAC ⇄ MAD", carrier: "Gulf Air / Qatar", price: 685, change: -22, recommendation: "STRONG_BUY" }
      ]
    },
    global_recruitment_hub: {
      active_seasonal_visas: [
        "🌾 Agriculture Quota (Italy/Spain 2026/27)",
        "🏨 Hospitality Drivers (Romania Accelerated)",
        "🏗️ Construction Schemes (Croatia Q4 Intake)",
        "⚡ Germany Chancenkarte Opportunity Card",
        "💻 Portugal Tech Talent Path"
      ],
      verified_employer_listings: [
        {
          company_name: "EuroStaff Solutions Ltd.",
          industry_sector: "Hospitality & Agriculture",
          location: "Bucharest, Romania",
          verified_contact_email: "recruitment@eurostaff-solutions.eu",
          official_career_apply_url: "https://eurostaff-solutions.eu"
        },
        {
          company_name: "TransBaltic Logistics Sp. z o.o.",
          industry_sector: "Transport & Heavy Logistics",
          location: "Poznań, Poland",
          verified_contact_email: "careers@transbaltic-logistics.pl",
          official_career_apply_url: "https://transbaltic-logistics.pl"
        },
        {
          company_name: "Adria Hospitality Group d.d.",
          industry_sector: "Hospitality & Seasonal Gastronomy",
          location: "Dubrovnik, Croatia",
          verified_contact_email: "hr@adria-hospitality.hr",
          official_career_apply_url: "https://adria-hospitality.hr"
        }
      ]
    }
  };

  // Inject or update data dynamically
  function renderLiveFeed(data) {
    if (liveDateEl) {
      liveDateEl.innerText = data.current_date;
    }

    if (velocityTrendTagEl && data.live_ticket_price_ticker?.trends) {
      velocityTrendTagEl.innerText = data.live_ticket_price_ticker.trends.minute_by_minute_trend;
    }

    // Dynamic price velocity micro-fluctuation simulation
    if (priceFraEl) priceFraEl.innerText = `$${710 + Math.floor(Math.random() * 25)}`;
    if (priceFcoEl) priceFcoEl.innerText = `$${850 + Math.floor(Math.random() * 30)}`;
    if (priceMadEl) priceMadEl.innerText = `$${675 + Math.floor(Math.random() * 20)}`;

    // Render Sessional Visas
    if (sessionalVisasContainer && data.global_recruitment_hub?.active_seasonal_visas) {
      sessionalVisasContainer.innerHTML = data.global_recruitment_hub.active_seasonal_visas
        .map(v => `<span class="visa-chip">${v}</span>`)
        .join('');
    }

    // Render Verified Employers
    if (verifiedEmployersContainer && data.global_recruitment_hub?.verified_employer_listings) {
      verifiedEmployersContainer.innerHTML = data.global_recruitment_hub.verified_employer_listings
        .map(emp => `
          <div class="job-item">
            <div class="job-title">${emp.company_name}</div>
            <div class="job-company">Industry: ${emp.industry_sector} • ${emp.location}</div>
            <div class="job-contact">
              Email: <a href="mailto:${emp.verified_contact_email}">${emp.verified_contact_email}</a> • 
              <a href="${emp.official_career_apply_url}" target="_blank" rel="noreferrer">Apply Portal</a>
            </div>
          </div>
        `).join('');
    }
  }

  // Simulated background fetch workflow on load
  function simulateBackgroundSync() {
    if (syncStatusEl) {
      syncStatusEl.innerText = "FETCHING...";
    }

    setTimeout(() => {
      renderLiveFeed(liveEngineData);
      if (syncStatusEl) {
        syncStatusEl.innerText = "LIVE SYNC";
      }
    }, 400);
  }

  // Initial fetch
  simulateBackgroundSync();

  // Manual refresh button listener
  if (btnRefreshEl) {
    btnRefreshEl.addEventListener('click', function () {
      btnRefreshEl.innerText = "Syncing...";
      if (syncStatusEl) syncStatusEl.innerText = "REFRESHING...";

      setTimeout(() => {
        simulateBackgroundSync();
        btnRefreshEl.innerText = "🔄 Refresh Feed";
      }, 500);
    });
  }
});
