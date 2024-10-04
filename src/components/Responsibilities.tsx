import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export default function Responsibilities() {
  return (
    <div className="grid gap-6 duration-500 animate-in fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Job Responsibilities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 text-sm">
            <li>
              <div className="font-medium">
                Develop and maintain web applications
              </div>
              <div className="text-muted-foreground">
                Design, implement, and test new features and functionality for
                our web-based products.
              </div>
            </li>
            <li>
              <div className="font-medium">
                Collaborate with cross-functional teams
              </div>
              <div className="text-muted-foreground">
                Work closely with product managers, designers, and other
                developers to ensure successful project delivery.
              </div>
            </li>
            <li>
              <div className="font-medium">
                Participate in code reviews and pair programming
              </div>
              <div className="text-muted-foreground">
                Provide constructive feedback and share knowledge to improve
                code quality and team skills.
              </div>
            </li>
            <li>
              <div className="font-medium">
                Identify and resolve technical issues
              </div>
              <div className="text-muted-foreground">
                Troubleshoot and debug problems, and implement solutions to
                improve system reliability and performance.
              </div>
            </li>
            <li>
              <div className="font-medium">
                Stay up-to-date with industry trends and technologies
              </div>
              <div className="text-muted-foreground">
                Continuously learn and explore new tools, frameworks, and best
                practices to enhance your skills and contribute to the team's
                growth.
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
