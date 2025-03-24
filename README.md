# Bot Anti-Golpe

Este projeto é um bot para Telegram que recebe a localização do usuário e a envia para um grupo do Telegram para prevenção de golpes.

---

## 🚀 Instalação e Configuração

### **1. Clonar o repositório**
```sh
 git clone https://github.com/seu-usuario/bot-anti-golpe.git
 cd bot-anti-golpe
```

### **2. Instalar dependências**
```sh
npm install
```

### **3. Criar um bot no Telegram**
Para criar um bot e obter o token do Telegram:
1. Abra o Telegram e procure pelo usuário `@BotFather`.
2. Envie o comando `/newbot` e siga as instruções.
3. O BotFather fornecerá um `TOKEN`. **Guarde este token!**

### **4. Obter o ID do grupo do Telegram**
Para que o bot envie mensagens para um grupo:
1. Crie um grupo no Telegram.
2. Adicione o bot criado ao grupo.
3. Para obter o `chat_id`, envie uma mensagem para o grupo e use a API do Telegram:
   ```sh
   curl "https://api.telegram.org/botSEU_TOKEN/getUpdates"
   ```
4. No JSON retornado, procure pelo campo `chat.id`. Este é o `chat_id` do grupo.

### **5. Configurar variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto e adicione:
```sh
TELEGRAM_BOT_TOKEN=SEU_TOKEN_AQUI
TELEGRAM_CHAT_ID=SEU_CHAT_ID_AQUI
```

### **6. Rodar o projeto**
```sh
npm run dev
```
O servidor será iniciado em `http://localhost:3000`

---

## 📌 Como Funciona
1. O usuário acessa a aplicação e permite o acesso à sua localização.
2. O frontend captura a geolocalização e envia para o backend.
3. O backend processa a solicitação e encaminha a localização para o grupo do Telegram.
 
