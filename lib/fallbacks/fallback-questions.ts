export const fallbackQuestions = {
  civil: [
    { id: 1, difficulty: "EASY", question: "What is the primary purpose of a slump test in concrete?", options: ["To determine compressive strength", "To measure workability", "To check water-cement ratio", "To find the setting time"], correctAnswer: 1 },
    { id: 2, difficulty: "EASY", question: "According to Hooke's Law, within the elastic limit, stress is directly proportional to:", options: ["Strain", "Area", "Volume", "Temperature"], correctAnswer: 0 },
    { id: 3, difficulty: "MEDIUM", question: "What is the theoretical maximum value of Poisson's ratio for any macroscopic isotropic material?", options: ["0.25", "0.33", "0.50", "1.00"], correctAnswer: 2 },
    { id: 4, difficulty: "MEDIUM", question: "In fluid mechanics, what does a Reynolds number of less than 2000 signify in a pipe flow?", options: ["Turbulent flow", "Transitional flow", "Laminar flow", "Supersonic flow"], correctAnswer: 2 },
    { id: 5, difficulty: "MEDIUM", question: "The bending moment on a simply supported beam carrying a uniformly distributed load is maximum at:", options: ["The supports", "The center", "Quarter span", "It is constant throughout"], correctAnswer: 1 },
    { id: 6, difficulty: "HARD", question: "Which equation is primarily used to measure the flow of water through a porous medium like soil?", options: ["Bernoulli's Equation", "Navier-Stokes Equation", "Darcy's Law", "Manning's Formula"], correctAnswer: 2 },
    { id: 7, difficulty: "HARD", question: "Biochemical Oxygen Demand (BOD) is a measure of:", options: ["Dissolved oxygen in water", "Organic matter decomposed by bacteria", "Chemical toxicity", "pH level of wastewater"], correctAnswer: 1 },
    { id: 8, difficulty: "MEDIUM", question: "In surveying, the angle between the true meridian and the magnetic meridian is called:", options: ["Magnetic Declination", "Dip", "Azimuth", "Local Attraction"], correctAnswer: 0 },
    { id: 9, difficulty: "EASY", question: "What is the standard size of a concrete cube used for compressive strength testing?", options: ["100mm x 100mm x 100mm", "150mm x 150mm x 150mm", "200mm x 200mm x 200mm", "250mm x 250mm x 250mm"], correctAnswer: 1 },
    { id: 10, difficulty: "HARD", question: "The process of removal of water from the soil pores under sustained load is known as:", options: ["Compaction", "Consolidation", "Permeability", "Liquefaction"], correctAnswer: 1 }
  ],

  electrical: [
    { id: 11, difficulty: "EASY", question: "Why are the cores of transformers laminated?", options: ["To reduce copper losses", "To reduce hysteresis losses", "To reduce eddy current losses", "To improve cooling"], correctAnswer: 2 },
    { id: 12, difficulty: "EASY", question: "According to Kirchhoff's Current Law (KCL), the algebraic sum of currents meeting at a node is:", options: ["Infinite", "Zero", "Equal to the voltage", "Dependent on resistance"], correctAnswer: 1 },
    { id: 13, difficulty: "MEDIUM", question: "What is the primary function of a Buchholz relay in a power transformer?", options: ["Voltage regulation", "Cooling control", "Protection against internal faults", "Overload protection"], correctAnswer: 2 },
    { id: 14, difficulty: "MEDIUM", question: "In an AC circuit, the ratio of real power to apparent power is known as:", options: ["Form factor", "Peak factor", "Power factor", "Quality factor"], correctAnswer: 2 },
    { id: 15, difficulty: "MEDIUM", question: "What happens to the slip of an induction motor when it operates at exactly synchronous speed?", options: ["It becomes 1", "It becomes zero", "It becomes infinite", "It becomes negative"], correctAnswer: 1 },
    { id: 16, difficulty: "HARD", question: "Which effect causes alternating current (AC) to distribute itself unequally, concentrating near the surface of the conductor?", options: ["Ferranti Effect", "Proximity Effect", "Skin Effect", "Corona Effect"], correctAnswer: 2 },
    { id: 17, difficulty: "HARD", question: "Thevenin's Theorem replaces a complex linear network with an equivalent circuit consisting of:", options: ["A current source in parallel with a resistor", "A voltage source in series with a resistor", "A voltage source in parallel with a capacitor", "Multiple voltage sources"], correctAnswer: 1 },
    { id: 18, difficulty: "MEDIUM", question: "A Zener diode is primarily used for:", options: ["Amplification", "Rectification", "Voltage regulation", "Signal oscillation"], correctAnswer: 2 },
    { id: 19, difficulty: "EASY", question: "What is the unit of reactive power in an AC system?", options: ["Watts (W)", "Volt-Amperes (VA)", "Volt-Amperes Reactive (VAR)", "Joules (J)"], correctAnswer: 2 },
    { id: 20, difficulty: "HARD", question: "The synchronous speed of a 4-pole, 50 Hz AC motor is:", options: ["1000 RPM", "1500 RPM", "3000 RPM", "1200 RPM"], correctAnswer: 1 }
  ],

  mechanical: [
    { id: 21, difficulty: "MEDIUM", question: "Which thermodynamic cycle has the highest theoretical efficiency operating between two temperature limits?", options: ["Otto Cycle", "Rankine Cycle", "Carnot Cycle", "Diesel Cycle"], correctAnswer: 2 },
    { id: 22, difficulty: "EASY", question: "According to Newton's Law of Viscosity, shear stress is directly proportional to:", options: ["Velocity", "Pressure", "Rate of shear strain", "Temperature"], correctAnswer: 2 },
    { id: 23, difficulty: "MEDIUM", question: "What does the area under a Stress-Strain curve up to the fracture point represent?", options: ["Modulus of Elasticity", "Toughness", "Resilience", "Yield Strength"], correctAnswer: 1 },
    { id: 24, difficulty: "HARD", question: "In heat transfer, thermal radiation is governed by which law?", options: ["Fourier's Law", "Newton's Law of Cooling", "Stefan-Boltzmann Law", "Fick's Law"], correctAnswer: 2 },
    { id: 25, difficulty: "EASY", question: "The ratio of the speed of an object to the local speed of sound is called the:", options: ["Reynolds Number", "Mach Number", "Prandtl Number", "Nusselt Number"], correctAnswer: 1 },
    { id: 26, difficulty: "MEDIUM", question: "Which heat treatment process is used primarily to relieve internal stresses and soften the metal?", options: ["Quenching", "Tempering", "Annealing", "Case hardening"], correctAnswer: 2 },
    { id: 27, difficulty: "HARD", question: "Euler's formula for column buckling is applicable only for:", options: ["Short columns", "Long columns", "Intermediate columns", "Composite columns"], correctAnswer: 1 },
    { id: 28, difficulty: "HARD", question: "Bernoulli's equation is fundamentally derived from the principle of conservation of:", options: ["Mass", "Momentum", "Energy", "Angular Momentum"], correctAnswer: 2 },
    { id: 29, difficulty: "EASY", question: "In a standard 4-stroke SI engine, the spark plug ignites the fuel-air mixture just before the end of the:", options: ["Intake stroke", "Compression stroke", "Power stroke", "Exhaust stroke"], correctAnswer: 1 },
    { id: 30, difficulty: "MEDIUM", question: "A thermodynamic process in which entropy remains constant is called:", options: ["Isothermal", "Isobaric", "Isochoric", "Isentropic"], correctAnswer: 3 }
  ],

  electronics: [
    { id: 31, difficulty: "EASY", question: "What is the primary advantage of a Universal Gate (like NAND or NOR)?", options: ["They consume zero power", "Any boolean function can be implemented using them alone", "They have infinite input impedance", "They are naturally analog"], correctAnswer: 1 },
    { id: 32, difficulty: "MEDIUM", question: "According to the Nyquist-Shannon sampling theorem, the sampling frequency must be at least:", options: ["Equal to the maximum signal frequency", "Twice the maximum signal frequency", "Half the maximum signal frequency", "Ten times the maximum signal frequency"], correctAnswer: 1 },
    { id: 33, difficulty: "EASY", question: "An ideal Operational Amplifier (Op-Amp) has an Input Impedance of:", options: ["Zero", "100 Ohms", "Infinite", "Negative value"], correctAnswer: 2 },
    { id: 34, difficulty: "MEDIUM", question: "Which digital circuit is used to select one of many input data lines and forward it to a single output line?", options: ["Decoder", "Multiplexer (MUX)", "Demultiplexer", "Encoder"], correctAnswer: 1 },
    { id: 35, difficulty: "HARD", question: "In a Bipolar Junction Transistor (BJT), the base region is heavily doped to ensure:", options: ["High current gain", "Low recombination rate", "High breakdown voltage", "The base is lightly doped"], correctAnswer: 3 },
    { id: 36, difficulty: "MEDIUM", question: "What does CMRR stand for in the context of operational amplifiers?", options: ["Common-Mode Rejection Ratio", "Current-Mode Resistance Ratio", "Capacitive-Mode Reactive Ratio", "Circuit-Mode Relay Ratio"], correctAnswer: 0 },
    { id: 37, difficulty: "EASY", question: "Which flip-flop is known as the 'Delay' flip-flop?", options: ["SR Flip-Flop", "JK Flip-Flop", "T Flip-Flop", "D Flip-Flop"], correctAnswer: 3 },
    { id: 38, difficulty: "HARD", question: "In Amplitude Modulation (AM), if the modulation index is greater than 1, it results in:", options: ["Perfect transmission", "Over-modulation and distortion", "Zero bandwidth", "Frequency hopping"], correctAnswer: 1 },
    { id: 39, difficulty: "HARD", question: "Maxwell's equations fundamentally describe the behavior of:", options: ["Quantum mechanics", "Thermodynamics", "Electromagnetic fields", "Nuclear strong forces"], correctAnswer: 2 },
    { id: 40, difficulty: "MEDIUM", question: "What is the core difference between a Microprocessor and a Microcontroller?", options: ["Microcontrollers lack ALUs", "Microcontrollers integrate CPU, memory, and I/O on a single chip", "Microprocessors are only used for analog signals", "Microprocessors are always slower"], correctAnswer: 1 }
  ],

  "current-affairs": [
    { id: 41, difficulty: "EASY", question: "Which joint Earth-observing satellite mission was collaboratively developed by NASA and ISRO for launch in the mid-2020s?", options: ["Chandrayaan-4", "NISAR", "AstroSat-2", "Mangalyaan-2"], correctAnswer: 1 },
    { id: 42, difficulty: "EASY", question: "What is the primary objective of ISRO's Aditya-L1 mission?", options: ["To study the Martian atmosphere", "To collect lunar soil samples", "To study the solar atmosphere and solar winds", "To map the Milky Way galaxy"], correctAnswer: 2 },
    { id: 43, difficulty: "MEDIUM", question: "In 2024, the European Union passed the world's first comprehensive legal framework for Artificial Intelligence, known as the:", options: ["AI Bill of Rights", "EU AI Act", "Turing Directive", "Algorithmic Accountability Law"], correctAnswer: 1 },
    { id: 44, difficulty: "MEDIUM", question: "Which country is slated to host the UN Climate Change Conference (COP30) in 2025?", options: ["United Arab Emirates", "India", "Brazil", "United Kingdom"], correctAnswer: 2 },
    { id: 45, difficulty: "EASY", question: "The ISRO Gaganyaan mission aims to demonstrate:", options: ["Human spaceflight capability to Low Earth Orbit", "A permanent lunar base", "Asteroid deflection technology", "Interplanetary robotic landing"], correctAnswer: 0 },
    { id: 46, difficulty: "HARD", question: "Which BRICS summit saw the historic expansion of the bloc to include nations like Egypt, Ethiopia, Iran, and the UAE?", options: ["12th Summit (Russia)", "14th Summit (China)", "15th Summit (South Africa)", "16th Summit (Russia)"], correctAnswer: 2 },
    { id: 47, difficulty: "MEDIUM", question: "India's 'Semicon India Programme' is an initiative designed primarily to:", options: ["Import cheap semiconductors", "Build a robust domestic semiconductor manufacturing ecosystem", "Ban the export of silicon", "Develop quantum computers exclusively"], correctAnswer: 1 },
    { id: 48, difficulty: "HARD", question: "NASA's Artemis III mission is historically significant because its primary goal is to:", options: ["Send the first humans to Mars", "Land the first humans near the Lunar South Pole", "Retrieve samples from an asteroid", "Launch the James Webb Space Telescope"], correctAnswer: 1 },
    { id: 49, difficulty: "MEDIUM", question: "Which city is the headquarters of the International Solar Alliance (ISA), an initiative jointly launched by India and France?", options: ["Paris", "New Delhi", "Gurugram", "Geneva"], correctAnswer: 2 },
    { id: 50, difficulty: "MEDIUM", question: "In the context of recent AI advancements, what does 'LLM' stand for?", options: ["Logical Language Module", "Large Language Model", "Linear Learning Machine", "Linguistic Logic Matrix"], correctAnswer: 1 }
  ],

  "reasoning-aptitude": [
    { id: 51, difficulty: "EASY", question: "If 5 workers can build a wall in 12 days, how many days will 10 workers take to build the same wall?", options: ["6 days", "24 days", "8 days", "10 days"], correctAnswer: 0 },
    { id: 52, difficulty: "MEDIUM", question: "A train 150m long passes a pole in 15 seconds. What is the speed of the train in km/h?", options: ["36 km/h", "54 km/h", "45 km/h", "30 km/h"], correctAnswer: 0 },
    { id: 53, difficulty: "MEDIUM", question: "Looking at a portrait, a man said, 'That man's father is my father's son.' Who is in the portrait?", options: ["The man himself", "The man's son", "The man's father", "The man's brother"], correctAnswer: 1 },
    { id: 54, difficulty: "HARD", question: "The ratio of the ages of A and B is 4:3. After 6 years, the ratio will be 11:9. What is the present age of A?", options: ["16 years", "20 years", "24 years", "28 years"], correctAnswer: 0 },
    { id: 55, difficulty: "MEDIUM", question: "Complete the series: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], correctAnswer: 1 },
    { id: 56, difficulty: "HARD", question: "In a code, 'ROCK' is written as 'SNDL'. How is 'COLD' written in that same code?", options: ["DPME", "DNME", "DOME", "DQNF"], correctAnswer: 1 },
    { id: 57, difficulty: "EASY", question: "What is the average of the first five prime numbers?", options: ["5.6", "5.4", "5.8", "6.0"], correctAnswer: 0 },
    { id: 58, difficulty: "HARD", question: "A sum of money doubles itself in 10 years at simple interest. What is the annual rate of interest?", options: ["5%", "10%", "12%", "15%"], correctAnswer: 1 },
    { id: 59, difficulty: "MEDIUM", question: "Point A is 10m North of Point B. Point C is 10m East of Point B. What is the shortest distance between A and C?", options: ["10m", "20m", "10√2m", "15m"], correctAnswer: 2 },
    { id: 60, difficulty: "HARD", question: "Two pipes can fill a tank in 20 and 30 minutes respectively. If both are opened together, how long will it take to fill the tank?", options: ["10 mins", "12 mins", "15 mins", "25 mins"], correctAnswer: 1 }
  ]
};