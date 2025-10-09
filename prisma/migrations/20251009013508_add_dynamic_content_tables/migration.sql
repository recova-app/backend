-- CreateTable
CREATE TABLE "public"."DailyMotivation" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "DailyMotivation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DailyChallenge" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "DailyChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyMotivation_content_key" ON "public"."DailyMotivation"("content");

-- CreateIndex
CREATE UNIQUE INDEX "DailyChallenge_content_key" ON "public"."DailyChallenge"("content");
