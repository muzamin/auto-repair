/**
 * VoltEdge Auto Electrical - Service Details Logic (service detail.js)
 * Implements:
 * - 6 Complete Dedicated Service Profiles with Rich Technical Telemetry
 * - Dynamic URL Query Parameter Routing (?id=1 to ?id=6 or ?service=slug)
 * - Seamless In-Page Service Switcher Toolbar with PushState Navigation
 * - Custom Context, Protocols, Symptoms, Pricing Tiers, and FAQs per Service
 * - Theme Switcher (Dark & Light Mode) with Local Storage Persistence
 * - RTL / LTR Toggle with Indicator Sync
 * - Modals (Login & Booking with prefilled Tier) and Toast Feedback
 */

// Complete Master Database for 6 Auto Electrical Services
const SERVICES_DATA = {
  1: {
    id: 1,
    slug: 'ecu-diagnostics',
    shortName: 'ECU Diagnostics',
    category: 'Micro-Circuits & Scanning',
    badge: 'OEM CAN-BUS & Micro-Circuitry',
    title: 'Computerized Auto Diagnostics & ECU Programming',
    image: 'assets/images/detail_service_1_ecu.jpg',
    paratext: 'Surgical CAN-bus network troubleshooting, Body Control Module (BCM) reprogramming, ECU parameter reflashing, and phantom parasitic battery drain isolation with 4-channel digital oscilloscopes.',
    priceFrom: '$89',
    quickSpecs: {
      turnaround: '45 - 90 Mins',
      warranty: '12 Mo Guarantee',
      lab: 'PicoScope Lab 1',
      rating: '4.98 / 5.0'
    },
    telemetry: {
      title: 'CAN-BUS DIGITAL TELEMETRY',
      tag: 'ACTIVE 500 KBPS',
      stats: [
        { label: 'CAN-High Signal', val: '3.52 V Normal' },
        { label: 'CAN-Low Signal', val: '1.48 V Normal' },
        { label: 'Termination Resistance', val: '60.2 Ω Dual Split' }
      ]
    },
    context: {
      narrative: 'Modern vehicles function as interconnected local area networks with over 70 electronic control units continuously communicating. When a sensor fails or a communication packet is corrupted, generic handheld scanners display generic trouble codes that lead to unnecessary component replacement. VoltEdge connects directly to the digital physical layer using 4-channel high-frequency PicoScopes to capture microsecond waveforms, pinpointing grounding faults, broken twisted pairs, and firmware bugs without guessing.',
      bullets: [
        'High-speed CAN-H, CAN-L, LIN-bus and FlexRay digital signal analysis',
        'Phantom parasitic battery drain tracing down to 10 milliamperes',
        'Direct module reflashing, variant coding, and immobilizer re-synchronization',
        'Factory-grade adaptations for Mercedes Xentry, BMW ISTA, Audi ODIS, and GM GDS2'
      ]
    },
    protocol: [
      { num: '01', title: 'Full Topology Sweep', desc: 'Scan all vehicle modules across CAN, LIN and MOST networks to map active and historical fault codes.' },
      { num: '02', title: 'Oscilloscopic Capture', desc: 'Hook 4-channel PicoScope probes into suspect circuits to observe real-time voltage waveforms and glitching.' },
      { num: '03', title: 'Component Level Fix', desc: 'Isolate bad micro-soldering, corroded pin terminals, ground drops, or faulty driver ICs on the circuit board.' },
      { num: '04', title: 'Coding & Road Adapt', desc: 'Flash updated ECU calibration files, perform steering/throttle adaptation, and verify clear bus telemetry.' }
    ],
    symptoms: [
      { title: 'Random Warning Lights', desc: 'ABS, Traction Control, and Check Engine lights illuminating intermittently during driving.' },
      { title: 'Parasitic Battery Drain', desc: 'Vehicle battery dies overnight or after 24 hours of being parked in the driveway.' },
      { title: 'Limp Mode or Misfire', desc: 'Engine suddenly cuts power into emergency limp mode with no physical mechanical damage.' },
      { title: 'Unresponsive Modules', desc: 'Keyless entry, instrument cluster gauges, or infotainment display freezing or shutting down.' }
    ],
    equipment: ['PicoScope 4425A 4-Channel', 'Autel MaxiSys Ultra OEM', 'Bosch KTS 590 Master', 'Thermal FLIR E8-XT'],
    differentiators: [
      { title: 'Oscilloscope Precision', desc: 'We capture microsecond voltage anomalies that generic scan tools completely miss.' },
      { title: 'Zero Guesswork Guarantee', desc: 'You never pay for unnecessary parts swapped in hoping it fixes the problem.' },
      { title: 'OEM Factory Coding', desc: 'Certified to perform factory-level online SCN coding and software adapt calibration.' },
      { title: 'Circuit-Level Repairs', desc: 'We repair ECU board micro-soldering rather than forcing multi-thousand-dollar unit swaps.' }
    ],
    comparison: [
      { feature: 'Diagnostic Equipment', generic: 'Handheld OBD2 Code Reader', voltEdge: '4-Channel Digital PicoScope + OEM Scanners' },
      { feature: 'Signal Analysis', generic: 'Reads static trouble codes only', voltEdge: 'Real-time oscilloscope wave & bus collision capture' },
      { feature: 'Parasitic Drain Tracing', generic: 'Random fuse pulling (wakes up modules)', voltEdge: 'Non-intrusive mA amp clamp & thermal mapping' },
      { feature: 'Coding & Adaptation', generic: 'None (must refer to dealership)', voltEdge: 'Full online OEM dealer-level variant coding' }
    ],
    pricing: [
      {
        name: 'Standard Diagnostic Scan',
        price: '$89',
        time: '45 mins',
        desc: 'Comprehensive multi-system health scan and digital fault code printout.',
        features: [
          'Full vehicle network topology scan (all modules)',
          'Clear historical shadow fault codes',
          'Live sensor data stream verification',
          'Detailed digital technician diagnostic report'
        ],
        featured: false
      },
      {
        name: 'Master Oscilloscope Lab',
        price: '$189',
        time: '90 mins',
        desc: 'Deep-dive waveform analysis and elusive parasitic drain trace.',
        features: [
          'Everything in Standard Diagnostic Scan',
          '4-Channel PicoScope wave capture & ground test',
          'Sleep mode parasitic drain isolation (<20mA)',
          'CAN-Bus network resistance & voltage check',
          'Guaranteed root-cause identification'
        ],
        featured: true
      },
      {
        name: 'ECU Coding & Module Sync',
        price: '$349',
        time: '2 - 3 hours',
        desc: 'Complete electronic module programming, adaptation, and immobilizer sync.',
        features: [
          'Everything in Master Oscilloscope Lab',
          'Online OEM factory firmware flash & calibration',
          'Key immobilizer / CAS / BCM synchronization',
          'Post-programming adaptive road test verification',
          '12-Month unlimited mileage software warranty'
        ],
        featured: false
      }
    ],
    faqs: [
      { q: 'Will this diagnostic void my new car manufacturer warranty?', a: 'No. Under the Magnuson-Moss Warranty Act, independent diagnostic and maintenance services using OEM procedures cannot void your vehicle warranty.' },
      { q: 'What happens if you cannot find the electrical fault?', a: 'We have a strict 99.4% diagnostic accuracy record. If our master technicians cannot conclusively isolate the root cause, you are not billed for diagnostic labor.' },
      { q: 'Can you program used electronic modules from salvage cars?', a: 'Yes, in most vehicle models we can virginize, recode VINs, and adapt used Body Control Modules, ABS pumps, and instrument clusters to save you thousands compared to buying new from a dealer.' },
      { q: 'How long does a parasitic drain trace take?', a: 'A typical parasitic drain trace takes 1 to 2 hours because modern vehicle control modules must be allowed to enter deep sleep (typically 20-40 minutes) before taking non-intrusive millivolt measurements.' }
    ]
  },

  2: {
    id: 2,
    slug: 'battery-replacement',
    shortName: 'Battery Replacement',
    category: 'Battery Lab & BMS',
    badge: 'AGM, EFB & Auxiliary Lithium',
    title: 'High-Performance Battery Testing & Lab Replacement',
    image: 'assets/images/detail_service_2_battery.jpg',
    paratext: 'Digital conductance state-of-health profiling, Cold Cranking Amperage (CCA) stress testing, BMS battery registration, terminal anti-corrosion barrier application, and eco-friendly recycling.',
    priceFrom: '$129',
    quickSpecs: {
      turnaround: '30 - 45 Mins',
      warranty: '36 Mo Free Replace',
      lab: 'Battery Station A',
      rating: '4.99 / 5.0'
    },
    telemetry: {
      title: 'BATTERY CELL LAB TELEMETRY',
      tag: 'MIDTRONICS CERTIFIED',
      stats: [
        { label: 'Terminal Resting Voltage', val: '12.82 V 100% SOC' },
        { label: 'Measured CCA / Rated', val: '890 CCA / 850 CCA' },
        { label: 'Internal Resistance', val: '3.12 mΩ Prime Health' }
      ]
    },
    context: {
      narrative: 'Automotive batteries are no longer simple storage boxes for starting engines. In modern Start-Stop, hybrid, and luxury vehicles, the battery stabilizes sensitive microprocessors and absorbs severe regenerative alternator pulses. Simply dropping in a random battery without programming the Battery Management System (BMS) causes the alternator to overcharge and boil the new cells within months. VoltEdge tests dynamic conductance, calculates internal resistance, and performs mandatory ECU battery registration on all European, Asian, and Domestic vehicles.',
      bullets: [
        'Patented Midtronics digital conductance technology for microscopic internal plate analysis',
        'Direct inventory of top-tier AGM, EFB, and lightweight high-output Lithium-ion batteries',
        'Mandatory BMS adaptation registration across BMW, Audi, Mercedes, Ford, GM and Porsche',
        'Zero-downtime memory saver backup keeps vehicle radio codes, seat memory, and clock intact'
      ]
    },
    protocol: [
      { num: '01', title: 'Dynamic Conductance Test', desc: 'Measure resting voltage, internal milliohm resistance, and Cold Cranking Amperage under load.' },
      { num: '02', title: 'Memory Saver Connection', desc: 'Connect 12V clean auxiliary power to the OBD2 port to preserve computer calibrations and drive cycles.' },
      { num: '03', title: 'Lab Installation & Clean', desc: 'Neutralize tray acid, torque clamp brackets, and spray aerospace-grade dielectric copper sealant.' },
      { num: '04', title: 'BMS Adaptation Registry', desc: 'Program the new battery serial number and chemistry into the ECU to reset alternator charging algorithm.' }
    ],
    symptoms: [
      { title: 'Sluggish Engine Crank', desc: 'Engine cranks slower than usual or makes clicking noises when turning the key or pushing start.' },
      { title: 'Start-Stop Deactivated', desc: 'Auto Start-Stop system stops functioning, which indicates battery health has dropped below 75% SOH.' },
      { title: 'Dimming Lights at Idle', desc: 'Headlights or dashboard lighting dim momentarily when coming to a stop or turning on AC.' },
      { title: 'Acid Smell / Corroded Posts', desc: 'Sulfur rotten-egg odor under the hood or fluffy white/blue crust accumulating around battery posts.' }
    ],
    equipment: ['Midtronics MDX-700 HD Conductance Tester', 'Autel MaxiBAS BT608', 'Deka Precision AGM Charger', 'Snap-on Memory Saver II'],
    differentiators: [
      { title: '36-Month Warranty', desc: '100% free replacement warranty nationwide with no prorated deductions.' },
      { title: 'Mandatory BMS Reset', desc: 'We always recode the engine computer so your new battery lasts its full 5-7 year life.' },
      { title: 'Zero Data Loss', desc: 'Clean auxiliary power prevents clock resets, radio lockouts, and transmission relearns.' },
      { title: 'Premium Heavy-Duty Brands', desc: 'We only stock OEM-tier Deka, VARTA, Odyssey, and Bosch high-crank batteries.' }
    ],
    comparison: [
      { feature: 'Battery Testing Method', generic: 'Basic handheld analog load tester', voltEdge: 'Midtronics dynamic digital conductance & conductance curve' },
      { feature: 'BMS ECU Registration', generic: 'Not performed (shortens battery life)', voltEdge: 'Included on all vehicles with printout confirmation' },
      { feature: 'Vehicle Settings Backup', generic: 'Disconnects battery (loses settings)', voltEdge: 'Memory saver tool preserves radio, seats & drive cycles' },
      { feature: 'Warranty Terms', generic: '12 months prorated', voltEdge: '36 months 100% free replacement warranty' }
    ],
    pricing: [
      {
        name: 'Battery Health & Terminal Clean',
        price: '$49',
        time: '30 mins',
        desc: 'Comprehensive electrical load test, post neutralization, and corrosion shielding.',
        features: [
          'Midtronics conductance state-of-health test',
          'Alternator charging ripple & diode sweep',
          'Terminal wire brush, neutralizer & copper seal',
          'Free diagnostic certificate report'
        ],
        featured: false
      },
      {
        name: 'High-Output AGM Replacement',
        price: '$199',
        time: '45 mins',
        desc: 'Premium Absorbed Glass Mat battery installation + mandatory BMS adaptation.',
        features: [
          'Heavy-Duty AGM battery included (up to 850 CCA)',
          'OBD2 computer memory preservation',
          'Complete BMS / IBS battery registration in ECU',
          'Old battery eco-friendly recycling',
          '36-Month 100% free nationwide warranty'
        ],
        featured: true
      },
      {
        name: 'Dual Battery & Auxiliary Lithium Sync',
        price: '$380',
        time: '60 mins',
        desc: 'Dual battery setups, auxiliary start-stop capacitors, and high-performance lithium.',
        features: [
          'High-rate Lithium / Dual AGM synchronization',
          'Split-charge relay & DC-DC isolator diagnostics',
          'Both main & auxiliary battery adaptations',
          'Extended 48-Month premium lab warranty',
          'Complimentary 12-month checkup inspection'
        ],
        featured: false
      }
    ],
    faqs: [
      { q: 'Why do you charge for battery registration / coding?', a: 'Modern cars require dedicated scan tools connected to the factory gateway to input the battery capacity and serial number. Without this step, the alternator cooks the new battery with excessive voltage, causing premature failure.' },
      { q: 'What is the difference between standard Lead-Acid and AGM batteries?', a: 'AGM (Absorbed Glass Mat) batteries hold electrolyte in fiberglass separators, offering 3x the cycle life, 20% higher cold cranking amps, and superior resistance to vehicle vibration and deep discharges.' },
      { q: 'Can I replace an AGM battery with a regular flooded battery?', a: 'Never. If your vehicle came with an AGM battery from the factory, installing a standard flooded battery will trigger dashboard warnings and cause the battery to fail within 3 to 6 months.' },
      { q: 'Do you dispose of old automotive batteries safely?', a: 'Yes. We are an EPA-certified battery recycling facility. Over 98% of lead and plastic materials in your old battery are recycled in closed-loop systems.' }
    ]
  },

  3: {
    id: 3,
    slug: 'alternator-starter',
    shortName: 'Alternator & Starter',
    category: 'Rotating Electrical Machines',
    badge: 'Bench Dynamometer Tested & Rebuilt',
    title: 'Alternator, Starter Motor & Charging System Overhaul',
    image: 'assets/images/detail_service_3_alternator.jpg',
    paratext: 'Bench dynamometer load profiling, internal rectifier diode replacements, rotor slip ring turning, solenoid rebuilds, voltage regulator calibration, and heavy-duty current drop testing.',
    priceFrom: '$149',
    quickSpecs: {
      turnaround: '2 - 4 Hours',
      warranty: '24 Mo / 24k Miles',
      lab: 'Dynamometer Bay 3',
      rating: '4.97 / 5.0'
    },
    telemetry: {
      title: 'BENCH DYNAMOMETER METRICS',
      tag: 'LOAD TEST VERIFIED',
      stats: [
        { label: 'Full Amperage Output', val: '185 A @ 2,500 RPM' },
        { label: 'AC Ripple Voltage', val: '0.015 V AC Nominal' },
        { label: 'Starter Cranking Draw', val: '162 A @ 11.2 V Drop' }
      ]
    },
    context: {
      narrative: 'When an alternator fails, it rarely stops producing electricity outright. In most cases, a single internal rectifier diode blows, sending alternating current (AC) ripple directly into your car sensitive electronic modules, destroying sensors and cooking the battery. Similarly, sluggish starter motors often suffer from high-resistance solenoid contacts rather than motor burnout. VoltEdge rebuilds high-output alternators and heavy-duty starters to better-than-OEM specifications using heavy-duty bearings, solid copper windings, and precision bench dynamometer testing.',
      bullets: [
        'Dynamic full-load bench testing under simulated 200-amp real world electrical demands',
        'Precision oscilloscopic AC ripple detection prevents silent damage to vehicle microchips',
        'Starter motor bendix gear, planetary reduction, and high-torque solenoid rebuilds',
        'Large inventory of water-cooled and high-output commercial alternators ready for same-day swap'
      ]
    },
    protocol: [
      { num: '01', title: 'On-Vehicle Voltage Drop', desc: 'Perform four-point voltage drop testing across the battery cables, ground paths, and alternator B+ stud.' },
      { num: '02', title: 'Disassembly & Cleaning', desc: 'Strip the unit down to the casing, ultrasonic clean housing, and measure rotor stator insulation resistance.' },
      { num: '03', title: 'Component Replacement', desc: 'Install heavy-duty NSK bearings, Transpo high-amp rectifier diode bridge, and carbon brush assemblies.' },
      { num: '04', title: 'Bench Dyno Validation', desc: 'Mount unit on D&V Electronics test bench to record amperage curves, cut-in speed, and thermal stability.' }
    ],
    symptoms: [
      { title: 'Battery Warning Light', desc: 'Red battery symbol illuminated on dash or fluctuating while revving the engine.' },
      { title: 'Whining / Grinding Noise', desc: 'High-pitched mechanical whine that changes with engine RPM, indicating worn alternator bearings.' },
      { title: 'Clicking But No Crank', desc: 'Loud single click when turning the ignition, but the starter motor does not turn the engine.' },
      { title: 'Frequent Dead Batteries', desc: 'Battery goes flat even after being recharged, or burning electrical smell under the hood.' }
    ],
    equipment: ['D&V Electronics Alternator Dyno', 'Fluke 289 Logging Multimeter', 'Transpo Component Analyzer', 'Hydraulic Press & Pullers'],
    differentiators: [
      { title: 'Dyno Certified Output', desc: 'Every alternator is tested under 150A+ real electrical load with a printed test certificate.' },
      { title: 'Heavy-Duty Components', desc: 'We utilize Japanese NSK bearings and heavy-duty copper rectifiers superior to cheap remans.' },
      { title: 'Voltage Drop Mastery', desc: 'We verify vehicle ground straps so your new unit does not fail from dirty engine grounding.' },
      { title: '24-Month Backing', desc: 'Backed by our comprehensive 24-month or 24,000-mile parts and labor warranty.' }
    ],
    comparison: [
      { feature: 'Testing Standards', generic: 'Basic spin check with no load applied', voltEdge: 'D&V Electronics computerized dynamic load dynamometer' },
      { feature: 'Replacement Parts', generic: 'Lowest-cost overseas rebuilt parts', voltEdge: 'Heavy-duty NSK bearings, OE copper rectifiers, OEM regulators' },
      { feature: 'AC Ripple Analysis', generic: 'Ignored (can destroy vehicle ECUs)', voltEdge: 'Oscilloscope trace confirms AC ripple is under 0.03V AC' },
      { feature: 'Ground Cable Verification', generic: 'Only replaces the alternator', voltEdge: 'Complete voltage drop test across battery & chassis grounds' }
    ],
    pricing: [
      {
        name: 'Charging System Bench Diagnostic',
        price: '$79',
        time: '45 mins',
        desc: 'Comprehensive in-car current draw and bench load verification.',
        features: [
          'Oscilloscopic AC voltage ripple check',
          'Starter cranking amperage draw test',
          'Battery-to-alternator voltage drop test',
          'Engine ground strap resistance check'
        ],
        featured: false
      },
      {
        name: 'Starter Solenoid & Brush Overhaul',
        price: '$189',
        time: '2 - 3 hours',
        desc: 'Complete refurbishing of starter motor solenoid, planetary gears, and brushes.',
        features: [
          'High-torque starter solenoid rebuild',
          'High-durability copper brushes & springs',
          'Planetary reduction gear lubrication',
          'Bendix drive engagement verification',
          '24-Month nationwide parts guarantee'
        ],
        featured: true
      },
      {
        name: 'Master High-Output Alternator Rebuild',
        price: '$329',
        time: '3 - 4 hours',
        desc: 'Complete remanufacture of high-output alternators with upgraded components.',
        features: [
          'New NSK high-speed bearings & seals',
          'Heavy-duty high-amperage rectifier diode pack',
          'Precision rotor slip ring turning & balancing',
          'Full-load dynamometer certification certificate',
          'Complete installation and belt tension adjustment'
        ],
        featured: false
      }
    ],
    faqs: [
      { q: 'Why did my brand-new alternator fail after only a few months?', a: 'The most common cause is a dead or defective battery that forced the alternator to operate at 100% duty cycle continuously, or an undiscovered high-resistance ground cable that prevented heat dissipation.' },
      { q: 'Can a bad alternator ruin my car battery?', a: 'Yes. A failed internal voltage regulator can overcharge the battery with 16+ volts, causing electrolyte boiling, or a shorted diode can drain battery amperage even when the engine is switched off.' },
      { q: 'What is AC ripple and why is it dangerous?', a: 'Alternators generate Alternating Current (AC) which is converted into Direct Current (DC) by diodes. If a diode fails, AC voltage spikes into vehicle computers, corrupting sensors and triggering spurious fault codes.' },
      { q: 'Is it better to rebuild my original alternator or buy an aftermarket unit?', a: 'Rebuilding your genuine factory alternator is almost always superior. Factory casings and copper stator windings are much higher quality than inexpensive aftermarket reproductions.' }
    ]
  },

  4: {
    id: 4,
    slug: 'wiring-harness',
    shortName: 'Wiring Loom Repair',
    category: 'Micro-Wiring & Loom Engineering',
    badge: 'Mil-Spec Raychem Sleeving & OEM Pins',
    title: 'Complex Automotive Wiring Loom & Harness Repair',
    image: 'assets/images/detail_service_4_harness.jpg',
    paratext: 'Surgical micro-pin continuity mapping, rodent chew damage restoration, corroded under-hood fuse blocks, Deutsch waterproof connector re-pinning, and military-grade Raychem thermal shielding.',
    priceFrom: '$119',
    quickSpecs: {
      turnaround: '2 - 5 Hours',
      warranty: '12 Mo Zero-Fault',
      lab: 'Loom Lab Bay 2',
      rating: '4.96 / 5.0'
    },
    telemetry: {
      title: 'CIRCUIT CONTINUITY RECORD',
      tag: 'MIL-SPEC VERIFIED',
      stats: [
        { label: 'Wire Loop Resistance', val: '0.04 Ω End-to-End' },
        { label: 'Insulation Resistance', val: '> 500 MΩ @ 500V' },
        { label: 'Thermal Sleeve Rating', val: '-55°C to +150°C' }
      ]
    },
    context: {
      narrative: 'A single fractured copper strand or corroded connector pin inside a vehicle 2,000-wire main harness can cause phantom warning lights, random limp mode, or catastrophic engine shutdowns. Most general mechanics refuse to touch complex wiring looms or propose replacing the entire harness for $5,000+. At VoltEdge, our master electricians use pinpoint continuity meters, ultrasonic probe sensors, and mil-spec crimping tools to surgically repair individual damaged conductors, repin waterproof connectors, and seal the harness against future moisture and engine heat.',
      bullets: [
        'Complete rodent damage remediation using soy-free deterrent protective loom sleeves',
        'Mil-Spec Raychem DR-25 heat shrink with dual-wall adhesive moisture barriers',
        'Genuine OEM terminals and Deutsch / Delphi / TE Connectivity waterproof housings',
        'Under-hood fuse distribution block rebuilds with zero bypass jumpers'
      ]
    },
    protocol: [
      { num: '01', title: 'End-to-End Continuity Map', desc: 'Perform four-wire Kelvin resistance sweeps from sensor pin to ECU plug to find high resistance.' },
      { num: '02', title: 'Loom De-wrapping & Inspect', desc: 'Carefully strip damaged protective tape to examine chafed, pinched, or rodent-bitten conductors.' },
      { num: '03', title: 'Staggered Crimp Splices', desc: 'Use calibrated ratcheting crimpers and uninsulated barrel connectors staggered along the loom.' },
      { num: '04', title: 'Thermal Seal & Harnessing', desc: 'Apply dual-wall adhesive shrink tubing, high-temp fleece cloth harness tape, and anti-abrasion conduits.' }
    ],
    symptoms: [
      { title: 'Intermittent Sensor Codes', desc: 'Throttle, oxygen sensor, or camshaft codes that return immediately after replacing the sensor.' },
      { title: 'Visible Rodent Chew Marks', desc: 'Shredded hood insulation, acorn shells, or visible teeth marks on engine wire harnesses.' },
      { title: 'Dead Gauges / Blown Fuses', desc: 'Specific fuses blowing repeatedly as soon as you install a new one or turn on the ignition.' },
      { title: 'Water Ingress Corrosion', desc: 'Green verdigris oxidation on fuse block terminals or ECU plugs after heavy rain or car washes.' }
    ],
    equipment: ['Fluke 289 Logging Multimeter', 'Raychem DR-25 Thermal Stations', 'Deutsch HD10 Crimp Dies', 'Non-Destructive Pin Extractors'],
    differentiators: [
      { title: 'Never Soldered in Looms', desc: 'We follow aerospace standards using staggered crimp barrels to eliminate vibration breakage.' },
      { title: 'Zero Ugly Electrical Tape', desc: 'We only use OEM Certoplast fleece and high-temperature flame-retardant corrugated looms.' },
      { title: 'Connector Repinning', desc: 'We replace individual damaged pins rather than hacking and splicing external wires.' },
      { title: 'Rodent Armor Protection', desc: 'Our specialty protective sleeving prevents mice and rats from re-chewing repaired wiring.' }
    ],
    comparison: [
      { feature: 'Splicing Technique', generic: 'Twist-and-tape or stiff solder joints that crack', voltEdge: 'Staggered mil-spec uninsulated crimps with adhesive heat shrink' },
      { feature: 'Harness Wrapping', generic: 'Standard hardware store PVC tape (melts & gets sticky)', voltEdge: 'OE Certoplast fleece tape & Raychem DR-25 thermal sleeves' },
      { feature: 'Pin Repair', generic: 'Cuts wires and runs external zip-tied bypasses', voltEdge: 'Factory pin extraction and replacement in OEM connector housings' },
      { feature: 'Moisture Sealing', generic: 'None (leaves exposed copper to oxidize)', voltEdge: 'Dual-wall glue-lined seals rated IP68 submersible' }
    ],
    pricing: [
      {
        name: 'Single Circuit Continuity Trace',
        price: '$119',
        time: '1 - 2 hours',
        desc: 'Pin-to-pin resistance isolation for a specific troublesome sensor or actuator circuit.',
        features: [
          'Four-wire resistance sweep across sensor circuit',
          'Connector pin tension and corrosion check',
          'Ground path resistance isolation',
          'Repair of up to 2 damaged conductors included'
        ],
        featured: false
      },
      {
        name: 'Harness Section & Rodent Damage Repair',
        price: '$249',
        time: '2 - 3 hours',
        desc: 'Restoration of a damaged section of engine or chassis wiring loom.',
        features: [
          'Full remediation of up to 10 rodent-chewed wires',
          'Staggered mil-spec crimping with dual-wall seal',
          'Replacement of damaged connector pins',
          'Anti-rodent corrugated conduit re-wrapping',
          '12-Month zero-fault wiring guarantee'
        ],
        featured: true
      },
      {
        name: 'Full Engine Bay Loom Overhaul',
        price: '$540',
        time: '5 - 6 hours',
        desc: 'Complete de-pinning, restoration, and heat-shield re-wrapping of main engine loom.',
        features: [
          'Complete engine harness teardown & rebuild',
          'Fuse distribution block corrosion cleaning',
          'Raychem DR-25 motorsport-grade heat shielding',
          'New silicone connector weather packs',
          'Comprehensive post-repair scan & verification'
        ],
        featured: false
      }
    ],
    faqs: [
      { q: 'Why do you use crimps instead of soldering wires?', a: 'Soldering introduces a rigid hard point where solder wicks into copper strands. In high-vibration automotive environments, soldered wires fatigue and snap right behind the joint. Aerospace and OEM automotive standards require crimped splices with heat-shrink strain relief.' },
      { q: 'Does insurance cover rodent damage to vehicle wiring?', a: 'Yes! Most comprehensive auto insurance policies cover rodent and animal damage. We work directly with all major insurance adjusters and provide itemized photo documentation to streamline your claim.' },
      { q: 'Can you fix broken connector clips without replacing the whole harness?', a: 'Yes. We stock hundreds of OEM connector housings. We extract your existing pins using specialized tools and insert them into brand-new genuine plastic shells without cutting a single wire.' },
      { q: 'How do you prevent rodents from chewing the wires again?', a: 'We wrap repaired sections with specialized rodent-deterrent tapes infused with capsicum (hot pepper extract) and stainless steel abrasion mesh that rodents cannot chew through.' }
    ]
  },

  5: {
    id: 5,
    slug: 'ev-hybrid-service',
    shortName: 'EV & Hybrid Care',
    category: 'High-Voltage EV/PHEV Architecture',
    badge: 'NFPA 70E & IMI Level 4 Certified',
    title: 'Hybrid & EV High-Voltage Isolation & Inverter Care',
    image: 'assets/images/detail_service_5_ev.jpg',
    paratext: 'Safety certified 400V/800V bus isolation testing, high-resistance megohmmeter insulation sweeps, DC-DC converter diagnostics, inverter cooling loops, and safety isolation verification.',
    priceFrom: '$199',
    quickSpecs: {
      turnaround: '3 - 6 Hours',
      warranty: '24 Mo HV Care',
      lab: 'High-Voltage Bay 4',
      rating: '4.99 / 5.0'
    },
    telemetry: {
      title: 'HIGH-VOLTAGE BUS ISOLATION',
      tag: '1,000V TEST CERTIFIED',
      stats: [
        { label: 'HV Bus Voltage', val: '388.4 V DC Verified' },
        { label: 'Chassis Isolation Resistance', val: '820 MΩ (>500MΩ Pass)' },
        { label: 'HVIL Interlock Loop', val: '0.08 Ω Continuous' }
      ]
    },
    context: {
      narrative: 'Electric and Hybrid vehicles operate on lethal voltages ranging from 300V to over 800V DC. Working on these powertrains requires specialized high-voltage training, CAT IV 1000V insulated tooling, and strict de-energization procedures. When an EV throws an isolation loss fault, it automatically locks down the contactors to protect occupants. VoltEdge is fully certified in high-voltage vehicle safety (IMI Level 4 & NFPA 70E) to de-energize systems, trace microscopic coolant leaks inside battery packs, test inverter IGBT switching modules, and restore DC-DC converter charging.',
      bullets: [
        'Certified high-voltage de-energization and safe-work lock-out/tag-out (LOTO) protocols',
        '1,000V Megohmmeter insulation sweeps to locate moisture ingress and high-voltage leaks',
        'DC-DC converter diagnostics keeping auxiliary 12V batteries powered from high-voltage pack',
        'Inverter IGBT transistor switching and dedicated dielectric cooling loop flushing'
      ]
    },
    protocol: [
      { num: '01', title: 'High-Voltage Safe Shutdown', desc: 'Pull manual service disconnect (MSD), verify zero voltage with CAT IV meter, and apply lockout/tagout.' },
      { num: '02', title: '1,000V Megohmmeter Sweep', desc: 'Test insulation resistance between positive/negative high-voltage buses and the aluminum vehicle chassis.' },
      { num: '03', title: 'Component Diagnostic', desc: 'Inspect high-voltage interlock loop (HVIL), contactor relay coil resistance, and pyro-fuse integrity.' },
      { num: '04', title: 'Re-energization & Testing', desc: 'Safely re-arm contactors, purge inverter cooling loops, and confirm cell balance telemetry.' }
    ],
    symptoms: [
      { title: 'Isolation Fault / No Start', desc: 'Vehicle displays "Electrical System Fault: Vehicle will not restart" or refuses to shift into Ready mode.' },
      { title: '12V Auxiliary Battery Draining', desc: 'EV auxiliary 12V battery goes flat repeatedly because the high-voltage DC-DC converter is offline.' },
      { title: 'Reduced EV Acceleration', desc: 'Inverter enters power reduction mode due to high temperatures or degraded cooling pump flow.' },
      { title: 'High-Voltage Warning Light', desc: 'Yellow or red high-voltage exclamation warning on the driver digital instrument cluster.' }
    ],
    equipment: ['Fluke 1587 FC 1kV Megohmmeter', 'CAT IV 1000V Certified Insulated Tooling', 'EV High-Voltage Lockout Station', 'Autel MaxiSys EV Scanner'],
    differentiators: [
      { title: 'IMI Level 4 Certified', desc: 'Our technicians hold the highest global qualification for high-voltage vehicle work.' },
      { title: 'Zero High-Voltage Risk', desc: 'Strict NFPA 70E procedures ensure safety for your vehicle and our technical staff.' },
      { title: 'Dealership Alternative', desc: 'We diagnose individual sub-modules rather than telling you to buy a $15,000 new battery pack.' },
      { title: 'Tesla, Toyota & German EV', desc: 'Experienced across Tesla Model 3/Y/S, Toyota Hybrid Synergy Drive, Porsche Taycan and BMW i4.' }
    ],
    comparison: [
      { feature: 'Safety Qualification', generic: 'Uncertified (danger of electrocution & fire)', voltEdge: 'IMI Level 4 & NFPA 70E High-Voltage Certified' },
      { feature: 'Insulation Testing Tooling', generic: 'Standard 12V multimeter (cannot detect HV leak)', voltEdge: 'Fluke 1,000V calibrated Megohmmeter isolation tester' },
      { feature: 'High-Voltage Isolation', generic: 'Dealer only option (charges huge markups)', voltEdge: 'Independent master lab with OEM factory test equipment' },
      { feature: 'Diagnostic Approach', generic: 'Replaces entire battery pack ($10k - $20k)', voltEdge: 'Pinpoints contactor, fuse, or coolant sensor fault' }
    ],
    pricing: [
      {
        name: 'High-Voltage Safety Isolation Check',
        price: '$199',
        time: '1 - 2 hours',
        desc: 'Comprehensive 1,000V insulation resistance check and battery health analysis.',
        features: [
          'Full 1,000V Megohmmeter chassis isolation scan',
          'High-Voltage Interlock Loop (HVIL) continuity test',
          'Individual cell voltage variance & SOH analysis',
          'Diagnostic report with printable insulation megaohm values'
        ],
        featured: false
      },
      {
        name: 'DC-DC Converter & Contactor Diagnostics',
        price: '$349',
        time: '2 - 3 hours',
        desc: 'Complete troubleshooting of auxiliary charging, pre-charge resistors, and contactors.',
        features: [
          'Everything in High-Voltage Safety Isolation Check',
          'High-voltage contactor relay coil & resistance test',
          'Pre-charge resistor & pyro-fuse verification',
          'DC-DC converter step-down load analysis',
          'High-voltage safety disconnect certification'
        ],
        featured: true
      },
      {
        name: 'Inverter & High-Voltage System Service',
        price: '$599',
        time: '4 - 5 hours',
        desc: 'Deep-dive inverter IGBT diagnostics, dielectric coolant purge, and pack re-commission.',
        features: [
          'Complete inverter switching pulse wave test',
          'Dielectric coolant flush and vacuum degassing',
          'Isolation fault location and moisture elimination',
          'Post-repair high-voltage validation road test',
          '24-Month high-voltage service warranty'
        ],
        featured: false
      }
    ],
    faqs: [
      { q: 'Is it dangerous for an independent shop to work on hybrid or EV cars?', a: 'Only if they lack certification and proper CAT IV insulated tooling. At VoltEdge, our technicians are IMI Level 4 certified and adhere to strict lock-out/tag-out safety protocols.' },
      { q: 'Why did my hybrid car stop starting when the 12V battery died?', a: 'All hybrids and EVs require the 12V auxiliary battery to boot up vehicle computers and energize high-voltage contactor relays. If the 12V battery fails, the car cannot enter Ready mode.' },
      { q: 'Can you fix an isolation fault without buying a new battery pack?', a: 'Yes! In most cases, isolation faults are caused by external wiring harness chafing, a faulty AC compressor winding, or moisture near the charging port rather than an internal battery failure.' },
      { q: 'Do you work on Tesla vehicles?', a: 'Yes. We have specialized Tesla diagnostic software and tooling to service high-voltage contactors, 12V/16V lithium auxiliary systems, and DC-DC systems on Model S, 3, X, and Y.' }
    ]
  },

  6: {
    id: 6,
    slug: 'jump-start-rescue',
    shortName: 'Roadside Rescue',
    category: '24/7 Rapid Mobile Response',
    badge: '24/7 Rapid Response Dispatch',
    title: 'Rapid Roadside Jump-Start & Mobile Electrical Rescue',
    image: 'assets/images/detail_service_6_jump.jpg',
    paratext: 'Surge-protected capacitor boost starting designed to safeguard sensitive vehicle ECUs, on-spot battery swapping, mobile alternator charging analysis, and emergency fuse repairs.',
    priceFrom: '$79',
    quickSpecs: {
      turnaround: '28 Min Avg Arrival',
      warranty: 'On-Spot Guarantee',
      lab: 'Mobile Unit 7',
      rating: '4.99 / 5.0'
    },
    telemetry: {
      title: 'MOBILE RESCUE TELEMETRY',
      tag: 'SURGE PROTECTED',
      stats: [
        { label: 'Boost Starting Clamp', val: '12.0 V Regulated' },
        { label: 'Voltage Spike Clamping', val: '< 0.05 V Max Peak' },
        { label: 'Mobile Dispatch Range', val: '35 Miles Metro' }
      ]
    },
    context: {
      narrative: 'Modern vehicles are filled with sensitive digital electronic control units that can be fried instantly by traditional jumper cables or uncontrolled tow truck booster packs. Connecting standard booster cables can send inductive voltage spikes exceeding 50 volts through your car CAN-bus system, damaging ECUs and steering racks. VoltEdge mobile rescue vans are equipped with ultracapacitor surge-clamped jump starting units, mobile diagnostic scanners, and a full inventory of fresh AGM and Lithium batteries to get you safely back on the road in minutes.',
      bullets: [
        'Commercial ultracapacitor booster packs with zero voltage overshoot or reverse-polarity risk',
        'Fully stocked mobile battery inventory (AGM, EFB, Flooded) with on-spot computerized registration',
        'Instant mobile alternator and starter testing before you drive away',
        'Emergency no-start diagnosis to determine if the failure is fuel, ignition, or electrical'
      ]
    },
    protocol: [
      { num: '01', title: 'Rapid GPS Dispatch', desc: 'Technician dispatched immediately with real-time SMS arrival tracking (average 28 mins).' },
      { num: '02', title: 'Pre-Boost Voltage Check', desc: 'Test battery resting voltage and verify vehicle electrical integrity before connecting power.' },
      { num: '03', title: 'Surge-Protected Boost', desc: 'Apply regulated 12.0V clamped ultracapacitor power to start the vehicle safely with zero ECU risk.' },
      { num: '04', title: 'Alternator Charging Scan', desc: 'Verify the alternator is actively recharging the battery and clear temporary low-voltage codes.' }
    ],
    symptoms: [
      { title: 'Stranded in Parking Lot / Home', desc: 'Car will not crank or start after being parked at work, home, or shopping center.' },
      { title: 'Rapid Clicking Noises', desc: 'Starter makes rapid chatter noises due to insufficient battery amperage.' },
      { title: 'Key Fob Not Detected', desc: 'Vehicle electronics completely dark, doors will not unlock, or push-button start does not light up.' },
      { title: 'After Jump-Start Engine Dies', desc: 'Car dies immediately as soon as booster cables are disconnected, indicating an alternator failure.' }
    ],
    equipment: ['Ultracapacitor 12V/24V Clamped Booster', 'Handheld Midtronics MDX Mobile', 'Mobile BMS Coding Tablet', 'Mobile AGM Battery Stock'],
    differentiators: [
      { title: 'Zero ECU Spike Risk', desc: 'Our clamped ultracapacitors guarantee voltage never exceeds 14.4V, protecting your computers.' },
      { title: 'On-Spot Battery Replacement', desc: 'If your battery is dead, we install a new AGM battery and perform BMS coding right on the spot.' },
      { title: 'Fast 28-Min Dispatch', desc: 'Dedicated mobile units stationed strategically across metropolitan hubs for rapid response.' },
      { title: 'Certified Master Techs', desc: 'Our mobile operators are real auto electricians, not generic tow truck drivers.' }
    ],
    comparison: [
      { feature: 'Jump Starting Tool', generic: 'Generic jumper cables or crude booster box (can spike 30V+)', voltEdge: 'Clamped Ultracapacitor booster unit (zero spike guarantee)' },
      { feature: 'Vehicle Computer Protection', generic: 'None (risk of blowing expensive ECUs)', voltEdge: 'Reverse polarity & high-voltage surge clamping' },
      { feature: 'On-Site Diagnostic Ability', generic: 'Can only jump start; leaves you stranded if alternator is bad', voltEdge: 'Tests alternator charging & battery health before leaving' },
      { feature: 'Battery Replacement Option', generic: 'Tows car to shop (costs towing fee + wait)', voltEdge: 'Installs new AGM battery and codes BMS on the spot' }
    ],
    pricing: [
      {
        name: 'Surge-Protected Emergency Boost',
        price: '$79',
        time: '30 mins',
        desc: 'Safe emergency jump-start with mobile alternator charging verification.',
        features: [
          'Ultra-capacitor zero-spike jump starting',
          'On-site battery state-of-health test',
          'Alternator charging rate verification',
          'Terminal wire corrosion cleaning'
        ],
        featured: false
      },
      {
        name: 'Mobile Battery Delivery & Install',
        price: '$159',
        time: '45 mins',
        desc: 'On-spot battery replacement with memory saver backup & BMS reset (plus battery cost).',
        features: [
          'Everything in Emergency Boost',
          'On-the-spot installation of premium battery',
          'Memory saver tool preserves vehicle settings',
          'Computerized BMS registration in ECU',
          'Old battery removal & eco-recycling'
        ],
        featured: true
      },
      {
        name: 'Mobile No-Start Emergency Diagnostic',
        price: '$189',
        time: '60 mins',
        desc: 'In-depth mobile troubleshooting if the vehicle cranks but will not start.',
        features: [
          'Mobile ECU scan for immobilizer & crank errors',
          'Fuel pump relay & ignition spark verification',
          'Main fuse and fusible link testing',
          'Clear false low-voltage trouble codes',
          'Direct referral credit if bay towing needed'
        ],
        featured: false
      }
    ],
    faqs: [
      { q: 'Can jumping a car with cables really destroy the computer?', a: 'Yes! When jumper cables are disconnected while the engine is running, an inductive load dump spike can send up to 60 volts surging through sensitive semiconductors, destroying engine computers and digital instrument clusters.' },
      { q: 'How quickly can your mobile unit reach me?', a: 'Our mobile response units are stationed around primary metropolitan expressways. Our average arrival time is 28 minutes from dispatch.' },
      { q: 'What if my car still will not start after the jump?', a: 'Our mobile technician is an auto electrician with full diagnostic gear. If the issue is a dead alternator, blown fuse, or starter issue, we diagnose the exact cause on site and can coordinate priority transport to our lab.' },
      { q: 'Do you carry batteries for European luxury cars on your mobile trucks?', a: 'Yes! Our mobile vans stock top-tier AGM batteries conforming to European H6/Group 48, H7/Group 94R, and H8/Group 49 standards, ready for instant installation and BMS adaptation.' }
    ]
  }
};

