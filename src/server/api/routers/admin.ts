import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import { TRPCError } from '@trpc/server';

//TODO: These routes were just boiler plate and need to be fixed
//TODO: Add more endpoints for getting all properties of a user such as trainings, responsibilities, etc.
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
  getDepartments: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.department.findMany({
      where: { isActive: true },
      select: { id: true, name: true },
    });
  }),

  getRoles: publicProcedure
    .input(z.object({ departmentId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.role.findMany({
        where: {
          departmentId: parseInt(input.departmentId),
          isActive: true,
        },
        select: { id: true, roleName: true },
      });
    }),
});
