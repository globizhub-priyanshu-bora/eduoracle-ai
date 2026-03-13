"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Timer, Trophy, CheckCircle2, XCircle, Loader2, Download, ShieldCheck, Linkedin, FileText, ChevronLeft } from "lucide-react";

// --- THE GRAND DATABASE: 10 Questions for ALL 14 Branches ---
const DOMAIN_QUESTIONS: Record<string, any[]> = {
  // ENGINEERING
  "civil": [
    { id: 1, difficulty: "EASY", question: "Primary purpose of a slump test?", options: ["Strength", "Workability", "Ratio", "Density"], correctAnswer: 1 },
    { id: 2, difficulty: "MEDIUM", question: "Maximum value of Poisson's ratio?", options: ["0.25", "0.33", "0.50", "1.00"], correctAnswer: 2 },
    { id: 3, difficulty: "HARD", question: "Darcy's Law defines flow through?", options: ["Pipes", "Porous media", "Turbines", "Channels"], correctAnswer: 1 },
    { id: 4, difficulty: "EASY", question: "Instrument used for mapping distances?", options: ["Alidade", "Opisometer", "Compass", "Clinometer"], correctAnswer: 1 },
    { id: 5, difficulty: "MEDIUM", question: "Point of contraflexure is in?", options: ["Cantilever", "Overhanging", "Fixed", "Simply supported"], correctAnswer: 1 },
    { id: 6, difficulty: "HARD", question: "Minimum grade for RCC as per IS 456?", options: ["M15", "M20", "M25", "M30"], correctAnswer: 1 },
    { id: 7, difficulty: "EASY", question: "Standard size of brick in cm?", options: ["19x9x9", "20x10x10", "18x9x9", "22x10x10"], correctAnswer: 0 },
    { id: 8, difficulty: "MEDIUM", question: "1 link in a Gunter's chain is (inches)?", options: ["6.6", "7.92", "8.5", "12"], correctAnswer: 1 },
    { id: 9, difficulty: "HARD", question: "Bulking of sand is caused by?", options: ["Clay", "Surface tension", "Moisture", "Heat"], correctAnswer: 2 },
    { id: 10, difficulty: "MEDIUM", question: "Unit of Kinematic Viscosity?", options: ["Poise", "Stoke", "Newton", "Pascal"], correctAnswer: 1 }
  ],
  "electrical": [
    { id: 11, difficulty: "EASY", question: "Why are transformer cores laminated?", options: ["Copper loss", "Eddy current", "Heat", "Cooling"], correctAnswer: 1 },
    { id: 12, difficulty: "MEDIUM", question: "Kirchhoff's Current Law is based on?", options: ["Energy", "Charge", "Mass", "Power"], correctAnswer: 1 },
    { id: 13, difficulty: "HARD", question: "Power factor of pure inductor?", options: ["Zero", "0.5", "1.0", "Infinity"], correctAnswer: 0 },
    { id: 14, difficulty: "EASY", question: "Unit of frequency in India?", options: ["40Hz", "50Hz", "60Hz", "100Hz"], correctAnswer: 1 },
    { id: 15, difficulty: "MEDIUM", question: "Buchholz relay is used in?", options: ["Motors", "Generators", "Transformers", "Lines"], correctAnswer: 2 },
    { id: 16, difficulty: "HARD", question: "Thevenin voltage is?", options: ["Short circuit", "Open circuit", "Input", "Load"], correctAnswer: 1 },
    { id: 17, difficulty: "EASY", question: "Material used in heaters?", options: ["Copper", "Nichrome", "Tungsten", "Silver"], correctAnswer: 1 },
    { id: 18, difficulty: "MEDIUM", question: "Line voltage in star connection?", options: ["Phase", "√3 * Phase", "Phase / √3", "3 * Phase"], correctAnswer: 1 },
    { id: 19, difficulty: "HARD", question: "Zener diode primary use?", options: ["Amplifier", "Regulator", "Switch", "Rectifier"], correctAnswer: 1 },
    { id: 20, difficulty: "MEDIUM", question: "Unit of Reactive Power?", options: ["Watt", "VAR", "VA", "Joule"], correctAnswer: 1 }
  ],
  "mechanical": [
    { id: 21, difficulty: "EASY", question: "Cycle for petrol engines?", options: ["Diesel", "Otto", "Carnot", "Rankine"], correctAnswer: 1 },
    { id: 22, difficulty: "MEDIUM", question: "Ratio of stress to strain?", options: ["Bulk", "Poisson", "Youngs", "Rigidity"], correctAnswer: 2 },
    { id: 23, difficulty: "HARD", question: "Radiation heat transfer power of T?", options: ["1", "2", "3", "4"], correctAnswer: 3 },
    { id: 24, difficulty: "EASY", question: "Process to soften steel?", options: ["Quenching", "Annealing", "Tempering", "Nitriding"], correctAnswer: 1 },
    { id: 25, difficulty: "MEDIUM", question: "Mach number 1 signifies?", options: ["Subsonic", "Sonic", "Supersonic", "Hypersonic"], correctAnswer: 1 },
    { id: 26, difficulty: "HARD", question: "Material with highest conductivity?", options: ["Steel", "Silver", "Gold", "Copper"], correctAnswer: 1 },
    { id: 27, difficulty: "EASY", question: "Unit of Force?", options: ["Joule", "Pascal", "Newton", "Watt"], correctAnswer: 2 },
    { id: 28, difficulty: "MEDIUM", question: "Isentropic process means?", options: ["Same temp", "Same pressure", "Same entropy", "Same volume"], correctAnswer: 2 },
    { id: 29, difficulty: "HARD", question: "Failure theory for ductile materials?", options: ["St. Venant", "Tresca", "Rankine", "Haigh"], correctAnswer: 1 },
    { id: 30, difficulty: "MEDIUM", question: "Efficiency of Carnot engine depends on?", options: ["Working fluid", "Temp limits", "Speed", "Load"], correctAnswer: 1 }
  ],
  "electronics": [
    { id: 31, difficulty: "EASY", question: "Universal logic gate?", options: ["AND", "OR", "NAND", "XOR"], correctAnswer: 2 },
    { id: 32, difficulty: "MEDIUM", question: "Ideal Op-Amp input impedance?", options: ["Zero", "1k", "1M", "Infinite"], correctAnswer: 3 },
    { id: 33, difficulty: "HARD", question: "Maxwell equations relate to?", options: ["Gravity", "Fluids", "Electromagnetism", "Nuclear"], correctAnswer: 2 },
    { id: 34, difficulty: "EASY", question: "Binary 1010 in decimal?", options: ["8", "10", "12", "14"], correctAnswer: 1 },
    { id: 35, difficulty: "MEDIUM", question: "CMRR should be?", options: ["Zero", "Unity", "Infinite", "Negative"], correctAnswer: 2 },
    { id: 36, difficulty: "HARD", question: "Least bandwidth modulation?", options: ["AM", "FM", "SSB", "DSB"], correctAnswer: 2 },
    { id: 37, difficulty: "EASY", question: "Toggle flip-flop is?", options: ["SR", "D", "T", "JK"], correctAnswer: 2 },
    { id: 38, difficulty: "MEDIUM", question: "BJT Base is doped?", options: ["Heavy", "Moderate", "Light", "None"], correctAnswer: 2 },
    { id: 39, difficulty: "HARD", question: "Varactor diode is a?", options: ["Capacitor", "Inductor", "Resistor", "Switch"], correctAnswer: 0 },
    { id: 40, difficulty: "EASY", question: "Semiconductor material?", options: ["Iron", "Copper", "Silicon", "Aluminum"], correctAnswer: 2 }
  ],
  "computer-science": [
    { id: 41, difficulty: "EASY", question: "Which uses LIFO?", options: ["Queue", "Stack", "Tree", "Graph"], correctAnswer: 1 },
    { id: 42, difficulty: "MEDIUM", question: "Binary Search complexity?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], correctAnswer: 1 },
    { id: 43, difficulty: "HARD", question: "Network layer protocol?", options: ["TCP", "IP", "HTTP", "FTP"], correctAnswer: 1 },
    { id: 44, difficulty: "EASY", question: "Father of Computer Science?", options: ["Gates", "Turing", "Jobs", "Babbage"], correctAnswer: 1 },
    { id: 45, difficulty: "MEDIUM", question: "Translate IP to MAC?", options: ["DNS", "ARP", "DHCP", "ICMP"], correctAnswer: 1 },
    { id: 46, difficulty: "HARD", question: "Wait-for graph is used for?", options: ["Paging", "Deadlock", "Hashing", "Sorting"], correctAnswer: 1 },
    { id: 47, difficulty: "EASY", question: "RAM is what type?", options: ["Volatile", "Non-volatile", "Permanent", "Read-only"], correctAnswer: 0 },
    { id: 48, difficulty: "MEDIUM", question: "Python function keyword?", options: ["def", "func", "define", "function"], correctAnswer: 0 },
    { id: 49, difficulty: "HARD", question: "A NoSQL database is?", options: ["MySQL", "MongoDB", "Oracle", "SQLite"], correctAnswer: 1 },
    { id: 50, difficulty: "EASY", question: "HTML stands for?", options: ["Markup", "Machine", "Management", "Manual"], correctAnswer: 0 }
  ],

  // MEDICAL
  "radiology": [
    { id: 51, difficulty: "EASY", question: "Who discovered X-rays?", options: ["Curie", "Roentgen", "Einstein", "Bohr"], correctAnswer: 1 },
    { id: 52, difficulty: "MEDIUM", question: "MRI uses which type of waves?", options: ["Gamma", "Radio", "Ultra", "X-ray"], correctAnswer: 1 },
    { id: 53, difficulty: "HARD", question: "Contrast agent for CT scans?", options: ["Iodine", "Barium", "Gadolinium", "Iron"], correctAnswer: 0 },
    { id: 54, difficulty: "EASY", question: "Lead aprons protect against?", options: ["Heat", "Radiation", "Bacteria", "Chemicals"], correctAnswer: 1 },
    { id: 55, difficulty: "MEDIUM", question: "Unit of radiation dose?", options: ["Pascal", "Sievert", "Joule", "Newton"], correctAnswer: 1 },
    { id: 56, difficulty: "HARD", question: "Hounsfield units for water?", options: ["-1000", "0", "100", "1000"], correctAnswer: 1 },
    { id: 57, difficulty: "EASY", question: "Ultrasound uses which energy?", options: ["Sound", "Light", "Heat", "Magnetic"], correctAnswer: 0 },
    { id: 58, difficulty: "MEDIUM", question: "Chest X-ray view for lungs?", options: ["Lateral", "PA View", "AP View", "Oblique"], correctAnswer: 1 },
    { id: 59, difficulty: "HARD", question: "Half-life of Technetium-99m?", options: ["2 hours", "6 hours", "24 hours", "7 days"], correctAnswer: 1 },
    { id: 60, difficulty: "EASY", question: "Mammography screens for?", options: ["Heart", "Breast", "Liver", "Brain"], correctAnswer: 1 }
  ],
  "dermatology": [
    { id: 61, difficulty: "EASY", question: "Largest organ of the body?", options: ["Liver", "Skin", "Heart", "Lungs"], correctAnswer: 1 },
    { id: 62, difficulty: "MEDIUM", question: "Melanin is produced in which layer?", options: ["Dermis", "Epidermis", "Hypodermis", "Fascia"], correctAnswer: 1 },
    { id: 63, difficulty: "HARD", question: "Tzanck smear is used for?", options: ["Fungus", "Herpes", "Acne", "Cancer"], correctAnswer: 1 },
    { id: 64, difficulty: "EASY", question: "Treatment for bacterial skin infection?", options: ["Antiviral", "Antibiotic", "Antacid", "Diuretic"], correctAnswer: 1 },
    { id: 65, difficulty: "MEDIUM", question: "Common name for Urticaria?", options: ["Acne", "Hives", "Moles", "Warts"], correctAnswer: 1 },
    { id: 66, difficulty: "HARD", question: "Psoriasis is what type of disease?", options: ["Viral", "Autoimmune", "Bacterial", "Parasitic"], correctAnswer: 1 },
    { id: 67, difficulty: "EASY", question: "Layer that protects against water loss?", options: ["Dermis", "Stratum Corneum", "Hair", "Fat"], correctAnswer: 1 },
    { id: 68, difficulty: "MEDIUM", question: "ABCDE rule screens for?", options: ["Acne", "Melanoma", "Eczema", "Rashes"], correctAnswer: 1 },
    { id: 69, difficulty: "HARD", question: "Drug used for severe acne?", options: ["Aspirin", "Isotretinoin", "Insulin", "Ranitidine"], correctAnswer: 1 },
    { id: 70, difficulty: "EASY", question: "Doctor for hair/skin/nails?", options: ["Urologist", "Dermatologist", "Podiatrist", "Radiologist"], correctAnswer: 1 }
  ],
  "general-medicine": [
    { id: 71, difficulty: "EASY", question: "Instrument for blood pressure?", options: ["Thermometer", "Sphygmomanometer", "Stethoscope", "Otoscope"], correctAnswer: 1 },
    { id: 72, difficulty: "MEDIUM", question: "Insulin is produced where?", options: ["Liver", "Pancreas", "Spleen", "Kidney"], correctAnswer: 1 },
    { id: 73, difficulty: "HARD", question: "Definition of Hypertension?", options: ["120/80", ">140/90", "<90/60", "110/70"], correctAnswer: 1 },
    { id: 74, difficulty: "EASY", question: "Common symptom of Diabetes Mellitus?", options: ["Hunger", "Thirst", "Weight gain", "Both 1 & 2"], correctAnswer: 3 },
    { id: 75, difficulty: "MEDIUM", question: "Drug for heart attack (Emergency)?", options: ["Aspirin", "Paracetamol", "Antacid", "Antibiotic"], correctAnswer: 0 },
    { id: 76, difficulty: "HARD", question: "Normal blood pH range?", options: ["6.0-7.0", "7.35-7.45", "7.8-8.5", "5.0-6.0"], correctAnswer: 1 },
    { id: 77, difficulty: "EASY", question: "Normal adult pulse (bpm)?", options: ["40-50", "60-100", "110-150", "30-40"], correctAnswer: 1 },
    { id: 78, difficulty: "MEDIUM", question: "Type 1 Diabetes cause?", options: ["Obesity", "Autoimmune", "Sugar intake", "Age"], correctAnswer: 1 },
    { id: 79, difficulty: "HARD", question: "Hyperkalemia refers to high?", options: ["Sodium", "Potassium", "Calcium", "Magnesium"], correctAnswer: 1 },
    { id: 80, difficulty: "EASY", question: "Vitamin D source?", options: ["Meat", "Sunlight", "Water", "Salt"], correctAnswer: 1 }
  ],
  "pediatrics": [
    { id: 81, difficulty: "EASY", question: "Neonatal period is first?", options: ["7 days", "28 days", "1 year", "3 months"], correctAnswer: 1 },
    { id: 82, difficulty: "MEDIUM", question: "Ideal food for first 6 months?", options: ["Cow milk", "Breast milk", "Cereal", "Honey"], correctAnswer: 1 },
    { id: 83, difficulty: "HARD", question: "Apgar score measures?", options: ["Growth", "Newborn health", "Hearing", "Vision"], correctAnswer: 1 },
    { id: 84, difficulty: "EASY", question: "Child doctor name?", options: ["Geriatrician", "Pediatrician", "Oncologist", "Surgeon"], correctAnswer: 1 },
    { id: 85, difficulty: "MEDIUM", question: "Vaccine for Tuberculosis?", options: ["DPT", "BCG", "OPV", "Measles"], correctAnswer: 1 },
    { id: 86, difficulty: "HARD", question: "Kwashikor is caused by deficiency of?", options: ["Vitamin C", "Protein", "Fats", "Carbs"], correctAnswer: 1 },
    { id: 87, difficulty: "EASY", question: "Fontanelle is?", options: ["Bone", "Soft spot on head", "Nerve", "Tooth"], correctAnswer: 1 },
    { id: 88, difficulty: "MEDIUM", question: "Child with barking cough has?", options: ["Asthma", "Croup", "Flu", "Allergy"], correctAnswer: 1 },
    { id: 89, difficulty: "HARD", question: "Rickets is lack of?", options: ["Iron", "Vitamin D", "Vitamin A", "Zinc"], correctAnswer: 1 },
    { id: 90, difficulty: "EASY", question: "Is honey safe for infants <1yr?", options: ["Yes", "No", "Only a bit", "Maybe"], correctAnswer: 1 }
  ],
  "obgy": [
    { id: 91, difficulty: "EASY", question: "Duration of normal pregnancy?", options: ["30 weeks", "40 weeks", "48 weeks", "20 weeks"], correctAnswer: 1 },
    { id: 92, difficulty: "MEDIUM", question: "Test for cervical cancer?", options: ["Blood test", "Pap smear", "Ultrasound", "X-ray"], correctAnswer: 1 },
    { id: 93, difficulty: "HARD", question: "Term for painful menstruation?", options: ["Amenorrhea", "Dysmenorrhea", "Menopause", "Puberty"], correctAnswer: 1 },
    { id: 94, difficulty: "EASY", question: "Fertilization occurs where?", options: ["Uterus", "Fallopian tube", "Ovary", "Cervix"], correctAnswer: 1 },
    { id: 95, difficulty: "MEDIUM", question: "Hormone that sustains pregnancy?", options: ["Estrogen", "Progesterone", "Insulin", "Thyroxin"], correctAnswer: 1 },
    { id: 96, difficulty: "HARD", question: "Ectopic pregnancy is located?", options: ["In Uterus", "Outside Uterus", "In Liver", "In Bladder"], correctAnswer: 1 },
    { id: 97, difficulty: "EASY", question: "Normal fetal heart rate?", options: ["60-100", "110-160", "180-220", "40-60"], correctAnswer: 1 },
    { id: 98, difficulty: "MEDIUM", question: "First milk produced is?", options: ["Lactose", "Colostrum", "Plasma", "Casein"], correctAnswer: 1 },
    { id: 99, difficulty: "HARD", question: "PCOS primary symptom?", options: ["Fever", "Irregular periods", "Cough", "Rash"], correctAnswer: 1 },
    { id: 100, difficulty: "EASY", question: "Amniotic fluid surrounds?", options: ["Heart", "Fetus", "Brain", "Lungs"], correctAnswer: 1 }
  ],
  "orthopedics": [
    { id: 101, difficulty: "EASY", question: "Strongest bone in human body?", options: ["Skull", "Femur", "Ribs", "Spine"], correctAnswer: 1 },
    { id: 102, difficulty: "MEDIUM", question: "Connects bone to bone?", options: ["Tendon", "Ligament", "Muscle", "Nerve"], correctAnswer: 1 },
    { id: 103, difficulty: "HARD", question: "Colles fracture involves which bone?", options: ["Femur", "Radius", "Tibia", "Humerus"], correctAnswer: 1 },
    { id: 104, difficulty: "EASY", question: "Smallest bone is in the?", options: ["Toe", "Ear", "Nose", "Finger"], correctAnswer: 1 },
    { id: 105, difficulty: "MEDIUM", question: "Arthritis affects which system?", options: ["Nervous", "Skeletal/Joints", "Digestive", "Immune"], correctAnswer: 1 },
    { id: 106, difficulty: "HARD", question: "Scoliosis is curvature of?", options: ["Neck", "Spine", "Legs", "Arms"], correctAnswer: 1 },
    { id: 107, difficulty: "EASY", question: "Vitamin for healthy bones?", options: ["Vitamin C", "Vitamin D", "Vitamin B", "Vitamin K"], correctAnswer: 1 },
    { id: 108, difficulty: "MEDIUM", question: "Osteoporosis means bones are?", options: ["Strong", "Porous/Brittle", "Bending", "Growing"], correctAnswer: 1 },
    { id: 109, difficulty: "HARD", question: "ACL is located in the?", options: ["Shoulder", "Knee", "Ankle", "Wrist"], correctAnswer: 1 },
    { id: 110, difficulty: "EASY", question: "Cast is used for?", options: ["Cough", "Fracture", "Burn", "Fever"], correctAnswer: 1 }
  ],

  // COGNITIVE
  "reasoning": [
    { id: 111, difficulty: "EASY", question: "Complete: 2, 4, 6, 8, ?", options: ["9", "10", "12", "14"], correctAnswer: 1 },
    { id: 112, difficulty: "MEDIUM", question: "CAT=24, DOG=26, what is TIGER?", options: ["59", "60", "61", "62"], correctAnswer: 0 },
    { id: 113, difficulty: "HARD", question: "Clock angle at 3:30?", options: ["75°", "80°", "85°", "90°"], correctAnswer: 0 },
    { id: 114, difficulty: "EASY", question: "Apple:Red :: Banana:?", options: ["Blue", "Yellow", "Green", "White"], correctAnswer: 1 },
    { id: 115, difficulty: "MEDIUM", question: "If South=NE, then West=?", options: ["NW", "SE", "NE", "E"], correctAnswer: 1 },
    { id: 116, difficulty: "HARD", question: "Grandfather's only son?", options: ["Uncle", "Father", "Cousin", "Brother"], correctAnswer: 1 },
    { id: 117, difficulty: "EASY", question: "Odd one out: Apple, Orange, Potato, Grape", options: ["Apple", "Orange", "Potato", "Grape"], correctAnswer: 2 },
    { id: 118, difficulty: "MEDIUM", question: "Brother's daughter is your?", options: ["Cousin", "Niece", "Aunt", "Sister"], correctAnswer: 1 },
    { id: 119, difficulty: "HARD", question: "Six friends in circle... (Logic)?", options: ["A", "C", "D", "E"], correctAnswer: 3 },
    { id: 120, difficulty: "EASY", question: "Next: A, C, E, G, ?", options: ["H", "I", "J", "K"], correctAnswer: 1 }
  ],
  "basic-maths": [
    { id: 121, difficulty: "EASY", question: "20% of 150 is?", options: ["20", "30", "40", "50"], correctAnswer: 1 },
    { id: 122, difficulty: "MEDIUM", question: "Square root of 625?", options: ["15", "25", "35", "45"], correctAnswer: 1 },
    { id: 123, difficulty: "HARD", question: "Average of first 50 natural numbers?", options: ["25", "25.5", "26", "26.5"], correctAnswer: 1 },
    { id: 124, difficulty: "EASY", question: "5 workers take 12 days, 10 take?", options: ["6", "24", "10", "8"], correctAnswer: 0 },
    { id: 125, difficulty: "MEDIUM", question: "Profit of 20% on $100 is?", options: ["$10", "$20", "$30", "$40"], correctAnswer: 1 },
    { id: 126, difficulty: "HARD", question: "Shortest distance between (0,10) and (10,0)?", options: ["10", "20", "10√2", "15"], correctAnswer: 2 },
    { id: 127, difficulty: "EASY", question: "Sum of angles in triangle?", options: ["90", "180", "270", "360"], correctAnswer: 1 },
    { id: 128, difficulty: "MEDIUM", question: "If 1=5, 2=10, 3=15, what is 5?", options: ["20", "25", "1", "30"], correctAnswer: 2 },
    { id: 129, difficulty: "HARD", question: "Probability of 7 with two dice?", options: ["1/6", "1/12", "1/36", "1/4"], correctAnswer: 0 },
    { id: 130, difficulty: "EASY", question: "Next prime after 7?", options: ["8", "9", "11", "13"], correctAnswer: 2 }
  ],
  "current-affairs": [
    { id: 131, difficulty: "EASY", question: "CEO of Google?", options: ["Nadella", "Pichai", "Cook", "Musk"], correctAnswer: 1 },
    { id: 132, difficulty: "MEDIUM", question: "Host for COP29 (2024)?", options: ["UAE", "Azerbaijan", "Brazil", "India"], correctAnswer: 1 },
    { id: 133, difficulty: "HARD", question: "Who won Nobel Peace 2023?", options: ["Malala", "Narges Mohammadi", "Greta", "UNICEF"], correctAnswer: 1 },
    { id: 134, difficulty: "EASY", question: "ISRO Sun mission?", options: ["Aditya L1", "Chandrayaan", "Mars", "Gaganyaan"], correctAnswer: 0 },
    { id: 135, difficulty: "MEDIUM", question: "Silicon Valley of India?", options: ["Pune", "Hyderabad", "Bengaluru", "Noida"], correctAnswer: 2 },
    { id: 136, difficulty: "HARD", question: "NATO 2024 member?", options: ["Ukraine", "Finland", "Sweden", "Switzerland"], correctAnswer: 2 },
    { id: 137, difficulty: "EASY", question: "Most populous nation in 2024?", options: ["China", "India", "USA", "Russia"], correctAnswer: 1 },
    { id: 138, difficulty: "MEDIUM", question: "ICC World Cup 2023 Winner?", options: ["India", "Australia", "England", "NZ"], correctAnswer: 1 },
    { id: 139, difficulty: "HARD", question: "Host of G20 Summit in 2023?", options: ["Brazil", "India", "Indonesia", "Italy"], correctAnswer: 1 },
    { id: 140, difficulty: "EASY", question: "Capital of Mizoram?", options: ["Kohima", "Aizawl", "Imphal", "Shillong"], correctAnswer: 1 }
  ]
};

function BattleEngine() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain") || "civil";
  const diffParam = (searchParams.get("difficulty") || "medium").toUpperCase();

  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [introStage, setIntroStage] = useState<number | string | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [questionResults, setQuestionResults] = useState<boolean[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    const bank = DOMAIN_QUESTIONS[domainParam] || DOMAIN_QUESTIONS["civil"];
    // Shuffle and pick 10
    let shuffled = [...bank].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
    setTimeout(() => { setIsLoading(false); setIntroStage(3); }, 1000);
  }, [searchParams]);

  useEffect(() => {
    if (introStage === null) return;
    if (typeof introStage === 'number' && introStage > 1) setTimeout(() => setIntroStage(introStage - 1), 1000);
    else if (introStage === 1) setTimeout(() => setIntroStage("GO!"), 800);
    else if (introStage === "GO!") setTimeout(() => setIntroStage(null), 800);
  }, [introStage]);

  useEffect(() => {
    if (isFinished || isLoading || introStage !== null) return;
    if (timeLeft <= 0) { setIsFinished(true); return; }
    const timer = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, isLoading, introStage]);

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    const correct = idx === questions[currentQIndex].correctAnswer;
    setQuestionResults(p => [...p, correct]);
    if (correct) setScore(s => s + 10);
    setTimeout(() => {
      if (currentQIndex < questions.length - 1) { setCurrentQIndex(p => p + 1); setIsAnswered(false); setSelectedAnswer(null); }
      else setIsFinished(true);
    }, 1500);
  };

  const handlePDF = async () => {
    setIsDownloading(true);
    try {
      const { default: html2canvas } = await import('html2canvas-pro');
      const { default: jsPDF } = await import('jspdf');
      const el = document.getElementById('pdf-template');
      if (!el) return;
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#0a0a0a', useCORS: true });
      const pdf = new jsPDF('p', 'px', 'a4');
      const pdfW = pdf.internal.pageSize.getWidth();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfW, (canvas.height * pdfW) / canvas.width);
      pdf.save(`EduOracle_Report.pdf`);
    } catch { alert("PDF Error"); } finally { setIsDownloading(false); }
  };

  if (isLoading) return <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6"><Loader2 className="animate-spin text-orange-500 mb-4" /><h2 className="text-orange-400 font-black tracking-widest uppercase text-xs">Initialising...</h2></div>;
  if (introStage !== null) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center font-black text-9xl text-white italic">{introStage}</div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col p-4 sm:p-6">
       {/* PDF TEMPLATE */}
       <div className="absolute left-[-9999px] top-0 pointer-events-none">
        <div id="pdf-template" className="w-[800px] p-16" style={{ backgroundColor: '#0a0a0a', color: '#fff', fontFamily: 'sans-serif' }}>
          <div className="text-center border-b border-orange-500 pb-12 mb-12">
            <h1 style={{ color: '#f97316', fontSize: '60px', fontWeight: '900', margin: 0 }}>EDUORACLE AI</h1>
            <h2 style={{ fontSize: '24px', letterSpacing: '8px', color: '#fff', margin: '10px 0' }}>MISSION PERFORMANCE LOG</h2>
            <p style={{ color: '#737373', fontSize: '14px' }}>Operative: <b>Triya Nath</b> | Domain: <b>{domainParam.toUpperCase()}</b></p>
          </div>
          <div className="grid grid-cols-2 gap-8 mb-20" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
             <div style={{ backgroundColor: '#171717', padding: '40px', borderRadius: '30px', textAlign: 'center', border: '1px solid #262626' }}>
                <p style={{ color: '#737373', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '12px' }}>Total Score</p>
                <h2 style={{ fontSize: '48px', color: '#f97316', margin: 0 }}>{score + timeLeft}</h2>
             </div>
             <div style={{ backgroundColor: '#171717', padding: '40px', borderRadius: '30px', textAlign: 'center', border: '1px solid #262626' }}>
                <p style={{ color: '#737373', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '12px' }}>Accuracy</p>
                <h2 style={{ fontSize: '48px', color: '#10b981', margin: 0 }}>{Math.round((questionResults.filter(Boolean).length / 10) * 100)}%</h2>
             </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '100px', borderTop: '1px solid #262626', paddingTop: '40px' }}>
             <p style={{ fontSize: '20px', fontWeight: '900', color: '#ea580c', margin: 0 }}>GLOBIZHUB INDIA PVT. LTD.</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCertificate && (
          <div className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4 backdrop-blur-3xl">
             <div className="max-w-md w-full bg-neutral-900 border border-white/10 rounded-[3rem] p-10 text-center space-y-8 shadow-2xl">
                <ShieldCheck size={80} className="text-orange-500 mx-auto" />
                <h2 className="text-4xl font-black text-white italic">MISSION COMPLETE</h2>
                <div className="flex gap-4">
                  <button onClick={handlePDF} disabled={isDownloading} className="flex-1 py-5 bg-white text-black rounded-2xl font-black text-xs flex items-center justify-center gap-2">{isDownloading ? <Loader2 className="animate-spin" /> : <Download size={16}/>} SAVE PDF</button>
                  <button onClick={() => window.open('https://linkedin.com')} className="flex-1 py-5 bg-[#0A66C2] text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2"><Linkedin size={16}/> SHARE</button>
                </div>
                <button onClick={() => setShowCertificate(false)} className="text-[10px] text-neutral-600 font-black">DISMISS INTEL</button>
             </div>
          </div>
        )}
      </AnimatePresence>

      <header className="max-w-3xl w-full mx-auto mb-10">
        <div className="flex justify-between items-center mb-8">
           <button onClick={() => router.push("/battle")} className="p-3 bg-white/5 rounded-full"><ArrowLeft/></button>
           <div className="bg-white/5 px-8 py-3 rounded-2xl border border-white/10 text-orange-400 font-mono font-black text-2xl">{Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</div>
           <div className="bg-white/5 px-6 py-3 rounded-2xl border border-orange-500/20 text-orange-400 font-black flex gap-3 text-lg"><Trophy/> {score}</div>
        </div>
        <div className="flex gap-1.5 h-2">
           {questions.map((_, i) => <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${i < questionResults.length ? (questionResults[i] ? 'bg-emerald-500' : 'bg-red-500') : (i === currentQIndex ? 'bg-orange-500 animate-pulse' : 'bg-white/10')}`} />)}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-3xl w-full mx-auto">
        {!isFinished ? (
          <motion.div key={currentQIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full space-y-8">
             <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 text-center relative overflow-hidden">
                <span className="text-[10px] text-neutral-500 font-black uppercase tracking-[0.3em]">Node {currentQIndex+1} / 10</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-6 text-white">{questions[currentQIndex]?.question}</h2>
             </div>
             <div className="grid gap-3">
                {questions[currentQIndex]?.options.map((opt: any, i: number) => (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={isAnswered} className={`p-6 rounded-2xl border text-left font-bold transition-all ${isAnswered ? (i === questions[currentQIndex].correctAnswer ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : (i === selectedAnswer ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-white/[0.01] border-white/5 opacity-40')) : 'bg-white/[0.02] border-white/10 hover:border-orange-500/50'}`}>
                    <span className="mr-4 text-neutral-600 font-mono">{String.fromCharCode(65+i)}.</span> {opt}
                  </button>
                ))}
             </div>
          </motion.div>
        ) : (
          <div className="w-full text-center space-y-10 p-12 bg-white/[0.02] border border-white/10 rounded-[4rem]">
             <Trophy size={60} className="text-orange-400 mx-auto" />
             <h2 className="text-5xl font-black italic tracking-tighter uppercase">MISSION SUCCESS</h2>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-6 rounded-3xl border border-white/5"><p className="text-[10px] text-neutral-500 uppercase font-black">Score</p><p className="text-3xl font-mono font-black text-orange-400">{score + timeLeft}</p></div>
                <div className="bg-black/40 p-6 rounded-3xl border border-white/5"><p className="text-[10px] text-neutral-500 uppercase font-black">Time</p><p className="text-3xl font-mono font-black text-emerald-400">+{timeLeft}</p></div>
             </div>
             <button onClick={() => setShowCertificate(true)} className="w-full py-6 bg-orange-600 text-white rounded-2xl font-black uppercase shadow-xl transition-all">Claim Prestige</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function BattleEnginePage() {
  return (<Suspense fallback={<div className="bg-neutral-950 min-h-screen"/>}><BattleEngine /></Suspense>);
}