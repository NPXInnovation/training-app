import { type NextPage } from 'next';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { FilePenIcon, PlusIcon, Trash2Icon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import router from 'next/router';
import NavBar from '~/components/NavBar';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { signIn, useSession } from 'next-auth/react';
import { Skeleton } from '~/components/ui/skeleton';

const HomeSkeleton = () => (
  <div className="space-y-4 pt-16">
    <Skeleton className="h-12 w-[250px]" />
    <div className="grid w-max grid-cols-1 gap-4 sm:grid-cols-2">
      <Skeleton className="h-[200px] w-[300px]" />
      <Skeleton className="h-[200px] w-[300px]" />
    </div>
  </div>
);

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession();

  if (status === 'loading') {
    return <HomeSkeleton />;
  }
  if (status === 'unauthenticated' || !sessionData?.user.name) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-10">
        <h1 className="text-3xl font-bold">Please login to continue</h1>
        <div className="relative">
          <div className="absolute -top-8 left-1/3 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
              ></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>
          <Button onClick={() => void signIn()}>Login</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="max-w-3xl space-y-8 pt-12">
        <WelcomeMessage name={sessionData.user.name.split(' ')[0] as string} />
        <div className="grid w-max grid-cols-1 gap-4 sm:grid-cols-2">
          <YourDashboard
            name={sessionData.user.name}
            role={sessionData.user.role}
          />
          <EmployeeManagement />
        </div>
      </div>
      {/* <Dashboard /> */}
    </>
  );
};

const EmployeeManagement = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Employee Management</CardTitle>
        <CardDescription>View and manage your team members.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-2xl font-bold">Team Overview</p>
                <p className="text-sm text-muted-foreground">
                  Manage your employees
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
                <Button variant="outline">
                  <UsersIcon className="mr-2 h-4 w-4" />
                  View Employees
                </Button>
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">
                        Software Engineer
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Software Engineer</TableCell>
                <TableCell>john@acme.com</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <FilePenIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <Trash2Icon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">
                        Product Manager
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Product Manager</TableCell>
                <TableCell>jane@acme.com</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <FilePenIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <Trash2Icon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Michael Johnson</p>
                      <p className="text-sm text-muted-foreground">
                        UI/UX Designer
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>UI/UX Designer</TableCell>
                <TableCell>michael@acme.com</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <FilePenIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <Trash2Icon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const YourDashboard = ({ name, role }: { name: string; role: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your Dashboard</CardTitle>
        <CardDescription>
          View your personal information and activity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
          <Link
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
            onClick={() => {
              router.push('/dashboard');
            }}
          >
            Go to Dashboard
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const WelcomeMessage = ({ name }: { name: string }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold sm:text-4xl">Welcome back, {name}!</h1>
      <p className="text-muted-foreground">
        Here's a quick overview of your account and team.
      </p>
    </div>
  );
};

export default Home;
