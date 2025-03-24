import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { latitude, longitude }: { latitude: number; longitude: number } = await req.json();

    if (latitude === undefined || longitude === undefined) {
      return NextResponse.json({ error: "Coordenadas não fornecidas" }, { status: 400 });
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ error: "Variáveis de ambiente não configuradas" }, { status: 500 });
    }

    // Gerar link do Google Maps com as coordenadas
    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Mensagem formatada
    const message = `🚨 *Alerta de Golpe!*\n\n📍 *Localização suspeita:* \n🌍 Latitude: ${latitude}\n📍 Longitude: ${longitude}\n\n🔗 [Ver no Google Maps](${googleMapsLink})`;

    // Enviar mensagem para o Telegram
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    });

    return NextResponse.json({ success: true, message: "Localização enviada ao Telegram!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    return NextResponse.json({ success: false, error: "Erro ao enviar mensagem ao Telegram." }, { status: 500 });
  }
}
