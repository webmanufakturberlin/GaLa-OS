// Utility function to merge class names
// Simplified version that doesn't require external dependencies
type ClassValue = string | number | null | boolean | undefined | ClassValue[];

function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const result = clsx(...input);
      if (result) classes.push(result);
    }
  }

  return classes.join(' ');
}

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs).split(' ').filter((c, i, arr) => {
    // Simple deduplication - keep last occurrence
    return arr.lastIndexOf(c) === i;
  }).join(' ');
}
