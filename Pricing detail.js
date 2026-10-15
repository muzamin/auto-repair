/**
 * VOLTERRA Auto Electrical - Pricing Details Logic (Pricing detail.js)
 * Implements:
 * - 3 Complete Dedicated Pricing Packages with Rich Engineering Specs & Telemetry
 * - Dynamic URL Query Parameter Routing (?id=1 to ?id=3 or ?package=slug)
 * - In-Page Switcher Toolbar with PushState Navigation
 * - Detailed Deliverables, Itemized Costs, Protocols, Comparison Matrix & FAQs
 * - Theme Switcher (Dark & Light Mode) with Local Storage Persistence
 * - RTL / LTR Toggle with Indicator Sync
 * - Interactive Booking Modal with Pre-Filled Package Name & Rate
 * - Notification Toast alerts
 */

// 1. Comprehensive Master Database for 3 Specialized Pricing Packages
const PRICING_PACKAGES_DATA = {
  1: {
    id: 1,
    slug: 'battery-health-check',
    shortName: 'Battery Health Check',
    category: 'Preventive Care',
    badge: 'Standard Preventive Care &bull; Zero Guesswork',
    title: 'Precision Battery Health &amp; Conductance Check',
    image: 'assets/images/pricing_detail_1_conductance.jpg',
    paratext: 'Surgical conductance state-of-health profiling, Cold Cranking Amps (CCA) capacity sweep, alternator charging ripple evaluation, and terminal contact resistance check to prevent unexpected roadside failure.',
    priceVal: '$49',
    pricePrefix: 'Starting from',
    priceSuffix: 'flat rate',
    estTime: '20–30 Mins',
    warranty: 'Written Diagnostic Report Included',
    rating: '4.98 / 5.0 (340+ Verified Tests)',
    telemetry: {
      title: 'MIDTRONICS CONDUCTANCE LAB',
      status: 'CALIBRATED &bull; ACTIVE',
      rows: [
        { key: 'Rated Capacity', val: '750 CCA (SAE/EN)', gold: false },
        { key: 'Measured Cold Amps', val: '712 CCA Normal', gold: true },
        { key: 'Internal Cell Resistance', val: '3.82 mΩ Optimal', gold: false },
        { key: 'State of Health (SOH)', val: '95% Road Ready', gold: true }
      ]
    },
    context: {
      lead: 'Modern automotive batteries endure intense continuous electrical demands from stop-start engines, infotainment systems, and advanced driver assistance sensors. Traditional voltmeter checks only show surface voltage, masking internal sulfation and cell degradation that cause sudden starting failures.',
      body: 'At VOLTERRA, we connect digital conductance analyzers that pass high-frequency AC signals through the battery cell plates. This enables our technicians to measure internal plate resistance and real Cold Cranking Amps without generating heat or draining your battery. Every test concludes with an itemized digital health sheet.',
      deliverables: [
        {
          title: 'Full Conductance State-of-Health Sweep',
          desc: 'High-frequency AC conductance test measuring true Cold Cranking Amps (CCA) against factory specifications.',
          icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'
        },
        {
          title: 'Starter Cranking Voltage Drop Profiling',
          desc: 'Real-time oscilloscope capture of voltage droop during starter motor engagement to ensure adequate cranking margin.',
          icon: 'M22 12h-4l-3 9L9 3l-3 9H2'
        },
        {
          title: 'Alternator Charging Voltage & Ripple Analysis',
          desc: 'Evaluates diode rectification under full electrical load (headlights, AC, defrost) to verify cell preservation.',
          icon: 'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4'
        },
        {
          title: 'Terminal De-Oxidation & Protective Sealing',
          desc: 'Physical post cleaning, wire brushing, and application of a dielectric petroleum-free anti-corrosion barrier.',
          icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
        }
      ],
      equipment: ['Midtronics MDX-650P Conductance Analyzer', 'PicoScope 4425A 4-Channel', 'Bosch BAT 131 Battery Tester', 'FLIR E8-XT Thermal Imager']
    },
    itemization: [
      { item: 'Digital Battery Conductance & CCA Measurement', desc: 'Internal plate resistance, cell reserve capacity & state of charge test', rate: '$25.00' },
      { item: 'Cranking Voltage Drop & Starter Amperage Capture', desc: 'In-vehicle loaded transient voltage drop logging', rate: '$14.00' },
      { item: 'Alternator Diode Ripple & Ground Voltage Drop Audit', desc: 'Alternator diode AC ripple sweep under maximum accessory load', rate: '$10.00' },
      { item: 'Terminal De-Oxidation & Protective Barrier Treatment', desc: 'Complimentary terminal wire brush clean & protective sealant', rate: 'Included' }
    ],
    totalRate: '$49.00',
    comparison: [
      { criteria: 'Testing Methodology', generic: 'Handheld handheld voltmeter (surface charge only)', volterra: 'High-frequency digital conductance & internal resistance sweep' },
      { criteria: 'Under-Load Evaluation', generic: 'None (tested engine off only)', volterra: 'Simultaneous starter draw & alternator diode ripple capture' },
      { criteria: 'Documentation', generic: 'Vague verbal summary: "Battery looks fine"', volterra: 'Certified printed digital diagnostic score sheet with CCA metrics' },
      { criteria: 'Diagnostic Fee Offset', generic: 'No offset if battery replacement is needed', volterra: '100% of the $49 fee credited toward any battery replacement package' }
    ],
    protocol: [
      { num: '01', title: 'Surface Dissipation', desc: 'Headlights are illuminated for 60 seconds to eliminate surface charge before testing.' },
      { num: '02', title: 'Conductance Test', desc: 'Micro-amperage AC signal measures plate sulfation and exact Cold Cranking Amps capacity.' },
      { num: '03', title: 'Cranking & Ripple', desc: 'Engine cranked to log voltage drop curve and alternator AC ripple voltage.' },
      { num: '04', title: 'Telemetry Printout', desc: 'Technician explains printed test score and recommendations before releasing the vehicle.' }
    ],
    symptoms: [
      { title: 'Sluggish Engine Crank', desc: 'Noticeable delay or slow turning when starting after overnight parking.' },
      { title: 'Dimming Cabin Lights', desc: 'Headlights or dash illumination dim noticeably when engine is idling.' },
      { title: 'Battery Warning Symbol', desc: 'Battery light or "Stop Vehicle Immediately" alert appearing on instrument cluster.' },
      { title: 'Old Battery Age (>3 Yrs)', desc: 'Battery has been in service for over 36 months without verified testing.' }
    ],
    faqs: [
      { q: 'Can a battery show 12.6 volts but still fail to start the vehicle?', a: 'Yes. Volts measure electrical pressure, not current-delivery capacity. A sulfated battery can show 12.6V resting voltage but instantly plummet to below 8V when the starter demands 300 amps.' },
      { q: 'Will this test tell me if my alternator or starter is at fault instead?', a: 'Absolutely. Our test evaluates the entire starting-charging loop. If your alternator diodes are leaking AC voltage or the starter draws excessive current, we isolate the exact issue.' },
      { q: 'If I need a new battery, is the $49 fee waived?', a: 'Yes. If your test indicates the battery must be replaced and you choose VOLTERRA for installation, 100% of this $49 inspection fee is credited toward the replacement package.' },
      { q: 'How long does this health check take to complete?', a: 'Typically between 20 and 30 minutes. You can relax in our customer lounge with fresh espresso while our master technicians run the telemetry.' }
    ]
  },

  2: {
    id: 2,
    slug: 'battery-replacement-bms',
    shortName: 'Battery Replacement & BMS',
    category: 'Installation & Coding',
    badge: 'Most Popular Choice &bull; OEM Dealer-Grade',
    title: 'OEM Battery Replacement &amp; BMS Registration',
    image: 'assets/images/pricing_detail_2_oem.jpg',
    paratext: 'Precision AGM/EFB battery fitting with uninterrupted OBD2 memory protection, terminal de-oxidation, and computerized Battery Management System (BMS) digital adaptation to prevent premature cell failure.',
    priceVal: '$139',
    pricePrefix: 'Labor starting from',
    priceSuffix: '+ Battery Unit',
    estTime: '45–60 Mins',
    warranty: 'Up to 36-Month Nationwide Free Replacement',
    rating: '4.99 / 5.0 (620+ Installations)',
    telemetry: {
      title: 'BMS ADAPTATION PROTOCOL',
      status: 'CODING SYNCHRONIZED',
      rows: [
        { key: 'Chemistry / Group', val: 'AGM H8 / Group 49', gold: false },
        { key: 'Capacity Parameter', val: '92 Ah / 850 CCA', gold: true },
        { key: 'BMS Counter Reset', val: 'Cycle 0 Reset Valid', gold: true },
        { key: 'Charging Map', val: 'Dynamic 14.4V Profile', gold: false }
      ]
    },
    context: {
      lead: 'In contemporary European, Asian, and American vehicles, swapping a battery is no longer a simple mechanical task. Intelligent alternators constantly adjust their charging rate based on the battery age stored in the vehicle ECU.',
      body: 'If a new battery is installed without registering it via OBD2 dealer software, the vehicle alternator continues to blast the new unit with high voltage meant for an old, degraded battery—destroying the fresh battery in as little as 6 to 12 months. VOLTERRA utilizes factory diagnostic terminals to register the new serial number, capacity, and chemistry into your vehicle computer.',
      deliverables: [
        {
          title: 'Uninterrupted OBD2 Memory Saver Support',
          desc: 'Maintains 12.8V regulated voltage to all vehicle control modules to prevent radio lockouts, clock loss, or sensor calibration wipe.',
          icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'
        },
        {
          title: 'Dealer-Level BMS Re-Registration & Reset',
          desc: 'Electronic calibration of battery capacity (Ah), chemistry (AGM/EFB), and internal resistance map in the Body Control Module.',
          icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z'
        },
        {
          title: 'Precision Battery Hold-Down & Tray Refurbishment',
          desc: 'Secure mechanical mounting, tray de-greasing, and replacement of corroded bracket hardware to eliminate vibration wear.',
          icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
        },
        {
          title: 'Complimentary Eco-Certified Battery Recycling',
          desc: 'Safe, environmentally documented disposal and full acid reclamation of your retired battery unit.',
          icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
        }
      ],
      equipment: ['Autel MaxiSys Ultra OEM Programmer', 'Bosch KTS 590 Master Diagnostics', 'Midtronics Memory Saver Regulated Power Supply', 'Torque-Calibrated Terminal Wrenches']
    },
    itemization: [
      { item: 'Certified Installation Labor & Secure Mounting', desc: 'Safe removal of old battery, tray cleaning & precision torque re-installation', rate: '$75.00' },
      { item: 'OBD2 Computerized Memory-Saver Regulated Power', desc: 'Maintains active 12V bus to preserve ECU calibrations, memory & radio codes', rate: '$25.00' },
      { item: 'Dealer-Level BMS Registration & ECU Variant Adaptation', desc: 'Diagnostic registration of new battery serial, chemistry & capacity into BCM', rate: '$39.00' },
      { item: 'Terminal Anti-Oxidation & Battery Recycling Fee', desc: 'Protective post sealant & certified environmental battery recycling', rate: 'Included' }
    ],
    totalRate: '$139.00 + Battery Unit',
    comparison: [
      { criteria: 'Memory Protection', generic: 'Battery disconnected abruptly (wipes clock, radio, steering adapt)', volterra: 'OBD2 continuous regulated power maintains every electronic parameter' },
      { criteria: 'BMS Computer Registration', generic: 'Ignored or omitted (leads to battery overcharging & premature failure)', volterra: 'Full dealer-grade BMS reset ensuring optimal alternator charge curves' },
      { criteria: 'Battery Hardware & Torque', generic: 'Hand-tightened with pliers, risking cracked battery posts', volterra: 'Torque-wrench tightened to exact manufacturer Newton-meter specs' },
      { criteria: 'Warranty Terms', generic: 'Pro-rated dealer warranty with complicated paperwork', volterra: 'Full up to 36-Month Free Nationwide Replacement Warranty' }
    ],
    protocol: [
      { num: '01', title: 'Memory Saver Sync', desc: 'Connect regulated clean power supply to OBD2 port to preserve all ECU adaptations.' },
      { num: '02', title: 'Extraction & Clean', desc: 'Safely remove degraded unit, vacuum debris, and de-oxidize battery tray and cable terminals.' },
      { num: '03', title: 'Torqued Install', desc: 'Position new AGM/EFB battery and torque terminals to OEM spec using calibrated tools.' },
      { num: '04', title: 'BMS Digital Reset', desc: 'Connect factory scanner to register serial, capacity, and reset the charging duty cycle.' }
    ],
    symptoms: [
      { title: 'Dead Battery Repeatedly', desc: 'Vehicle requires jump-starts frequently even after being driven for hours.' },
      { title: 'Start-Stop System Disabled', desc: 'Auto start-stop function no longer activates due to low battery reserve capacity.' },
      { title: 'Swollen or Leaking Case', desc: 'Physical bulging or sulfur smell indicating internal short or thermal runaway.' },
      { title: 'Electronic Glitches', desc: 'Random instrument warnings, power window loss, or navigation restarts on startup.' }
    ],
    faqs: [
      { q: 'Why is BMS registration required on modern vehicles?', a: 'Modern vehicles adjust alternator output based on battery age and degradation. If an alternator treats a brand-new battery like an old one, it will overcharge and destroy the battery within months.' },
      { q: 'How much does the actual battery unit cost?', a: 'Battery costs vary by capacity and chemistry (AGM vs Standard Flooded), typically ranging from $180 to $340 for premium VARTA, Bosch, or OEM units. We provide transparent upfront part pricing.' },
      { q: 'Will I lose my custom radio presets and vehicle settings?', a: 'No. Our regulated OBD2 memory saver maintains active power to all vehicle modules throughout the replacement, preserving every preset, seat memory, and throttle adaptation.' },
      { q: 'Do you offer mobile or same-day battery replacement?', a: 'Yes. We stock over 40 distinct battery sizes in our workshop and provide same-day turnaround in under 60 minutes.' }
    ]
  },

  3: {
    id: 3,
    slug: 'ecu-canbus-diagnostics',
    shortName: 'ECU & CAN-Bus Diagnostics',
    category: 'Digital Micro-Circuits',
    badge: 'Tier 03 &bull; Master Diagnostic Lab &bull; OEM Scanners',
    title: 'Computerized ECU &amp; CAN-Bus Diagnostics',
    image: 'assets/images/pricing_detail_5_ecu.jpg',
    paratext: '4-Channel digital oscilloscope testing, parasitic battery drain tracing down to <15mA, high-speed CAN packet integrity analysis, and dealer-level DTC fault isolation.',
    priceVal: '$149',
    pricePrefix: 'Starting from',
    priceSuffix: '/ diagnosis',
    estTime: '60–90 Mins',
    warranty: 'Guaranteed Root-Cause Pinpoint',
    rating: '5.0 / 5.0 (490+ Network Diagnoses)',
    telemetry: {
      title: 'CAN-BUS DIGITAL TELEMETRY',
      status: 'CAN-H / CAN-L SYNCHRONIZED',
      rows: [
        { key: 'CAN-High Signal', val: '3.52 V Clean Wave', gold: true },
        { key: 'CAN-Low Signal', val: '1.48 V Clean Wave', gold: true },
        { key: 'Bus Resistance', val: '60.2 Ω Dual Termination', gold: false },
        { key: 'Parasitic Sleep Drain', val: '12 mA Healthy', gold: true }
      ]
    },
    context: {
      lead: 'Modern vehicles are essentially complex local area networks on wheels, containing over 70 Electronic Control Units communicating across CAN-High, CAN-Low, LIN-Bus, and Ethernet networks.',
      body: 'When a generic scanner shows dozens of unrelated trouble codes, untrained mechanics start swapping sensors blindly. VOLTERRA connects directly to the digital network physical layer with 4-channel PicoScopes, capturing microsecond signal collisions, broken twisted pairs, terminal pin fretting, and phantom battery parasitic drains without guessing.',
      deliverables: [
        {
          title: 'Full Vehicle Module Topology Scan',
          desc: 'OEM dealer-level interrogation of all modules (PCM, TCM, BCM, ABS, SRS) to map active and historical fault codes.',
          icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z'
        },
        {
          title: '4-Channel Oscilloscope Physical Layer Capture',
          desc: 'Microsecond signal decoding of CAN-H and CAN-L waveforms to identify bus grounding, short-to-power, and termination faults.',
          icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'
        },
        {
          title: 'Parasitic Battery Drain Isolation (<15mA Target)',
          desc: 'Thermal camera and millivolt fuse drop tracing to find which module refuses to go to sleep and drains the battery overnight.',
          icon: 'M22 12h-4l-3 9L9 3l-3 9H2'
        },
        {
          title: 'OEM Variant Coding & Sensor Calibration Verification',
          desc: 'Factory adaptation test for steering angle sensors, throttle bodies, and Body Control Module parameters.',
          icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
        }
      ],
      equipment: ['PicoScope 4425A 4-Channel Automotive Oscilloscope', 'Autel MaxiSys Ultra OEM Topologist', 'Bosch KTS 590 Master Diagnostics', 'FLIR E8-XT High-Resolution Thermal Camera']
    },
    itemization: [
      { item: 'Full Network Topology Diagnostic Sweep (All Control Units)', desc: 'Interrogates over 50+ onboard ECUs, logs freeze-frame data and active fault paths', rate: '$55.00' },
      { item: '4-Channel Oscilloscope Digital Bus Waveform Analysis', desc: 'Direct bus voltage probe verifying signal timing, baud rates and wave integrity', rate: '$50.00' },
      { item: 'Parasitic Sleep Mode Battery Drain Thermal Isolation', desc: 'Millivolt fuse drop logging and FLIR thermal scan to pinpoint wake-up circuits', rate: '$44.00' },
      { item: 'Certified Root-Cause Diagnostic Report & Repair Map', desc: 'Guaranteed pinpoint diagnosis with photos, waveform proof and parts quote', rate: 'Included' }
    ],
    totalRate: '$149.00',
    comparison: [
      { criteria: 'Diagnostic Scanner', generic: 'Handheld $50 OBD2 code reader', volterra: 'Dealer-level OEM diagnostic topologies (BMW ISTA, Mercedes Xentry, VAG ODIS)' },
      { criteria: 'Network Testing', generic: 'Reads static trouble codes only', volterra: 'Live 4-channel oscilloscope physical layer waveform decoding' },
      { criteria: 'Parasitic Drain Method', generic: 'Pulls random fuses (which wakes up sleeping modules)', volterra: 'Non-intrusive millivolt fuse drop tests & thermal imaging' },
      { criteria: 'Success Guarantee', generic: 'No guarantee; customer pays for swapped parts', volterra: '100% Guaranteed root-cause identification before repairs' }
    ],
    protocol: [
      { num: '01', title: 'Topology Sweep', desc: 'Scan all vehicle networks to map communicating modules and active/historical DTC fault codes.' },
      { num: '02', title: 'Oscilloscope Probing', desc: 'Hook PicoScope channels to CAN-High and CAN-Low twisted pairs to analyze differential signals.' },
      { num: '03', title: 'Thermal & Current Test', desc: 'Monitor vehicle sleep state with mA clamp and FLIR thermal camera to isolate parasitic drain.' },
      { num: '04', title: 'Verified Action Plan', desc: 'Technician presents visual proof of fault and exact component-level repair estimate.' }
    ],
    symptoms: [
      { title: 'Battery Dies Overnight', desc: 'Vehicle starts fine if driven daily, but goes dead after sitting parked for 24–48 hours.' },
      { title: 'Cluster Christmas Tree Effect', desc: 'ABS, Traction Control, Airbag, and Check Engine lights turn on simultaneously.' },
      { title: 'Intermittent Limp Mode', desc: 'Vehicle suddenly loses throttle response or shifts harshly without mechanical cause.' },
      { title: 'Keyless Entry / Infotainment Freezing', desc: 'Screen goes blank or remote key fob fails to unlock vehicle intermittently.' }
    ],
    faqs: [
      { q: 'What is a parasitic battery drain, and how do you find it?', a: 'A parasitic drain occurs when a module (like an amplifier, door controller, or navigation unit) fails to enter sleep mode, drawing current continuously. We use thermal cameras and millivolt fuse tests to isolate the draw without resetting the vehicle.' },
      { q: 'Why is an oscilloscope necessary for diagnosing electrical issues?', a: 'Scan tools only display what the computer thinks is happening. An oscilloscope displays what is physically occurring on the wire, revealing voltage spikes, ground drop glitches, and CAN-Bus packet collisions.' },
      { q: 'Do you work on luxury European models like BMW, Audi, and Mercedes?', a: 'Yes. Our shop has factory diagnostic software including Mercedes Xentry, BMW ISTA, Audi/VW ODIS, and Porsche PIWIS, allowing dealer-level variant coding and module adaptation.' },
      { q: 'Is the $149 fee credited toward the repair if I approve the work?', a: 'Yes. 50% to 100% of your diagnostic fee is directly credited toward the final invoice when you approve the repair work with our workshop.' }
    ]
  }
};

