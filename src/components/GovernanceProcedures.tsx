import React, { ReactElement } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import InlineLinkCopy from '~/components/ui/inline-link-copy';

type Props = {};

const CategoryItem = ({
  category,
  value,
}: {
  category: string;
  value: string | ReactElement;
}) => (
  <div className="py-1">
    <span className="font-bold">{category}</span>
    <span className="ml-1">{value}</span>
  </div>
);

const GovernanceProcedures = (props: Props) => {
  const mockProcedures = [
    {
      docNumber: 'NPX-PROG-0005',
      title: 'PRODUCT MANAGEMENT AND DEVELOPMENT',
      originator: 'Nuclear Promise X',
      revision: 'R00',
      description:
        'This Product Development Program describes the agile work methodology and how to ensure that innovation products not only meet customer expectations but exceed their expectations. Clear and effective processes and quality controls have been implemented to strive for success in the way our products are developed, tested and delivered. This program document explains the lifecycle of product development from the opportunity / tendering phase through to planning, development, testing, close-out, and continuous improvement.',
      link: 'https://google.ca',
    },
    {
      docNumber: 'NPX-PROG-0005',
      title: 'PRODUCT MANAGEMENT AND DEVELOPMENT',
      originator: 'Nuclear Promise X',
      revision: 'R00',
      description:
        'This Product Development Program describes the agile work methodology and how to ensure that innovation products not only meet customer expectations but exceed their expectations. Clear and effective processes and quality controls have been implemented to strive for success in the way our products are developed, tested and delivered. This program document explains the lifecycle of product development from the opportunity / tendering phase through to planning, development, testing, close-out, and continuous improvement.',
      link: 'google.ca',
    },
  ];

  return (
    <div className="grid gap-6 duration-500 animate-in fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="mb-2 text-2xl font-bold">
            Governance & Procedures
          </CardTitle>
          <CardDescription>The following documents describe</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="container mx-auto">
            <Accordion
              type="multiple"
              // collapsible
              className="w-full"
            >
              {mockProcedures.map((procedure, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="mb-2"
                >
                  <AccordionTrigger className="text-md rounded-t-lg bg-secondary px-4 font-semibold">
                    {procedure.docNumber + ' - ' + procedure.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <CategoryItem
                      category="Title:"
                      value={procedure.title}
                    />
                    <CategoryItem
                      category="Revision:"
                      value={procedure.revision}
                    />
                    <CategoryItem
                      category="Origin:"
                      value={
                        <InlineLinkCopy
                          displayText={procedure.originator}
                          href={procedure.link}
                        />
                      }
                    />
                    <CategoryItem
                      category="Summary:"
                      value={procedure.description}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernanceProcedures;
