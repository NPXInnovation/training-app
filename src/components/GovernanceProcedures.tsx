import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
type Props = {};

const GovernanceProcedures = (props: Props) => {
  return (
    <div className="grid gap-6 duration-500 animate-in fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Governance</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 text-sm">
            <li>
              <div className="font-medium">Policies and Procedures</div>
              <div className="text-muted-foreground">
                Formal guidelines and rules that govern the organization's
                operations, decision-making, and employee conduct.
              </div>
            </li>
            <li>
              <div className="font-medium">Roles and Responsibilities</div>
              <div className="text-muted-foreground">
                Clear definitions of the duties, authority, and accountability
                for each position or function within the organization.
              </div>
            </li>
            <li>
              <div className="font-medium">Approval Workflows</div>
              <div className="text-muted-foreground">
                Documented processes for obtaining the necessary approvals and
                sign-offs for various business activities or decisions.
              </div>
            </li>
            <li>
              <div className="font-medium">Compliance and Auditing</div>
              <div className="text-muted-foreground">
                Measures to ensure adherence to internal policies, external
                regulations, and industry standards, including regular audits
                and reviews.
              </div>
            </li>
            <li>
              <div className="font-medium">Risk Management</div>
              <div className="text-muted-foreground">
                Processes for identifying, assessing, and mitigating potential
                risks to the organization's operations, assets, and reputation.
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernanceProcedures;