// 2. Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initMobileNavigation();
  initPricingDetailRouter();
  initModals();
  initToast();
});

/* ==========================================================================
   3. Dynamic Router & Rendering Engine
   ========================================================================== */
function initPricingDetailRouter() {
  renderSwitcherPills();

  // Determine active package from URL parameter (?id=1 to ?id=3 or ?package=slug)
  const urlParams = new URLSearchParams(window.location.search);
  let activeId = parseInt(urlParams.get('id'), 10);

  // Backward compatibility alias: if someone visits ?id=5, map to 3
  if (activeId === 5) {
    activeId = 3;
  }

  if (!activeId || !PRICING_PACKAGES_DATA[activeId]) {
    // Check slug
    const slug = urlParams.get('package') || urlParams.get('plan');
    if (slug) {
      const found = Object.values(PRICING_PACKAGES_DATA).find(p => p.slug === slug);
      if (found) activeId = found.id;
    }
  }

  // Fallback default: Package 2 (Most Popular) or Package 1
  if (!activeId || !PRICING_PACKAGES_DATA[activeId]) {
    activeId = 2;
  }

  renderPackageDetails(activeId);

  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    let stateId = e.state ? e.state.id : null;
    if (stateId === 5) stateId = 3;
    if (stateId && PRICING_PACKAGES_DATA[stateId]) {
      renderPackageDetails(stateId, false);
    } else {
      const params = new URLSearchParams(window.location.search);
      let popId = parseInt(params.get('id'), 10) || 2;
      if (popId === 5) popId = 3;
      if (!PRICING_PACKAGES_DATA[popId]) popId = 2;
      renderPackageDetails(popId, false);
    }
  });
}

