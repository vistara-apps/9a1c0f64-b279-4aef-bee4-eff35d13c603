export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
        <p className="text-muted-foreground">Loading KnowYourRights Cards...</p>
      </div>
    </div>
  );
}
