-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ExerciseDifficulty" AS ENUM ('BEGINNER', 'MODERATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "difficulty" "ExerciseDifficulty" NOT NULL DEFAULT 'MODERATE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
