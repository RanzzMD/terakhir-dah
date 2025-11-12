// api/telegram.js
// Vercel serverless function — expects BOT_TOKEN and CHAT_ID in project env vars
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;
  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ ok: false, error: "MISSING_ENV" });
  }

  try {
    const payload = req.body || {};
    const {
      nama_lengkap = "-",
      nik = "-",
      tempat_lahir = "-",
      tanggal_lahir = "-",
      alamat = "-",
      no_telepon = "-",
      email = "-",
      alasan = "-",
      tanggal_pengajuan = new Date().toISOString(),
      status = "Menunggu",
    } = payload;

    const text = [
      "📝 <b>Pengajuan Izin Baru</b>",
      "",
      `👤 <b>Nama</b>: ${nama_lengkap}`,
      `🆔 <b>NIK</b>: ${nik}`,
      `📍 <b>TTL</b>: ${tempat_lahir}, ${tanggal_lahir}`,
      `🏠 <b>Alamat</b>: ${alamat}`,
      `📞 <b>Kontak</b>: ${no_telepon}`,
      `✉️ <b>Email</b>: ${email}`,
      `🗓️ <b>Tanggal Pengajuan</b>: ${new Date(
        tanggal_pengajuan
      ).toLocaleString("id-ID")}`,
      `🏷️ <b>Status</b>: ${status}`,
      "",
      `✍️ <b>Alasan</b>:\n${alasan}`,
      "",
      "📎 Lampiran dikirim terpisah (opsional).",
    ].join("\n");

    const tgResp = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    const data = await tgResp.json();
    if (!data.ok) {
      return res
        .status(502)
        .json({ ok: false, error: "TELEGRAM_API_ERROR", data });
    }

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
}
