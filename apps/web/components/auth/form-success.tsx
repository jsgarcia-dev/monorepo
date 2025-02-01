import { CircleCheck } from 'lucide-react';

interface FormSuccessProps {
  message?: string;
}

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="rounded-lg border border-emerald-500/50 bg-emerald-500/15 px-4 py-3 text-emerald-600">
      <p className="text-sm">
        <CircleCheck
          className="me-3 -mt-0.5 inline-flex size-4 opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        {message}
      </p>
    </div>
  );
}
