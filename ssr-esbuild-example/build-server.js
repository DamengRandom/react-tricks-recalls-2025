import esbuild from 'esbuild';
import path from 'path';

const buildServer = async () => {
  try {
    await esbuild.build({
      // Entry point for server-side code
      entryPoints: ['src/server.jsx'],
      
      // Output configuration
      bundle: true,
      outfile: 'build/server.js',
      
      // Target environment
      platform: 'node',
      target: ['node18'],
      format: 'esm',
      
      // JSX configuration
      jsx: 'automatic',
      jsxImportSource: 'react',
      
      // Development vs Production
      minify: process.env.NODE_ENV === 'production',
      sourcemap: process.env.NODE_ENV !== 'production',
      
      // External dependencies (keep Node.js modules external)
      external: [
        'express',
        'fs',
        'path',
        'url',
        'crypto',
        'os',
        'util',
        'events',
        'stream',
        'buffer',
        'querystring',
        'http',
        'https',
        'zlib',
      ],
      
      // Define environment variables
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        '__dirname': 'import.meta.dirname',
      },
      
      // Resolve configuration
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
      
      // Loader configuration
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx',
      },
      
      // Banner to handle ES modules in Node.js
      banner: {
        js: `
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
        `.trim(),
      },
      
      // Additional options
      metafile: true,
      write: true,
    });
    
    console.log('✅ Server build completed successfully!');
  } catch (error) {
    console.error('❌ Server build failed:', error);
    process.exit(1);
  }
};

buildServer();