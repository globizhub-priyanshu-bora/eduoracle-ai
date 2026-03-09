// src/lib/db/prisma.ts
import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// 1. Inject WebSocket constructor for Node.js environment
neonConfig.webSocketConstructor = ws;

// 2. Initialize the Neon connection pool
const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });

// 3. Wrap it in the Prisma Adapter
// Using 'as any' to bypass the strict type mismatch between Neon and Prisma's pg Client types during the MVP build
const adapter = new PrismaNeon(pool as any);

// 4. Instantiate the Prisma Client with the global singleton pattern
// This prevents Next.js hot-reloading from creating too many DB connections
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;