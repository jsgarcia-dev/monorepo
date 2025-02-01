import { CircleAlert } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 rounded-lg border border-red-500/50 px-4 py-3 text-red-600">
      <p className="text-sm">
        <CircleAlert
          className="me-3 -mt-0.5 inline-flex opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        {message}
      </p>
    </div>
  );
}
