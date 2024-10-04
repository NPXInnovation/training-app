import React from 'react';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';

type Props = {};

const Profile = (props: Props) => {
  return (
    <div className="grid gap-6 duration-500 animate-in fade-in">
      <Card>
        <CardHeader>
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <div className="text-xl font-bold">John Doe</div>
            <div className="text-sm text-muted-foreground">
              Software Engineer
            </div>
            <div className="text-sm text-muted-foreground">
              Engineering Department
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Email
              </div>
              <div>john.doe@company.com</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Phone
              </div>
              <div>+1 (555) 555-5555</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Start Date
              </div>
              <div>June 1, 2020</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Manager
              </div>
              <div>Jane Smith</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
