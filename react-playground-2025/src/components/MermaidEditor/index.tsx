import { useEffect, useState } from "react";
import mermaid from "mermaid";
import Editor from "@monaco-editor/react";

mermaid.initialize({ startOnLoad: false });

export default function MermaidEditor() {
  const [code, setCode] = useState(`sequenceDiagram
    participant Client
    participant Server
    Note over Client,Server: HTTP/2 over single TCP with TLS (ALPN h2)
    Client->>Server: CONNECT TCP + TLS (ALPN negotiate h2)
    Server-->>Client: TLS established (protocol: h2)

    rect rgba(200,200,255,0.2)
      Note over Client,Server: Stream 1 - initial GET
      Client->>Server: HEADERS Stream 1 (GET /index)
      Client-->>Server: DATA Stream 1 (end)
      Server-->>Client: HEADERS Stream 1 (200 OK)
      Server-->>Client: DATA Stream 1 (HTML)
    end

    par Multiplexed parallel streams
      Client->>Server: HEADERS Stream 3 (GET /style.css)
      Client->>Server: HEADERS Stream 5 (GET /app.js)
      Server-->>Client: PUSH_PROMISE Stream 2 (/critical.css)
    and
      Server-->>Client: HEADERS Stream 3 (200 OK)
      Server-->>Client: DATA Stream 3 (CSS)
    and
      Server-->>Client: HEADERS Stream 5 (200 OK)
      Server-->>Client: DATA Stream 5 (JS)
    and
      Server-->>Client: HEADERS Stream 2 (200 OK)
      Server-->>Client: DATA Stream 2 (CSS)
    end

    Client->>Server: SETTINGS (tune flow control)
    Client->>Server: PING
    Server-->>Client: PING ACK

    Client->>Server: GOAWAY (graceful shutdown)
  `);

  const [svg, setSvg] = useState("");

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render("diagram", code);
        setSvg(svg);
      } catch (err) {
        console.error("Mermaid render error:", err);
      }
    };
    renderDiagram();
  }, [code]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 border-r">
        {/* Live textarea that syncs with `code` state */}
        <label className="block text-sm mb-2">Live Mermaid Code</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
          style={{ width: '100%', fontFamily: 'monospace' }}
        />
        <Editor
          height="100%"
          defaultLanguage="markdown"
          value={code}
          onChange={(val) => setCode(val || "")}
        />
      </div>
      <div
        className="w-1/2 p-4 bg-white overflow-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
