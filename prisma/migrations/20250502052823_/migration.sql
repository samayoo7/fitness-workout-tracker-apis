/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `WorkoutPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkoutPlan_name_key" ON "WorkoutPlan"("name");
