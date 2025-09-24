import { publicProcedure, router } from '../lib/trpc';
import { z } from 'zod';
import { fidaProfiles } from './fidaData'; // Import the mock data

export const fidaRouter = router({
  getFidaProfile: publicProcedure
    .input(z.object({ individualId: z.string().min(1) }))
    .query(({ input }) => {
      const profile = fidaProfiles.find(p => p.individualId === input.individualId);
      if (!profile) {
        throw new Error('FIDA profile not found');
      }
      return profile;
    }),
});
