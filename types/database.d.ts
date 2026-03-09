// types/database.d.ts
import { Prisma } from "@prisma/client";

/**
 * 🏗️ PRISMA INFERRED TYPES
 * These use Prisma's utility types to infer the exact shape of your database
 * records when you include relational data.
 */

// A User object that includes both potential profiles
export type UserWithProfiles = Prisma.UserGetPayload<{
  include: {
    studentProfile: true;
    teacherProfile: true;
  };
}>;

// A Teacher object that includes their full array of classes
export type TeacherWithClasses = Prisma.TeacherProfileGetPayload<{
  include: {
    classes: true;
  };
}>;

// A standard Student Profile
export type StudentProfileData = Prisma.StudentProfileGetPayload<{}>;

// A standard Class Roster
export type ClassRosterData = Prisma.ClassRosterGetPayload<{}>;