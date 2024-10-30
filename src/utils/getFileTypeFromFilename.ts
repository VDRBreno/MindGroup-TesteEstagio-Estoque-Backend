export default function getFileTypeFromFilename(filename: string) {
  const filenameSplitted = filename.split('.');
  return filenameSplitted[filenameSplitted.length-1];
}