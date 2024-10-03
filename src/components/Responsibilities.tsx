import { api } from '~/utils/api';

export default function Responsibilities() {
  const {
    data: responsibilities,
    isLoading,
    error,
  } = api.user.getResponsibilities.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Responsibilities</h2>
      <ul className="list-disc pl-5">
        {responsibilities?.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>
    </div>
  );
}
