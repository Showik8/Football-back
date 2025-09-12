-- CreateTable
CREATE TABLE "public"."players" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "jersey" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "nationality" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "assist" INTEGER NOT NULL,
    "match_played" INTEGER NOT NULL,
    "view" INTEGER NOT NULL,
    "yellow_cards" INTEGER NOT NULL,
    "red_cards" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);
