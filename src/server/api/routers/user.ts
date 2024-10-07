import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

export const userRouter = createTRPCRouter({
  // getResponsibilities: protectedProcedure.query(async ({ ctx }) => {
  //   const user = await ctx.prisma.user.findUnique({
  //     where: { id: ctx.session.user.id },
  //     include: { responsibilities: true },
  //   });
  //   return user?.responsibilities.map(r => r.description) || [];
  // }),

  // isManager: protectedProcedure.query(async ({ ctx }) => {
  //   const user = await ctx.prisma.user.findUnique({
  //     where: { id: ctx.session.user.id },
  //     include: { role: true },
  //   });
  //   return user?.role.name === 'Manager';
  // }),

  // getCurrentUserInfo: protectedProcedure.query(async ({ ctx }) => {
  //   const user = await ctx.prisma.user.findUnique({
  //     where: { id: ctx.session.user.id },
  //     include: { role: true, team: true },
  //   });
  //   return user;
  // }),

  submitOnboarding: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        email: z.string().email('Invalid email address'),
        phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
        departmentId: z
          .string()
          .regex(/^\d+$/, 'Department ID must be a number'),
        roleId: z.string().regex(/^\d+$/, 'Role ID must be a number'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, email, phone, roleId, departmentId } = input;

      // Update or create the employee record
      const employee = await ctx.prisma.employee.upsert({
        where: { email },
        update: {
          firstName,
          lastName,
          phone,
          departmentId: parseInt(departmentId),
        },
        create: {
          firstName,
          lastName,
          email,
          phone,
          departmentId: parseInt(departmentId),
        },
      });

      // Assign the role to the employee
      await ctx.prisma.employeeRole.create({
        data: {
          employeeId: employee.id,
          roleId: parseInt(roleId),
          startDate: new Date(),
        },
      });

      // Update the the user row related to the employee through the employeeId
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { isOnboardingComplete: true },
      });

      return { success: true };
    }),
});
