export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-gray-500 text-center p-4">
      <p>{message}</p>
    </div>
  );
}