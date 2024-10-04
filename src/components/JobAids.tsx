import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
type Props = {};

const JobAids = (props: Props) => {
  return (
    <div className="grid gap-6 duration-500 animate-in fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Job Aids</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 text-sm">
            <li>
              <div className="font-medium">Quick Reference Guides</div>
              <div className="text-muted-foreground">
                Concise, step-by-step instructions for common tasks and
                procedures.
              </div>
            </li>
            <li>
              <div className="font-medium">Checklists</div>
              <div className="text-muted-foreground">
                Comprehensive lists of required steps or items to ensure
                consistent and thorough completion of tasks.
              </div>
            </li>
            <li>
              <div className="font-medium">Process Flowcharts</div>
              <div className="text-muted-foreground">
                Visual representations of the steps and decision points in a
                process, helping to understand the flow and dependencies.
              </div>
            </li>
            <li>
              <div className="font-medium">Troubleshooting Guides</div>
              <div className="text-muted-foreground">
                Step-by-step instructions for identifying and resolving common
                issues or problems.
              </div>
            </li>
            <li>
              <div className="font-medium">Training Videos</div>
              <div className="text-muted-foreground">
                Instructional videos demonstrating the proper execution of tasks
                or the use of tools and systems.
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobAids;
