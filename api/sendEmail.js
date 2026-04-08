import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { to_email, to_name, product_name, access_link } = req.body;

  // Cek apakah .env terbaca
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("GAGAL: SMTP_USER atau SMTP_PASS kosong. Cek file .env!");
    return res.status(500).json({ message: 'Kredensial email belum disetting' });
  }

  // Konfigurasi SMTP Gmail
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER, // Pastikan ini email asli Gmail kamu di .env
      pass: process.env.SMTP_PASS, // Pastikan ini App Password 16 huruf di .env
    },
  });

  try {
    const mailOptions = {
      from: `"ARRIVAR Indonesia" <${process.env.SMTP_USER}>`, 
      replyTo: 'hello@arrivar.id',
      to: to_email,
      subject: `Akses Produk ARRIVAR: ${product_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #F8F9FA;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #E2E8F0;">
            <h2 style="color: #D4AF37; text-align: center; margin-bottom: 5px;">ARRIVAR.id</h2>
            <hr style="border: none; border-top: 1px solid #F1F5F9; margin: 20px 0;" />
            <p>Halo <b>${to_name}</b>,</p>
            <p>Pembayaran untuk produk <strong>${product_name}</strong> berhasil diverifikasi.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${access_link}" style="background-color: #C9A84C; color: #0B1426; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Akses Produk Sekarang</a>
            </div>
            <p style="font-size: 13px; color: #64748B; line-height: 1.6;">Atau gunakan link berikut:<br/> <a href="${access_link}" style="color: #2563EB; word-break: break-all;">${access_link}</a></p>
            <hr style="border: none; border-top: 1px solid #F1F5F9; margin: 30px 0 20px;" />
            <p style="font-size: 12px; color: #94A3B8; text-align: center;">&copy; 2026 PT ARRIVAR INDONESIA</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("SUKSES TERKIRIM! Message ID:", info.messageId);

    return res.status(200).json({ success: true, message: 'Email terkirim' });
  } catch (error) {
    console.error("ERROR DARI NODEMAILER:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}