// app/components/form-ui/FormSkeleton.tsx
export default function FormSkeleton() {
  return (
    <div className="space-y-6 mt-8 animate-pulse">
      <div className="h-6 w-2/3 bg-gray-300 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
      <div className="h-12 w-32 bg-gray-300 rounded mt-4" />
    </div>
  );
}
