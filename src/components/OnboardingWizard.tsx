import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';

const FormSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }).min(1),
  lastName: z.string({ required_error: 'Last name is required' }).min(1),
  email: z.string({ required_error: 'Email is required' }).email(),
  phone: z.string({ required_error: 'Phone number is required' }).min(10),
  departmentId: z.string({ required_error: 'Department is required' }).min(1),
  roleId: z.string({ required_error: 'Role is required' }).min(1),
});

export default function OnboardingWizard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const [firstName, lastName] = (session.user.name || '').split(' ');
      form.setValue('firstName', firstName || '');
      form.setValue('lastName', lastName || '');
      form.setValue('email', session.user.email || '');
    }
  }, [status, session, form]);

  const departments = api.admin.getDepartments.useQuery().data;
  const selectedDepartmentId = form.watch('departmentId');
  const roles = api.admin.getRoles.useQuery(
    { departmentId: selectedDepartmentId },
    { enabled: !!selectedDepartmentId }
  ).data;

  const submitOnboarding = api.user.submitOnboarding.useMutation({
    onSuccess: async () => {
      toast.success('Onboarding submission successful!');
      // Redirect to home page
      router.push('/');
    },
    onError: () => {
      toast.error('Onboarding submission failed');
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await submitOnboarding.mutateAsync(data);
  };

  return (
    <div className="space-y-6 pt-12">
      <h2 className="text-2xl font-bold">Welcome! Let's get you set up.</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 space-y-6"
        >
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="First Name"
                        required
                      />
                    </FormControl>
                    <FormDescription>Verify your first name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Last Name"
                        required
                      />
                    </FormControl>
                    <FormDescription>Verify your last name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email"
                        required
                      />
                    </FormControl>
                    <FormDescription>This is your work email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Phone"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => setStep(2)}
              >
                Next
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>

                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments?.map(dept => (
                          <SelectItem
                            key={dept.id}
                            value={dept.id.toString()}
                          >
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select your department, consult with your manager if you
                      are unsure.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>

                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      required
                      disabled={!form.watch('departmentId')}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles?.map(role => (
                          <SelectItem
                            key={role.id}
                            value={role.id.toString()}
                          >
                            {role.roleName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Complete Onboarding</Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
