-- CreateTable
CREATE TABLE "public"."CommunityPostLike" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "CommunityPostLike_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateIndex
CREATE INDEX "CommunityPostLike_postId_idx" ON "public"."CommunityPostLike"("postId");

-- AddForeignKey
ALTER TABLE "public"."CommunityPostLike" ADD CONSTRAINT "CommunityPostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityPostLike" ADD CONSTRAINT "CommunityPostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."CommunityPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
