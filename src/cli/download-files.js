#!/usr/bin/env node

import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, resolve } from 'path';

/**
 * Downloads files specified in package.json's _downloadFiles field
 * 
 * @returns {Promise<boolean>} True if all downloads succeeded, false if any failed
 */
async function download() {
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
    for (const [url, localPath] of entries) {
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
        
        // Resolve the local path relative to cwd
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
    const success = await download();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    process.exit(1);
  }
}

main();

