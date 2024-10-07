import { SquareArrowOutUpRight } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
type Props = {};

const example = [
  {
    title: 'NPX-PROG-0005',
    link: 'https://ca.intelex.com/Login/NPXinnovation/Application/DocCtrl/DocExp/File/Download/a71f6dcb-dee6-427f-ac2e-1b256db41681?viewMode=View&original=True',
    description:
      'This Product Development Program describes the agile work methodology and how to ensure that innovation products not only meet customer expectations but exceed their expectations. Clear and effective processes and quality controls have been implemented to strive for success in the way our products are developed, tested and delivered. This program document explains the lifecycle of product development from the opportunity / tendering phase through to planning, development, testing, close-out, and continuous improvement.',
  },
  {
    title: 'BP-PROG-4214',
    link: 'https://ca.intelex.com/Login/NPXinnovation/Application/DocCtrl/DocExp/File/Download/a71f6dcb-dee6-427f-ac2e-1b256db41681?viewMode=View&original=True',
    description:
      'This Business Process Program outlines the standardized procedures for efficient workflow management across all departments. It covers key areas such as resource allocation, task prioritization, and interdepartmental communication. The program aims to streamline operations, reduce redundancies, and enhance overall productivity. It provides guidelines for process mapping, continuous improvement initiatives, and performance metrics to ensure consistent quality and customer satisfaction throughout the organization.',
  },
];

const GovernanceProcedures = (props: Props) => {
  return (
    <div className="grid gap-6 duration-500 animate-in fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Governance & Procedures</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 text-sm">
            {example.map(item => (
              <li key={item.title}>
                <div className="flex items-center font-medium">
                  {item.title}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2"
                  >
                    <SquareArrowOutUpRight size={16} />
                  </a>
                </div>
                <div className="text-muted-foreground">{item.description}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernanceProcedures;
