// import { z } from 'zod';

// import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

// export const openAiRouter = createTRPCRouter({
//   askQuestion: protectedProcedure
//     .input(z.object({ question: z.string() }))
//     .query(async ({ ctx, input }) => {
//       try {
//         const { question } = input;
//         const { OpenAi } = ctx;
//         const response = await OpenAi.createChatCompletion({
//           model: 'gpt-3.5-turbo',
//           messages: [
//             {
//               role: 'user',
//               content: question,
//               name: 'User',
//             },
//           ],
//           stop: ['\n'],
//         });
//         return response.data.choices[0]?.message;
//       } catch (e) {
//         console.log(e);
//       }
//     }),
// });
