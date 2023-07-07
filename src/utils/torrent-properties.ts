export const formatProgress = (progress: number) => {
  if (!progress) return "Unknown";
  if (progress === 100) return "Completed";

  return `${progress}%`;
};
