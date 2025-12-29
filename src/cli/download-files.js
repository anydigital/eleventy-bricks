#!/usr/bin/env node

import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, resolve, join } from 'path';

/**
 * Parse command line arguments
 * 
 * @returns {Object} Parsed arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    outputDir: null
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--output' || arg === '-o') {
      if (i + 1 < args.length) {
        parsed.outputDir = args[i + 1];
        i++; // Skip next argument
      } else {
        throw new Error(`${arg} requires a directory path`);
      }
    }
  }
  
  return parsed;
}

/**
 * Downloads files specified in package.json's _downloadFiles field
 * 
 * @param {string|null} outputDir - Optional output directory to prepend to all paths
 * @returns {Promise<boolean>} True if all downloads succeeded, false if any failed
 */
async function download(outputDir = null) {
  try {
    // Find and read package.json from the current working directory
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
    
    const downloadFiles = packageJson._downloadFiles;
    
    if (!downloadFiles || typeof downloadFiles !== 'object') {
      console.log('No _downloadFiles field found in package.json');
      return true;
    }

    const entries = Object.entries(downloadFiles);
    
    if (entries.length === 0) {
      console.log('No files to download (_downloadFiles is empty)');
      return true;
    }

    console.log(`Starting download of ${entries.length} file(s)...\n`);
    
    let hasErrors = false;
    
    // Process all downloads
    for (const entry of entries) {
      const url = entry[0];
      let localPath = entry[1];
      
      try {
        console.log(`Downloading: ${url}`);
        console.log(`        To: ${localPath}`);
        
        // Download the file
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        // Get the file content
        const content = await response.arrayBuffer();
        const buffer = Buffer.from(content);
        
        // Prepend output directory to local path if specified
        if (outputDir) {
          localPath = join(outputDir, localPath);
        }
        
        // Resolve the full path
        const fullPath = resolve(process.cwd(), localPath);
        
        // Create directory if it doesn't exist
        const dir = dirname(fullPath);
        await mkdir(dir, { recursive: true });
        
        // Write the file
        await writeFile(fullPath, buffer);
        
        console.log(`   Success: ${localPath}\n`);
      } catch (error) {
        hasErrors = true;
        console.error(`     Error: ${error.message}`);
        console.error(`       URL: ${url}\n`);
      }
    }
    
    // Summary
    if (hasErrors) {
      console.log('Download completed with errors');
      return false;
    } else {
      console.log('All downloads completed successfully');
      return true;
    }
    
  } catch (error) {
    console.error(`Fatal error: ${error.message}`);
    return false;
  }
}

/**
 * CLI entry point
 */
async function main() {
  try {
    const args = parseArgs();
    const success = await download(args.outputDir);
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();

