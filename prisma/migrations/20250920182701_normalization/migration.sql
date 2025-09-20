/*
  Warnings:

  - You are about to drop the column `age` on the `players` table. All the data in the column will be lost.
  - You are about to drop the column `assist` on the `players` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `players` table. All the data in the column will be lost.
  - You are about to drop the column `match_played` on the `players` table. All the data in the column will be lost.
  - You are about to drop the column `photo_url` on the `players` table. All the data in the column will be lost.
  - You are about to drop the column `red_cards` on the `players` table. All the data in the column will be lost.
  - You are about to drop the column `team` on the `players` table. All the data in the column will be lost.
  - You are about to drop the column `view` on the `players` table. All the data in the column will be lost.
  - You are about to drop the column `yellow_cards` on the `players` table. All the data in the column will be lost.
  - Added the required column `date_of_birth` to the `players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `players` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `position` on the `players` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Position" AS ENUM ('GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD');

-- CreateEnum
CREATE TYPE "public"."MatchResult" AS ENUM ('TEAM1_WIN', 'TEAM2_WIN', 'DRAW', 'PENDING');

-- AlterTable
ALTER TABLE "public"."players" DROP COLUMN "age",
DROP COLUMN "assist",
DROP COLUMN "goal",
DROP COLUMN "match_played",
DROP COLUMN "photo_url",
DROP COLUMN "red_cards",
DROP COLUMN "team",
DROP COLUMN "view",
DROP COLUMN "yellow_cards",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "position",
ADD COLUMN     "position" "public"."Position" NOT NULL,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."clubs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "founded_year" INTEGER,
    "short_description" TEXT NOT NULL,
    "logo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."teams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parent_club_id" INTEGER NOT NULL,
    "age_category" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."team_players" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "left_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "team_players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tournaments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age_category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "logo_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."matches" (
    "id" SERIAL NOT NULL,
    "tournament_id" INTEGER NOT NULL,
    "team1_id" INTEGER NOT NULL,
    "team2_id" INTEGER NOT NULL,
    "round_number" INTEGER NOT NULL,
    "match_date" TIMESTAMP(3),
    "result" "public"."MatchResult" NOT NULL DEFAULT 'PENDING',
    "score_team1" INTEGER NOT NULL DEFAULT 0,
    "score_team2" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "is_played" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."player_statistics" (
    "id" SERIAL NOT NULL,
    "season" TEXT NOT NULL,
    "competition" TEXT NOT NULL,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "matches_played" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "yellow_cards" INTEGER NOT NULL DEFAULT 0,
    "red_cards" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "player_id" INTEGER NOT NULL,

    CONSTRAINT "player_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."team_tournaments" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "tournament_id" INTEGER NOT NULL,
    "completed_matches" INTEGER NOT NULL DEFAULT 0,
    "won" INTEGER NOT NULL DEFAULT 0,
    "drawn" INTEGER NOT NULL DEFAULT 0,
    "lost" INTEGER NOT NULL DEFAULT 0,
    "goals_for" INTEGER NOT NULL DEFAULT 0,
    "goals_against" INTEGER NOT NULL DEFAULT 0,
    "goal_difference" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "position" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clubs_name_key" ON "public"."clubs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "teams_name_key" ON "public"."teams"("name");

-- CreateIndex
CREATE UNIQUE INDEX "teams_name_parent_club_id_age_category_key" ON "public"."teams"("name", "parent_club_id", "age_category");

-- CreateIndex
CREATE UNIQUE INDEX "team_players_team_id_player_id_joined_at_key" ON "public"."team_players"("team_id", "player_id", "joined_at");

-- CreateIndex
CREATE UNIQUE INDEX "tournaments_name_key" ON "public"."tournaments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "matches_tournament_id_team1_id_team2_id_round_number_key" ON "public"."matches"("tournament_id", "team1_id", "team2_id", "round_number");

-- CreateIndex
CREATE UNIQUE INDEX "player_statistics_player_id_season_competition_key" ON "public"."player_statistics"("player_id", "season", "competition");

-- CreateIndex
CREATE UNIQUE INDEX "team_tournaments_team_id_tournament_id_key" ON "public"."team_tournaments"("team_id", "tournament_id");

-- AddForeignKey
ALTER TABLE "public"."teams" ADD CONSTRAINT "teams_parent_club_id_fkey" FOREIGN KEY ("parent_club_id") REFERENCES "public"."clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_players" ADD CONSTRAINT "team_players_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_players" ADD CONSTRAINT "team_players_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_team1_id_fkey" FOREIGN KEY ("team1_id") REFERENCES "public"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_team2_id_fkey" FOREIGN KEY ("team2_id") REFERENCES "public"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player_statistics" ADD CONSTRAINT "player_statistics_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_tournaments" ADD CONSTRAINT "team_tournaments_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_tournaments" ADD CONSTRAINT "team_tournaments_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
