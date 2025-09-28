import esbuild from 'esbuild';
import path from 'path';

const buildClient = async () => {
  try {
    await esbuild.build({
      // Entry point for client-side code
      entryPoints: ['src/client.jsx'],
      
      // Output configuration
      bundle: true,
      outfile: 'build/static/bundle.js',
      
      // Target environment
      platform: 'browser',
      target: ['es2020'],
      format: 'iife',
      
      // JSX configuration
      jsx: 'automatic',
      jsxImportSource: 'react',
      
      // Development vs Production
      minify: process.env.NODE_ENV === 'production',
      sourcemap: process.env.NODE_ENV !== 'production',
      
      // External dependencies (loaded via CDN or separate bundles)
      external: [],
      
      // Define environment variables
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
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
      
      // Additional options
      metafile: true,
      write: true,
    });
    
    console.log('✅ Client build completed successfully!');
  } catch (error) {
    console.error('❌ Client build failed:', error);
    process.exit(1);
  }
};

buildClient();