-- CreateTable
CREATE TABLE "users_session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_session_pkey" PRIMARY KEY ("id")
);
