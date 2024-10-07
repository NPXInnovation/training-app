// seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type RoleData = {
  roleName: string;
  roleLevel: number;
};

// Define the structure of a department node
type DepartmentNode = {
  name: string;
  roles: RoleData[];
  subDepartments?: DepartmentNode[];
};

// The company hierarchy object
const companyHierarchy: DepartmentNode[] = [
  // (The companyHierarchy object as defined above)
  {
    name: 'President/CEO',
    roles: [{ roleName: 'Chief Innovation Catalyst', roleLevel: 1 }],
    subDepartments: [
      {
        name: 'Products Department',
        roles: [{ roleName: 'Acting Products Director', roleLevel: 2 }],
        subDepartments: [
          {
            name: 'Software Development',
            roles: [
              {
                roleName: 'Technical Director Software Development',
                roleLevel: 3,
              },
            ],
            subDepartments: [
              {
                name: 'Rapid App Development',
                roles: [
                  {
                    roleName: 'Acting Rapid App Development Lead',
                    roleLevel: 4,
                  },
                  { roleName: 'Innovation Catalyst', roleLevel: 6 },
                ],
              },
              {
                name: 'Analytics & Insights',
                roles: [
                  {
                    roleName: 'Acting Analytics & Insights Lead',
                    roleLevel: 4,
                  },
                  { roleName: 'Innovation Catalyst', roleLevel: 6 },
                ],
              },
              {
                name: 'Full Stack Development',
                roles: [
                  {
                    roleName: 'Acting Full Stack Development Lead',
                    roleLevel: 4,
                  },
                  { roleName: 'Senior Innovation Catalyst', roleLevel: 5 },
                  { roleName: 'Innovation Catalyst', roleLevel: 6 },
                ],
              },
            ],
          },
          {
            name: 'Product Management',
            roles: [
              { roleName: 'Acting Product Management Lead', roleLevel: 3 },
              { roleName: 'Senior Innovation Catalyst', roleLevel: 5 },
              { roleName: 'Innovation Catalyst', roleLevel: 6 },
            ],
          },
          {
            name: 'Prodcuts HIT',
            roles: [{ roleName: 'Acting Prodcuts HIT Lead', roleLevel: 4 }],
          },
        ],
      },
      {
        name: 'Digital Transformers',
        roles: [
          { roleName: 'Acting Digital Transformers Director', roleLevel: 2 },
          { roleName: 'Senior Innovation Catalyst', roleLevel: 5 },
          { roleName: 'Innovation Catalyst', roleLevel: 6 },
        ],
        subDepartments: [
          {
            name: 'Engineering Programs',
            roles: [
              { roleName: 'Acting Engineering Programs Lead', roleLevel: 3 },
              { roleName: 'Innovation Catalyst', roleLevel: 6 },
            ],
          },
          {
            name: 'Project Engineering',
            roles: [
              { roleName: 'Acting Project Engineering Lead', roleLevel: 3 },
              { roleName: 'Senior Innovation Catalyst', roleLevel: 5 },
              { roleName: 'Innovation Catalyst', roleLevel: 6 },
            ],
          },
          {
            name: 'Continuous Online Monitoring',
            roles: [
              { roleName: 'Bruce Power Site Supervisor', roleLevel: 5 },
              { roleName: 'Innovation Catalyst', roleLevel: 6 },
            ],
          },
        ],
      },
      {
        name: 'People & Experience',
        roles: [
          { roleName: 'Chief People & Experience Officer', roleLevel: 2 },
          { roleName: 'People & Experience Lead', roleLevel: 3 },
          { roleName: 'People & Experience Co-ordinator', roleLevel: 6 },
          { roleName: 'Operations & Admin Specialist', roleLevel: 6 },
          { roleName: 'Quality & Safety Specialist', roleLevel: 6 },
          { roleName: 'Social Media Manager', roleLevel: 6 },
        ],
      },
      {
        name: 'Growth & Business Development',
        roles: [{ roleName: 'Growth Director', roleLevel: 2 }],
      },
      {
        name: 'Business Operations',
        roles: [
          { roleName: 'Director Business Operations', roleLevel: 2 },
          { roleName: 'Financial Manager', roleLevel: 3 },
          { roleName: 'Finance & Payroll Specialist', roleLevel: 6 },
          { roleName: 'Commercial & Funding Manager', roleLevel: 6 },
          { roleName: 'Infastructure & IT Specialist', roleLevel: 6 },
        ],
        subDepartments: [
          {
            name: 'BP Aug Staff Contractors',
            roles: [
              {
                roleName: 'Innovation Catalyst',
                roleLevel: 6,
              },
            ],
          },
          {
            name: 'BP Aug Staff Contractors',
            roles: [
              {
                roleName: 'Acting BP Aug Staff Contractors Lead',
                roleLevel: 4,
              },
            ],
          },
        ],
      },
      {
        name: 'QA Matters',
        roles: [{ roleName: 'QA Manager', roleLevel: 2 }],
      },
      {
        name: 'Projects',
        roles: [
          { roleName: 'Director Projects', roleLevel: 2 },
          { roleName: 'Portfolio Manager', roleLevel: 3 },
          { roleName: 'Principal Innovation Catalyst', roleLevel: 5 },
          { roleName: 'Senior Innovation Catalyst', roleLevel: 5 },
          { roleName: 'Innovation Catalyst', roleLevel: 6 },
        ],
        subDepartments: [
          {
            name: 'Projects - OPG',
            roles: [
              { roleName: 'Project Technical Lead', roleLevel: 4 },
              { roleName: 'Principal Innovation Catalyst', roleLevel: 5 },
              { roleName: 'Senior Innovation Catalyst', roleLevel: 5 },
              { roleName: 'Innovation Catalyst', roleLevel: 6 },
            ],
          },
          {
            name: 'Projects - Safe Storage',
            roles: [{ roleName: 'Innovation Catalyst', roleLevel: 6 }],
          },
          {
            name: 'Projects - CNL',
            roles: [{ roleName: 'Portfolio Manager', roleLevel: 4 }],
          },
          {
            name: 'Projects - Digital Strategies',
            roles: [
              {
                roleName: 'Digital Strategies Lead',
                roleLevel: 3,
              },
              { roleName: 'Senior Innovation Catalyst', roleLevel: 5 },
              { roleName: 'Innovation Catalyst', roleLevel: 6 },
            ],
          },
        ],
      },
      {
        name: 'Human Factors',
        roles: [
          { roleName: 'Director Human Factors Engineering', roleLevel: 2 },
          { roleName: 'Innovation Catalyst', roleLevel: 6 },
        ],
      },
      {
        name: 'Design Engineering',
        roles: [
          { roleName: 'Director Design Engineering', roleLevel: 2 },
          { roleName: 'Acting Portfolio Management Lead', roleLevel: 3 },
          { roleName: 'Acting Mechanical Lead', roleLevel: 3 },
          { roleName: 'Senior Advisor', roleLevel: 5 },
          { roleName: 'Principal Innovation Catalyst', roleLevel: 5 },
          {
            roleName: 'X-Project Lead & Senior Innovation Catalyst',
            roleLevel: 5,
          },
          { roleName: 'Innovation Catalyst', roleLevel: 6 },
        ],
        subDepartments: [
          {
            name: 'Electrical and I&C',
            roles: [
              { roleName: 'Innovation Catalyst', roleLevel: 6 },
              { roleName: 'Senior Innovation Catalyst', roleLevel: 5 },
            ],
          },
        ],
      },
      {
        name: 'New Nuclear',
        roles: [
          { roleName: 'Director New Nuclear', roleLevel: 2 },
          { roleName: 'New Nuclear Innovation Lead', roleLevel: 5 },
          { roleName: 'Senior Innovation Catalyst', roleLevel: 5 },
          { roleName: 'Innovation Catalyst', roleLevel: 6 },
        ],
      },
      {
        name: 'Innovation Projects',
        roles: [
          { roleName: 'Director Innovation Projects', roleLevel: 2 },
          { roleName: 'Breaking Barriers Lead', roleLevel: 3 },
          { roleName: 'Field Excellence Lead', roleLevel: 3 },
          { roleName: 'Moonshot Team Lead', roleLevel: 3 },
          { roleName: 'Principal Innovation Catalyst', roleLevel: 5 },
          { roleName: 'Senior Innovation Catalyst', roleLevel: 5 },
          { roleName: 'Innovation Catalyst', roleLevel: 6 },
        ],
      },
    ],
  },
];