// Render Top Pill Navigation
function renderSwitcherPills() {
  const container = document.getElementById('switcher-pills');
  if (!container) return;

  container.innerHTML = '';
  Object.values(PRICING_PACKAGES_DATA).forEach(pkg => {
    const pill = document.createElement('a');
    pill.href = `Pricing detail.html?id=${pkg.id}`;
    pill.className = 'switcher-pill';
    pill.id = `switcher-pill-${pkg.id}`;
    pill.setAttribute('role', 'tab');
    pill.innerHTML = `
      <span class="pill-num">0${pkg.id}</span>
      <span>${pkg.shortName}</span>
    `;

    pill.addEventListener('click', (e) => {
      e.preventDefault();
      switchPackage(pkg.id);
    });

    container.appendChild(pill);
  });
}

// Switch Active Package with PushState
function switchPackage(packageId) {
  if (!PRICING_PACKAGES_DATA[packageId]) return;

  // Update browser history
  const newUrl = `Pricing detail.html?id=${packageId}`;
  history.pushState({ id: packageId }, '', newUrl);

  renderPackageDetails(packageId, true);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Main Render Function for Selected Package
function renderPackageDetails(packageId, animate = true) {
  const data = PRICING_PACKAGES_DATA[packageId];
  if (!data) return;

  // Update document title
  document.title = `${data.title.replace('&amp;', '&')} | VoltEdge Pricing Guide`;

  // Update active pill highlight
  document.querySelectorAll('.switcher-pill').forEach(pill => {
    pill.classList.remove('active');
  });
  const activePill = document.getElementById(`switcher-pill-${packageId}`);
  if (activePill) activePill.classList.add('active');

  const wrapper = document.getElementById('pricing-detail-content-wrapper');
  if (!wrapper) return;

  // Generate complete package template
  const htmlContent = `
    <!-- 1. DYNAMIC HERO SECTION -->
    <section class="detail-hero-section" id="package-hero">
      <div class="detail-hero-bg-media">
        <img src="${data.image}" alt="${data.title}" class="detail-hero-bg-img" loading="eager">
        <div class="detail-hero-overlay"></div>
      </div>
      <div class="detail-ambient-glow"></div>

      <div class="container detail-hero-container">
        <!-- Left: Paratext & Action Header -->
        <div class="detail-hero-content">
          <div class="detail-hero-badge">
            <span class="pulse-indicator"></span>
            <span class="badge-text">${data.badge}</span>
          </div>

          <h1 class="detail-hero-headline">${data.title}</h1>
          <p class="detail-hero-paratext">${data.paratext}</p>

          <!-- Pricing Tag Strip -->
          <div class="detail-price-callout-box">
            <div class="detail-price-main">
              <span class="detail-price-label">${data.pricePrefix}</span>
              <span class="detail-price-val">${data.priceVal}</span>
            </div>
            <div class="detail-price-meta-divider"></div>
            <div class="detail-price-meta-items">
              <div class="detail-meta-unit">
                <span class="meta-unit-label">Duration</span>
                <span class="meta-unit-val">${data.estTime}</span>
              </div>
              <div class="detail-meta-unit">
                <span class="meta-unit-label">Warranty</span>
                <span class="meta-unit-val">${data.warranty}</span>
              </div>
            </div>
          </div>

          <div class="detail-hero-actions">
            <button class="btn btn-primary" onclick="openPackageBookingModal(${data.id})">
              <span>Book This Package Now</span>
              <svg class="btn-arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <a href="#itemized-breakdown" class="btn btn-secondary">
              <span>View Cost Breakdown &darr;</span>
            </a>
          </div>
        </div>

        <!-- Right: Workshop Visual & Live Laboratory Telemetry Card -->
        <div class="detail-hero-media-wrap">
          <div class="detail-media-frame">
            <img src="${data.image}" alt="${data.title} Laboratory View" class="detail-main-img">
          </div>

          <div class="detail-telemetry-card">
            <div class="telemetry-header">
              <span class="telemetry-title">${data.telemetry.title}</span>
              <span class="telemetry-status-pill">${data.telemetry.status}</span>
            </div>
            <div class="telemetry-rows">
              ${data.telemetry.rows.map(r => `
                <div class="telemetry-row">
                  <span class="telemetry-key">${r.key}</span>
                  <span class="telemetry-val ${r.gold ? 'gold' : ''}">${r.val}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. DEEP PRICING CONTEXT & DELIVERABLES ("ADD MORE CONTENT") -->
    <section class="detail-context-section" id="package-context">
      <div class="container">
        <div class="context-header-block">
          <div class="section-badge-pill">
            <span class="badge-dot"></span>
            <span>Technical Methodology</span>
          </div>
          <h2 class="section-title">Comprehensive Service Breakdown</h2>
          <p class="context-editorial-lead">${data.context.lead}</p>
          <p class="context-editorial-body">${data.context.body}</p>
        </div>

        <div class="deliverables-grid">
          ${data.context.deliverables.map(del => `
            <div class="deliverable-card">
              <div class="deliverable-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="${del.icon}"/>
                </svg>
              </div>
              <div class="deliverable-info">
                <h4>${del.title}</h4>
                <p>${del.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Equipment Showcase Card -->
        <div class="equipment-strip">
          <div class="equipment-header-row">
            <div class="equipment-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="eq-icon">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
              <span>Calibrated Diagnostic Instruments Used</span>
            </div>
            <div class="equipment-status-badge">
              <span class="badge-dot"></span>
              <span>OEM Certified Lab Hardware</span>
            </div>
          </div>

          <div class="equipment-grid">
            ${data.context.equipment.map(eq => `
              <div class="eq-card">
                <div class="eq-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <div class="eq-card-body">
                  <span class="eq-card-name">${eq}</span>
                  <span class="eq-card-meta">Active Lab Calibration</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- 3. ITEMIZED COST BREAKDOWN & TRANSPARENCY -->
    <section class="detail-breakdown-section" id="itemized-breakdown">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge-pill">
            <span class="badge-dot"></span>
            <span>Transparent Invoicing</span>
          </div>
          <h2 class="section-title">Itemized Package Cost Breakdown</h2>
          <p class="section-subtitle">
            Every procedure, diagnostic scan, and terminal treatment is clearly itemized with zero surprise charges.
          </p>
        </div>

        <div class="pricing-table-card">
          <table class="breakdown-table">
            <thead>
              <tr>
                <th style="width: 75%;">Procedure / Service Deliverable</th>
                <th style="width: 25%; text-align: right;">Standard Rate</th>
              </tr>
            </thead>
            <tbody>
              ${data.itemization.map(row => `
                <tr>
                  <td>
                    <span class="item-main-title">${row.item}</span>
                    <span class="item-subtext">${row.desc}</span>
                  </td>
                  <td style="text-align: right;" class="td-rate">${row.rate}</td>
                </tr>
              `).join('')}
              <tr class="td-total-row">
                <td>
                  <strong>Total Starting Package Rate (Guaranteed Estimate)</strong>
                </td>
                <td style="text-align: right;" class="total-rate-highlight">${data.totalRate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 4. VOLTERRA VS GENERIC REPAIR SHOPS -->
    <section class="detail-comparison-section" id="comparison-matrix">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge-pill">
            <span class="badge-dot"></span>
            <span>The VOLTERRA Advantage</span>
          </div>
          <h2 class="section-title">Why Specialist Care Matters</h2>
          <p class="section-subtitle">
            Compare our calibrated laboratory diagnostics against typical quick-lube or generic repair shop practices.
          </p>
        </div>

        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="col-criteria">Criteria</th>
                <th class="col-generic">Typical Fast-Fit / Generic Shop</th>
                <th class="col-volterra">VOLTERRA Master Auto Electrical</th>
              </tr>
            </thead>
            <tbody>
              ${data.comparison.map(c => `
                <tr>
                  <td class="td-criteria">${c.criteria}</td>
                  <td class="td-generic">${c.generic}</td>
                  <td class="td-volterra">${c.volterra}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 4.5 INTERACTIVE PRICING ESTIMATOR & PACKAGE CUSTOMIZER -->
    <section class="pricing-customizer-section" id="package-customizer">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge-pill">
            <span class="badge-dot"></span>
            <span>Interactive Quote Estimator</span>
          </div>
          <h2 class="section-title">Customize Your ${data.shortName} Package</h2>
          <p class="section-subtitle">
            Tailor your appointment to your specific vehicle platform and add certified lab diagnostic protocols.
          </p>
        </div>

        <div class="customizer-card">
          <div class="customizer-grid">
            <div class="customizer-controls">
              <div class="customizer-field">
                <label class="customizer-label">1. Vehicle Architecture Platform</label>
                <select class="customizer-select" id="customizer-vehicle-class">
                  <option value="1.0" selected>Standard Domestic / Asian Passenger (12V)</option>
                  <option value="1.25">European Luxury &amp; Performance (BMW, Mercedes, Porsche, Audi)</option>
                  <option value="1.35">High-Voltage EV &amp; Hybrid System (Tesla, Taycan, E-Tron)</option>
                  <option value="1.4">Commercial Fleet &amp; Heavy-Duty 24V Transporter</option>
                </select>
              </div>

              <div class="customizer-field">
                <label class="customizer-label">2. Recommended Diagnostic Add-ons</label>
                <div class="customizer-addons-group" id="customizer-addons-group">
                  <label class="customizer-addon-row active" data-cost="45">
                    <div class="customizer-addon-left">
                      <input type="checkbox" class="customizer-addon-check" checked>
                      <span class="customizer-addon-name">4-Channel PicoScope Signal Certification</span>
                    </div>
                    <span class="customizer-addon-cost">+$45</span>
                  </label>
                  <label class="customizer-addon-row" data-cost="25">
                    <div class="customizer-addon-left">
                      <input type="checkbox" class="customizer-addon-check">
                      <span class="customizer-addon-name">Alternator Diode Ripple &amp; Ground Drop Audit</span>
                    </div>
                    <span class="customizer-addon-cost">+$25</span>
                  </label>
                  <label class="customizer-addon-row" data-cost="55">
                    <div class="customizer-addon-left">
                      <input type="checkbox" class="customizer-addon-check">
                      <span class="customizer-addon-name">24-Hour Quiescent Parasitic Sleep Test</span>
                    </div>
                    <span class="customizer-addon-cost">+$55</span>
                  </label>
                  <label class="customizer-addon-row" data-cost="49">
                    <div class="customizer-addon-left">
                      <input type="checkbox" class="customizer-addon-check">
                      <span class="customizer-addon-name">36-Month VIP Nationwide Extended Warranty</span>
                    </div>
                    <span class="customizer-addon-cost">+$49</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="customizer-summary-box">
              <div>
                <div class="customizer-summary-header">
                  <h4 class="customizer-summary-title">Configured Package Summary</h4>
                </div>
                <div class="customizer-breakdown-list" id="customizer-breakdown-list">
                  <!-- Generated live -->
                </div>
              </div>

              <div>
                <div class="customizer-total-card">
                  <span class="customizer-total-text">Guaranteed Total:</span>
                  <span class="customizer-total-price" id="customizer-total-price">${data.priceVal}</span>
                </div>
                <button class="btn btn-primary full-width" id="btn-book-customized-package">
                  <span>Book This Configured Package</span>
                  <svg class="btn-arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                    <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4.6 DEALERSHIP VS VOLTERRA ROI & SAVINGS COMPARISON -->
    <section class="dealership-roi-section" id="roi-savings">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge-pill">
            <span class="badge-dot"></span>
            <span>Cost Transparency</span>
          </div>
          <h2 class="section-title">Franchise Dealership vs. VOLTERRA Lab</h2>
          <p class="section-subtitle">
            See how our master independent laboratory saves you hundreds of dollars while delivering superior oscilloscope precision.
          </p>
        </div>

        <div class="roi-comparison-card">
          <div class="roi-stats-grid">
            <div class="roi-stat-col">
              <span class="roi-col-badge">Franchise Dealer</span>
              <h3 class="roi-col-title">Main Dealer Network</h3>
              <div class="roi-col-price" id="roi-dealer-price">$420</div>
              <ul class="roi-col-features">
                <li><span class="roi-icon-cross">✕</span> <span>$210/hr mandatory diagnostic minimum</span></li>
                <li><span class="roi-icon-cross">✕</span> <span>3 to 5 day backlog turnaround</span></li>
                <li><span class="roi-icon-cross">✕</span> <span>Parts swapping without waveform testing</span></li>
                <li><span class="roi-icon-cross">✕</span> <span>Generic 12-month standard warranty</span></li>
              </ul>
            </div>

            <div class="roi-stat-col highlight-col">
              <span class="roi-col-badge">Certified Lab</span>
              <h3 class="roi-col-title">VOLTERRA Master Lab</h3>
              <div class="roi-col-price" id="roi-volterra-price">${data.priceVal}</div>
              <ul class="roi-col-features">
                <li><span class="roi-icon-check">✓</span> <span>100% Diagnostic fee credited if repaired</span></li>
                <li><span class="roi-icon-check">✓</span> <span>Same-day priority diagnostic bench time</span></li>
                <li><span class="roi-icon-check">✓</span> <span>4-Channel PicoScope proof &amp; printout</span></li>
                <li><span class="roi-icon-check">✓</span> <span>Up to 36-Month nationwide warranty</span></li>
              </ul>
            </div>

            <div class="roi-stat-col">
              <span class="roi-col-badge">Your Advantage</span>
              <h3 class="roi-col-title">Realized Net Savings</h3>
              <div class="roi-col-price highlight-green" id="roi-savings-amount">Save $371</div>
              <ul class="roi-col-features">
                <li><span class="roi-icon-check">✓</span> <span>Save 65% – 75% on labor markup</span></li>
                <li><span class="roi-icon-check">✓</span> <span>Zero unnecessary components replaced</span></li>
                <li><span class="roi-icon-check">✓</span> <span>Direct master electrician consultation</span></li>
                <li><span class="roi-icon-check">✓</span> <span>Complimentary espresso &amp; high-speed Wi-Fi</span></li>
              </ul>
            </div>
          </div>

          <div class="savings-banner">
            <div class="savings-banner-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="savings-icon-check">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <div>
                <h4 class="savings-banner-title">Guaranteed Price Match &amp; Zero Unnecessary Parts Guarantee</h4>
                <p class="savings-banner-desc">You will never be billed for diagnostic speculation. If our laboratory does not isolate the root electrical cause, you owe nothing.</p>
              </div>
            </div>
            <button class="btn-print-estimate" id="btn-print-pricing-estimate">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span>Print Official Estimate</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 4-STEP DIAGNOSTIC PROTOCOL -->
    <section class="detail-protocol-section" id="protocol-steps">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge-pill">
            <span class="badge-dot"></span>
            <span>Systematic Inspection</span>
          </div>
          <h2 class="section-title">Our 4-Step Technical Protocol</h2>
          <p class="section-subtitle">
            From preliminary intake through oscilloscopic verification, we adhere to strict engineering standards.
          </p>
        </div>

        <div class="protocol-steps-grid">
          ${data.protocol.map(step => `
            <div class="protocol-step-card">
              <span class="step-num-badge">${step.num}</span>
              <h3 class="step-title">${step.title}</h3>
              <p class="step-desc">${step.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 6. COMMON SYMPTOMS RESOLVED -->
    <section class="detail-symptoms-section" id="common-symptoms">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge-pill">
            <span class="badge-dot"></span>
            <span>Fault Isolation</span>
          </div>
          <h2 class="section-title">Symptoms Resolved By This Package</h2>
          <p class="section-subtitle">
            If your vehicle exhibits any of these behavior patterns, this package is engineered to pinpoint and rectify the cause.
          </p>
        </div>

        <div class="symptoms-cards-grid">
          ${data.symptoms.map(sym => `
            <div class="symptom-card">
              <div class="symptom-indicator-icon"></div>
              <h4 class="symptom-title">${sym.title}</h4>
              <p class="symptom-desc">${sym.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 7. PACKAGE-SPECIFIC FAQS -->
    <section class="detail-faqs-section" id="package-faqs">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-badge-pill">
            <span class="badge-dot"></span>
            <span>Package Inquiries</span>
          </div>
          <h2 class="section-title">Package-Specific FAQs</h2>
          <p class="section-subtitle">
            Common technical questions answered directly by our master auto electricians.
          </p>
        </div>

        <div class="faqs-accordion-wrapper">
          ${data.faqs.map((faq, idx) => `
            <div class="faq-item ${idx === 0 ? 'active' : ''}">
              <button class="faq-question-btn" aria-expanded="${idx === 0 ? 'true' : 'false'}">
                <span class="faq-question-text">${faq.q}</span>
                <span class="faq-icon-cross"></span>
              </button>
              <div class="faq-answer-panel">
                <p>${faq.a}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         PREMIUM MASTER CALL-TO-ACTION (CTA) CARDS SECTION
         Architected for Ultra-Luxury Automotive Engineering Aesthetics
         ========================================================================== -->
    <!-- ==========================================================================
         PREMIUM CTA CARD - IMAGE 2 REFERENCE (DARK CENTERED LUXURY CARD)
         ========================================================================== -->
    <section class="premium-cta-section" id="premium-cta-section">
      <div class="container">
        <div class="cta-card-dark-centered">
          <h2 class="cta-dark-title">Ready to Secure Your Precision Package?</h2>
          <p class="cta-dark-subtitle">Confirm your package allocation with our master lab, backed by our 24-Month / 24,000-Mile comprehensive engineering guarantee.</p>
          <div class="cta-dark-actions">
            <button type="button" class="cta-btn-gold" id="pricing-detail-cta-reserve-btn" onclick="openPackageBookingModal(${data.id})">
              <span>Confirm Reservation</span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <a href="contact.html" class="cta-btn-outline-pill" id="pricing-detail-cta-ask-btn">
              <span>Ask An Engineer</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;

  wrapper.innerHTML = htmlContent;

  // Re-initialize accordions inside new content
  initDetailFaqAccordion();

  // Initialize interactive pricing customizer, ROI savings comparison, and print estimate
  initPricingCustomizer(data);
  initRoiSavings(data);
  initPrintEstimate();
}

/* ==========================================================================
   4. FAQs Accordion Helper for Rendered Content
   ========================================================================== */
function initDetailFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const btn = otherItem.querySelector('.faq-question-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   5. Modals & Booking Flow
   ========================================================================== */
function initModals() {
  const bookingModal = document.getElementById('package-booking-modal');
  const closeBookingBtn = document.getElementById('close-package-modal');
  const bookingForm = document.getElementById('package-booking-form');

  const loginModal = document.getElementById('login-modal');
  const headerLoginBtn = document.getElementById('header-login-btn');
  const closeLoginBtn = document.getElementById('close-login-modal');
  const loginForm = document.getElementById('login-form');
  const togglePassBtn = document.getElementById('toggle-password-visibility');
  const passwordInput = document.getElementById('login-password');

  // Close Booking Modal
  if (closeBookingBtn && bookingModal) {
    closeBookingBtn.addEventListener('click', () => {
      bookingModal.classList.remove('active');
      bookingModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Submit Booking Form
  if (bookingForm && bookingModal) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pkgName = document.getElementById('summary-package-name').textContent || 'Service';
      const custName = document.getElementById('book-name').value || 'Customer';

      bookingModal.classList.remove('active');
      bookingModal.setAttribute('aria-hidden', 'true');
      bookingForm.reset();
      showToast(`Thank you, ${custName}! Your appointment request for "${pkgName}" has been reserved.`);
    });
  }

  // Open Login Modal
  if (headerLoginBtn && loginModal) {
    headerLoginBtn.addEventListener('click', () => {
      loginModal.classList.add('active');
      loginModal.setAttribute('aria-hidden', 'false');
    });
  }

  // Close Login Modal
  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('active');
      loginModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Toggle Password
  if (togglePassBtn && passwordInput) {
    togglePassBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
    });
  }

  // Submit Login
  if (loginForm && loginModal) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginModal.classList.remove('active');
      loginModal.setAttribute('aria-hidden', 'true');
      loginForm.reset();
      showToast('Portal login verified. Welcome to VOLTERRA Telemetry!');
    });
  }

  // Close on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      bookingModal.classList.remove('active');
      bookingModal.setAttribute('aria-hidden', 'true');
    }
    if (e.target === loginModal) {
      loginModal.classList.remove('active');
      loginModal.setAttribute('aria-hidden', 'true');
    }
  });

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (bookingModal) {
        bookingModal.classList.remove('active');
        bookingModal.setAttribute('aria-hidden', 'true');
      }
      if (loginModal) {
        loginModal.classList.remove('active');
        loginModal.setAttribute('aria-hidden', 'true');
      }
    }
  });
}

