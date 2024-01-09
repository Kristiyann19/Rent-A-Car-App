export class CarImage {
  bytes: Uint8Array; // Use appropriate type based on your server-side implementation (e.g., string or byte[])
  description: string;
  fileExtension: string;
  size: number;
}