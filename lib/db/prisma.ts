// src/lib/db/prisma.ts
import { PrismaClient } from '@prisma/client';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

// 1. Initialize the Neon connection pool using your environment variable
const neon = new Pool({ connectionString: process.env.DATABASE_URL! });

// 2. Wrap it in the Prisma Adapter
const adapter = new PrismaNeon(neon);

// 3. Instantiate the client with the adapter
const prisma = new PrismaClient({ adapter });

export default prisma;