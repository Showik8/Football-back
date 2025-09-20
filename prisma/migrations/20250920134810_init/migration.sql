/*
  Warnings:

  - You are about to drop the `_clubTotournament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_clubTotournament" DROP CONSTRAINT "_clubTotournament_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_clubTotournament" DROP CONSTRAINT "_clubTotournament_B_fkey";

-- DropTable
DROP TABLE "public"."_clubTotournament";

-- CreateTable
CREATE TABLE "public"."_TournamentMembers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TournamentMembers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TournamentMembers_B_index" ON "public"."_TournamentMembers"("B");

-- AddForeignKey
ALTER TABLE "public"."_TournamentMembers" ADD CONSTRAINT "_TournamentMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TournamentMembers" ADD CONSTRAINT "_TournamentMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;
