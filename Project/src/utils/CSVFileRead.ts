import { Stream } from "stream";
import { BadRequestError } from "./customError";
import csv from "csv-parser";

/**
 * Reads data from a CSV file and parses it into an array of objects.
 * @param {Express.Multer.File} file - The CSV file uploaded by the user, provided via multer. The file should contain a buffer with the CSV data.
 * @return {Promise<T[]>} - A promise that resolves with an array of objects parsed from the CSV data. The type of the objects is specified by the generic type parameter `T`.
 */
export default function readDataFromCSV<T>(file: Express.Multer.File): Promise<T[]> {
  if (!file || !file.buffer) {
    throw new BadRequestError("Provide the input file");
  }
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    const bufferStream = new Stream.PassThrough();
    bufferStream.end(file.buffer);
    bufferStream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(new BadRequestError(`Failed to read CSV file: ${error.message}`));
      });
  });
}
