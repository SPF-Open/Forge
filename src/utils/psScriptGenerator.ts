/**
 * Generates PowerShell scripts for creating folder structures
 */

/**
 * Generates a compact one-liner PowerShell script
 * @param folders - Array of folder names
 * @returns PowerShell script as a string
 */
export function generateCompactScript(folders: string[]): string {
  const quotedFolders = folders.map(f => `"${f}"`).join(",");
  return `@(${quotedFolders}) | % { mkdir $_,"$_\\Avant","$_\\Après" -Force > $null }`;
}

/**
 * Generates a clean multi-line PowerShell script
 * @param folders - Array of folder names
 * @returns PowerShell script as a string
 */
export function generateCleanScript(folders: string[]): string {
  const folderList = folders
    .map(f => `    "${f}"`)
    .join(",\n");

  return `$folders = @(
${folderList}
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path $folder -Force | Out-Null
    New-Item -ItemType Directory -Path (Join-Path $folder "Avant") -Force | Out-Null
    New-Item -ItemType Directory -Path (Join-Path $folder "Après") -Force | Out-Null
}`;
}

/**
 * Validates folder names
 * @param folders - Array of folder names to validate
 * @returns Object with isValid flag and error message if invalid
 */
export function validateFolders(folders: string[]): { isValid: boolean; error?: string } {
  if (folders.length === 0) {
    return { isValid: false, error: "At least one folder name is required" };
  }

  for (const folder of folders) {
    if (!folder.trim()) {
      return { isValid: false, error: "Folder names cannot be empty" };
    }
    // Check for invalid Windows folder name characters
    const invalidChars = /[<>:"|?*]/;
    if (invalidChars.test(folder)) {
      return {
        isValid: false,
        error: `Folder name contains invalid characters: < > : " | ? *`,
      };
    }
  }

  return { isValid: true };
}

/**
 * Copies text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}