// Global modal trigger for specific package
window.openPackageBookingModal = function(packageId) {
  const data = PRICING_PACKAGES_DATA[packageId];
  const modal = document.getElementById('package-booking-modal');
  const nameEl = document.getElementById('summary-package-name');
  const rateEl = document.getElementById('summary-package-rate');
  const hiddenInput = document.getElementById('selected-package-hidden');

  if (modal && data) {
    if (nameEl) nameEl.textContent = `${data.shortName}`;
    if (rateEl) rateEl.textContent = `${data.priceVal}`;
    if (hiddenInput) hiddenInput.value = data.id;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
};

/* ==========================================================================
   6. Theme & RTL Toggles
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('voltedge_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('voltedge_theme', theme);
  }
}

function initRtlToggle() {
  const rtlToggleBtn = document.getElementById('rtl-toggle');
  const root = document.documentElement;
  const indicator = rtlToggleBtn ? rtlToggleBtn.querySelector('.rtl-text-indicator') : null;

  const savedDir = localStorage.getItem('voltedge_dir') || 'ltr';
  setDirection(savedDir);

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const currentDir = root.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      setDirection(newDir);
      showToast(`Direction switched to ${newDir.toUpperCase()}`);
    });
  }

  function setDirection(dir) {
    root.setAttribute('dir', dir);
    localStorage.setItem('voltedge_dir', dir);
    if (indicator) {
      indicator.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      indicator.setAttribute('title', dir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left');
    }
  }
}

function initMobileNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link:not(.has-dropdown > .nav-link)');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('open');
        }
      });
    });
  }
}

function initToast() {}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('visible');

    setTimeout(() => {
      toast.classList.remove('visible');
    }, 4200);
  }
}

/* ==========================================================================
   INTERACTIVE PRICING ESTIMATOR & PACKAGE CUSTOMIZER LOGIC
   ========================================================================== */
function initPricingCustomizer(data) {
  const vehicleClassSelect = document.getElementById('customizer-vehicle-class');
  const addonsGroup = document.getElementById('customizer-addons-group');
  const breakdownList = document.getElementById('customizer-breakdown-list');
  const totalPriceEl = document.getElementById('customizer-total-price');
  const bookBtn = document.getElementById('btn-book-customized-package');

  if (!vehicleClassSelect || !addonsGroup || !breakdownList || !totalPriceEl) return;

  const rawBaseNum = parseFloat(data.priceVal.replace(/[^0-9.]/g, '')) || 49;

  function calculate() {
    const multiplier = parseFloat(vehicleClassSelect.value) || 1.0;
    const adjustedBase = Math.round(rawBaseNum * multiplier);

    let addonsSum = 0;
    const chosenAddons = [];

    addonsGroup.querySelectorAll('.customizer-addon-row').forEach(row => {
      const cb = row.querySelector('.customizer-addon-check');
      const cost = parseFloat(row.getAttribute('data-cost')) || 0;
      const name = row.querySelector('.customizer-addon-name').textContent;

      if (cb && cb.checked) {
        row.classList.add('active');
        addonsSum += cost;
        chosenAddons.push({ name, cost });
      } else {
        row.classList.remove('active');
      }
    });

    const total = adjustedBase + addonsSum;

    breakdownList.innerHTML = `
      <div class="customizer-breakdown-item">
        <span>Base ${data.shortName}</span>
        <span>$${adjustedBase}</span>
      </div>
      <div class="customizer-breakdown-item">
        <span>Platform Multiplier</span>
        <span>${multiplier}x</span>
      </div>
      ${chosenAddons.map(a => `
        <div class="customizer-breakdown-item">
          <span>+ ${a.name}</span>
          <span>+$${a.cost}</span>
        </div>
      `).join('')}
    `;

    totalPriceEl.textContent = `$${total}`;

    if (bookBtn) {
      bookBtn.onclick = () => {
        openPackageBookingModal(data.id);
        const tierSelect = document.getElementById('book-tier-select');
        const notes = document.getElementById('book-notes');
        if (tierSelect) {
          tierSelect.value = 'Performance Master Grade';
        }
        if (notes) {
          notes.value = `Custom Config: ${data.shortName} with ${chosenAddons.length} add-on(s). Total Quote: $${total}`;
        }
      };
    }
  }

  vehicleClassSelect.addEventListener('change', calculate);
  addonsGroup.querySelectorAll('.customizer-addon-check').forEach(cb => {
    cb.addEventListener('change', calculate);
  });

  calculate();
}

/* ==========================================================================
   DEALERSHIP VS VOLTERRA ROI & SAVINGS COMPUTATION
   ========================================================================== */
function initRoiSavings(data) {
  const dealerPriceEl = document.getElementById('roi-dealer-price');
  const volterraPriceEl = document.getElementById('roi-volterra-price');
  const savingsAmountEl = document.getElementById('roi-savings-amount');

  if (!dealerPriceEl || !volterraPriceEl || !savingsAmountEl) return;

  const basePrice = parseFloat(data.priceVal.replace(/[^0-9.]/g, '')) || 49;
  const dealerEst = Math.round(basePrice * 2.6 + 180);
  const netSavings = dealerEst - basePrice;

  dealerPriceEl.textContent = `$${dealerEst}`;
  volterraPriceEl.textContent = `$${basePrice}`;
  savingsAmountEl.textContent = `Save $${netSavings}`;
}

/* ==========================================================================
   PRINT / EXPORT ESTIMATE HANDLER
   ========================================================================== */
function initPrintEstimate() {
  const printBtn = document.getElementById('btn-print-pricing-estimate');
  if (printBtn) {
    printBtn.onclick = () => {
      showToast('Generating official print estimate certificate...');
      setTimeout(() => {
        window.print();
      }, 350);
    };
  }
}

