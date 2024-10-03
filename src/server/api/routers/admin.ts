import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { TRPCError } from '@trpc/server';

export const adminRouter = createTRPCRouter({
  getEmployees: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { role: true, team: true },
    });

    if (currentUser?.role.name !== 'Manager') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Only managers can access this information',
      });
    }

    return ctx.prisma.user.findMany({
      where: { teamId: currentUser.teamId },
      select: { id: true, name: true },
    });
  }),

  updateEmployeeInfo: protectedProcedure
    .input(
      z.object({
        employeeId: z.string(),
        section: z.enum([
          'responsibilities',
          'trainings',
          'software',
          'governance',
          'jobAids',
          'currentRole',
        ]),
        data: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        include: { role: true, team: true },
      });

      if (currentUser?.role.name !== 'Manager') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only managers can update employee information',
        });
      }

      const employee = await ctx.prisma.user.findUnique({
        where: { id: input.employeeId },
      });

      if (employee?.teamId !== currentUser.teamId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only update information for employees in your team',
        });
      }

      // Update the specific section for the employee
      // This is a simplified example; you might need to adjust based on your actual data model
      switch (input.section) {
        case 'responsibilities':
          await ctx.prisma.responsibility.create({
            data: {
              description: input.data,
              userId: input.employeeId,
            },
          });
          break;
        // Add cases for other sections as needed
        default:
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid section specified',
          });
      }

      return { success: true };
    }),
});
