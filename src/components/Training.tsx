import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {};

const Training = (props: Props) => {
  return (
    <div className="grid gap-6 duration-500 animate-in fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Training Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  Introduction to Software Engineering
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Completion date: June 30, 2023
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                To complete this training, please visit the company's learning
                management system and enroll in the "Introduction to Software
                Engineering" course. If you have any questions, reach out to
                your manager or the training coordinator.
                <Link
                  href="#"
                  className="ml-2 inline-flex items-center gap-1 text-primary hover:underline"
                  prefetch={false}
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  Go to course
                </Link>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  Advanced JavaScript Techniques
                </div>
                <Badge variant="secondary">Completed</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Completed on: April 15, 2023
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                This training was completed through a series of online modules
                and a final assessment. If you have any questions or need to
                review the materials, please contact the training department.
                <Link
                  href="#"
                  className="ml-2 inline-flex items-center gap-1 text-primary hover:underline"
                  prefetch={false}
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  Go to course
                </Link>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  Agile Project Management Certification
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Completion date: September 1, 2023
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                To obtain this certification, you will need to register for the
                Agile Project Management course offered by our partner training
                provider. Speak with your manager or the training coordinator to
                get started.
                <Link
                  href="#"
                  className="ml-2 inline-flex items-center gap-1 text-primary hover:underline"
                  prefetch={false}
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  Go to course
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Training;
