import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares to parse JSON bodies with a generous limit for images and videos
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ limit: "100mb", extended: true }));

  const dataFilePath = path.join(process.cwd(), "src", "data", "siteData.json");
  const uploadsDir = path.join(process.cwd(), "uploads");

  // Ensure uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Serve uploads statically
  app.use("/uploads", express.static(uploadsDir));

  // API route: Raw base64 file upload
  app.post("/api/upload", (req, res) => {
    try {
      const { fileName, fileType, base64Data } = req.body;
      if (!fileName || !fileType || !base64Data) {
        return res.status(400).json({ error: "缺少参数 (fileName, fileType, base64Data)" });
      }

      // Check allowed file extensions: png, jpg, jpeg, mp4, mp3, wav, m4a
      const ext = path.extname(fileName).toLowerCase();
      const allowedExts = [".png", ".jpg", ".jpeg", ".mp4", ".mp3", ".wav", ".m4a"];
      if (!allowedExts.includes(ext)) {
        return res.status(400).json({ error: "未授权的文件类型。目前支持图片 (.png, .jpg, .jpeg)、视频 (.mp4) 和音频 (.mp3, .wav, .m4a)" });
      }

      // Strip of the base64 mime-type prefix (e.g. "data:image/png;base64,")
      const base64Clean = base64Data.replace(/^data:.*?;base64,/, "");
      const buffer = Buffer.from(base64Clean, "base64");

      // Sanitize the filename to avoid directory traversal
      const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uniqueFileName = `${Date.now()}_${Math.floor(Math.random() * 10000)}${ext}`;
      const targetPath = path.join(uploadsDir, uniqueFileName);

      fs.writeFileSync(targetPath, buffer);

      res.json({
        success: true,
        url: `/uploads/${uniqueFileName}`,
        originalName: sanitizedName
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "服务器文件保存失败" });
    }
  });

  // Unique key paths for visits and messages directories
  const visitsFilePath = path.join(process.cwd(), "src", "data", "visits.json");
  const messagesFilePath = path.join(process.cwd(), "src", "data", "messages.json");

  // API route: Track and increment page visits
  app.post("/api/visit", (req, res) => {
    try {
      let count = 0;
      if (fs.existsSync(visitsFilePath)) {
        try {
          const raw = fs.readFileSync(visitsFilePath, "utf-8");
          const data = JSON.parse(raw);
          count = data.count || 0;
        } catch (e) {
          count = 0;
        }
      }
      count += 1;
      fs.writeFileSync(visitsFilePath, JSON.stringify({ count }, null, 2), "utf-8");
      res.json({ success: true, count });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to edit visit counter" });
    }
  });

  app.get("/api/visits", (req, res) => {
    try {
      let count = 0;
      if (fs.existsSync(visitsFilePath)) {
        try {
          const raw = fs.readFileSync(visitsFilePath, "utf-8");
          const data = JSON.parse(raw);
          count = data.count || 0;
        } catch (e) {
          count = 0;
        }
      }
      res.json({ count });
    } catch (err: any) {
      res.json({ count: 0 });
    }
  });

  // API route: Get all guest messages (for backoffice)
  app.get("/api/messages", (req, res) => {
    try {
      if (fs.existsSync(messagesFilePath)) {
        const raw = fs.readFileSync(messagesFilePath, "utf-8");
        const data = JSON.parse(raw);
        res.json(data);
      } else {
        res.json([]);
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to load messages" });
    }
  });

  // API route: Post a guest message (from contact form)
  app.post("/api/messages", (req, res) => {
    try {
      const { name, email, content, category, phone } = req.body;
      if (!content) {
        return res.status(400).json({ error: "留言内容不能为空" });
      }

      let messages = [];
      if (fs.existsSync(messagesFilePath)) {
        try {
          const raw = fs.readFileSync(messagesFilePath, "utf-8");
          messages = JSON.parse(raw);
        } catch (e) {
          messages = [];
        }
      }

      const newMessage = {
        id: "msg_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
        name: name?.trim() || "匿名访客",
        email: email?.trim() || "anonymous@local",
        content,
        category: category || "匿名日常留言",
        phone: phone || "",
        createdAt: new Date().toISOString()
      };

      messages.unshift(newMessage); // Most recent first
      fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), "utf-8");

      res.json({ success: true, message: "感谢您的来信！留言已被服务器安全记录。", data: newMessage });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "留言写入失败" });
    }
  });

  // API route: Delete a message from the backoffice
  app.delete("/api/messages/:id", (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Missing message ID" });
      }

      if (fs.existsSync(messagesFilePath)) {
        let messages = [];
        try {
          messages = JSON.parse(fs.readFileSync(messagesFilePath, "utf-8"));
        } catch (e) {
          messages = [];
        }

        const filtered = messages.filter((m: any) => m.id !== id);
        fs.writeFileSync(messagesFilePath, JSON.stringify(filtered, null, 2), "utf-8");
        res.json({ success: true, message: "留言已删除" });
      } else {
        res.status(404).json({ error: "No messages to delete" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message || "删除留言失败" });
    }
  });

  // API route: Get portfolio and site data
  app.get("/api/site-data", (req, res) => {
    try {
      if (fs.existsSync(dataFilePath)) {
        const raw = fs.readFileSync(dataFilePath, "utf-8");
        const data = JSON.parse(raw);
        res.json(data);
      } else {
        res.status(404).json({ error: "Site data file not found on server" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to load data" });
    }
  });

  // API route: Save or update site data
  app.post("/api/site-data", (req, res) => {
    try {
      const data = req.body;
      if (!data || !data.personalInfo) {
        return res.status(400).json({ error: "Invalid data format" });
      }
      
      const dir = path.dirname(dataFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
      res.json({ success: true, message: "数据成功保存并同步！" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "写入服务器失败" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running internally on port ${PORT}`);
  });
}

startServer();
