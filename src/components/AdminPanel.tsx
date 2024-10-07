import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { api } from '~/utils/api';

//TODO: use this when editing a managers employees
export default function AdminPanel() {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [section, setSection] = useState('responsibilities');

  const employees = api.admin.getEmployees.useQuery().data;
  const updateEmployeeInfo = api.admin.updateEmployeeInfo.useMutation();

  const [formData, setFormData] = useState({
    responsibilities: '',
    trainings: '',
    software: '',
    governance: '',
    jobAids: '',
    currentRole: '',
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedEmployee) return;

    updateEmployeeInfo.mutate({
      employeeId: selectedEmployee,
      section,
      data: formData[section as keyof typeof formData],
    });
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <div>
        <Label htmlFor="employee">Select Employee</Label>
        <select
          id="employee"
          value={selectedEmployee}
          onChange={e => setSelectedEmployee(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="">Select an employee</option>
          {employees?.map(employee => (
            <option
              key={employee.id}
              value={employee.id}
            >
              {employee.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="section">Select Section</Label>
        <select
          id="section"
          value={section}
          onChange={e => setSection(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="responsibilities">Responsibilities</option>
          <option value="trainings">Trainings</option>
          <option value="software">Required Software</option>
          <option value="governance">Governance & Procedures</option>
          <option value="jobAids">Job Aids</option>
          <option value="currentRole">Current Role</option>
        </select>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Textarea
          name={section}
          value={formData[section as keyof typeof formData]}
          onChange={handleInputChange}
          placeholder={`Enter ${section} information`}
          className="w-full"
        />
        <Button type="submit">Update Employee Information</Button>
      </form>
    </div>
  );
}
