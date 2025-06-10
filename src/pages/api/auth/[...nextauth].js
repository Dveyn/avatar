import NextAuth from 'next-auth';
import VKProvider from 'next-auth/providers/vk';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    VKProvider({
      clientId: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'email',
        },
      },
    }),
    CredentialsProvider({
      name: 'Telegram',
      credentials: {
        telegramData: { label: "Telegram Data", type: "text" }
      },
      async authorize(credentials) {
        try {
          // Здесь будет логика проверки данных от Telegram
          const telegramData = JSON.parse(credentials.telegramData);
          
          // Проверка подписи данных от Telegram
          // TODO: Добавить проверку подписи
          
          return {
            id: telegramData.id.toString(),
            name: `${telegramData.first_name} ${telegramData.last_name || ''}`,
            email: null,
            image: telegramData.photo_url,
          };
        } catch (error) {
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          provider: account.provider,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.provider = token.provider;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions); 
