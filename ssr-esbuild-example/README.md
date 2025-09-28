# React SSR with esbuild

A complete React Server-Side Rendering setup using esbuild for fast builds.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Application
```bash
# Build both client and server bundles
npm run build

# Or build individually
npm run build:client  # Builds client-side bundle
npm run build:server  # Builds server-side bundle
```

### 3. Run the Application
```bash
npm start
```

Visit `http://localhost:8549` to see your SSR React app!

## 📁 Project Structure

```
├── src/
│   ├── App.jsx          # Shared React component
│   ├── client.jsx       # Client-side entry point
│   └── server.jsx       # Server-side entry point
├── build/
│   ├── index.html       # HTML template
│   ├── server.js        # Built server bundle
│   └── static/
│       └── bundle.js    # Built client bundle
├── build-client.js      # esbuild config for client
├── build-server.js      # esbuild config for server
└── package.json
```

## 🛠️ Available Scripts

- `npm run build` - Build both client and server
- `npm run build:client` - Build client bundle only
- `npm run build:server` - Build server bundle only
- `npm start` - Start the production server
- `npm run dev` - Build in development mode and start
- `npm run prod` - Build in production mode and start
- `npm run clean` - Remove build directory

## 🔧 esbuild Configuration

### Client Build (`build-client.js`)
- **Target**: Browser (ES2020)
- **Format**: IIFE (Immediately Invoked Function Expression)
- **Output**: `build/static/bundle.js`
- **Features**: JSX, minification, sourcemaps

### Server Build (`build-server.js`)
- **Target**: Node.js 18+
- **Format**: ES Modules
- **Output**: `build/server.js`
- **Features**: JSX, external Node.js modules, ES module compatibility

## 🎯 Key Features

✅ **Fast Builds** - esbuild provides lightning-fast compilation  
✅ **SSR Ready** - Server-side rendering with React 18  
✅ **Client Hydration** - Seamless client-side takeover  
✅ **React Router** - Full routing support  
✅ **Modern JSX** - Automatic JSX runtime  
✅ **TypeScript Ready** - Easy to add TypeScript support  
✅ **Development & Production** - Optimized builds for both environments  

## 🔍 How It Works

1. **Server Build**: esbuild compiles `src/server.jsx` into a Node.js compatible bundle
2. **Client Build**: esbuild compiles `src/client.jsx` into a browser-compatible bundle
3. **SSR Process**: 
   - Server renders React components to HTML string
   - HTML template is populated with rendered content
   - Client bundle hydrates the server-rendered content
4. **Routing**: React Router handles both server and client-side routing

## 🚀 Production Deployment

```bash
# Build for production
npm run prod:build

# Start production server
npm start
```

## 📝 Notes

- The server runs on port 8549 by default
- Static files are served from `/static/` route
- HTML template is located at `build/index.html`
- Both client and server code support modern JSX and ES modules