/* ==========================================================================
   DOM Initialization & Routing
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initMobileNavigation();
  initModals();
  initToast();

  // Load and render active service
  const activeServiceId = getActiveServiceIdFromUrl();
  renderServiceDetail(activeServiceId);
  renderSwitcherPills(activeServiceId);

  // Listen to browser forward/back buttons
  window.addEventListener('popstate', () => {
    const poppedId = getActiveServiceIdFromUrl();
    renderServiceDetail(poppedId);
    updateActiveSwitcherPill(poppedId);
  });
});

/* ==========================================================================
   Routing Helper: Get ID from URL
   ========================================================================== */
function getActiveServiceIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get('id');
  const serviceParam = params.get('service');

  if (idParam && SERVICES_DATA[idParam]) {
    return parseInt(idParam, 10);
  }

  if (serviceParam) {
    for (const key in SERVICES_DATA) {
      if (SERVICES_DATA[key].slug === serviceParam) {
        return parseInt(key, 10);
      }
    }
  }

  // Default to Service 1 if no param or invalid
  return 1;
}

/* ==========================================================================
   Render Quick Service Switcher Bar
   ========================================================================== */
function renderSwitcherPills(activeId) {
  const pillsContainer = document.getElementById('switcher-pills');
  if (!pillsContainer) return;

  pillsContainer.innerHTML = '';

  for (const id in SERVICES_DATA) {
    const s = SERVICES_DATA[id];
    const isCurrent = parseInt(id, 10) === activeId;

    const pill = document.createElement('button');
    pill.className = `switcher-pill ${isCurrent ? 'active' : ''}`;
    pill.setAttribute('data-id', id);
    pill.setAttribute('role', 'tab');
    pill.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    pill.innerHTML = `
      <span>${s.id}. ${s.shortName}</span>
      <span style="font-size:0.72rem;opacity:0.8;">(${s.priceFrom})</span>
    `;

    pill.addEventListener('click', () => {
      navigateToService(parseInt(id, 10));
    });

    pillsContainer.appendChild(pill);
  }
}

