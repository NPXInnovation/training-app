import React from 'react';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { useSession } from 'next-auth/react';

type Props = {};

const Profile = (props: Props) => {
  const { data: sessionData } = useSession();

  return (
    <div className="grid gap-6 duration-500 animate-in fade-in">
      <Card>
        <CardHeader>
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <div className="text-xl font-bold">{sessionData?.user.name}</div>
            <div className="text-sm text-muted-foreground">
              {sessionData?.user.role}
            </div>
            <div className="text-sm text-muted-foreground">
              {sessionData?.user.department}
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Email
              </div>
              <div>{sessionData?.user.email}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Phone
              </div>
              <div>{sessionData?.user.phone}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Start Date
              </div>
              <div>
                {sessionData?.user?.startDate
                  ? new Date(sessionData?.user?.startDate).toLocaleDateString()
                  : 'No start date data'}
              </div>
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
