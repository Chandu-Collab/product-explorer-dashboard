export default function ErrorState({ message }: { message: string }) {
  return (
    <div className="text-red-500 text-center p-4">
      <p>{message}</p>
    </div>
  );
}