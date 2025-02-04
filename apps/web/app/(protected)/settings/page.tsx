import { auth } from '@/auth';

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div>
      Settings Page
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
