export default async function handler(req, res) {
  try {
    const { number, count, method } = req.query;

    // Required parameters check
    if (!number || !count || !method) {
      return res.status(400).json({ 
        error: "Missing required query parameters: number, count, method" 
      });
    }

    // Hugging Face Target URL
    const targetUrl = `https://huiyi67-fixdar.hf.space/bomb?number=${encodeURIComponent(number)}&count=${encodeURIComponent(count)}&method=${encodeURIComponent(method)}`;

    // Hugging Face ko request bhejein
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    // Content-Type handle karein (JSON ho ya Text)
    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return res.status(response.status).json(data);
    } else {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

  } catch (error) {
    return res.status(500).json({ 
      error: "Internal Proxy Error", 
      message: error.message 
    });
  }
}
