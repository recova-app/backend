-- CreateTable
CREATE TABLE "public"."AiChatHistory" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AiChatHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AiChatHistory_userId_createdAt_idx" ON "public"."AiChatHistory"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "public"."AiChatHistory" ADD CONSTRAINT "AiChatHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
