import rateLimit from 'express-rate-limit';

export const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: {
    message: 'Terlalu banyak permintaan dari IP ini, silakan coba lagi setelah 15 menit',
    data: null,
    error: 'Batas permintaan terlampaui',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const onboardingAnalysisLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message:
      'Terlalu banyak permintaan analisis onboarding dari IP ini, silakan coba lagi setelah 15 menit',
    data: null,
    error: 'Batas permintaan terlampaui',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
