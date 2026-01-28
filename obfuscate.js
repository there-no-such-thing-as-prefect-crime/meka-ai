#!/usr/bin/env node

/**
 * Advanced JavaScript Obfuscator Script
 * Created by MX Game Coder
 * 
 * This script obfuscates multiple JavaScript files with maximum protection
 * and adds custom copyright headers to each file.
 */

const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Custom header to be added to all obfuscated files
const CUSTOM_HEADER = `/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *                    ⚠️  MXGAMECODER PROPERTY ⚠️
 * 
 *              🚫 DO NOT MODIFY THIS CODE 🚫
 * 
 *   This code is the intellectual property of MXGameCoder.
 *   Unauthorized modification, distribution, or reproduction 
 *   of this code is strictly prohibited.
 * 
 *   📱 For custom code or modifications:
 *      WhatsApp: +234 902 150 6036
 * 
 *   🔒 This file has been obfuscated for protection
 * 
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

`;

// Files to obfuscate
const FILES_TO_OBFUSCATE = [
    'pair.js',
    'index.js',
    'id.js',
    'msg.js'
];

// Advanced obfuscation configuration
const obfuscationConfig = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayCallsTransformThreshold: 0.75,
    stringArrayEncoding: ['rc4'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};

// Print banner
function printBanner() {
    console.log(colors.cyan + colors.bright);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('           🔒 MXGAMECODER OBFUSCATION TOOL 🔒           ');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(colors.reset);
}

// Print success message
function printSuccess(message) {
    console.log(colors.green + '✓ ' + message + colors.reset);
}

// Print error message
function printError(message) {
    console.log(colors.red + '✗ ' + message + colors.reset);
}

// Print info message
function printInfo(message) {
    console.log(colors.blue + 'ℹ ' + message + colors.reset);
}

// Print warning message
function printWarning(message) {
    console.log(colors.yellow + '⚠ ' + message + colors.reset);
}

// Create backup directory
function createBackupDirectory() {
    const backupDir = path.join(process.cwd(), 'backup_original');
    
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
        printSuccess(`Created backup directory: ${backupDir}`);
    }
    
    return backupDir;
}

// Backup original file
function backupFile(filename) {
    const backupDir = createBackupDirectory();
    const sourcePath = path.join(process.cwd(), filename);
    const backupPath = path.join(backupDir, filename);
    
    if (!fs.existsSync(sourcePath)) {
        return false;
    }
    
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupFilename = filename.replace('.js', `.backup.${timestamp}.js`);
        const timestampedBackupPath = path.join(backupDir, backupFilename);
        
        fs.copyFileSync(sourcePath, timestampedBackupPath);
        printInfo(`Backed up: ${filename} → backup_original/${backupFilename}`);
        return true;
    } catch (error) {
        printError(`Failed to backup ${filename}: ${error.message}`);
        return false;
    }
}

// Obfuscate a single file
function obfuscateFile(filename) {
    const filePath = path.join(process.cwd(), filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        printWarning(`File not found: ${filename} - Skipping...`);
        return false;
    }
    
    try {
        // Read original file
        printInfo(`Processing: ${filename}`);
        const originalCode = fs.readFileSync(filePath, 'utf8');
        
        // Backup original file
        backupFile(filename);
        
        // Obfuscate code
        printInfo(`Obfuscating: ${filename}...`);
        const obfuscationResult = JavaScriptObfuscator.obfuscate(originalCode, obfuscationConfig);
        const obfuscatedCode = obfuscationResult.getObfuscatedCode();
        
        // Add custom header
        const finalCode = CUSTOM_HEADER + obfuscatedCode;
        
        // Write obfuscated code back to file
        fs.writeFileSync(filePath, finalCode, 'utf8');
        
        // Calculate size reduction/increase
        const originalSize = (originalCode.length / 1024).toFixed(2);
        const obfuscatedSize = (finalCode.length / 1024).toFixed(2);
        const sizeChange = ((obfuscatedSize - originalSize) / originalSize * 100).toFixed(1);
        
        printSuccess(`Successfully obfuscated: ${filename}`);
        console.log(colors.magenta + `  Original size: ${originalSize} KB` + colors.reset);
        console.log(colors.magenta + `  Obfuscated size: ${obfuscatedSize} KB (${sizeChange > 0 ? '+' : ''}${sizeChange}%)` + colors.reset);
        console.log('');
        
        return true;
    } catch (error) {
        printError(`Failed to obfuscate ${filename}: ${error.message}`);
        return false;
    }
}

// Main execution
function main() {
    printBanner();
    
    console.log(colors.yellow + '⚡ Starting obfuscation process...\n' + colors.reset);
    
    let successCount = 0;
    let failCount = 0;
    let skippedCount = 0;
    
    // Obfuscate each file
    for (const filename of FILES_TO_OBFUSCATE) {
        const result = obfuscateFile(filename);
        
        if (result === true) {
            successCount++;
        } else if (result === false && fs.existsSync(path.join(process.cwd(), filename))) {
            failCount++;
        } else {
            skippedCount++;
        }
    }
    
    // Print summary
    console.log(colors.cyan + colors.bright);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('                    📊 SUMMARY REPORT                    ');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(colors.reset);
    
    console.log(colors.green + `✓ Successfully obfuscated: ${successCount} file(s)` + colors.reset);
    
    if (failCount > 0) {
        console.log(colors.red + `✗ Failed: ${failCount} file(s)` + colors.reset);
    }
    
    if (skippedCount > 0) {
        console.log(colors.yellow + `⚠ Skipped: ${skippedCount} file(s)` + colors.reset);
    }
    
    console.log('');
    printInfo('Original files backed up to: ./backup_original/');
    console.log('');
    
    if (successCount > 0) {
        console.log(colors.green + colors.bright);
        console.log('🎉 Obfuscation completed successfully!');
        console.log(colors.reset);
        console.log(colors.cyan + '📱 Contact: WhatsApp +234 902 150 6036' + colors.reset);
        console.log(colors.cyan + '🔧 Created by: MXGameCoder' + colors.reset);
    } else {
        console.log(colors.red + '❌ No files were obfuscated.' + colors.reset);
        console.log(colors.yellow + '\nMake sure the following files exist in the current directory:' + colors.reset);
        FILES_TO_OBFUSCATE.forEach(file => {
            console.log(colors.yellow + `  • ${file}` + colors.reset);
        });
    }
    
    console.log('');
}

// Run the script
if (require.main === module) {
    // Check if javascript-obfuscator is installed
    try {
        require.resolve('javascript-obfuscator');
        main();
    } catch (error) {
        printBanner();
        printError('javascript-obfuscator is not installed!');
        console.log('');
        printInfo('Please install it using one of these commands:');
        console.log(colors.yellow + '  npm install --save-dev javascript-obfuscator' + colors.reset);
        console.log(colors.yellow + '  or' + colors.reset);
        console.log(colors.yellow + '  npm install -g javascript-obfuscator' + colors.reset);
        console.log('');
        process.exit(1);
    }
}

module.exports = { obfuscateFile, obfuscationConfig };
