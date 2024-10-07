import React from 'react';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { ManageSearchRounded } from '@mui/icons-material';

type Props = {};

const tempInitials = (name: string) => {
  const splitName = name.split(' ');

  return splitName
    .map(nameSection =>
      nameSection.toString().includes('"') ? '' : nameSection.charAt(0)
    )
    .join('');
};

const Profile = (props: Props) => {
  const mockUser = {
    name: 'Nicholas "Big Man" Pletch',
    role: 'Software Engineer',
    department: 'Engineering Department',
    email: 'nicholas.bigman.pletch@npxinnovation.ca',
    phone: '+1 (555) 555-5555',
    startDate: 'June 1, 2020',
    manager: 'Nigel "Mr. 100 km" Andrew',
  };

  return (
    <div className="grid gap-6 duration-500 animate-in fade-in">
      <Card>
        <CardHeader>
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{tempInitials(mockUser.name)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <div className="text-xl font-bold">{mockUser.name}</div>
            <div className="text-sm text-muted-foreground">{mockUser.role}</div>
            <div className="text-sm text-muted-foreground">
              {mockUser.department}
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Email
              </div>
              <div>{mockUser.email}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Phone
              </div>
              <div>{mockUser.phone}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Start Date
              </div>
              <div>{mockUser.startDate}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Manager
              </div>
              <div>{mockUser.manager}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
