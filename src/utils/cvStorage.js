/**
 * Triggers a client-side JSON download of the current CV state.
 */
export const exportCvToJson = (cvData) => {
  const fileName = `CV_${(cvData.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_')}.json`;
  const jsonString = JSON.stringify(cvData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Validates and reads uploaded JSON file into React state.
 */
export const importCvFromJson = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || file.type !== 'application/json') {
      return reject(new Error('Please upload a valid .json file.'));
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        
        // Basic schema structure validation check
        if (typeof parsed !== 'object' || parsed === null) {
          throw new Error('Invalid JSON format.');
        }

        resolve(parsed);
      } catch (err) {
        reject(new Error('Failed to parse JSON file. Ensure the file is not corrupted.'));
      }
    };

    reader.onerror = () => reject(new Error('Error reading file.'));
    reader.readAsText(file);
  });
};