function updateActiveSwitcherPill(activeId) {
  const pills = document.querySelectorAll('.switcher-pill');
  pills.forEach(pill => {
    const id = parseInt(pill.getAttribute('data-id'), 10);
    const isCurrent = id === activeId;
    if (isCurrent) {
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
    } else {
      pill.classList.remove('active');
      pill.setAttribute('aria-selected', 'false');
    }
  });
}

function navigateToService(newId) {
  if (!SERVICES_DATA[newId]) return;

  // Update browser URL history without reloading
  const newUrl = `service detail.html?id=${newId}`;
  window.history.pushState({ serviceId: newId }, '', newUrl);

  // Re-render view
  renderServiceDetail(newId);
  updateActiveSwitcherPill(newId);

  // Smooth scroll to top of main content
  const mainElem = document.getElementById('service-detail-main');
  if (mainElem) {
    window.scrollTo({
      top: mainElem.offsetTop - 140,
      behavior: 'smooth'
    });
  }

  showToast(`Loaded ${SERVICES_DATA[newId].shortName} Technical File`);
}

/* ==========================================================================
   Render Service Detail Content
   ========================================================================== */
function renderServiceDetail(serviceId) {
  const service = SERVICES_DATA[serviceId] || SERVICES_DATA[1];
  const wrapper = document.getElementById('service-detail-content-wrapper');
  if (!wrapper) return;

  // Update Page Title
  document.title = `${service.title} | VoltEdge Auto Electrical`;

  // Build Telemetry Rows
  const telemetryRowsHtml = service.telemetry.stats.map(stat => `
    <div class="telemetry-stat-item">
      <span class="stat-meta">${stat.label}</span>
      <span class="stat-value highlight-gold">${stat.val}</span>
    </div>
  `).join('');

  // Build Context Capability Micro-Cards
  const contextBulletsHtml = service.context.bullets.map((bullet, idx) => `
    <div class="context-bullet-item" id="context-capability-${idx + 1}">
      <div class="context-bullet-icon-box">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" class="bullet-check-svg">
          <path d="M4.5 10.5l4 4L16 6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="context-bullet-content">
        <div class="bullet-tag-row">
          <span class="bullet-tag">PROTOCOL 0${idx + 1}</span>
          <span class="bullet-status-badge">OEM VERIFIED</span>
        </div>
        <p class="bullet-text">${bullet}</p>
      </div>
    </div>
  `).join('');

  // Build 4-Phase Protocol Steps with Luxury Aerospace Roadmap Cards
  const protocolStepsHtml = service.protocol.map(step => `
    <div class="protocol-step-card">
      <div class="step-card-topbar">
        <span class="step-phase-badge">PHASE ${step.num}</span>
        <span class="step-status-chip">CERTIFIED</span>
      </div>
      <div class="step-number">${step.num}</div>
      <div class="step-card-divider"></div>
      <h4 class="step-title">${step.title}</h4>
      <p class="step-desc">${step.desc}</p>
    </div>
  `).join('');

  // Build Warning Symptoms Cards with Supercar Hazard Alert Styling
  const symptomsHtml = service.symptoms.map(sym => `
    <div class="symptom-card">
      <div class="symptom-card-header">
        <div class="symptom-icon-box">
          <svg class="symptom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <span class="symptom-alert-tag">ANOMALY WARNING</span>
      </div>
      <h4 class="symptom-title">${sym.title}</h4>
      <p class="symptom-desc">${sym.desc}</p>
    </div>
  `).join('');

  // Build Equipment Pills with Metallic Accent and Green Pulse Dot
  const equipmentPillsHtml = service.equipment.map(eq => `
    <div class="equipment-pill">
      <span class="eq-dot"></span>
      <span class="eq-name">${eq}</span>
    </div>
  `).join('');

  // Build Differentiators Cards with Luxury Structured Layout (Zero Clipping, Harmonized Baselines & Docked Telemetry)
  const diffsHtml = service.differentiators.map((diff, idx) => {
    const metaPills = ['OEM PROTOCOL', 'HEAVY-DUTY', 'SIGNAL ACCURACY', 'WARRANTY'];
    const pillBadges = ['OEM SPEC', 'HD GRADE', 'ZERO DROP', 'CERTIFIED'];
    const statusTags = ['Live Verified', 'Dyno Spec', 'Calibrated', '100% Backed'];
    const statLabels = [
      { lbl1: 'Tolerance', val1: '0.01% Error', lbl2: 'Standard', val2: 'OEM Spec' },
      { lbl1: 'Hardware', val1: 'Heavy-Duty', lbl2: 'Rating', val2: 'Industrial' },
      { lbl1: 'Wave Trace', val1: 'PicoScope®', lbl2: 'Grounding', val2: 'Zero Drop' },
      { lbl1: 'Warranty', val1: 'Nationwide', lbl2: 'Coverage', val2: '100% Free' }
    ];
    const stat = statLabels[idx % statLabels.length];
    const isEmerald = (idx === 1 || idx === 3);

    return `
      <div class="diff-feature-box ${isEmerald ? 'box-emerald' : ''}" id="diff-card-${idx + 1}">
        <!-- Top Status Bar: Step Badge & Category on Left, Live Indicator on Right (Full Width, Zero Clipping) -->
        <div class="diff-card-topbar">
          <div class="diff-badge-suite">
            <span class="diff-step-num ${isEmerald ? 'step-emerald' : ''}">0${idx + 1}</span>
            <span class="diff-spec-tag ${isEmerald ? 'tag-emerald' : ''}">${pillBadges[idx]}</span>
          </div>
          <div class="diff-live-indicator">
            <span class="diff-live-dot ${isEmerald ? 'dot-emerald' : ''}"></span>
            <span class="diff-live-text">${statusTags[idx]}</span>
          </div>
        </div>

        <!-- Luxury Feature Icon Suite with Spec Metadata -->
        <div class="diff-icon-row">
          <div class="diff-icon-wrap ${isEmerald ? 'icon-emerald' : ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${getDiffIconSvgPath(idx)}
            </svg>
          </div>
          <div class="diff-spec-meta">
            <span class="diff-meta-eyebrow">LAB STANDARD</span>
            <span class="diff-meta-val ${isEmerald ? 'val-emerald' : ''}">${metaPills[idx]}</span>
          </div>
        </div>

        <div class="diff-card-divider"></div>

        <!-- Aligned Headings Suite: Fixed Baseline & Height Across All Cards -->
        <div class="diff-heading-suite">
          <h3 class="diff-title">${diff.title}</h3>
          <p class="diff-kicker">Core Value 0${idx + 1} &bull; ${metaPills[idx]}</p>
        </div>

        <p class="diff-desc">${diff.desc}</p>

        <!-- Symmetrical High-Precision Telemetry Bar Docked at Base -->
        <div class="diff-telemetry-bar">
          <div class="diff-telemetry-cell">
            <span class="diff-tel-lbl">${stat.lbl1}</span>
            <span class="diff-tel-val highlight-gold">${stat.val1}</span>
          </div>
          <div class="diff-telemetry-sep"></div>
          <div class="diff-telemetry-cell">
            <span class="diff-tel-lbl">${stat.lbl2}</span>
            <span class="diff-tel-val highlight-green">${stat.val2}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Build Comparison Rows with Symmetrical Circular Badges & Aligned Baselines
  const compRowsHtml = service.comparison.map((row, idx) => `
    <tr>
      <td class="metric-cell">
        <div class="metric-cell-inner">
          <span class="metric-index">0${idx + 1}</span>
          <span class="metric-title">${row.feature}</span>
        </div>
      </td>
      <td class="generic-cell">
        <div class="comp-cell-inner">
          <span class="matrix-status-icon status-cross">✕</span>
          <span class="generic-text">${row.generic}</span>
        </div>
      </td>
      <td class="highlight-col volt-champ-cell">
        <div class="comp-cell-inner champ-cell">
          <span class="matrix-status-icon status-check">
            <svg viewBox="0 0 16 16" fill="currentColor" class="matrix-check-svg">
              <path d="M13.485 3.515a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 1 1 1.414-1.414L6 10.086l6.293-6.293a1 1 0 0 1 1.414 0z"/>
            </svg>
          </span>
          <span class="voltedge-text">${row.voltEdge}</span>
        </div>
      </td>
    </tr>
  `).join('');

  // Build Pricing Tier Cards with Luxury Ribbon & Space Grotesk Typography
  const pricingTiersHtml = service.pricing.map(tier => `
    <div class="pricing-tier-card ${tier.featured ? 'featured' : ''}">
      ${tier.featured ? `
        <div class="tier-ribbon">
          <span class="ribbon-star">★</span>
          <span>MASTER WORKSHOP SPEC</span>
        </div>
      ` : ''}
      <div class="tier-top-row">
        <h3 class="tier-name">${tier.name}</h3>
        <span class="tier-time-badge">${tier.time}</span>
      </div>
      <p class="tier-desc">${tier.desc}</p>
      <div class="tier-price-box">
        <span class="tier-price">${tier.price}</span>
        <span class="tier-period">/ complete procedure</span>
      </div>
      <ul class="tier-features-list">
        ${tier.features.map(f => `
          <li>
            <span class="tier-feature-check">✓</span>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>
      <button class="btn ${tier.featured ? 'btn-primary' : 'btn-secondary'} tier-book-btn" onclick="openBookingWithTier('${service.title} - ${tier.name} (${tier.price})')">
        <span>Book Priority Slot</span>
        <svg class="btn-arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor">
          <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `).join('');

  // Build Service FAQs
  const faqsHtml = service.faqs.map((faq, index) => `
    <div class="faq-accordion-item ${index === 0 ? 'active' : ''}">
      <button class="faq-accordion-header" aria-expanded="${index === 0 ? 'true' : 'false'}">
        <span class="faq-question">${faq.q}</span>
        <span class="faq-accordion-icon">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 6L8 10L12 6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </button>
      <div class="faq-accordion-content">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join('');

  // Helper function for secondary layered image (Exact Home 1 Image Alignment 2 Reference)
  function getSecondaryImageForService(id) {
    const secondaryMap = {
      1: 'assets/images/electrical_diagnostics.jpg',
      2: 'assets/images/battery_testing.jpg',
      3: 'assets/images/alternator_repair.jpg',
      4: 'assets/images/wiring_repair.jpg',
      5: 'assets/images/home2_hero_ev.jpg',
      6: 'assets/images/jump_start.jpg'
    };
    return secondaryMap[id] || 'assets/images/electrical_diagnostics.jpg';
  }

  // Helper function for luxury headline gradient highlight matching Home 1
  function formatHeadlineHighlight(title) {
    if (title.includes('&')) {
      const parts = title.split('&');
      return `${parts[0].trim()} &amp; <span class="hero-headline-highlight">${parts[1].trim()}</span>`;
    }
    return title;
  }

  // Assemble Complete Page Structure
  wrapper.innerHTML = `
    <!-- 1. DETAIL HERO BANNER (EXACT HOME 1 LUXURY REFERENCE & FIT-TO-SCREEN) -->
    <section class="detail-hero-section" id="detail-hero">
      <div class="detail-hero-bg-media">
        <img 
          src="assets/images/hero_neon_garage.jpg" 
          alt="VOLTERRA Master Auto Electrical Diagnostics and High-Voltage Workshop" 
          class="detail-hero-bg-img"
          loading="eager"
        >
        <div class="detail-hero-overlay"></div>
      </div>
      <div class="detail-hero-ambient-glow"></div>
      <div class="detail-hero-ambient-glow-left"></div>

      <div class="container detail-hero-container">
        <!-- Left: Paratext Content -->
        <div class="detail-hero-content">
          <div class="detail-hero-badge">
            <span class="pulse-indicator"></span>
            <span class="badge-text">${service.badge}</span>
          </div>

          <h1 class="detail-hero-headline">
            ${formatHeadlineHighlight(service.title)}
          </h1>

          <p class="detail-hero-paratext">
            ${service.paratext}
          </p>

          <div class="detail-hero-actions">
            <button class="btn btn-primary" onclick="openBookingWithTier('${service.title} (From ${service.priceFrom})')">
              <span>Book Priority Bay</span>
              <svg class="btn-arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <a href="#lab-oscilloscope" class="btn btn-secondary">
              <span>Interactive Lab Scope</span>
            </a>
          </div>

          <!-- Hero Metrics Grid (Exact Home 1 Reference) -->
          <div class="detail-hero-metrics-grid">
            <div class="metric-card">
              <div class="metric-number">${service.quickSpecs.turnaround}</div>
              <div class="metric-label">Turnaround</div>
            </div>
            <div class="metric-divider"></div>
            <div class="metric-card">
              <div class="metric-number highlight-gold">${service.quickSpecs.warranty}</div>
              <div class="metric-label">Warranty</div>
            </div>
            <div class="metric-divider"></div>
            <div class="metric-card">
              <div class="metric-number highlight-green">${service.quickSpecs.rating}</div>
              <div class="metric-label">Satisfaction</div>
            </div>
          </div>
        </div>

        <!-- Right: Image Alignment 2 (Two layered premium automotive images + telemetry badge) -->
        <div class="detail-hero-image-alignment-2">
          <!-- Primary Main Image Card -->
          <div class="detail-hero-image-wrapper primary-image-card">
            <img 
              src="${service.image}" 
              alt="${service.title}" 
              class="hero-img img-main"
              loading="eager"
            >
            <div class="image-gradient-overlay"></div>
            <div class="card-status-pill">
              <span class="status-pulse-dot"></span>
              <span>${service.category}</span>
            </div>
          </div>

          <!-- Secondary Offset Image Card -->
          <div class="detail-hero-image-wrapper secondary-image-card">
            <img 
              src="${getSecondaryImageForService(service.id)}" 
              alt="${service.shortName} Laboratory Bench" 
              class="hero-img img-secondary"
              loading="eager"
            >
            <div class="image-gradient-overlay"></div>
            <div class="card-status-pill bottom-pill">
              <span class="status-pulse-dot gold"></span>
              <span>${service.quickSpecs.lab}</span>
            </div>
          </div>

          <!-- Overlapping Precision Telemetry HUD Card -->
          <div class="detail-telemetry-hud-card">
            <div class="telemetry-top-row">
              <span class="telemetry-status-light"></span>
              <span class="telemetry-bus-label">${service.telemetry.title}</span>
              <span class="telemetry-status-val">${service.telemetry.tag}</span>
            </div>
            <div class="telemetry-metrics-list">
              ${service.telemetry.stats.map(s => `
                <div class="metric-row">
                  <span class="metric-key">${s.label}</span>
                  <span class="metric-val highlight-gold">${s.val}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 1.5 INTERACTIVE LAB OSCILLOSCOPE SECTION -->
    <section class="oscilloscope-section" id="lab-oscilloscope">
      <div class="scope-ambient-glow"></div>
      <div class="container">
        <div class="oscilloscope-card">
          <div class="oscilloscope-topbar">
            <div class="oscilloscope-header-title">
              <div class="scope-pulse-dot"></div>
              <div>
                <h3 class="scope-heading">Laboratory Digital Waveform Oscilloscope</h3>
                <p class="scope-subheading">PicoScope 4425A Live Signal Acquisition Bench &bull; Real-Time Bus &amp; Voltage Profiling</p>
              </div>
            </div>
            <div class="scope-controls-bar">
              <span class="scope-badge-live">LIVE PROBE ACTIVE</span>
              <button class="scope-ctrl-btn active" id="scope-btn-ch1" data-ch="1">CH 1: Signal Wave</button>
              <button class="scope-ctrl-btn active" id="scope-btn-ch2" data-ch="2">CH 2: Ground / Ref</button>
              <button class="scope-ctrl-btn" id="scope-btn-speed">Speed: 5 ms/div</button>
              <button class="scope-ctrl-btn scope-fault-btn" id="scope-btn-fault">⚡ Inject Signal Glitch</button>
            </div>
          </div>

          <div class="oscilloscope-screen-wrap">
            <canvas id="waveform-canvas" class="waveform-canvas" width="1100" height="240"></canvas>
          </div>

          <div class="oscilloscope-readouts-bar">
            <div class="readout-card">
              <span class="readout-label">Peak-To-Peak (Vp-p)</span>
              <span class="readout-value" id="scope-readout-vpp">3.52 V</span>
            </div>
            <div class="readout-card">
              <span class="readout-label">Signal Frequency</span>
              <span class="readout-value" id="scope-readout-freq">500.0 kHz</span>
            </div>
            <div class="readout-card">
              <span class="readout-label">Signal Integrity Score</span>
              <span class="readout-value readout-status-good" id="scope-readout-health">99.4% Pass</span>
            </div>
            <div class="readout-card">
              <span class="readout-label">Active Channel Protocol</span>
              <span class="readout-value" id="scope-readout-protocol">${service.badge}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. THIS SERVICE CONTEXT SECTION (TECHNICAL ARCHITECTURE) -->
    <section class="service-context-section" id="service-context">
      <div class="context-ambient-glow"></div>
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">
            <span class="tag-pulse-dot"></span>
            <span>Technical Architecture</span>
          </span>
          <h2 class="section-title">Context &amp; Engineering Methodology</h2>
          <p class="section-subtitle">
            An inside look at our diagnostic protocols, micro-circuit tracing standards, and certified OEM procedures.
          </p>
        </div>

        <!-- High-Precision Engineering Architecture Showcase -->
        <div class="context-overview-box">
          <!-- Engineering Header Bar with Telemetry Status -->
          <div class="context-box-topbar">
            <div class="context-topbar-left">
              <span class="context-pulse-indicator"></span>
              <span class="context-protocol-code">OEM SPECIFICATION BENCHMARK // ${service.category.toUpperCase()}</span>
            </div>
            <div class="context-topbar-right">
              <span class="context-iso-pill">
                <svg viewBox="0 0 16 16" fill="currentColor" class="shield-mini-svg">
                  <path d="M8 0L2 3v5c0 4.2 3.8 7.6 6 8 2.2-.4 6-3.8 6-8V3L8 0z"/>
                </svg>
                <span>ISO 14229 / UDS COMPLIANT</span>
              </span>
            </div>
          </div>

          <div class="context-box-body">
            <!-- Narrative Lead with Gold Precision Rail -->
            <div class="context-narrative-container">
              <div class="context-rail-accent"></div>
              <div class="context-narrative-content">
                <span class="context-label-micro">METHODOLOGY &amp; LABORATORY STANDARDS</span>
                <p class="context-narrative">${service.context.narrative}</p>
              </div>
            </div>

            <!-- 4 Architecture Capability Micro-Cards Grid -->
            <div class="context-capabilities-divider">
              <span class="divider-line"></span>
              <span class="divider-pill">CERTIFIED DIAGNOSTIC &amp; EXECUTION CAPABILITIES</span>
              <span class="divider-line"></span>
            </div>

            <div class="context-bullets-grid">
              ${contextBulletsHtml}
            </div>
          </div>
        </div>

        <!-- 4-Phase Protocol Steps -->
        <h3 class="protocol-heading">Our 4-Phase Execution Protocol</h3>
        <div class="protocol-steps-grid">
          ${protocolStepsHtml}
        </div>

        <!-- Diagnostic Warning Symptoms -->
        <h3 class="symptoms-heading">Symptoms Indicating Your Vehicle Needs This Service</h3>
        <div class="symptoms-grid">
          ${symptomsHtml}
        </div>

        <!-- Specialized OEM Equipment Showcase -->
        <div class="equipment-showcase">
          <div class="equipment-label">
            <div class="equipment-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <div class="equipment-title-wrap">
              <span class="equipment-lead-tag">LAB BENCH INVENTORY</span>
              <h4>Certified Lab Equipment Deployed:</h4>
              <div class="equipment-meta-status">
                <span class="eq-dot"></span>
                <span>4 NIST-Traceable Calibrated Standards</span>
              </div>
            </div>
          </div>
          <div class="equipment-pills">
            ${equipmentPillsHtml}
          </div>
        </div>
      </div>
    </section>

    <!-- 2.5 VEHICLE COMPATIBILITY & OEM PROTOCOL ANALYZER -->
    <section class="compat-checker-section" id="vehicle-compatibility">
      <div class="compat-ambient-glow"></div>
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">
            <span class="tag-pulse-dot"></span>
            <span>Manufacturer Coverage</span>
          </span>
          <h2 class="section-title">OEM Protocol &amp; Diagnostic Tool Parity</h2>
          <p class="section-subtitle">
            Explore dedicated dealer-level hardware, proprietary communication buses, and turnaround standards for your vehicle marque.
          </p>
        </div>

        <div class="compat-analyzer-card">
          <div class="compat-brand-tabs" id="compat-brand-tabs">
            <!-- Brand pills generated dynamically -->
          </div>

          <div class="compat-results-grid" id="compat-results-grid">
            <!-- Populated dynamically based on selected vehicle brand -->
          </div>
        </div>
      </div>
    </section>

    <!-- 3. WHY CHOOSE THIS SERVICE -->
    <section class="why-choose-section" id="why-choose">
      <div class="why-ambient-glow"></div>
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">
            <span class="tag-pulse-dot"></span>
            <span>VoltEdge Advantage</span>
          </span>
          <h2 class="section-title">Why Choose VoltEdge For This Service?</h2>
          <p class="section-subtitle">
            We deliver dealership-grade precision with independent workshop honesty, backed by certified master auto electricians.
          </p>
        </div>

        <div class="differentiators-grid">
          ${diffsHtml}
        </div>

        <!-- Comparison Table -->
        <div class="comparison-wrapper">
          <div class="comparison-topbar">
            <div class="comp-topbar-left">
              <span class="comp-pulse-dot"></span>
              <span class="comp-topbar-title">LABORATORY CAPABILITY MATRIX // VOLTEDGE STANDARDS VS STANDARD WORKSHOPS</span>
            </div>
            <span class="comp-topbar-badge">99.4% BENCHMARK PASS</span>
          </div>
          <table class="comparison-table">
            <thead>
              <tr>
                <th style="width:28%;">
                  <div class="th-suite">
                    <span class="th-main-title">Evaluation Metric</span>
                    <span class="th-subtag">LAB PROTOCOL SPEC</span>
                  </div>
                </th>
                <th style="width:34%;">
                  <div class="th-suite">
                    <span class="th-main-title">Standard Mechanical Workshop</span>
                    <span class="th-subtag">GENERIC STANDARD</span>
                  </div>
                </th>
                <th class="highlight-col" style="width:38%;">
                  <div class="th-suite th-champ-suite">
                    <div class="th-champ-heading">
                      <span class="th-main-title">VoltEdge Master Electrical Lab</span>
                      <span class="champ-gold-badge">★ BENCHMARK</span>
                    </div>
                    <span class="th-subtag th-subtag-champ">OEM CERTIFIED PARITY</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              ${compRowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 4. PRICING OF THIS SERVICE -->
    <section class="service-pricing-section" id="service-pricing">
      <div class="pricing-ambient-glow"></div>
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">
            <span class="tag-pulse-dot"></span>
            <span>Transparent Pricing</span>
          </span>
          <h2 class="section-title">Transparent Service Packages &amp; Pricing</h2>
          <p class="section-subtitle">
            Honest upfront pricing with no hidden diagnostic surcharges or unwarranted component replacements.
          </p>
        </div>

        <div class="pricing-tiers-grid">
          ${pricingTiersHtml}
        </div>
      </div>
    </section>

    <!-- 4.5 INTERACTIVE SERVICE COST ESTIMATOR & BAY CUSTOMIZER -->
    <section class="service-calculator-section" id="service-calculator">
      <div class="calc-ambient-glow"></div>
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">
            <span class="tag-pulse-dot"></span>
            <span>Custom Bay Configurator</span>
          </span>
          <h2 class="section-title">Configure Your Custom Diagnostic Bay</h2>
          <p class="section-subtitle">
            Select your vehicle class and add specialized diagnostic modules to tailor an upfront itemized service package.
          </p>
        </div>

        <div class="calc-master-box">
          <div class="calc-grid-layout">
            <div class="calc-options-col">
              <div class="calc-field-group">
                <label class="calc-field-label">1. Base Service Tier</label>
                <select class="calc-select" id="calc-base-tier">
                  <!-- Populated from service.pricing -->
                </select>
              </div>

              <div class="calc-field-group">
                <label class="calc-field-label">2. Vehicle Class Architecture</label>
                <select class="calc-select" id="calc-vehicle-class">
                  <option value="1.0" selected>Standard Domestic / Asian (12V System)</option>
                  <option value="1.25">European Luxury &amp; Performance (BMW / Mercedes / Porsche)</option>
                  <option value="1.35">High-Voltage EV &amp; Hybrid Architecture (Tesla / Taycan / E-Tron)</option>
                  <option value="1.4">Commercial Fleet &amp; Heavy-Duty 24V Transporter</option>
                </select>
              </div>

              <div class="calc-field-group">
                <label class="calc-field-label">3. Optional Diagnostic Enhancements</label>
                <div class="calc-addons-list" id="calc-addons-list">
                  <label class="calc-addon-label active" data-addon="45">
                    <div class="calc-addon-left">
                      <input type="checkbox" class="calc-addon-checkbox" checked>
                      <span class="calc-addon-name">4-Channel PicoScope Ground Drop Certification</span>
                    </div>
                    <span class="calc-addon-price">+$45</span>
                  </label>
                  <label class="calc-addon-label" data-addon="55">
                    <div class="calc-addon-left">
                      <input type="checkbox" class="calc-addon-checkbox">
                      <span class="calc-addon-name">24-Hour Quiescent Parasitic Battery Drain Log</span>
                    </div>
                    <span class="calc-addon-price">+$55</span>
                  </label>
                  <label class="calc-addon-label" data-addon="35">
                    <div class="calc-addon-left">
                      <input type="checkbox" class="calc-addon-checkbox">
                      <span class="calc-addon-name">FLIR Thermal Infrared Fuse &amp; Relay Heat Map</span>
                    </div>
                    <span class="calc-addon-price">+$35</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="calc-summary-card">
              <div>
                <div class="calc-summary-header">
                  <h4 class="calc-summary-title">Configured Bay Estimate</h4>
                </div>
                <div class="calc-itemized-rows" id="calc-itemized-rows">
                  <!-- Live rows -->
                </div>
              </div>

              <div>
                <div class="calc-total-box">
                  <span class="calc-total-label">Estimated Total:</span>
                  <span class="calc-total-num" id="calc-total-num">$134</span>
                </div>
                <button class="btn btn-primary full-width" id="calc-book-btn">
                  <span>Book This Configured Bay</span>
                  <svg class="btn-arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                    <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="print-spec-action-wrap">
          <button class="btn-outline-spec" id="btn-print-spec">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>Print / Export Laboratory Diagnostic Spec Sheet</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 5. SERVICE SPECIFIC FAQS -->
    <section class="service-detail-faqs-section" id="service-faqs">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Technical Inquiries</span>
          <h2 class="section-title">Questions Specifically Regarding ${service.shortName}</h2>
          <p class="section-subtitle">
            Detailed answers from our lead master auto electrician to help you make an informed decision.
          </p>
        </div>

        <div class="faq-accordion-container" id="detail-faq-accordion">
          ${faqsHtml}
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
          <h2 class="cta-dark-title">Ready to Reserve This Specialized Service Bay?</h2>
          <p class="cta-dark-subtitle">Lock in your precision diagnostic slot with master telemetry technicians, or speak with an engineering coordinator today.</p>
          <div class="cta-dark-actions">
            <button type="button" class="cta-btn-gold" id="service-detail-cta-reserve-btn" onclick="openBookingWithTier('${service.title} - Express Reservation')">
              <span>Book This Service</span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <a href="contact.html" class="cta-btn-outline-pill" id="service-detail-cta-contact-btn">
              <span>Speak With An Engineer</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;

  // Re-attach accordion listeners for freshly rendered FAQs
  initDetailFaqAccordion();

  // Initialize new interactive widgets
  initOscilloscope(service);
  initVehicleCompatibility(service);
  initServiceCalculator(service);
  initPrintSpec();
}

/* Helper for SVG Icons - Master Precision Automotive Engineering Icons */
function getDiffIconSvgPath(idx) {
  const icons = [
    // 0: High-Precision Dyno / Calibration Bench Meter (Gauge with dial & center jewel)
    '<circle cx="12" cy="12" r="9" stroke-width="2"/><path d="M12 12l4-4" stroke-width="2.2" stroke-linecap="round"/><path d="M8 12a4 4 0 0 1 4-4" stroke-width="2"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/>',
    // 1: Heavy-Duty Energy Surge / High-Voltage Power Spark
    '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-width="2" stroke-linejoin="round"/>',
    // 2: Microsecond Oscilloscope Wave / Circuit Voltage Signal Trace
    '<path d="M2 12h3l2-6 4 12 4-9 2 5h5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    // 3: ISO Certified Master Guarantee Shield with Verification Checkmark
    '<path d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4z" stroke-width="2"/><path d="M9 12l2 2 4-4" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'
  ];
  return icons[idx % icons.length];
}

/* ==========================================================================
   INTERACTIVE LAB OSCILLOSCOPE LOGIC
   ========================================================================== */
let oscilloscopeAnimId = null;

function initOscilloscope(service) {
  const canvas = document.getElementById('waveform-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let ch1Visible = true;
  let ch2Visible = true;
  let sweepSpeed = 5; // ms/div
  let isGlitchActive = false;
  let t = 0;

  // Cancel prior animation frame
  if (oscilloscopeAnimId) {
    cancelAnimationFrame(oscilloscopeAnimId);
  }

  // Channel toggles
  const ch1Btn = document.getElementById('scope-btn-ch1');
  const ch2Btn = document.getElementById('scope-btn-ch2');
  const speedBtn = document.getElementById('scope-btn-speed');
  const faultBtn = document.getElementById('scope-btn-fault');

  if (ch1Btn) {
    ch1Btn.onclick = () => {
      ch1Visible = !ch1Visible;
      ch1Btn.classList.toggle('active', ch1Visible);
    };
  }

  if (ch2Btn) {
    ch2Btn.onclick = () => {
      ch2Visible = !ch2Visible;
      ch2Btn.classList.toggle('active', ch2Visible);
    };
  }

  const speeds = [2, 5, 10];
  let speedIdx = 1;
  if (speedBtn) {
    speedBtn.onclick = () => {
      speedIdx = (speedIdx + 1) % speeds.length;
      sweepSpeed = speeds[speedIdx];
      speedBtn.textContent = `Speed: ${sweepSpeed} ms/div`;
    };
  }

  const readoutHealth = document.getElementById('scope-readout-health');
  if (faultBtn) {
    faultBtn.onclick = () => {
      isGlitchActive = !isGlitchActive;
      faultBtn.classList.toggle('active', isGlitchActive);
      faultBtn.textContent = isGlitchActive ? '⚠ Anomaly Injected' : '⚡ Inject Signal Glitch';

      if (readoutHealth) {
        if (isGlitchActive) {
          readoutHealth.textContent = '62.4% Signal Glitch!';
          readoutHealth.className = 'readout-value readout-status-alert';
        } else {
          readoutHealth.textContent = '99.4% Pass';
          readoutHealth.className = 'readout-value readout-status-good';
        }
      }
    };
  }

  // Draw loop
  function draw() {
    t += 0.05 * (sweepSpeed / 5);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    // 1. Oscilloscope Grid
    ctx.strokeStyle = 'rgba(200, 164, 93, 0.12)';
    ctx.lineWidth = 1;
    const stepX = w / 10;
    const stepY = h / 8;

    for (let x = 0; x <= w; x += stepX) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += stepY) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Center Crosshair
    ctx.strokeStyle = 'rgba(200, 164, 93, 0.25)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Channel 1 Waveform (Gold / Primary)
    if (ch1Visible) {
      ctx.strokeStyle = '#C8A45D';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(200, 164, 93, 0.6)';
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const centerY = h * 0.45;
      const amplitude = h * 0.22;

      for (let x = 0; x < w; x++) {
        let waveY = 0;
        const normX = x * 0.03 + t;

        // Custom waveforms based on service ID
        if (service.id === 1) {
          // CAN-Bus square pulse train with differential edges
          const pulse = Math.sin(normX) > 0 ? 1 : -1;
          waveY = centerY - pulse * amplitude * 0.65;
          if (isGlitchActive && x > w * 0.45 && x < w * 0.58) {
            waveY += Math.sin(x * 0.5) * 45; // Corrupt frame glitch
          }
        } else if (service.id === 2) {
          // Conductance sine wave
          waveY = centerY + Math.sin(normX) * amplitude * 0.75 + Math.sin(normX * 3) * 6;
          if (isGlitchActive) waveY += Math.random() * 20 - 10;
        } else if (service.id === 3) {
          // Alternator 3-phase rectified ripple
          const ripple = Math.abs(Math.sin(normX * 2)) * amplitude * 0.5;
          waveY = centerY - ripple;
          if (isGlitchActive && Math.sin(normX) > 0.5) waveY += amplitude * 0.6; // Open diode drop
        } else if (service.id === 4) {
          // Quiescent parasitic drop curve
          const decay = amplitude * 0.6 / (1 + (x / 200));
          waveY = centerY + decay + Math.sin(normX * 0.2) * 5;
          if (isGlitchActive && x % 120 < 25) waveY -= 35; // Periodic wake-up spike
        } else if (service.id === 5) {
          // High-Voltage Interlock square wave
          const sq = (Math.sin(normX * 1.5) > 0 ? 1 : 0);
          waveY = centerY - sq * amplitude * 0.8;
          if (isGlitchActive) waveY += Math.sin(x * 0.3) * 30;
        } else {
          // Starter transient drop
          waveY = centerY + Math.sin(normX * 0.8) * amplitude * 0.5;
        }

        if (x === 0) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // 3. Channel 2 Waveform (Teal / Green Ground Reference)
    if (ch2Visible) {
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(16, 185, 129, 0.5)';
      ctx.shadowBlur = 6;
      ctx.beginPath();

      const centerY = h * 0.72;
      const amplitude = h * 0.16;

      for (let x = 0; x < w; x++) {
        let waveY = 0;
        const normX = x * 0.03 + t;

        if (service.id === 1) {
          // CAN-Low inverted differential signal
          const pulse = Math.sin(normX) > 0 ? -1 : 1;
          waveY = centerY - pulse * amplitude * 0.65;
          if (isGlitchActive && x > w * 0.45 && x < w * 0.58) {
            waveY -= Math.sin(x * 0.5) * 45;
          }
        } else {
          // Reference ground trace with minor chassis noise
          waveY = centerY + Math.sin(normX * 1.2) * 4 + (Math.random() * 2 - 1);
          if (isGlitchActive) waveY += (Math.random() * 12 - 6);
        }

        if (x === 0) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    oscilloscopeAnimId = requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================================================
   VEHICLE COMPATIBILITY & OEM PROTOCOL ANALYZER
   ========================================================================== */
const OEM_PROFILES = {
  'BMW': {
    tool: 'BMW ISTA-D/P & Rheingold OEM Online',
    bus: 'FlexRay, CAN-FD, UDS over DoIP Ethernet',
    voltage: '13.8V – 14.8V Intelligent Alternator BSD',
    battery: 'AGM 92Ah–105Ah with IBS Battery Register',
    turnaround: 'Same-Day (2.5 Hrs Diagnostics)',
    coverage: '100% Factory Dealership Parity'
  },
  'Mercedes-Benz': {
    tool: 'Mercedes Xentry Connect C6 & DTS Monaco',
    bus: 'CAN-C, CAN-B, LIN, MOST Optical Audio Bus',
    voltage: '14.0V – 14.7V LIN Alternator Voltage Regulation',
    battery: 'Dual Battery Architecture (Main AGM + Aux Capacitor)',
    turnaround: 'Same-Day (2.0 Hrs Complete Scan)',
    coverage: 'Full SCN Variant Online Coding'
  },
  'Porsche': {
    tool: 'Porsche PIWIS Tester III OEM Factory System',
    bus: 'High-Speed CAN, FlexRay, Automotive Ethernet',
    voltage: '14.4V High-Capacity Lithium/AGM Balancing',
    battery: 'LiFePO4 12V 60Ah / 80Ah Lightweight OEM Pack',
    turnaround: 'Same-Day Precision Lab Session',
    coverage: 'Factory Certified PIWIS III Diagnostics'
  },
  'Audi / VW': {
    tool: 'Audi ODIS Service & Engineering (GEKO Direct)',
    bus: 'CAN-FD, UDS, MQB/MLB Platform Gateway',
    voltage: '14.2V Smart Micro-Hybrid Recuperation',
    battery: 'EFB / AGM with BEM Code Module Coding',
    turnaround: 'Same-Day (1.5 Hrs Full System Sweep)',
    coverage: 'Component Protection (CP) Unlocking'
  },
  'Tesla / EV': {
    tool: 'Tesla Toolbox 3 & High-Voltage Megohmmeter',
    bus: 'Vehicle CAN, Chassis CAN, High-Voltage HVIL',
    voltage: '400V – 800V DC Traction Pack + 16V Li-Ion Low-Voltage',
    battery: 'Modular High-Voltage Pack & BMS Thermals',
    turnaround: 'Priority EV Diagnostic Bay',
    coverage: 'Master Certified High-Voltage Lab'
  },
  'Ford / Commercial': {
    tool: 'Ford FDRS & IDS Enterprise Dealer Diagnostic',
    bus: 'Dual High-Speed CAN, Medium Speed CAN, J1939',
    voltage: '12V / 24V Commercial Dual Alternator Array',
    battery: 'Heavy-Duty Twin Starting Commercial Battery Bank',
    turnaround: 'Express Fleet Bay Dispatch',
    coverage: 'Heavy Commercial & Light Vehicle Parity'
  }
};

function initVehicleCompatibility(service) {
  const tabsContainer = document.getElementById('compat-brand-tabs');
  const resultsContainer = document.getElementById('compat-results-grid');
  if (!tabsContainer || !resultsContainer) return;

  const brands = Object.keys(OEM_PROFILES);
  let activeBrand = brands[0];

  // Render tabs
  tabsContainer.innerHTML = brands.map(brand => `
    <button class="compat-brand-pill ${brand === activeBrand ? 'active' : ''}" data-brand="${brand}">
      ${brand}
    </button>
  `).join('');

  function renderProfile(brand) {
    const prof = OEM_PROFILES[brand];
    resultsContainer.innerHTML = `
      <div class="compat-profile-card">
        <div class="compat-profile-header">
          <div class="compat-profile-brand">
            <div class="compat-brand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
                <rect x="9" y="9" width="6" height="6"/>
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
              </svg>
            </div>
            <span>${brand} Architecture</span>
          </div>
          <span class="compat-coverage-badge">${prof.coverage}</span>
        </div>
        <table class="compat-specs-table">
          <tr>
            <td class="spec-name">Primary OEM Scanner</td>
            <td class="spec-val highlight-gold">${prof.tool}</td>
          </tr>
          <tr>
            <td class="spec-name">Network Bus Protocol</td>
            <td class="spec-val">${prof.bus}</td>
          </tr>
          <tr>
            <td class="spec-name">Voltage Regulation</td>
            <td class="spec-val">${prof.voltage}</td>
          </tr>
          <tr>
            <td class="spec-name">Battery Architecture</td>
            <td class="spec-val">${prof.battery}</td>
          </tr>
        </table>
        <div class="compat-card-footer">
          <div class="compat-telemetry-status">
            <span class="compat-live-dot"></span>
            <span class="compat-telemetry-text">OEM Direct Diagnostic Bridge: <strong>ONLINE &amp; ACTIVE</strong></span>
          </div>
        </div>
      </div>

      <div class="compat-profile-card">
        <div class="compat-profile-header">
          <div class="compat-profile-brand">
            <div class="compat-brand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <span>Specialized Bay Readiness</span>
          </div>
          <span class="compat-coverage-badge">Fast Dispatch</span>
        </div>
        <table class="compat-specs-table">
          <tr>
            <td class="spec-name">Estimated Lab Time</td>
            <td class="spec-val highlight-green">${prof.turnaround}</td>
          </tr>
          <tr>
            <td class="spec-name">Service Target</td>
            <td class="spec-val">${service.title}</td>
          </tr>
          <tr>
            <td class="spec-name">Parts Certification</td>
            <td class="spec-val">OEM Factory Original &amp; Genuine</td>
          </tr>
          <tr>
            <td class="spec-name">Warranty Standard</td>
            <td class="spec-val highlight-gold">${service.quickSpecs.warranty}</td>
          </tr>
        </table>
        <div class="compat-card-footer">
          <button class="btn btn-secondary full-width compat-reserve-btn" onclick="openBookingWithTier('${brand} - ${service.title}')">
            <span>Reserve ${brand} Specialist Bay</span>
            <svg class="btn-arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor">
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  renderProfile(activeBrand);

  tabsContainer.querySelectorAll('.compat-brand-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsContainer.querySelectorAll('.compat-brand-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeBrand = btn.getAttribute('data-brand');
      renderProfile(activeBrand);
    });
  });
}

/* ==========================================================================
   INTERACTIVE SERVICE COST ESTIMATOR & BAY CUSTOMIZER
   ========================================================================== */
function initServiceCalculator(service) {
  const baseTierSelect = document.getElementById('calc-base-tier');
  const vehicleClassSelect = document.getElementById('calc-vehicle-class');
  const addonsList = document.getElementById('calc-addons-list');
  const itemizedRows = document.getElementById('calc-itemized-rows');
  const totalNum = document.getElementById('calc-total-num');
  const bookBtn = document.getElementById('calc-book-btn');

  if (!baseTierSelect || !vehicleClassSelect || !addonsList || !itemizedRows || !totalNum) return;

  // Populate base tiers
  baseTierSelect.innerHTML = service.pricing.map((tier, idx) => `
    <option value="${idx}" data-price="${tier.price.replace('$', '')}">${tier.name} (${tier.price})</option>
  `).join('');

  function calculate() {
    const selectedTierIdx = parseInt(baseTierSelect.value, 10);
    const tier = service.pricing[selectedTierIdx] || service.pricing[0];
    const basePrice = parseFloat(tier.price.replace('$', '')) || 89;

    const classMultiplier = parseFloat(vehicleClassSelect.value) || 1.0;
    const adjustedBase = Math.round(basePrice * classMultiplier);

    let addonsTotal = 0;
    const selectedAddons = [];

    addonsList.querySelectorAll('.calc-addon-label').forEach(label => {
      const checkbox = label.querySelector('.calc-addon-checkbox');
      const cost = parseFloat(label.getAttribute('data-addon')) || 0;
      const name = label.querySelector('.calc-addon-name').textContent;

      if (checkbox && checkbox.checked) {
        label.classList.add('active');
        addonsTotal += cost;
        selectedAddons.push({ name, cost });
      } else {
        label.classList.remove('active');
      }
    });

    const finalTotal = adjustedBase + addonsTotal;

    // Render itemized list
    itemizedRows.innerHTML = `
      <div class="calc-itemized-row">
        <span>Base Tier: ${tier.name}</span>
        <span>$${adjustedBase}</span>
      </div>
      <div class="calc-itemized-row">
        <span>Vehicle Class Architecture Factor</span>
        <span>${classMultiplier}x</span>
      </div>
      ${selectedAddons.map(add => `
        <div class="calc-itemized-row">
          <span>+ ${add.name}</span>
          <span>+$${add.cost}</span>
        </div>
      `).join('')}
    `;

    totalNum.textContent = `$${finalTotal}`;

    if (bookBtn) {
      bookBtn.onclick = () => {
        openBookingWithTier(`${service.title} - ${tier.name} (Custom Config: $${finalTotal})`);
      };
    }
  }

  baseTierSelect.addEventListener('change', calculate);
  vehicleClassSelect.addEventListener('change', calculate);
  addonsList.querySelectorAll('.calc-addon-checkbox').forEach(cb => {
    cb.addEventListener('change', calculate);
  });

  calculate();
}

/* ==========================================================================
   PRINT / EXPORT SPEC SHEET LOGIC
   ========================================================================== */
function initPrintSpec() {
  const printBtn = document.getElementById('btn-print-spec');
  if (printBtn) {
    printBtn.onclick = () => {
      showToast('Preparing laboratory specification sheet for printing...');
      setTimeout(() => {
        window.print();
      }, 350);
    };
  }
}



/* ==========================================================================
   Accordion Handler for Detail FAQs
   ========================================================================== */
function initDetailFaqAccordion() {
  const faqItems = document.querySelectorAll('#detail-faq-accordion .faq-accordion-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherHeader = otherItem.querySelector('.faq-accordion-header');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

/* ==========================================================================
   Booking Modal Helper with Tier Pre-population
   ========================================================================== */
window.openBookingWithTier = function(tierName) {
  const bookingModal = document.getElementById('booking-modal');
  const tierInput = document.getElementById('booking-tier');

  if (tierInput) {
    tierInput.value = tierName;
  }

  if (bookingModal) {
    bookingModal.classList.add('open');
    bookingModal.setAttribute('aria-hidden', 'false');
  }
};

/* ==========================================================================
   Theme Toggle (Dark & Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('voltedge_theme') || localStorage.getItem('volterra_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('voltedge_theme', theme);
    localStorage.setItem('volterra_theme', theme);
    if (theme === 'light') {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
  }
}

/* ==========================================================================
   RTL / LTR Toggle (Direction Switcher)
   ========================================================================== */
function initRtlToggle() {
  const rtlToggleBtn = document.getElementById('rtl-toggle');
  const root = document.documentElement;
  const indicator = rtlToggleBtn ? rtlToggleBtn.querySelector('.rtl-text-indicator') : null;

  const savedDir = localStorage.getItem('voltedge_dir') || localStorage.getItem('volterra_dir') || 'ltr';
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
    localStorage.setItem('volterra_dir', dir);
    if (indicator) {
      indicator.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      indicator.setAttribute('title', dir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left');
    }
  }
}

/* ==========================================================================
   Mobile Navigation
   ========================================================================== */
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

/* ==========================================================================
   Modals (Login & Booking)
   ========================================================================== */
function initModals() {
  // Login Modal
  const headerLoginBtn = document.getElementById('header-login-btn');
  const loginModal = document.getElementById('login-modal');
  const closeLoginModal = document.getElementById('close-login-modal');
  const loginForm = document.getElementById('login-form');
  const togglePassBtn = document.getElementById('toggle-password-visibility');
  const passInput = document.getElementById('login-password');

  if (headerLoginBtn && loginModal) {
    headerLoginBtn.addEventListener('click', () => {
      loginModal.classList.add('open');
      loginModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (closeLoginModal && loginModal) {
    closeLoginModal.addEventListener('click', () => {
      loginModal.classList.remove('open');
      loginModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passInput.setAttribute('type', type);
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginModal.classList.remove('open');
      loginModal.setAttribute('aria-hidden', 'true');
      showToast('Successfully signed in to customer portal');
      loginForm.reset();
    });
  }

  // Booking Modal
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingModal = document.getElementById('close-booking-modal');
  const bookingForm = document.getElementById('booking-form');

  if (closeBookingModal && bookingModal) {
    closeBookingModal.addEventListener('click', () => {
      bookingModal.classList.remove('open');
      bookingModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const tierVal = document.getElementById('booking-tier')?.value || 'Diagnostic Bay';
      bookingModal.classList.remove('open');
      bookingModal.setAttribute('aria-hidden', 'true');
      showToast(`Priority Bay Reserved for: ${tierVal}`);
      bookingForm.reset();
    });
  }

  // Close modals on overlay click
  window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove('open');
      loginModal.setAttribute('aria-hidden', 'true');
    }
    if (e.target === bookingModal) {
      bookingModal.classList.remove('open');
      bookingModal.setAttribute('aria-hidden', 'true');
    }
  });

  // ESC key listener
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(modal => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      });
    }
  });
}

/* ==========================================================================
   Toast Notification Utility
   ========================================================================== */
function initToast() {
  window.showToast = function(message) {
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');

    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');

      clearTimeout(window.toastTimer);
      window.toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }
  };
}