async function createDepartmentsAndRoles(
  departments: DepartmentNode[],
  parentDepartmentId: number | null = null
) {
  for (const dept of departments) {
    // Check if the department already exists
    let department = await prisma.department.findFirst({
      where: {
        name: dept.name,
        parentDepartmentId,
      },
    });

    if (!department) {
      // Create the department
      department = await prisma.department.create({
        data: {
          name: dept.name,
          parentDepartmentId,
        },
      });
    }

    // Create roles associated with the department
    if (dept.roles && dept.roles.length > 0) {
      for (const roleData of dept.roles) {
        // Check if the role already exists in this department
        const existingRole = await prisma.role.findFirst({
          where: {
            roleName: roleData.roleName,
            departmentId: department.id,
          },
        });

        if (!existingRole) {
          await prisma.role.create({
            data: {
              roleName: roleData.roleName,
              roleLevel: roleData.roleLevel,
              departmentId: department.id,
            },
          });
        }
      }
    }

    // Recursively create sub-departments
    if (dept.subDepartments && dept.subDepartments.length > 0) {
      await createDepartmentsAndRoles(dept.subDepartments, department.id);
    }
  }
}

async function main() {
  // Start seeding departments from the top-level company hierarchy
  await createDepartmentsAndRoles(companyHierarchy);

  // Note: Since you're assigning positions when users log in for the first time,
  // we don't need to seed employees at this point.
}

main()
  .then(async () => {
    console.log('Database seeded successfully!');
    await prisma.$disconnect();
  })
  .catch(async error => {
    console.error('Error seeding database:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
